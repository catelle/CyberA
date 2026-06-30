create or replace function public.increment_ambassador_points(p_user_id uuid, p_points int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ambassador_profiles
  set total_points = coalesce(total_points, 0) + greatest(p_points, 0)
  where user_id = p_user_id;
end;
$$;

revoke all on function public.increment_ambassador_points(uuid, int) from public;

create or replace function public.check_ambassador_level()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  next_level text;
begin
  next_level := case
    when new.total_points >= 1000 and new.capstone_submitted = true then 'master'
    when new.total_points >= 500 and new.modules_completed >= 4 then 'senior'
    else 'junior'
  end;

  if next_level <> new.level then
    new.level := next_level;
    insert into public.notifications(user_id, type, title, body, data)
    values (
      new.user_id,
      'level_up',
      'Nouveau niveau CyberAmbassador',
      'Tu passes au niveau ' || next_level || '.',
      jsonb_build_object('level', next_level)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists ambassador_level_trigger on public.ambassador_profiles;
create trigger ambassador_level_trigger
before insert or update of total_points, modules_completed, capstone_submitted
on public.ambassador_profiles
for each row
execute function public.check_ambassador_level();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'challenge-photos',
  'challenge-photos',
  false,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

alter default privileges in schema public
grant select, insert, update, delete on tables to authenticated;

alter default privileges in schema public
grant usage, select on sequences to authenticated;

create unique index if not exists cohorts_name_unique_idx on public.cohorts(name);
