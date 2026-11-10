alter table public.parent_challenges
  add column if not exists report_text text,
  add column if not exists evidence_url text,
  add column if not exists points_awarded int not null default 0,
  add column if not exists reviewer_id uuid references public.users(id),
  add column if not exists reviewer_note text,
  add column if not exists submitted_at timestamptz,
  add column if not exists reviewed_at timestamptz;

alter table public.parent_challenges
  drop constraint if exists parent_challenges_status_check;

alter table public.parent_challenges
  add constraint parent_challenges_status_check
  check (status in ('pending', 'invited', 'accepted', 'submitted', 'approved', 'rejected', 'completed'));

with duplicates as (
  select id, row_number() over (
    partition by parent_id, child_id, challenge_id
    order by created_at desc, id desc
  ) as duplicate_number
  from public.parent_challenges
)
delete from public.parent_challenges
where id in (select id from duplicates where duplicate_number > 1);

create unique index if not exists parent_challenges_family_challenge_idx
  on public.parent_challenges(parent_id, child_id, challenge_id);

create or replace function public.review_parent_challenge(
  p_parent_challenge_id uuid,
  p_status text,
  p_points int,
  p_reviewer_id uuid,
  p_reviewer_note text
)
returns table(child_id uuid, parent_id uuid, points_delta int, review_changed boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  parent_submission public.parent_challenges%rowtype;
  next_points int;
  delta int;
begin
  if p_status not in ('approved', 'rejected') then
    raise exception 'Invalid review status';
  end if;

  select * into parent_submission
  from public.parent_challenges
  where id = p_parent_challenge_id
  for update;

  if not found then
    raise exception 'Parent challenge not found';
  end if;

  if parent_submission.status not in ('submitted', 'approved', 'rejected') then
    raise exception 'Parent challenge has not been submitted';
  end if;

  next_points := case when p_status = 'approved' then greatest(p_points, 0) else 0 end;
  delta := next_points - case
    when parent_submission.status = 'approved' then coalesce(parent_submission.points_awarded, 0)
    else 0
  end;

  update public.parent_challenges set
    status = p_status,
    points_awarded = next_points,
    reviewer_id = p_reviewer_id,
    reviewer_note = nullif(p_reviewer_note, ''),
    reviewed_at = now()
  where id = p_parent_challenge_id;

  update public.ambassador_profiles
  set total_points = greatest(coalesce(total_points, 0) + delta, 0)
  where user_id = parent_submission.child_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;

  return query select
    parent_submission.child_id,
    parent_submission.parent_id,
    delta,
    parent_submission.status is distinct from p_status;
end;
$$;

revoke all on function public.review_parent_challenge(uuid, text, int, uuid, text) from public;
revoke all on function public.review_parent_challenge(uuid, text, int, uuid, text) from anon;
revoke all on function public.review_parent_challenge(uuid, text, int, uuid, text) from authenticated;
grant execute on function public.review_parent_challenge(uuid, text, int, uuid, text) to service_role;
