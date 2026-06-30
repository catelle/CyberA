create extension if not exists "uuid-ossp";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique,
  full_name text not null,
  role text not null check (role in ('ambassador', 'parent', 'admin')),
  avatar_url text,
  city text,
  created_at timestamptz default now()
);

create table if not exists public.cohorts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null check (type in ('onsite', 'remote')),
  start_date date,
  max_size int default 100,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.ambassador_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid unique references public.users(id) on delete cascade,
  cohort_id uuid references public.cohorts(id),
  level text default 'junior' check (level in ('junior', 'senior', 'master')),
  total_points int default 0,
  modules_completed int default 0,
  certified_at timestamptz,
  kit_dispatched boolean default false,
  capstone_submitted boolean default false,
  parental_consent_given boolean default false,
  parental_consent_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists ambassador_profiles_points_idx on public.ambassador_profiles(total_points desc);
create index if not exists ambassador_profiles_cohort_idx on public.ambassador_profiles(cohort_id);

create table if not exists public.family_links (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid references public.users(id) on delete cascade,
  child_id uuid references public.users(id) on delete cascade,
  family_code text unique not null,
  linked_at timestamptz default now(),
  unique(parent_id, child_id)
);

create table if not exists public.modules (
  id uuid primary key default uuid_generate_v4(),
  order_index int not null,
  title text not null,
  subtitle text,
  description text,
  color text,
  icon text,
  video_url text,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references public.modules(id) on delete cascade,
  order_index int not null,
  title text not null,
  content jsonb not null,
  estimated_mins int default 5,
  created_at timestamptz default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references public.modules(id) on delete cascade,
  order_index int not null,
  question text not null,
  options jsonb not null,
  correct_index int not null,
  explanation text,
  points int default 10
);

create table if not exists public.module_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  module_id uuid references public.modules(id) on delete cascade,
  status text default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  lessons_done int default 0,
  quiz_score int,
  quiz_attempts int default 0,
  points_earned int default 0,
  started_at timestamptz,
  completed_at timestamptz,
  unique(user_id, module_id)
);

create table if not exists public.challenges (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  instructions text not null,
  points int default 50,
  week_start date not null,
  requires_photo boolean default true,
  requires_report boolean default true,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.challenge_submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  challenge_id uuid references public.challenges(id) on delete cascade,
  report_text text,
  photo_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  points_awarded int default 0,
  reviewer_id uuid references public.users(id),
  reviewer_note text,
  reviewed_at timestamptz,
  auto_delete_at timestamptz,
  submitted_at timestamptz default now(),
  unique(user_id, challenge_id)
);

create table if not exists public.parent_challenges (
  id uuid primary key default uuid_generate_v4(),
  child_id uuid references public.users(id) on delete cascade,
  parent_id uuid references public.users(id) on delete cascade,
  challenge_id uuid references public.challenges(id),
  message text,
  status text default 'pending' check (status in ('pending', 'accepted', 'completed')),
  bonus_points int default 20,
  created_at timestamptz default now()
);

create table if not exists public.capstone_projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  action_type text not null,
  reach_count int,
  evidence_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_id uuid references public.users(id),
  submitted_at timestamptz default now(),
  reviewed_at timestamptz
);

create table if not exists public.forum_reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid references public.users(id) on delete cascade,
  type text not null check (type in ('scam', 'bullying', 'misinformation', 'other')),
  platform text,
  description text not null,
  evidence_url text,
  target_url text,
  status text default 'pending' check (status in ('pending', 'verified', 'actioned', 'rejected')),
  admin_id uuid references public.users(id),
  admin_note text,
  ambassadors_notified int default 0,
  outcome text,
  verified_at timestamptz,
  actioned_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.weekly_snapshots (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  week_start date not null,
  points_earned int default 0,
  rank int,
  challenges_done int default 0,
  unique(user_id, week_start)
);

create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  data jsonb,
  read boolean default false,
  created_at timestamptz default now()
);

create index if not exists notifications_user_read_created_idx
  on public.notifications(user_id, read, created_at desc);

alter table public.users enable row level security;
alter table public.cohorts enable row level security;
alter table public.ambassador_profiles enable row level security;
alter table public.family_links enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.module_progress enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_submissions enable row level security;
alter table public.parent_challenges enable row level security;
alter table public.capstone_projects enable row level security;
alter table public.forum_reports enable row level security;
alter table public.weekly_snapshots enable row level security;
alter table public.notifications enable row level security;

