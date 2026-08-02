create table if not exists public.lesson_progress (
  user_id uuid not null references public.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'lesson_progress'
      and policyname = 'lesson_progress_own_read'
  ) then
    create policy "lesson_progress_own_read" on public.lesson_progress
      for select
      to authenticated
      using ((select auth.uid()) = user_id);
  end if;

end
$$;

revoke insert, update, delete on public.lesson_progress from authenticated;
grant select on public.lesson_progress to authenticated;
grant all on public.lesson_progress to service_role;
