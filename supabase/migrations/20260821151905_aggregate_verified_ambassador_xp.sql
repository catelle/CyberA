create or replace function public.get_verified_ambassador_xp(
  p_user_ids uuid[] default null,
  p_since timestamptz default null
)
returns table(user_id uuid, total_points bigint)
language sql
stable
security invoker
set search_path = public
as $$
  select ledger.user_id, sum(ledger.points)::bigint as total_points
  from (
    select progress.user_id, greatest(coalesce(progress.points_earned, 0), 0) as points
    from public.module_progress as progress
    where progress.status = 'completed'
      and (p_since is null or progress.completed_at >= p_since)

    union all

    select submission.user_id, greatest(coalesce(submission.points_awarded, 0), 0)
    from public.challenge_submissions as submission
    where submission.status = 'approved'
      and (p_since is null or submission.reviewed_at >= p_since)

    union all

    select parent_submission.child_id, greatest(coalesce(parent_submission.points_awarded, 0), 0)
    from public.parent_challenges as parent_submission
    where parent_submission.status = 'approved'
      and (p_since is null or parent_submission.reviewed_at >= p_since)

    union all

    select attempt.user_id, greatest(coalesce(attempt.points_awarded, 0), 0)
    from public.strike_attempts as attempt
    where attempt.status = 'submitted'
      and attempt.passed = true
      and (p_since is null or attempt.submitted_at >= p_since)

    union all

    select project.user_id, 500
    from public.capstone_projects as project
    where project.status = 'approved'
      and (p_since is null or project.reviewed_at >= p_since)
  ) as ledger
  where ledger.user_id is not null
    and (p_user_ids is null or ledger.user_id = any(p_user_ids))
  group by ledger.user_id;
$$;

revoke all on function public.get_verified_ambassador_xp(uuid[], timestamptz)
  from public, anon, authenticated;
grant execute on function public.get_verified_ambassador_xp(uuid[], timestamptz)
  to service_role;

comment on function public.get_verified_ambassador_xp(uuid[], timestamptz) is
  'Aggregates verified XP in Postgres so totals are not truncated by the Data API row limit.';
