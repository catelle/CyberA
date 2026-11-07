create table if not exists public.scholarship_module_access (
  user_id uuid not null references public.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  granted_by uuid references public.users(id),
  granted_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.scholarship_module_access enable row level security;
create policy "scholarship_access_own_or_admin_read" on public.scholarship_module_access
  for select to authenticated using (
    user_id = (select auth.uid()) or exists (
      select 1 from public.users where id = (select auth.uid()) and role = 'admin'
    )
  );
grant select on public.scholarship_module_access to authenticated;
grant all on public.scholarship_module_access to service_role;

alter table public.training_certificates
  add column if not exists certificate_type text not null default 'ambassador',
  add column if not exists module_ids uuid[] not null default '{}',
  add column if not exists module_titles text[] not null default '{}',
  add column if not exists program_completion_at timestamptz;

alter table public.training_certificates drop constraint if exists training_certificates_certificate_type_check;
alter table public.training_certificates add constraint training_certificates_certificate_type_check
  check (certificate_type in ('ambassador', 'scholarship'));

-- Preserve the original two-module scholarship access until an admin changes it.
insert into public.scholarship_module_access (user_id, module_id)
select learner.id, module.id
from public.users learner
cross join public.modules module
where learner.program_track = 'scholarship'
  and module.is_published = true
  and module.order_index between 1 and 2
on conflict (user_id, module_id) do nothing;

create or replace function public.issue_training_certificate_if_eligible(p_user_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  learner_track text;
  required_count int := 0;
  completed_count int := 0;
  has_capstone boolean := false;
  admin_allowed boolean := false;
  selected_ids uuid[] := '{}';
  selected_titles text[] := '{}';
  completion_at timestamptz;
  profile_completed_count int := 0;
  inserted_count int := 0;
  cert_type text;
begin
  select coalesce(program_track, 'ambassador') into learner_track
  from public.users where id = p_user_id;
  if not found then return false; end if;

  if learner_track = 'scholarship' then
    cert_type := 'scholarship';
    select count(*)::int,
           coalesce(array_agg(module.id order by module.order_index), '{}'),
           coalesce(array_agg(module.title order by module.order_index), '{}')
      into required_count, selected_ids, selected_titles
    from public.scholarship_module_access access
    join public.modules module on module.id = access.module_id
    where access.user_id = p_user_id and module.is_published = true;

    select count(*)::int, max(progress.completed_at)
      into completed_count, completion_at
    from public.module_progress progress
    where progress.user_id = p_user_id
      and progress.status = 'completed'
      and progress.module_id = any(selected_ids);

    if required_count = 0 or completed_count < required_count then return false; end if;
  else
    cert_type := 'ambassador';
    select count(*)::int,
           coalesce(array_agg(module.id order by module.order_index), '{}'),
           coalesce(array_agg(module.title order by module.order_index), '{}'),
           max(progress.completed_at)
      into completed_count, selected_ids, selected_titles, completion_at
    from public.module_progress progress
    join public.modules module on module.id = progress.module_id
    where progress.user_id = p_user_id and progress.status = 'completed'
      and module.is_published = true and module.order_index between 1 and 3;

    select coalesce((select modules_completed from public.ambassador_profiles where user_id = p_user_id), 0)
      into profile_completed_count;

    select exists (
      select 1 from public.capstone_projects project
      where project.user_id = p_user_id and project.submitted_at is not null
    ) into has_capstone;
    select coalesce((select allow_certificate from public.certificate_decisions where user_id = p_user_id), false)
      into admin_allowed;
    if greatest(completed_count, profile_completed_count) < 3 or (not has_capstone and not admin_allowed) then return false; end if;
  end if;

  insert into public.training_certificates (
    user_id, certificate_number, certificate_type, module_ids, module_titles, program_completion_at
  ) values (
    p_user_id,
    case when cert_type = 'scholarship' then 'SC-' else 'CA-' end ||
      extract(year from now())::int::text || '-' || upper(replace(p_user_id::text, '-', '')),
    cert_type, selected_ids, selected_titles, coalesce(completion_at, now())
  ) on conflict (user_id) do nothing;
  get diagnostics inserted_count = row_count;

  if inserted_count > 0 then
    update public.ambassador_profiles set certified_at = coalesce(certified_at, now()) where user_id = p_user_id;
    insert into public.notifications (user_id, type, title, body, data)
    values (
      p_user_id, 'training_certificate', 'Ton certificat est disponible',
      case when cert_type = 'scholarship'
        then 'Bravo ! Ton certificat de la Bourse des 100 est maintenant disponible.'
        else 'Bravo ! Ton certificat CyberAmbassador est maintenant disponible.' end,
      jsonb_build_object('certificate_type', cert_type, 'action_href', '/api/student/certificate/download')
    );
  end if;
  return true;
end;
$$;

revoke all on function public.issue_training_certificate_if_eligible(uuid) from public;
grant execute on function public.issue_training_certificate_if_eligible(uuid) to service_role;

-- Populate metadata on certificates created before this migration.
update public.training_certificates certificate set
  module_ids = source.ids,
  module_titles = source.titles,
  program_completion_at = coalesce(certificate.program_completion_at, source.completed_at)
from (
  select progress.user_id,
    array_agg(module.id order by module.order_index) as ids,
    array_agg(module.title order by module.order_index) as titles,
    max(progress.completed_at) as completed_at
  from public.module_progress progress
  join public.modules module on module.id = progress.module_id
  where progress.status = 'completed' and module.order_index between 1 and 3
  group by progress.user_id
) source
where certificate.user_id = source.user_id and certificate.certificate_type = 'ambassador';

-- Award certificates to learners who had already completed their requirements
-- before this migration was installed. Learners without a capstone remain for
-- an admin decision on the Certificates screen.
do $$
declare learner record;
begin
  for learner in select id from public.users where role = 'ambassador' loop
    perform public.issue_training_certificate_if_eligible(learner.id);
  end loop;
end;
$$;
