-- Admins need to know who is connected right now and how long a learner
-- actually spent inside a module. Both are fed by the dashboard heartbeat.
create table if not exists public.user_presence (
  user_id uuid primary key references public.users(id) on delete cascade,
  last_seen_at timestamptz not null default now(),
  last_path text,
  updated_at timestamptz not null default now()
);

create index if not exists user_presence_last_seen_idx
  on public.user_presence (last_seen_at desc);

create table if not exists public.module_time_spent (
  user_id uuid not null references public.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  active_seconds integer not null default 0 check (active_seconds >= 0),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

create index if not exists module_time_spent_module_idx
  on public.module_time_spent (module_id, user_id);

alter table public.user_presence enable row level security;
alter table public.module_time_spent enable row level security;

create policy "user_presence_own_or_admin_read" on public.user_presence
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'admin'
    )
  );

create policy "module_time_spent_own_or_admin_read" on public.module_time_spent
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'admin'
    )
  );

-- Only the service role writes presence, so a learner cannot inflate the time
-- the admin dashboard reports.
revoke insert, update, delete on public.user_presence from authenticated;
revoke insert, update, delete on public.module_time_spent from authenticated;
grant select on public.user_presence to authenticated;
grant select on public.module_time_spent to authenticated;
grant all on public.user_presence to service_role;
grant all on public.module_time_spent to service_role;
