create or replace function public.record_lesson_progress(
  p_user_id uuid,
  p_module_id uuid,
  p_lessons_done int
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text || ':' || p_module_id::text, 0));

  insert into public.module_progress (
    user_id,
    module_id,
    status,
    lessons_done,
    started_at
  )
  values (
    p_user_id,
    p_module_id,
    'in_progress',
    greatest(p_lessons_done, 0),
    now()
  )
  on conflict (user_id, module_id) do update set
    status = case
      when module_progress.status = 'completed' then 'completed'
      else 'in_progress'
    end,
    lessons_done = greatest(
      coalesce(module_progress.lessons_done, 0),
      excluded.lessons_done
    ),
    started_at = coalesce(module_progress.started_at, excluded.started_at);
end;
$$;

revoke all on function public.record_lesson_progress(uuid, uuid, int) from public;
grant execute on function public.record_lesson_progress(uuid, uuid, int) to service_role;
