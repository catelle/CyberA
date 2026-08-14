import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { WelcomeBehindScreen } from "@/components/lesson/WelcomeBehindScreen";
import { InsideTikTokLesson } from "@/components/lesson/InsideTikTokLesson";
import { ModuleOneInvestigationLesson } from "@/components/lesson/ModuleOneInvestigationLesson";
import { LessonAudio } from "@/components/lesson/LessonAudio";
import { LearningSpacePreviewNotice } from "@/components/lesson/LearningSpacePreviewNotice";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getPublishedProgramModuleById, isModuleUnlockedForStudent } from "@/lib/db/cybera";
import { moduleOneInvestigations } from "@/lib/curriculum/module-one-investigations";
import { moduleTwoInvestigations } from "@/lib/curriculum/module-two-investigations";

type LessonPageProps = {
  params: {
    id: string;
    lessonId: string;
  };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await requireRole(["student", "admin", "facilitator"]);
  const isPreview = user.role === "admin" || user.role === "facilitator";
  const selectedModule = await getPublishedProgramModuleById(params.id);
  const lesson = selectedModule?.lessons.find(
    (item) => item.id === params.lessonId
  );

  if (!selectedModule || !lesson) {
    notFound();
  }

  if (user.role === "student" && !(await isModuleUnlockedForStudent(user.supabaseUserId, selectedModule.week))) {
    redirect("/student/modules?locked=1");
  }

  // Published modules use database UUIDs, while lesson slugs remain stable.
  // Detect this bespoke experience by its lesson slug rather than the module id.
  const previewNotice = isPreview ? (
    <div className="mb-5">
      <LearningSpacePreviewNotice detail="Lecon affichee telle que l'eleve la recoit. Ta lecture n'est pas comptabilisee." />
    </div>
  ) : null;

  if (lesson.id === "ou-est-internet") {
    return (
      <DashboardShell user={user} title={lesson.title}>
        {previewNotice}
        <WelcomeBehindScreen canComplete={user.role === "student"} lessonId={lesson.id} moduleId={selectedModule.id} />
      </DashboardShell>
    );
  }

  if (lesson.id === "apres-envoyer") {
    return (
      <DashboardShell user={user} title="Inside TikTok">
        {previewNotice}
        <InsideTikTokLesson canComplete={user.role === "student"} lessonId={lesson.id} moduleId={selectedModule.id} />
      </DashboardShell>
    );
  }

  const investigation = moduleOneInvestigations[lesson.id];
  if (investigation) {
    return (
      <DashboardShell user={user} title={investigation.title}>
        {previewNotice}
        <ModuleOneInvestigationLesson canComplete={user.role === "student"} lesson={investigation} moduleId={selectedModule.id} />
      </DashboardShell>
    );
  }

  const survivalInvestigation = moduleTwoInvestigations[lesson.id];
  if (selectedModule.week === 2 && survivalInvestigation) {
    return (
      <DashboardShell user={user} title={survivalInvestigation.title}>
        {previewNotice}
        <ModuleOneInvestigationLesson canComplete={user.role === "student"} lesson={survivalInvestigation} moduleId={selectedModule.id} startImmediately />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell user={user} title={lesson.title}>
      <LessonAudio />
      {previewNotice}
      <article className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_21rem] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">
              {selectedModule.title} / Lecon {lesson.order}
            </p>
            <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
              {lesson.title}
            </h2>
          </div>
          <MascotCoach mascotMood="focus">
            Lis, repere le signal important, puis garde une action simple en tete.
          </MascotCoach>
        </div>

        <div className="grid gap-4">
          {lesson.content.map((block, index) => {
            if (block.type === "image" && block.src) {
              return (
                <figure className="overflow-hidden rounded-xl border-2 border-secondary bg-slate-950 shadow-[0_4px_0_0_rgba(88,96,98,1)]" key={index}>
                  <Image alt={block.alt ?? String(block.content)} className="h-auto w-full object-cover" height={941} priority={index < 3} sizes="(max-width: 1024px) 100vw, 1050px" src={block.src} width={1672} />
                  {block.caption ? <figcaption className="bg-brand-ink px-4 py-3 text-sm font-bold text-white/80">{block.caption}</figcaption> : null}
                </figure>
              );
            }

            if ((block.type === "checklist" || block.type === "mission") && Array.isArray(block.content)) {
              return (
                <section className={block.type === "mission" ? "rounded-lg border-2 border-secondary bg-[#fff4c2] p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)]" : "rounded-lg border-2 border-secondary bg-[#d9fbe8] p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)]"} key={index}>
                  {block.type === "mission" ? <h3 className="mb-3 font-display text-lg font-black text-amber-950">Mission d&apos;investigation</h3> : null}
                <ul className="grid gap-3">
                  {block.content.map((item) => (
                    <li
                      className="grid grid-cols-[auto_1fr] gap-2 text-sm font-extrabold leading-6 text-slate-700"
                      key={item}
                    >
                      <CheckCircle2
                        aria-hidden
                        className="mt-0.5 h-5 w-5 text-[#069b70]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                </section>
              );
            }

            return (
              <div
                className={
                  block.type === "warning"
                    ? "grid grid-cols-[auto_1fr] gap-3 rounded-lg border-2 border-secondary bg-red-50 p-4 font-bold leading-7 text-red-800 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                    : block.type === "tip"
                      ? "grid grid-cols-[auto_1fr] gap-3 rounded-lg border-2 border-secondary bg-tertiary-fixed p-4 font-bold leading-7 text-tertiary shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                      : block.type === "hook"
                        ? "rounded-xl border-2 border-secondary bg-brand-blue p-5 font-display text-xl font-black leading-8 text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:text-2xl"
                        : block.type === "story"
                          ? "rounded-lg border-l-4 border-primary bg-rose-50 p-5 font-semibold leading-8 text-slate-700"
                          : block.type === "discovery"
                            ? "rounded-lg bg-surface-container-low p-5 font-semibold leading-8 text-slate-700"
                            : block.type === "reflection"
                              ? "rounded-lg border-2 border-tertiary bg-cyan-50 p-5 font-black leading-8 text-brand-blue"
                              : block.type === "ability"
                                ? "rounded-full border-2 border-secondary bg-primary-fixed px-5 py-4 text-center font-black text-primary shadow-[0_3px_0_0_rgba(88,96,98,1)]"
                      : "rounded-lg bg-surface-container-low p-4 font-semibold leading-7 text-slate-700"
                }
                key={index}
              >
                {block.type === "warning" ? (
                  <ShieldAlert aria-hidden className="mt-1 h-5 w-5 shrink-0" />
                ) : null}
                {block.type === "tip" ? (
                  <Sparkles aria-hidden className="mt-1 h-5 w-5 shrink-0" />
                ) : null}
                <p>{block.content}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-white px-4 font-black text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-sky sm:w-fit"
            href={`/student/modules/${selectedModule.id}`}
          >
            Retour au module
          </Link>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
            href={`/student/modules/${selectedModule.id}/lesson/${lesson.id}/quiz`}
          >
            {isPreview ? "Voir le quiz de la lecon" : "J'ai termine la lecon"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </DashboardShell>
  );
}
