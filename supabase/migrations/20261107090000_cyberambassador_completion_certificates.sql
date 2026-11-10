-- Completion certificates are earned after modules 1, 2 and 3. A submitted
-- capstone is the default requirement; admins may explicitly grant an
-- exception for a learner who did not submit one.
create table if not exists public.certificate_decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  allow_certificate boolean not null,
  note text,
  decided_by uuid references public.users(id),
  decided_at timestamptz not null default now()
);

alter table public.certificate_decisions enable row level security;

create policy "certificate_decisions_own_or_admin_read" on public.certificate_decisions
  for select to authenticated
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'admin'
    )
  );

grant select on public.certificate_decisions to authenticated;
grant all on public.certificate_decisions to service_role;

create or replace function public.issue_training_certificate_if_eligible(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  completed_required_modules int;
  has_capstone boolean;
  admin_allowed boolean := false;
  inserted_count int := 0;
begin
  select count(distinct progress.module_id)::int into completed_required_modules
  from public.module_progress progress
  join public.modules module on module.id = progress.module_id
  where progress.user_id = p_user_id
    and progress.status = 'completed'
    and module.is_published = true
    and module.order_index between 1 and 3;

  select exists (
    select 1 from public.capstone_projects project
    where project.user_id = p_user_id and project.submitted_at is not null
  ) into has_capstone;

  select coalesce(decision.allow_certificate, false) into admin_allowed
  from public.certificate_decisions decision
  where decision.user_id = p_user_id;

  if completed_required_modules < 3 or (not has_capstone and not admin_allowed) then
    return false;
  end if;

  insert into public.training_certificates (user_id, certificate_number)
  values (
    p_user_id,
    'CA-' || extract(year from now())::int::text || '-' || upper(replace(p_user_id::text, '-', ''))
  )
  on conflict (user_id) do nothing;
  get diagnostics inserted_count = row_count;

  update public.ambassador_profiles
  set certified_at = coalesce(certified_at, now())
  where user_id = p_user_id;

  if inserted_count > 0 then
    insert into public.notifications (user_id, type, title, body, data)
    values (
      p_user_id,
      'training_certificate',
      'Formation terminee',
      'Bravo ! Ton certificat CyberAmbassador est maintenant disponible.',
      jsonb_build_object('training', 'CyberAmbassador')
    );
  end if;

  return true;
end;
$$;

revoke all on function public.issue_training_certificate_if_eligible(uuid) from public;
grant execute on function public.issue_training_certificate_if_eligible(uuid) to service_role;

-- Replace the previous "all published modules" certificate condition while
-- preserving its badge, points and notification behavior.
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
  module_title text;
  badge_inserted int := 0;
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
    p_user_id, p_module_id,
    case when p_passed and p_quiz_score >= 70 then 'completed' else 'in_progress' end,
    greatest(p_lessons_done, 0), p_quiz_score, 1, award, now(),
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
  set total_points = greatest(coalesce(total_points, 0) + award, 0),
      modules_completed = completed_count
  where user_id = p_user_id;

  if not found then raise exception 'Ambassador profile not found'; end if;

  if p_passed and p_quiz_score >= 70 then
    select title into module_title from public.modules where id = p_module_id;
    insert into public.module_badges (user_id, module_id, badge_name, badge_focus)
    values (p_user_id, p_module_id, 'Badge ' || coalesce(module_title, 'Cybersecurite'), coalesce(module_title, 'Cybersecurite'))
    on conflict (user_id, module_id) do nothing;
    get diagnostics badge_inserted = row_count;

    if badge_inserted > 0 then
      insert into public.notifications (user_id, type, title, body, data)
      values (p_user_id, 'module_badge', 'Nouveau badge obtenu',
        'Tu as obtenu le badge ' || coalesce(module_title, 'Cybersecurite') || '.',
        jsonb_build_object('module_id', p_module_id, 'focus', module_title));
    end if;
  end if;

  perform public.issue_training_certificate_if_eligible(p_user_id);
  return query select award, completed_count;
end;
$$;

revoke all on function public.record_module_progress(uuid, uuid, int, int, boolean, int) from public;
grant execute on function public.record_module_progress(uuid, uuid, int, int, boolean, int) to service_role;
