alter table public.module_feedback
  add column if not exists understanding_rating smallint
    check (understanding_rating between 1 and 5),
  add column if not exists usefulness_rating smallint
    check (usefulness_rating between 1 and 5),
  add column if not exists pace text
    check (pace in ('too_slow', 'just_right', 'too_fast')),
  add column if not exists suggestions text
    check (suggestions is null or char_length(suggestions) <= 1000);

comment on column public.module_feedback.understanding_rating is
  'Learner QCM rating for how clearly the module was understood.';
comment on column public.module_feedback.usefulness_rating is
  'Learner QCM rating for perceived practical usefulness.';
comment on column public.module_feedback.pace is
  'Learner QCM assessment of the module pace.';
comment on column public.module_feedback.suggestions is
  'Optional free-text ideas for improving the module.';
