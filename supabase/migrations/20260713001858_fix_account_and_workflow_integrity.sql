create or replace function public.adjust_ambassador_points(p_user_id uuid, p_delta int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ambassador_profiles
  set total_points = greatest(coalesce(total_points, 0) + p_delta, 0)
  where user_id = p_user_id;

  if not found then
    raise exception 'Ambassador profile not found';
  end if;
end;
$$;

revoke all on function public.adjust_ambassador_points(uuid, int) from public;
grant execute on function public.adjust_ambassador_points(uuid, int) to service_role;
grant execute on function public.increment_ambassador_points(uuid, int) to service_role;

drop policy if exists "family_links_parent_claim" on public.family_links;
create policy "family_links_parent_claim" on public.family_links
  for update to authenticated
  using (
    parent_id is null
    and exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'parent'
    )
  )
  with check (
    parent_id = (select auth.uid())
    and exists (
      select 1 from public.users
      where id = (select auth.uid()) and role = 'parent'
    )
  );

grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
