import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Play, Star } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listProgramModulesForStudent } from "@/lib/db/cybera";

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

export default async function StudentModulesPage() {
  const user = await requireRole(["student"]);
  const modules = await listProgramModulesForStudent(user.supabaseUserId);

  return (
    <DashboardShell user={user} title="Modules">
      <div className="grid gap-5 sm:gap-6">
        <section className="grid gap-4 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5 lg:grid-cols-[1fr_22rem] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">Parcours</p>
            <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
              4 modules pour devenir CyberAmbassadeur
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
              Les lecons restent courtes, pratiques et pensees pour etre relues hors
              connexion apres leur premiere ouverture.
            </p>
          </div>
          <MascotCoach mascotMood="focus">
            Choisis une mission, termine les mini-lecons, puis vise le quiz a 70%.
          </MascotCoach>
        </section>

        <section className="grid gap-4">
          {modules.map((module, index) => {
            const isReady = module.status === "ready";
            const Icon = isReady ? Play : module.status === "next" ? Star : Lock;

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
                        statusStyles[module.status]
                      }
                    >
                      {statusLabels[module.status]}
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
                  <Link
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink"
                    href={`/student/modules/${module.id}`}
                  >
                    Ouvrir
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </DashboardShell>
  );
}
