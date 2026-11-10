create table if not exists public.module_progress_approvals (
  id uuid primary key default gen_random_uuid(),
  progress_id uuid not null unique references public.module_progress(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  approved_by uuid not null references public.users(id),
  approved_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists module_progress_approvals_user_id_idx
  on public.module_progress_approvals(user_id);

alter table public.module_progress_approvals enable row level security;

-- Approval writes are made only by the server after it verifies the admin role.
-- Keeping the table unavailable to browser roles prevents learners from
-- approving their own progression even if another progress policy changes.
revoke all on table public.module_progress_approvals from anon, authenticated;
grant all on table public.module_progress_approvals to service_role;

comment on table public.module_progress_approvals is
  'Auditable admin approvals that unlock the next module after each completed module.';
