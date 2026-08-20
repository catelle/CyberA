create table if not exists public.strike_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  question_ids text[] not null,
  status text not null default 'in_progress' check (status in ('in_progress', 'submitted')),
  score int,
  passed boolean,
  points_awarded int not null default 0,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create index if not exists strike_attempts_user_idx on public.strike_attempts (user_id, started_at desc);

alter table public.strike_attempts enable row level security;

create policy "strike_attempts_own_read"
  on public.strike_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke insert, update, delete on public.strike_attempts from authenticated;
grant select on public.strike_attempts to authenticated;
grant all on public.strike_attempts to service_role;

create or replace function public.submit_strike_attempt(
  p_user_id uuid,
  p_attempt_id uuid,
  p_score int,
  p_passed boolean
)
returns table(points_awarded int)
language plpgsql
security definer
set search_path = public
as $$
declare
  award int := 0;
  previous_status text;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':strike:' || p_attempt_id::text, 0));

  select status into previous_status
  from public.strike_attempts
  where id = p_attempt_id and user_id = p_user_id
  for update;

  if previous_status is null then
    raise exception 'Strike attempt not found';
  end if;

  if previous_status = 'submitted' then
    raise exception 'Strike attempt already submitted';
  end if;

  if p_passed then
    award := 50;
  end if;

  update public.strike_attempts
  set status = 'submitted', score = p_score, passed = p_passed,
      points_awarded = award, submitted_at = now()
  where id = p_attempt_id and user_id = p_user_id;

  if award > 0 then
    update public.ambassador_profiles
    set total_points = greatest(coalesce(total_points, 0) + award, 0)
    where user_id = p_user_id;

    if not found then
      raise exception 'Ambassador profile not found';
    end if;
  end if;

  return query select award;
end;
$$;

revoke all on function public.submit_strike_attempt(uuid, uuid, int, boolean) from public;
grant execute on function public.submit_strike_attempt(uuid, uuid, int, boolean) to service_role;
