-- The profile total is a cache. Rebuild it from the immutable, reviewed
-- activity records so historical duplicate increments cannot remain visible.
with verified_points as (
  select user_id, sum(points)::int as total
  from (
    select user_id, greatest(coalesce(points_earned, 0), 0) as points
    from public.module_progress
    where status = 'completed'

    union all

    select user_id, greatest(coalesce(points_awarded, 0), 0)
    from public.challenge_submissions
    where status = 'approved'

    union all

    select child_id, greatest(coalesce(points_awarded, 0), 0)
    from public.parent_challenges
    where status = 'approved'

    union all

    select user_id, greatest(coalesce(points_awarded, 0), 0)
    from public.strike_attempts
    where status = 'submitted' and passed = true

    union all

    select user_id, 500
    from public.capstone_projects
    where status = 'approved'
  ) ledger
  where user_id is not null
  group by user_id
)
update public.ambassador_profiles profile
set total_points = coalesce(verified_points.total, 0)
from public.users ambassador
left join verified_points on verified_points.user_id = ambassador.id
where profile.user_id = ambassador.id
  and ambassador.role = 'ambassador'
  and profile.total_points is distinct from coalesce(verified_points.total, 0);
