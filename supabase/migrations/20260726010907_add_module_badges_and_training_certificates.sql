create table if not exists public.module_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  badge_name text not null,
  badge_focus text not null,
  awarded_at timestamptz not null default now(),
  unique (user_id, module_id)
);

create table if not exists public.training_certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  certificate_number text not null unique,
  issued_at timestamptz not null default now()
);

alter table public.module_badges enable row level security;
alter table public.training_certificates enable row level security;

create policy "module_badges_own_or_admin_read" on public.module_badges
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'admin'
    )
  );

create policy "training_certificates_own_or_admin_read" on public.training_certificates
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'admin'
    )
  );

grant select on public.module_badges to authenticated;
grant select on public.training_certificates to authenticated;
grant all on public.module_badges to service_role;
grant all on public.training_certificates to service_role;

create or replace function public.record_module_progress(
  p_user_id uuid,
  p_module_id uuid,
  p_lessons_done int,
  p_quiz_score int,
  p_passed boolean,
  p_points int
)
returns table(points_awarded int, completed_modules int)
language plpgsql
security definer
set search_path = public
as $$
declare
  previous_status text;
  award int := 0;
  completed_count int;
  published_count int;
  module_title text;
  badge_inserted int := 0;
  certificate_inserted int := 0;
begin
  if p_quiz_score < 0 or p_quiz_score > 100 then
    raise exception 'Quiz score must be between 0 and 100';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':' || p_module_id::text, 0));

  select status into previous_status
  from public.module_progress
  where user_id = p_user_id and module_id = p_module_id
  for update;

  if p_passed and p_quiz_score >= 70 and previous_status is distinct from 'completed' then
    award := greatest(p_points, 0);
  end if;

  insert into public.module_progress (
    user_id, module_id, status, lessons_done, quiz_score, quiz_attempts,
    points_earned, started_at, completed_at
  ) values (
    p_user_id,
    p_module_id,
    case when p_passed and p_quiz_score >= 70 then 'completed' else 'in_progress' end,
    greatest(p_lessons_done, 0),
    p_quiz_score,
    1,
    award,
    now(),
    case when p_passed and p_quiz_score >= 70 then now() else null end
  )
  on conflict (user_id, module_id) do update set
    status = case
      when module_progress.status = 'completed' then 'completed'
      when excluded.status = 'completed' then 'completed'
      else 'in_progress'
    end,
    lessons_done = greatest(coalesce(module_progress.lessons_done, 0), excluded.lessons_done),
    quiz_score = greatest(coalesce(module_progress.quiz_score, 0), excluded.quiz_score),
    quiz_attempts = coalesce(module_progress.quiz_attempts, 0) + 1,
    points_earned = coalesce(module_progress.points_earned, 0) + award,
    started_at = coalesce(module_progress.started_at, excluded.started_at),
    completed_at = coalesce(module_progress.completed_at, excluded.completed_at);

  select count(*)::int into completed_count
  from public.module_progress progress
  join public.modules module on module.id = progress.module_id
  where progress.user_id = p_user_id
    and progress.status = 'completed'
    and module.is_published = true;

  update public.ambassador_profiles
  set
    total_points = greatest(coalesce(total_points, 0) + award, 0),
    modules_completed = completed_count
  where user_id = p_user_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;

  if p_passed and p_quiz_score >= 70 then
    select title into module_title from public.modules where id = p_module_id;

    insert into public.module_badges (user_id, module_id, badge_name, badge_focus)
    values (
      p_user_id,
      p_module_id,
      'Badge ' || coalesce(module_title, 'Cybersecurite'),
      coalesce(module_title, 'Cybersecurite')
    )
    on conflict (user_id, module_id) do nothing;
    get diagnostics badge_inserted = row_count;

    if badge_inserted > 0 then
      insert into public.notifications (user_id, type, title, body, data)
      values (
        p_user_id,
        'module_badge',
        'Nouveau badge obtenu',
        'Tu as obtenu le badge ' || coalesce(module_title, 'Cybersecurite') || '.',
        jsonb_build_object('module_id', p_module_id, 'focus', module_title)
      );
    end if;
  end if;

  select count(*)::int into published_count
  from public.modules
  where is_published = true;

  if published_count > 0 and completed_count >= published_count then
    insert into public.training_certificates (user_id, certificate_number)
    values (
      p_user_id,
      'CA-' || extract(year from now())::int::text || '-' || upper(replace(p_user_id::text, '-', ''))
    )
    on conflict (user_id) do nothing;
    get diagnostics certificate_inserted = row_count;

    update public.ambassador_profiles
    set certified_at = coalesce(certified_at, now())
    where user_id = p_user_id;

    if certificate_inserted > 0 then
      insert into public.notifications (user_id, type, title, body, data)
      values (
        p_user_id,
        'training_certificate',
        'Formation terminee',
        'Bravo ! Ton certificat CyberAmbassador est maintenant disponible.',
        jsonb_build_object('training', 'CyberAmbassador')
      );
    end if;
  end if;

  return query select award, completed_count;
end;
$$;

revoke all on function public.record_module_progress(uuid, uuid, int, int, boolean, int) from public;
grant execute on function public.record_module_progress(uuid, uuid, int, int, boolean, int) to service_role;

create or replace function public.check_ambassador_level()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  next_level text;
  approved_challenges int;
begin
  select count(*)::int into approved_challenges
  from public.challenge_submissions
  where user_id = new.user_id and status = 'approved';

  next_level := case
    when new.total_points >= 1000
      and new.modules_completed >= 4
      and approved_challenges >= 4
      and new.capstone_submitted = true then 'master'
    when new.total_points >= 500
      and new.modules_completed >= 4
      and approved_challenges >= 4 then 'senior'
    else 'junior'
  end;

  if next_level <> new.level then
    new.level := next_level;

    if (case next_level when 'master' then 3 when 'senior' then 2 else 1 end)
      > (case old.level when 'master' then 3 when 'senior' then 2 else 1 end) then
      insert into public.notifications(user_id, type, title, body, data)
      values (
        new.user_id,
        'level_up',
        'Nouveau niveau CyberAmbassador',
        'Tu passes au niveau ' || next_level || '.',
        jsonb_build_object('level', next_level)
      );
    end if;
  end if;

  return new;
end;
$$;

insert into public.module_badges (user_id, module_id, badge_name, badge_focus, awarded_at)
select
  progress.user_id,
  progress.module_id,
  'Badge ' || module.title,
  module.title,
  coalesce(progress.completed_at, now())
from public.module_progress progress
join public.modules module on module.id = progress.module_id
where progress.status = 'completed'
on conflict (user_id, module_id) do nothing;

insert into public.training_certificates (user_id, certificate_number, issued_at)
select
  profile.user_id,
  'CA-' || extract(year from coalesce(profile.certified_at, now()))::int::text || '-' || upper(replace(profile.user_id::text, '-', '')),
  coalesce(profile.certified_at, now())
from public.ambassador_profiles profile
where (
  select count(*)
  from public.module_progress progress
  join public.modules module on module.id = progress.module_id
  where progress.user_id = profile.user_id
    and progress.status = 'completed'
    and module.is_published = true
) >= (select count(*) from public.modules where is_published = true)
and (select count(*) from public.modules where is_published = true) > 0
on conflict (user_id) do nothing;

update public.ambassador_profiles profile
set certified_at = coalesce(
  profile.certified_at,
  (select certificate.issued_at from public.training_certificates certificate where certificate.user_id = profile.user_id)
)
where exists (
  select 1 from public.training_certificates certificate where certificate.user_id = profile.user_id
);
