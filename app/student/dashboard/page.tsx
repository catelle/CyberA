import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Play, Star, Zap } from "lucide-react";

import { MascotCoach } from "@/components/gamified/CyberMascot";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getStrikeEligibility, getStudentStatusSummary, listProgramModulesForStudent } from "@/lib/db/cybera";
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
  const [modules, studentStatus, strikeEligibility] = await Promise.all([
    listProgramModulesForStudent(user.supabaseUserId),
    getStudentStatusSummary(user.supabaseUserId),
    getStrikeEligibility(user.supabaseUserId)
  ]);
  const completion = getProgramCompletionPercent(modules);
  const readyModule = modules.find((module) => module.status === "ready");

  return (
    <DashboardShell user={user} title={t.studentDashboard}>
      <div className="grid gap-5 sm:gap-6">
        <section className="grid gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-7 lg:grid-cols-[1fr_17rem]">
          <div className="min-w-0">
            <MascotCoach mascotMood="cheer">
              Mission du jour: avance dans {readyModule?.title ?? "ton parcours"} et
              gagne assez d&apos;XP pour garder ta serie.
            </MascotCoach>

            <div className="mt-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-tertiary">{t.nextStep}</p>
              <h2 className="mt-2 break-words font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-on-surface sm:text-3xl">
                {readyModule ? readyModule.title : "Programme CyberAmbassadeur"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                {readyModule?.summary ??
                  "Les modules seront actives progressivement par l'equipe programme."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(readyModule?.outcomes ?? []).map((outcome) => (
                  <span
                    className="rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-bold text-primary sm:text-sm"
                    key={outcome}
                  >
                    {outcome}
                  </span>
                ))}
              </div>
              {readyModule ? (
                <Link
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(181,18,63,0.2)] transition hover:bg-[#981137] sm:w-fit"
                  href={`/student/modules/${readyModule.id}`}
                >
                  Continuer
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(145deg,#991238,#b5123f)] p-6 text-white shadow-[0_16px_32px_rgba(136,19,55,0.2)]">
            <div className="absolute -bottom-10 -right-9 h-36 w-36 rounded-full border-[24px] border-white/5" />
            <p className="relative text-xs font-extrabold uppercase tracking-[0.12em] text-white/70">Progression globale</p>
            <p className="relative mt-3 text-5xl font-extrabold tracking-[-0.04em]">{completion}%</p>
            <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="progress-fill-animate h-2 rounded-full bg-white"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="relative mt-4 text-xs font-semibold leading-5 text-white/75">
              {user.consentGiven
                ? "Consentement parent confirme."
                : "Consentement parent a confirmer."}
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-tertiary">Parcours</p>
              <h2 className="mt-1.5 font-display text-2xl font-extrabold tracking-[-0.025em] text-on-surface">
                Tes missions de certification
              </h2>
            </div>
            <Link
              className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-primary shadow-sm transition hover:border-rose-200 hover:bg-primary-fixed sm:w-fit"
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
                  className="mission-card group relative grid min-h-[17rem] overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_16px_32px_rgba(15,23,42,0.09)] sm:p-5"
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
                          ? "mission-node flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-white shadow-[0_10px_24px_rgba(181,18,63,0.2)]"
                          : "flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                      }
                    >
                      <Icon aria-hidden className="h-8 w-8" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-5 min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-primary">
                      Semaine {module.week}
                    </p>
                    <h3 className="mt-2 break-words font-display text-lg font-extrabold leading-tight tracking-[-0.015em] text-brand-ink">
                      {module.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                      {module.summary}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5">
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="progress-fill-animate h-2 rounded-full bg-primary"
                        style={{ width: `${module.progressPercent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-500">
                      {module.progressPercent}% terminé
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
          {[
            ["Serie", `${studentStatus.streakDays} jour${studentStatus.streakDays > 1 ? "s" : ""}`, "bg-[#fff4c2]"],
            ["XP", studentStatus.totalPoints.toLocaleString("fr-FR"), "bg-tertiary-fixed"],
            ["Badges", `${studentStatus.badges.length}/${studentStatus.badgeTarget}`, "bg-[#d9fbe8]"]
          ].map(([label, value, tone]) => (
            <Link
              className={`rounded-xl border border-slate-200 ${tone} p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md`}
              href="/student/status"
              key={label}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-on-surface">{value}</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-tertiary-fixed text-tertiary">
            <Zap aria-hidden className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-tertiary">Bonus optionnel</p>
            <h3 className="mt-1 font-display text-lg font-extrabold text-on-surface">Strike : 10 questions, +50 XP</h3>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {strikeEligibility.eligible
                ? "Un mini-quiz rapide pour reviser et grimper au classement, quand tu veux."
                : "Termine au moins une lecon pour debloquer ce bonus."}
            </p>
          </div>
          {strikeEligibility.eligible ? (
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(181,18,63,0.2)] transition hover:bg-[#981137] sm:w-fit"
              href="/student/strike"
            >
              Lancer <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          ) : (
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 text-sm font-extrabold text-slate-400">
              Verrouille
            </span>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
