import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getLessonById, getModuleById } from "@/lib/program";

type LessonPageProps = {
  params: {
    id: string;
    lessonId: string;
  };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await requireRole(["student"]);
  const programModule = getModuleById(params.id);
  const lesson = getLessonById(params.id, params.lessonId);

  if (!programModule || !lesson) {
    notFound();
  }

  return (
    <DashboardShell user={user} title={lesson.title}>
      <article className="rounded-lg bg-white p-5 shadow-sm">
        <p className="text-sm font-black uppercase text-brand-gold">
          {programModule.title} / Lecon {lesson.order}
        </p>
        <h2 className="mt-2 text-2xl font-black text-brand-ink">{lesson.title}</h2>

        <div className="mt-6 grid gap-4">
          {lesson.content.map((block, index) => {
            if (block.type === "checklist" && Array.isArray(block.content)) {
              return (
                <ul className="grid gap-2 rounded-lg border border-slate-200 p-4" key={index}>
                  {block.content.map((item) => (
                    <li className="text-sm font-bold text-slate-700" key={item}>
                      - {item}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p
                className={
                  block.type === "warning"
                    ? "rounded-lg bg-red-50 p-4 font-bold leading-7 text-red-800"
                    : block.type === "tip"
                      ? "rounded-lg bg-brand-sky p-4 font-bold leading-7 text-brand-blue"
                      : "leading-7 text-slate-700"
                }
                key={index}
              >
                {block.content}
              </p>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="inline-flex min-h-12 items-center rounded-lg border border-slate-200 px-4 font-black text-brand-blue transition hover:bg-brand-sky"
            href={`/student/modules/${programModule.id}`}
          >
            Retour au module
          </Link>
          <Link
            className="inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
            href={`/student/modules/${programModule.id}/quiz`}
          >
            Passer au quiz
          </Link>
        </div>
      </article>
    </DashboardShell>
  );
}
