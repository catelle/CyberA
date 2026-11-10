create or replace function public.review_challenge_submission(
  p_submission_id uuid,
  p_status text,
  p_points int,
  p_reviewer_id uuid,
  p_reviewer_note text
)
returns table(user_id uuid, points_delta int, review_changed boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  submission public.challenge_submissions%rowtype;
  next_points int;
  delta int;
begin
  if p_status not in ('approved', 'rejected') then
    raise exception 'Invalid review status';
  end if;

  select * into submission
  from public.challenge_submissions
  where id = p_submission_id
  for update;

  if not found then
    raise exception 'Challenge submission not found';
  end if;

  next_points := case when p_status = 'approved' then greatest(p_points, 0) else 0 end;
  delta := next_points - case
    when submission.status = 'approved' then coalesce(submission.points_awarded, 0)
    else 0
  end;

  update public.challenge_submissions set
    status = p_status,
    points_awarded = next_points,
    reviewer_id = p_reviewer_id,
    reviewer_note = nullif(p_reviewer_note, ''),
    reviewed_at = now(),
    auto_delete_at = now() + interval '30 days'
  where id = p_submission_id;

  update public.ambassador_profiles
  set total_points = greatest(coalesce(total_points, 0) + delta, 0)
  where ambassador_profiles.user_id = submission.user_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;

  if p_status = 'rejected' then
    update public.challenge_registrations as registration
    set
      status = 'expired',
      expired_at = now(),
      cooldown_until = now() + interval '3 days'
    where registration.id = submission.registration_id;

    if not found then
      update public.challenge_registrations as registration
      set
        status = 'expired',
        expired_at = now(),
        cooldown_until = now() + interval '3 days'
      where registration.id = (
        select candidate.id
        from public.challenge_registrations as candidate
        where candidate.user_id = submission.user_id
          and candidate.challenge_id = submission.challenge_id
          and candidate.status = 'submitted'
        order by candidate.registered_at desc
        limit 1
      );
    end if;
  end if;

  return query select submission.user_id, delta, submission.status is distinct from p_status;
end;
$$;

update public.challenge_registrations as registration
set
  status = 'expired',
  expired_at = coalesce(submission.reviewed_at, now()),
  cooldown_until = coalesce(submission.reviewed_at, now()) + interval '3 days'
from public.challenge_submissions as submission
where submission.status = 'rejected'
  and registration.id = submission.registration_id
  and registration.status = 'submitted';

revoke all on function public.review_challenge_submission(uuid, text, int, uuid, text) from public, anon, authenticated;
grant execute on function public.review_challenge_submission(uuid, text, int, uuid, text) to service_role;
