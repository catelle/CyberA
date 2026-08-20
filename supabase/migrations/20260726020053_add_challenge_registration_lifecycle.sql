alter table public.challenges add column if not exists archived_at timestamptz;

create table if not exists public.challenge_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  status text not null default 'registered' check (status in ('registered', 'submitted', 'expired')),
  registered_at timestamptz not null default now(),
  deadline_at timestamptz not null,
  submitted_at timestamptz,
  expired_at timestamptz,
  cooldown_until timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists challenge_registrations_one_active_idx
  on public.challenge_registrations(user_id, challenge_id)
  where status = 'registered';
create index if not exists challenge_registrations_user_history_idx
  on public.challenge_registrations(user_id, challenge_id, registered_at desc);
create index if not exists challenge_registrations_deadline_idx
  on public.challenge_registrations(deadline_at)
  where status = 'registered';

alter table public.challenge_registrations enable row level security;
create policy "challenge_registrations_own_or_admin_read" on public.challenge_registrations
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );
grant select on public.challenge_registrations to authenticated;
grant all on public.challenge_registrations to service_role;

alter table public.challenge_submissions
  add column if not exists registration_id uuid references public.challenge_registrations(id) on delete restrict;
alter table public.challenge_submissions
  drop constraint if exists challenge_submissions_user_id_challenge_id_key;
create unique index if not exists challenge_submissions_registration_idx
  on public.challenge_submissions(registration_id)
  where registration_id is not null;

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
    select 1 from public.challenges
    where id = p_challenge_id and is_active = true and archived_at is null
  ) then
    raise exception 'Challenge unavailable';
  end if;

  update public.challenge_registrations
  set status = 'expired', expired_at = now(), cooldown_until = deadline_at + interval '3 days'
  where user_id = p_user_id and challenge_id = p_challenge_id
    and status = 'registered' and deadline_at <= now();

  select * into latest
  from public.challenge_registrations
  where user_id = p_user_id and challenge_id = p_challenge_id
  order by registered_at desc
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

create or replace function public.submit_registered_challenge(
  p_user_id uuid,
  p_challenge_id uuid,
  p_report_text text,
  p_photo_url text,
  p_reviewer_note text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  registration public.challenge_registrations%rowtype;
  submission_id uuid;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':' || p_challenge_id::text, 0));

  select * into registration
  from public.challenge_registrations
  where user_id = p_user_id and challenge_id = p_challenge_id and status = 'registered'
  order by registered_at desc limit 1
  for update;

  if not found then raise exception 'Active registration required'; end if;
  if registration.deadline_at <= now() then
    update public.challenge_registrations
    set status = 'expired', expired_at = now(), cooldown_until = registration.deadline_at + interval '3 days'
    where id = registration.id;
    raise exception 'Registration expired';
  end if;

  insert into public.challenge_submissions(
    registration_id, user_id, challenge_id, report_text, photo_url, status, reviewer_note
  ) values (
    registration.id, p_user_id, p_challenge_id, p_report_text, p_photo_url, 'pending', p_reviewer_note
  ) returning id into submission_id;

  update public.challenge_registrations
  set status = 'submitted', submitted_at = now()
  where id = registration.id;

  return submission_id;
end;
$$;

revoke all on function public.register_for_challenge(uuid, uuid) from public;
revoke all on function public.submit_registered_challenge(uuid, uuid, text, text, text) from public;
grant execute on function public.register_for_challenge(uuid, uuid) to service_role;
grant execute on function public.submit_registered_challenge(uuid, uuid, text, text, text) to service_role;
