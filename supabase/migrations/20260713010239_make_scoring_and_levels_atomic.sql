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
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':' || p_module_id::text, 0));

  select status into previous_status
  from public.module_progress
  where user_id = p_user_id and module_id = p_module_id
  for update;

  if p_passed and previous_status is distinct from 'completed' then
    award := greatest(p_points, 0);
  end if;

  insert into public.module_progress (
    user_id, module_id, status, lessons_done, quiz_score, quiz_attempts,
    points_earned, started_at, completed_at
  )
  values (
    p_user_id,
    p_module_id,
    case when p_passed then 'completed' else 'in_progress' end,
    greatest(p_lessons_done, 0),
    p_quiz_score,
    1,
    award,
    now(),
    case when p_passed then now() else null end
  )
  on conflict (user_id, module_id) do update set
    status = case
      when module_progress.status = 'completed' then 'completed'
      when excluded.status = 'completed' then 'completed'
      else 'in_progress'
    end,
    lessons_done = greatest(coalesce(module_progress.lessons_done, 0), excluded.lessons_done),
    quiz_score = greatest(module_progress.quiz_score, excluded.quiz_score),
    quiz_attempts = coalesce(module_progress.quiz_attempts, 0) + 1,
    points_earned = coalesce(module_progress.points_earned, 0) + award,
    started_at = coalesce(module_progress.started_at, excluded.started_at),
    completed_at = coalesce(module_progress.completed_at, excluded.completed_at);

  select count(*)::int into completed_count
  from public.module_progress
  where user_id = p_user_id and status = 'completed';

  update public.ambassador_profiles
  set
    total_points = greatest(coalesce(total_points, 0) + award, 0),
    modules_completed = completed_count
  where user_id = p_user_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;

  return query select award, completed_count;
end;
$$;

create or replace function public.review_challenge_submission(
  p_submission_id uuid,
  p_status text,
  p_points int,
  p_reviewer_id uuid,
  p_reviewer_note text
)
returns table(user_id uuid, points_delta int, review_changed boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  submission public.challenge_submissions%rowtype;
  next_points int;
  delta int;
begin
  if p_status not in ('approved', 'rejected') then
    raise exception 'Invalid review status';
  end if;

  select * into submission
  from public.challenge_submissions
  where id = p_submission_id
  for update;

  if not found then
    raise exception 'Challenge submission not found';
  end if;

  next_points := case when p_status = 'approved' then greatest(p_points, 0) else 0 end;
  delta := next_points - case
    when submission.status = 'approved' then coalesce(submission.points_awarded, 0)
    else 0
  end;

  update public.challenge_submissions set
    status = p_status,
    points_awarded = next_points,
    reviewer_id = p_reviewer_id,
    reviewer_note = nullif(p_reviewer_note, ''),
    reviewed_at = now(),
    auto_delete_at = now() + interval '30 days'
  where id = p_submission_id;

  update public.ambassador_profiles
  set total_points = greatest(coalesce(total_points, 0) + delta, 0)
  where ambassador_profiles.user_id = submission.user_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;

  return query select submission.user_id, delta, submission.status is distinct from p_status;
end;
$$;

create or replace function public.review_capstone_project(
  p_project_id uuid,
  p_status text,
  p_reviewer_id uuid
)
returns table(user_id uuid, points_delta int)
language plpgsql
security definer
set search_path = public
as $$
declare
  project public.capstone_projects%rowtype;
  delta int;
  has_approved_capstone boolean;
begin
  if p_status not in ('approved', 'rejected') then
    raise exception 'Invalid review status';
  end if;

  select * into project
  from public.capstone_projects
  where id = p_project_id
  for update;

  if not found then
    raise exception 'Capstone project not found';
  end if;

  delta := case
    when project.status = p_status then 0
    when p_status = 'approved' then 500
    when project.status = 'approved' then -500
    else 0
  end;

  update public.capstone_projects set
    status = p_status,
    reviewer_id = p_reviewer_id,
    reviewed_at = now()
  where id = p_project_id;

  select exists (
    select 1 from public.capstone_projects
    where capstone_projects.user_id = project.user_id and status = 'approved'
  ) into has_approved_capstone;

  update public.ambassador_profiles set
    total_points = greatest(coalesce(total_points, 0) + delta, 0),
    capstone_submitted = has_approved_capstone
  where ambassador_profiles.user_id = project.user_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;

  return query select project.user_id, delta;
end;
$$;

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
    new.certified_at := case when next_level = 'master' then now() else null end;

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

revoke all on function public.record_module_progress(uuid, uuid, int, int, boolean, int) from public;
revoke all on function public.review_challenge_submission(uuid, text, int, uuid, text) from public;
revoke all on function public.review_capstone_project(uuid, text, uuid) from public;

grant execute on function public.record_module_progress(uuid, uuid, int, int, boolean, int) to service_role;
grant execute on function public.review_challenge_submission(uuid, text, int, uuid, text) to service_role;
grant execute on function public.review_capstone_project(uuid, text, uuid) to service_role;

drop function if exists public.increment_ambassador_points(uuid, int);
drop function if exists public.adjust_ambassador_points(uuid, int);
