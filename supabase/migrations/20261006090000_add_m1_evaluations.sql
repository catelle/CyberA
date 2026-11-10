create table if not exists public.m1_evaluations (
  id uuid primary key default gen_random_uuid(),
  participant_code text not null unique,
  full_name text not null,
  email text not null,
  city text,
  cohort text not null default 'CyberA-Rise',
  completion_date date,
  new_practice_adopted boolean not null,
  new_practices text[] not null default '{}',
  practice_example text,
  voluntary_action_taken boolean not null,
  voluntary_action_details text,
  risk_action_example text,
  risk_action_taken boolean not null,
  maintenance_obstacle text,
  contact_consent boolean not null default false,
  verification_status text not null default 'self_reported' check (verification_status in ('self_reported', 'documented', 'verified')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists m1_evaluations_cohort_idx on public.m1_evaluations(cohort);
create index if not exists m1_evaluations_created_at_idx on public.m1_evaluations(created_at);
alter table public.m1_evaluations enable row level security;

-- The public form writes through the server-side service-role client only.
revoke all on public.m1_evaluations from anon, authenticated;
