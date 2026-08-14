import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Lock, Trophy } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { LearningSpacePreviewNotice } from "@/components/lesson/LearningSpacePreviewNotice";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import {
  getPublishedProgramModuleById,
  isModuleUnlockedForStudent,
  listCompletedLessonIdsForStudent
} from "@/lib/db/cybera";

type ModulePageProps = {
  params: {
    id: string;
  };
};

export default async function StudentModuleDetailPage({ params }: ModulePageProps) {
  const user = await requireRole(["student", "admin"]);
  const en = user.language === "en";
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

  if (user.role === "student" && !(await isModuleUnlockedForStudent(user.supabaseUserId, selectedModule.order))) {
    redirect("/student/modules?locked=1");
  }

  const isPreview = user.role === "admin";
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
  const completedCount = completedLessonIds.size;
  const completionPercent = selectedModule.lessons.length
    ? Math.round((completedCount / selectedModule.lessons.length) * 100)
    : 0;

  return (
    <DashboardShell user={user} title={selectedModule.title}>
      <div className="grid gap-5 sm:gap-6">
        {isPreview ? (
          <LearningSpacePreviewNotice detail="Ouvre chaque lecon et le quiz du module comme un eleve. Rien n'est enregistre sur ton compte admin." />
        ) : null}
        <section className="rounded-2xl border-2 border-primary bg-white px-5 py-10 text-center text-brand-ink shadow-[0_8px_0_0_#586062] sm:px-10 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[.2em] text-primary">
              Module {selectedModule.order}
            </p>
            <h1 className="mt-3 break-words font-display text-4xl font-black leading-tight sm:text-6xl">
              {selectedModule.title}
            </h1>
            <h2 className="mt-4 font-display text-xl font-black text-brand-blue sm:text-2xl">
              {selectedModule.subtitle}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              {selectedModule.summary}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              {firstLesson ? (
                <Link
                  className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-primary px-6 font-black text-white shadow-[0_4px_0_0_#ffcc32] transition hover:bg-[#8f1237] sm:w-fit"
                  href={`/student/modules/${selectedModule.id}/lesson/${firstLesson.id}`}
                >
                  {en ? "Continue" : "Continuer"}
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
              {selectedModule.hasModuleQuiz && (completedEveryLesson || isPreview) ? (
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-[#fff4c2] px-4 font-black text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-primary-fixed sm:w-fit"
                  href={`/student/modules/${selectedModule.id}/quiz`}
                >
                  {en ? "Finish with the quiz" : "Terminer avec le quiz"}
                  <Trophy aria-hidden className="h-4 w-4" />
                </Link>
              ) : selectedModule.hasModuleQuiz ? (
                <span className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-slate-100 px-4 font-black text-slate-500 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:w-fit">
                  <Lock aria-hidden className="h-4 w-4" />
                  {en ? "Quiz after the lessons" : "Quiz après les leçons"}
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <section className="grid gap-4">
          {selectedModule.lessons.map((lesson, index) => {
            const isCompleted = completedLessonIds.has(lesson.id);

            return (
              <Link
                className={
                  "mission-card grid gap-3 rounded-xl border border-slate-200 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:grid-cols-[4.5rem_1fr_auto] sm:items-center " +
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
                  {en ? "Lesson" : "Leçon"} {lesson.order}
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
                  {isCompleted ? (en ? "Completed" : "Terminée") : (en ? "To do" : "À faire")}
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
        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <div className="grid aspect-[4/3] place-items-center rounded-lg border-2 border-primary bg-white text-primary"><Trophy className="h-20 w-20" /></div>
          <p className="mt-5 font-display text-xl font-black text-brand-ink">{completedCount} sur {selectedModule.lessons.length} leçons terminées</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full border border-rose-200 bg-rose-50"><div className="h-full rounded-full bg-primary" style={{ width: `${completionPercent}%` }} /></div>
          <p className="mt-2 text-right text-sm font-black text-slate-500">{completionPercent}%</p>
          <div className="mt-5 border-t border-slate-200 pt-5"><MascotCoach mascotMood="focus">Une leçon à la fois. Chaque étape validée te rapproche du module suivant.</MascotCoach></div>
        </aside>
        </div>
      </div>
    </DashboardShell>
  );
}