create policy "users_read_own" on public.users
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "users_update_own" on public.users
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "published_modules_read" on public.modules
  for select to authenticated
  using (is_published = true or exists (
    select 1 from public.users where id = (select auth.uid()) and role = 'admin'
  ));

create policy "published_lessons_read" on public.lessons
  for select to authenticated
  using (exists (
    select 1 from public.modules
    where modules.id = lessons.module_id
      and (modules.is_published = true or exists (
        select 1 from public.users where id = (select auth.uid()) and role = 'admin'
      ))
  ));

create policy "published_quizzes_read" on public.quiz_questions
  for select to authenticated
  using (exists (
    select 1 from public.modules
    where modules.id = quiz_questions.module_id
      and (modules.is_published = true or exists (
        select 1 from public.users where id = (select auth.uid()) and role = 'admin'
      ))
  ));

create policy "cohorts_read" on public.cohorts
  for select to authenticated
  using (is_active = true or exists (
    select 1 from public.users where id = (select auth.uid()) and role = 'admin'
  ));

create policy "progress_own_all" on public.module_progress
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "ambassador_profile_own_read" on public.ambassador_profiles
  for select to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1 from public.family_links
      where parent_id = (select auth.uid()) and child_id = ambassador_profiles.user_id
    )
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );

create policy "family_links_read_related" on public.family_links
  for select to authenticated
  using (
    parent_id = (select auth.uid())
    or child_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );

create policy "family_links_child_create" on public.family_links
  for insert to authenticated
  with check (child_id = (select auth.uid()) and parent_id is null);

create policy "family_links_parent_claim" on public.family_links
  for update to authenticated
  using (parent_id is null)
  with check (parent_id = (select auth.uid()));

create policy "active_challenges_read" on public.challenges
  for select to authenticated
  using (is_active = true or exists (
    select 1 from public.users where id = (select auth.uid()) and role = 'admin'
  ));

create policy "challenge_submissions_own_all" on public.challenge_submissions
  for all to authenticated
  using (
    user_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  )
  with check (
    user_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );

create policy "parent_challenges_related" on public.parent_challenges
  for all to authenticated
  using (
    child_id = (select auth.uid())
    or parent_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  )
  with check (
    child_id = (select auth.uid())
    or parent_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );

create policy "capstone_own_or_admin" on public.capstone_projects
  for all to authenticated
  using (
    user_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  )
  with check (
    user_id = (select auth.uid())
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );

create policy "forum_create_own" on public.forum_reports
  for insert to authenticated
  with check (reporter_id = (select auth.uid()));

create policy "forum_read_own_verified_or_admin" on public.forum_reports
  for select to authenticated
  using (
    reporter_id = (select auth.uid())
    or status in ('verified', 'actioned')
    or exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin')
  );

create policy "forum_admin_update" on public.forum_reports
  for update to authenticated
  using (exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin'))
  with check (exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin'));

create policy "snapshots_read" on public.weekly_snapshots
  for select to authenticated
  using (true);

create policy "notifications_own_all" on public.notifications
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

insert into public.cohorts (name, type, start_date, max_size, is_active)
values ('Yaounde Pilot - Juillet 2025', 'onsite', date '2025-07-01', 15, true)
on conflict do nothing;

insert into public.modules (order_index, title, subtitle, description, color, icon, is_published)
values
  (1, 'Hygiene Numerique', 'Vie privee, mots de passe et temps d''ecran', 'Installer les reflexes de base pour proteger ses comptes, ses donnees et son attention.', '#1A5276', 'shield', true),
  (2, 'E-Reputation & Desinformation', 'Empreinte numerique et verification', 'Construire une identite positive et ralentir la diffusion des fausses informations.', '#1E8449', 'globe', true),
  (3, 'Online Scams & Digital Safety', 'Arnaques, phishing et reaction', 'Reconnaitre les arnaques courantes et savoir quoi faire en cas d''incident.', '#B7950B', 'warning', true),
  (4, 'Leadership & Advocacy', 'Action communautaire', 'Utiliser ses competences pour proteger et sensibiliser sa communaute.', '#6C3483', 'trophy', true);
