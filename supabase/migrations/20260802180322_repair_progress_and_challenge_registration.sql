create or replace function public.register_for_challenge(p_user_id uuid, p_challenge_id uuid)
returns table(registration_id uuid, deadline_at timestamptz, cooldown_until timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  latest public.challenge_registrations%rowtype;
  created public.challenge_registrations%rowtype;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':' || p_challenge_id::text, 0));

  if not exists (
    select 1 from public.challenges as challenge
    where challenge.id = p_challenge_id
      and challenge.is_active = true
      and challenge.archived_at is null
  ) then
    raise exception 'Challenge unavailable';
  end if;

  update public.challenge_registrations as registration
  set
    status = 'expired',
    expired_at = now(),
    cooldown_until = registration.deadline_at + interval '3 days'
  where registration.user_id = p_user_id
    and registration.challenge_id = p_challenge_id
    and registration.status = 'registered'
    and registration.deadline_at <= now();

  select registration.* into latest
  from public.challenge_registrations as registration
  where registration.user_id = p_user_id
    and registration.challenge_id = p_challenge_id
  order by registration.registered_at desc
  limit 1;

  if latest.status = 'registered' then
    raise exception 'Already registered';
  end if;
  if latest.status = 'submitted' then
    raise exception 'Challenge already submitted';
  end if;
  if latest.status = 'expired' and latest.cooldown_until > now() then
    raise exception 'Registration cooldown until %', latest.cooldown_until;
  end if;

  insert into public.challenge_registrations(user_id, challenge_id, deadline_at)
  values (p_user_id, p_challenge_id, now() + interval '3 days')
  returning * into created;

  return query select created.id, created.deadline_at, created.cooldown_until;
end;
$$;

revoke all on function public.record_lesson_progress(uuid, uuid, int) from public, anon, authenticated;
revoke all on function public.record_module_progress(uuid, uuid, int, int, boolean, int) from public, anon, authenticated;
revoke all on function public.register_for_challenge(uuid, uuid) from public, anon, authenticated;
revoke all on function public.submit_registered_challenge(uuid, uuid, text, text, text) from public, anon, authenticated;
revoke all on function public.review_challenge_submission(uuid, text, int, uuid, text) from public, anon, authenticated;
revoke all on function public.review_capstone_project(uuid, text, uuid) from public, anon, authenticated;

grant execute on function public.record_lesson_progress(uuid, uuid, int) to service_role;
grant execute on function public.record_module_progress(uuid, uuid, int, int, boolean, int) to service_role;
grant execute on function public.register_for_challenge(uuid, uuid) to service_role;
grant execute on function public.submit_registered_challenge(uuid, uuid, text, text, text) to service_role;
grant execute on function public.review_challenge_submission(uuid, text, int, uuid, text) to service_role;
grant execute on function public.review_capstone_project(uuid, text, uuid) to service_role;
