import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock, Trophy } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getModuleWithLessonsById } from "@/lib/db/cybera";
import { getModuleById } from "@/lib/program";

type ModulePageProps = {
  params: {
    id: string;
  };
};

export default async function StudentModuleDetailPage({ params }: ModulePageProps) {
  const user = await requireRole(["student", "admin"]);
  const staticModule = getModuleById(params.id);
  const databaseModule = staticModule ? null : await getModuleWithLessonsById(params.id);
  const selectedModule = staticModule
    ? {
        id: staticModule.id,
        order: staticModule.week,
        title: staticModule.title,
        subtitle: staticModule.subtitle,
        summary: staticModule.summary,
        lessons: staticModule.lessons.map((lesson) => ({
          id: lesson.id,
          order: lesson.order,
          title: lesson.title,
          estimatedMins: lesson.estimatedMins
        }))
      }
    : databaseModule
      ? {
          id: databaseModule.id,
          order: databaseModule.order_index,
          title: databaseModule.title,
          subtitle: databaseModule.subtitle ?? "Module CyberAmbassadeur",
          summary: databaseModule.description ?? "",
          lessons: databaseModule.lessons.map((lesson) => ({
            id: lesson.id,
            order: lesson.order_index,
            title: lesson.title,
            estimatedMins: lesson.estimated_mins ?? 5
          }))
        }
      : null;

  if (!selectedModule) {
    notFound();
  }

  const firstLesson = selectedModule.lessons[0];

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
              {staticModule ? (
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-[#fff4c2] px-4 font-black text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-primary-fixed sm:w-fit"
                  href={`/student/modules/${selectedModule.id}/quiz`}
                >
                  Quiz
                  <Trophy aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>
          <MascotCoach mascotMood="focus">
            Une petite lecon a la fois. Chaque etape valide un reflexe concret.
          </MascotCoach>
        </section>

        <section className="grid gap-4">
          {selectedModule.lessons.map((lesson, index) => (
            <Link
              className="mission-card grid gap-3 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(88,96,98,1)] sm:grid-cols-[4.5rem_1fr_auto] sm:items-center"
              href={`/student/modules/${selectedModule.id}/lesson/${lesson.id}`}
              key={lesson.id}
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary bg-tertiary-fixed text-tertiary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
                <BookOpen aria-hidden className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black text-brand-gold">
                  Lecon {lesson.order}
                </p>
                <h3 className="mt-1 break-words font-display font-black text-brand-blue">
                  {lesson.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-slate-500 sm:justify-end">
                <Clock aria-hidden className="h-4 w-4" />
                {lesson.estimatedMins} min
              </div>
            </Link>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
