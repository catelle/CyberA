import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Play, Star } from "lucide-react";

import { CyberMascot, MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listProgramModulesForStudent } from "@/lib/db/cybera";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getProgramCompletionPercent } from "@/lib/program";

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

export default async function StudentDashboardPage() {
  const user = await requireRole(["student"]);
  const t = getDictionary(user.language);
  const modules = await listProgramModulesForStudent(user.supabaseUserId);
  const completion = getProgramCompletionPercent(modules);
  const readyModule = modules.find((module) => module.status === "ready");

  return (
    <DashboardShell user={user} title={t.studentDashboard}>
      <div className="grid gap-5 sm:gap-6">
        <section className="grid gap-4 overflow-hidden rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5 lg:grid-cols-[1fr_18rem]">
          <div className="min-w-0">
            <MascotCoach mascotMood="cheer">
              Mission du jour: avance dans {readyModule?.title ?? "ton parcours"} et
              gagne assez d&apos;XP pour garder ta serie.
            </MascotCoach>

            <div className="mt-5">
              <p className="text-sm font-black uppercase text-tertiary">{t.nextStep}</p>
              <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-blue sm:text-3xl">
                {readyModule ? readyModule.title : "Programme CyberAmbassadeur"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                {readyModule?.summary ??
                  "Les modules seront actives progressivement par l'equipe programme."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(readyModule?.outcomes ?? []).map((outcome) => (
                  <span
                    className="rounded-full border-2 border-secondary bg-brand-sky px-3 py-1 text-xs font-black text-brand-blue shadow-[0_2px_0_0_rgba(88,96,98,1)] sm:text-sm"
                    key={outcome}
                  >
                    {outcome}
                  </span>
                ))}
              </div>
              {readyModule ? (
                <Link
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-primary px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-primary-container sm:w-fit"
                  href={`/student/modules/${readyModule.id}`}
                >
                  Continuer
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg border-2 border-secondary bg-brand-blue p-5 text-white shadow-[0_4px_0_0_rgba(88,96,98,1)]">
            <div className="absolute -right-4 -top-2 opacity-95">
              <CyberMascot mood="celebrate" size="md" />
            </div>
            <p className="relative text-sm font-black text-white/75">Progression</p>
            <p className="relative mt-3 text-5xl font-black">{completion}%</p>
            <div className="progress-sheen relative mt-4 h-3 rounded-full bg-white/20">
              <div
                className="progress-fill-animate h-3 rounded-full bg-[#ffcc32]"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="relative mt-4 text-sm font-bold leading-6 text-white/80">
              {user.consentGiven
                ? "Consentement parent confirme."
                : "Consentement parent a confirmer."}
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase text-tertiary">Parcours</p>
              <h2 className="mt-1 font-display text-2xl font-black text-on-surface">
                Tes missions de certification
              </h2>
            </div>
            <Link
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-white px-4 text-sm font-black text-primary shadow-[0_3px_0_0_rgba(88,96,98,1)] transition hover:bg-primary-fixed sm:w-fit"
              href="/student/modules"
            >
              Voir tout
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module, index) => {
              const isReady = module.status === "ready";
              const Icon = isReady ? Play : module.status === "next" ? Star : Lock;

              return (
                <Link
                  className="mission-card group relative grid min-h-[17rem] overflow-hidden rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-1 hover:shadow-[0_7px_0_0_rgba(88,96,98,1)] sm:p-5"
                  href={`/student/modules/${module.id}`}
                  key={module.id}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="absolute left-1/2 top-12 hidden h-1 w-full -translate-x-1/2 bg-secondary-container xl:block" />
                  <div className="relative z-10 flex items-start justify-between gap-3">
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

                  <div className="relative z-10 mt-4 flex justify-center">
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

                  <div className="relative z-10 mt-5 min-w-0">
                    <p className="text-sm font-black text-brand-gold">
                      Semaine {module.week}
                    </p>
                    <h3 className="mt-2 break-words font-display text-lg font-black leading-tight text-brand-ink">
                      {module.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">
                      {module.summary}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5">
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="progress-fill-animate h-3 rounded-full bg-[#ffcc32]"
                        style={{ width: `${module.progressPercent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs font-black text-secondary">
                      {module.progressPercent}% complete
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            ["Serie", "3 jours", "bg-[#fff4c2]"],
            ["XP", "120", "bg-tertiary-fixed"],
            ["Badges", "2/8", "bg-[#d9fbe8]"]
          ].map(([label, value, tone]) => (
            <article
              className={`rounded-lg border-2 border-secondary ${tone} p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)]`}
              key={label}
            >
              <p className="text-sm font-black uppercase text-secondary">{label}</p>
              <p className="mt-2 text-3xl font-black text-on-surface">{value}</p>
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
