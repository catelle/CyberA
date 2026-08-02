import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Lock, Trophy } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import {
  getPublishedProgramModuleById,
  listCompletedLessonIdsForStudent
} from "@/lib/db/cybera";

type ModulePageProps = {
  params: {
    id: string;
  };
};

export default async function StudentModuleDetailPage({ params }: ModulePageProps) {
  const user = await requireRole(["student", "admin"]);
  const programModule = await getPublishedProgramModuleById(params.id);
  const selectedModule = programModule
    ? {
        id: programModule.id,
        order: programModule.week,
        title: programModule.title,
        subtitle: programModule.subtitle,
        summary: programModule.summary,
        lessons: programModule.lessons,
        hasModuleQuiz: programModule.quiz.length > 0
      }
    : null;

  if (!selectedModule) {
    notFound();
  }

  const completedLessonIds = new Set(
    user.role === "student"
      ? await listCompletedLessonIdsForStudent(
          user.supabaseUserId,
          selectedModule.id,
          selectedModule.lessons.map((lesson) => lesson.id),
          selectedModule.order
        )
      : []
  );
  const completedEveryLesson =
    selectedModule.lessons.length > 0 &&
    selectedModule.lessons.every((lesson) => completedLessonIds.has(lesson.id));
  const firstLesson = selectedModule.lessons.find(
    (lesson) => !completedLessonIds.has(lesson.id)
  );

  return (
    <DashboardShell user={user} title={selectedModule.title}>
      <div className="grid gap-5 sm:gap-6">
        <section className="grid gap-4 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5 lg:grid-cols-[1fr_21rem] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">
              Module {selectedModule.order}
            </p>
            <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
              {selectedModule.subtitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
              {selectedModule.summary}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {firstLesson ? (
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
                  href={`/student/modules/${selectedModule.id}/lesson/${firstLesson.id}`}
                >
                  Continuer
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
              {selectedModule.hasModuleQuiz && completedEveryLesson ? (
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-[#fff4c2] px-4 font-black text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-primary-fixed sm:w-fit"
                  href={`/student/modules/${selectedModule.id}/quiz`}
                >
                  Terminer avec le quiz
                  <Trophy aria-hidden className="h-4 w-4" />
                </Link>
              ) : selectedModule.hasModuleQuiz ? (
                <span className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-slate-100 px-4 font-black text-slate-500 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:w-fit">
                  <Lock aria-hidden className="h-4 w-4" />
                  Quiz apres les lecons
                </span>
              ) : null}
            </div>
          </div>
          <MascotCoach mascotMood="focus">
            Une petite lecon a la fois. Chaque etape valide un reflexe concret.
          </MascotCoach>
        </section>

        <section className="grid gap-4">
          {selectedModule.lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.has(lesson.id);

            return (
              <Link
                className={
                  "mission-card grid gap-3 rounded-lg border-2 border-secondary p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(88,96,98,1)] sm:grid-cols-[4.5rem_1fr_auto] sm:items-center " +
                  (isCompleted ? "bg-[#e8fff2]" : "bg-white")
                }
                href={`/student/modules/${selectedModule.id}/lesson/${lesson.id}`}
                key={lesson.id}
                style={{ animationDelay: `${index * 55}ms` }}
              >
              <span
                className={
                  "flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary shadow-[0_4px_0_0_rgba(88,96,98,1)] " +
                  (isCompleted
                    ? "bg-[#16a66a] text-white"
                    : "bg-tertiary-fixed text-tertiary")
                }
              >
                {isCompleted ? (
                  <CheckCircle2 aria-hidden className="h-6 w-6" />
                ) : (
                  <BookOpen aria-hidden className="h-6 w-6" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-brand-gold">
                  Lecon {lesson.order}
                </p>
                <h3 className="mt-1 break-words font-display font-black text-brand-blue">
                  {lesson.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-black sm:justify-end">
                <span
                  className={
                    "rounded-full px-3 py-1 text-xs uppercase " +
                    (isCompleted
                      ? "bg-[#c8f5dc] text-[#075f3f]"
                      : "bg-slate-100 text-slate-500")
                  }
                >
                  {isCompleted ? "Terminee" : "A faire"}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock aria-hidden className="h-4 w-4" />
                  {lesson.estimatedMins} min
                </span>
              </div>
              </Link>
            );
          })}
        </section>
      </div>
    </DashboardShell>
  );
}
