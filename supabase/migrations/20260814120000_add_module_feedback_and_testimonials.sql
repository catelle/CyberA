create table if not exists public.module_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  feedback text not null check (char_length(feedback) between 20 and 1000),
  publish_consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, module_id)
);

create index if not exists module_feedback_review_queue_idx
  on public.module_feedback (status, created_at desc);

alter table public.module_feedback enable row level security;

-- All access is mediated by role-checked server routes. In particular, this
-- prevents a learner from self-approving a testimonial through the Data API.
revoke all on table public.module_feedback from anon, authenticated;
grant all on table public.module_feedback to service_role;

comment on table public.module_feedback is
  'Post-completion learner ratings and testimonials moderated by full admins.';
