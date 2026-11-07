alter table public.users
  add column if not exists program_track text not null default 'ambassador';

alter table public.users
  drop constraint if exists users_program_track_check;

alter table public.users
  add constraint users_program_track_check
  check (program_track in ('ambassador', 'scholarship'));

create index if not exists users_program_track_idx on public.users(program_track);
