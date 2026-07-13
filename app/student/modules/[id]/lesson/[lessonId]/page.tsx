import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getModuleWithLessonsById } from "@/lib/db/cybera";
import { getLessonById, getModuleById, type LessonContentBlock } from "@/lib/program";

type LessonPageProps = {
  params: {
    id: string;
    lessonId: string;
  };
};

function normalizeLessonContent(content: unknown): LessonContentBlock[] {
  if (!Array.isArray(content)) {
    return [];
  }

  const blocks: LessonContentBlock[] = [];

  content.forEach((block) => {
    if (!block || typeof block !== "object") {
      return;
    }

    const type = "type" in block ? block.type : null;
    const value = "content" in block ? block.content : null;

    if (
      type !== "text" &&
      type !== "tip" &&
      type !== "warning" &&
      type !== "checklist"
    ) {
      return;
    }

    if (type === "checklist" && Array.isArray(value)) {
      const items = value.filter((item): item is string => typeof item === "string");
      blocks.push({ type, content: items });
      return;
    }

    if (typeof value === "string") {
      blocks.push({ type, content: value });
    }
  });

  return blocks;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await requireRole(["student", "admin"]);
  const staticModule = getModuleById(params.id);
  const staticLesson = getLessonById(params.id, params.lessonId);
  const databaseModule = staticModule ? null : await getModuleWithLessonsById(params.id);
  const databaseLesson = databaseModule?.lessons.find(
    (lesson) => lesson.id === params.lessonId
  );
  const selectedModule = staticModule
    ? {
        id: staticModule.id,
        title: staticModule.title
      }
    : databaseModule
      ? {
          id: databaseModule.id,
          title: databaseModule.title
        }
      : null;
  const lesson = staticLesson
    ? {
        id: staticLesson.id,
        order: staticLesson.order,
        title: staticLesson.title,
        content: staticLesson.content
      }
    : databaseLesson
      ? {
          id: databaseLesson.id,
          order: databaseLesson.order_index,
          title: databaseLesson.title,
          content: normalizeLessonContent(databaseLesson.content)
        }
      : null;

  if (!selectedModule || !lesson) {
    notFound();
  }

  return (
    <DashboardShell user={user} title={lesson.title}>
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
            if (block.type === "checklist" && Array.isArray(block.content)) {
              return (
                <ul
                  className="grid gap-3 rounded-lg border-2 border-secondary bg-[#d9fbe8] p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                  key={index}
                >
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
              );
            }

            return (
              <div
                className={
                  block.type === "warning"
                    ? "grid grid-cols-[auto_1fr] gap-3 rounded-lg border-2 border-secondary bg-red-50 p-4 font-bold leading-7 text-red-800 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                    : block.type === "tip"
                      ? "grid grid-cols-[auto_1fr] gap-3 rounded-lg border-2 border-secondary bg-tertiary-fixed p-4 font-bold leading-7 text-tertiary shadow-[0_4px_0_0_rgba(88,96,98,1)]"
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
          {staticModule ? (
            <Link
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
              href={`/student/modules/${selectedModule.id}/quiz`}
            >
              Passer au quiz
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </article>
    </DashboardShell>
  );
}
