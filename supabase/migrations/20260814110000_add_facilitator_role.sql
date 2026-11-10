alter table public.users drop constraint if exists users_role_check;

alter table public.users
  add constraint users_role_check
  check (role in ('ambassador', 'parent', 'admin', 'facilitator'));

comment on column public.users.role is
  'Application role. Facilitators have read-only learner oversight and curriculum preview access.';
