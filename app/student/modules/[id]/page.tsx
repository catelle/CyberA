import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getModuleById } from "@/lib/program";

type ModulePageProps = {
  params: {
    id: string;
  };
};

export default async function StudentModuleDetailPage({ params }: ModulePageProps) {
  const user = await requireRole(["student"]);
  const programModule = getModuleById(params.id);

  if (!programModule) {
    notFound();
  }

  return (
    <DashboardShell user={user} title={programModule.title}>
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">
            Module {programModule.week}
          </p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">{programModule.subtitle}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">{programModule.summary}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
              href={`/student/modules/${programModule.id}/lesson/${programModule.lessons[0].id}`}
            >
              Continuer les lecons
            </Link>
            <Link
              className="inline-flex min-h-12 items-center rounded-lg border border-slate-200 px-4 font-black text-brand-blue transition hover:bg-brand-sky"
              href={`/student/modules/${programModule.id}/quiz`}
            >
              Quiz
            </Link>
          </div>
        </section>

        <section className="grid gap-3">
          {programModule.lessons.map((lesson) => (
            <Link
              className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
              href={`/student/modules/${programModule.id}/lesson/${lesson.id}`}
              key={lesson.id}
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black text-brand-gold">
                    Lecon {lesson.order}
                  </p>
                  <h3 className="mt-1 font-black text-brand-blue">{lesson.title}</h3>
                </div>
                <p className="text-sm font-bold text-slate-500">
                  {lesson.estimatedMins} min
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
