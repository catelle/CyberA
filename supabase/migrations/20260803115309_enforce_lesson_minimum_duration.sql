create table if not exists public.lesson_sessions (
  user_id uuid not null references public.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  lesson_id text not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active_seconds integer not null default 0 check (active_seconds >= 0),
  checkpoints_completed integer not null default 0 check (checkpoints_completed >= 0),
  primary key (user_id, module_id, lesson_id)
);

create index if not exists lesson_sessions_module_user_idx
  on public.lesson_sessions (module_id, user_id);

alter table public.lesson_sessions enable row level security;

create policy "lesson_sessions_own_read"
  on public.lesson_sessions
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke insert, update, delete on public.lesson_sessions from authenticated;
grant select on public.lesson_sessions to authenticated;
grant all on public.lesson_sessions to service_role;
