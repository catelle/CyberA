import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Play, Star } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { LearningSpacePreviewNotice } from "@/components/lesson/LearningSpacePreviewNotice";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { isModuleUnlockedForStudent, listProgramModulesForStudent } from "@/lib/db/cybera";

const statusLabels = {
  ready: "Disponible",
  next: "Bientot",
  planned: "Verrouille"
};

const statusStyles = {
  ready: "bg-[#d9fbe8] text-[#075f3f]",
  next: "bg-tertiary-fixed text-tertiary",
  planned: "bg-slate-100 text-slate-500"
};

type StudentModulesPageProps = {
  searchParams: { locked?: string };
};

export default async function StudentModulesPage({ searchParams }: StudentModulesPageProps) {
  const user = await requireRole(["student", "admin", "facilitator"]);
  const en = user.language === "en";
  const isPreview = user.role === "admin" || user.role === "facilitator";
  const modules = await listProgramModulesForStudent(user.supabaseUserId);
  // Admins review the parcours as a whole, so sequencing never hides a module.
  const unlockFlags = await Promise.all(
    modules.map((module) =>
      isPreview ? Promise.resolve(true) : isModuleUnlockedForStudent(user.supabaseUserId, module.week)
    )
  );

  return (
    <DashboardShell user={user} title="Modules">
      <div className="grid gap-5 sm:gap-6">
        {isPreview ? <LearningSpacePreviewNotice /> : null}
        {searchParams.locked ? (
          <section className="rounded-lg border-2 border-secondary bg-[#fff4c2] p-4 font-bold text-brand-ink shadow-[0_4px_0_0_rgba(88,96,98,1)]">
            {en ? "Complete the previous module and wait for admin approval to unlock the next one." : "Termine le module précédent puis attends l'approbation d'un administrateur pour débloquer le suivant."}
          </section>
        ) : null}

        <section className="grid gap-4 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5 lg:grid-cols-[1fr_22rem] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">Parcours</p>
            <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
              {en ? "4 modules to become a CyberAmbassador" : "4 modules pour devenir CyberAmbassadeur"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
              {en ? "Lessons are short, practical, and available for offline review after their first opening." : "Les leçons restent courtes, pratiques et pensées pour être relues hors connexion après leur première ouverture."}
            </p>
          </div>
          <MascotCoach mascotMood="focus">
            {en ? "Choose a mission, complete its lessons, then aim for 70% on the quiz." : "Choisis une mission, termine les mini-leçons, puis vise 70 % au quiz."}
          </MascotCoach>
        </section>

        <section className="grid gap-4">
          {modules.map((module, index) => {
            const isUnlocked = unlockFlags[index];
            const isReady = module.status === "ready" && isUnlocked;
            const Icon = !isUnlocked ? Lock : isReady ? Play : module.status === "next" ? Star : Lock;

            return (
              <article
                className="mission-card grid gap-4 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5 lg:grid-cols-[6rem_1fr_auto] lg:items-center"
                key={module.id}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex justify-center lg:justify-start">
                  <span
                    className={
                      isReady
                        ? "mission-node flex h-20 w-20 items-center justify-center rounded-full border-2 border-secondary bg-primary text-white shadow-[0_6px_0_0_rgba(88,96,98,1)]"
                        : "flex h-20 w-20 items-center justify-center rounded-full border-2 border-secondary bg-surface-container text-secondary shadow-[0_6px_0_0_rgba(88,96,98,1)]"
                    }
                  >
                    <Icon aria-hidden className="h-8 w-8" />
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-black text-brand-gold">
                      Module {module.week}
                    </p>
                    <span
                      className={
                        "rounded-full px-3 py-1 text-xs font-black uppercase " +
                        (isUnlocked ? statusStyles[module.status] : statusStyles.planned)
                      }
                    >
                      {isUnlocked ? statusLabels[module.status] : statusLabels.planned}
                    </span>
                    {isReady ? (
                      <CheckCircle2 aria-hidden className="h-5 w-5 text-[#069b70]" />
                    ) : null}
                  </div>
                  <h3 className="mt-2 break-words font-display text-xl font-black leading-tight text-brand-blue">
                    {module.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {module.summary}
                  </p>
                  <div className="mt-4 h-3 rounded-full bg-slate-100">
                    <div
                      className="progress-fill-animate h-3 rounded-full bg-[#ffcc32]"
                      style={{ width: `${module.progressPercent}%` }}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {module.outcomes.map((outcome) => (
                      <span
                        className="rounded-full border-2 border-secondary bg-brand-sky px-3 py-1 text-xs font-black text-brand-blue shadow-[0_2px_0_0_rgba(88,96,98,1)]"
                        key={outcome}
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 lg:min-w-[8rem]">
                  <p className="text-center text-sm font-black text-secondary lg:text-right">
                    {module.progressPercent}%
                  </p>
                  {isUnlocked ? (
                    <Link
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink"
                      href={`/student/modules/${module.id}`}
                    >
                      Ouvrir
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-slate-100 px-4 font-black text-slate-400">
                      <Lock aria-hidden className="h-4 w-4" />
                      Verrouille
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </DashboardShell>
  );
}
