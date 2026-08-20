import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Download,
  Flame,
  ListChecks,
  Sparkles,
  Trophy
} from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getStudentStatusSummary } from "@/lib/db/cybera";

export default async function StudentStatusPage() {
  const user = await requireRole(["student"]);
  const status = await getStudentStatusSummary(user.supabaseUserId);

  const metrics = [
    { label: "Serie", value: `${status.streakDays} jour${status.streakDays > 1 ? "s" : ""}`, Icon: Flame, tone: "bg-amber-50 text-amber-950" },
    { label: "XP total", value: status.totalPoints.toLocaleString("fr-FR"), Icon: Sparkles, tone: "bg-cyan-50 text-cyan-950" },
    { label: "Classement", value: status.rank ? `#${status.rank} / ${status.participantCount}` : "Non classe", Icon: Trophy, tone: "bg-violet-50 text-violet-950" },
    { label: "Performance", value: `${status.performanceScore}%`, Icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-950" }
  ];

  return (
    <DashboardShell user={user} title="Mon statut">
      <div className="grid gap-6">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, Icon, tone }) => (
            <article className={`rounded-xl border border-slate-200 p-5 shadow-sm ${tone}`} key={label}>
              <Icon aria-hidden className="h-5 w-5" />
              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.1em] opacity-65">{label}</p>
              <p className="mt-2 text-2xl font-extrabold">{value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ListChecks aria-hidden className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-primary">A faire</p>
                <h2 className="font-display text-2xl font-extrabold text-brand-ink">Taches en attente</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {status.pendingTasks.length === 0 ? (
                <p className="rounded-lg bg-emerald-50 p-4 font-bold text-emerald-800">Tout est a jour. Excellent travail !</p>
              ) : status.pendingTasks.map((task) => (
                <Link className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4 transition hover:border-primary hover:bg-primary-fixed" href={task.href} key={task.id}>
                  <div>
                    <h3 className="font-extrabold text-brand-blue">{task.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{task.detail}</p>
                  </div>
                  <span className="shrink-0 text-sm font-extrabold text-primary">Ouvrir →</span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-xl bg-brand-blue p-5 text-white shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-gold">Formation</p>
            <p className="mt-3 text-4xl font-extrabold">{status.completionPercent}%</p>
            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div className="h-2 rounded-full bg-brand-gold" style={{ width: `${status.completionPercent}%` }} />
            </div>
            <p className="mt-4 text-sm font-semibold text-white/70">{status.modulesCompleted}/{status.badgeTarget} modules valides</p>
            {status.certificateNumber ? (
              <a className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 font-extrabold text-brand-blue" href="/api/student/certificate/download">
                <Download aria-hidden className="h-4 w-4" />
                Telecharger le certificat
              </a>
            ) : (
              <p className="mt-5 rounded-lg bg-white/10 p-3 text-sm font-bold text-white/75">Le certificat sera disponible apres tous les modules.</p>
            )}
          </aside>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Award aria-hidden className="h-6 w-6 text-brand-gold" />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-gold">Collection</p>
              <h2 className="font-display text-2xl font-extrabold text-brand-ink">Mes badges ({status.badges.length}/{status.badgeTarget})</h2>
            </div>
          </div>
          {status.badges.length === 0 ? (
            <p className="mt-5 rounded-lg bg-slate-50 p-4 font-semibold text-slate-500">Termine ton premier module pour debloquer un badge.</p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {status.badges.map((badge) => (
                <article className="flex flex-col items-center rounded-2xl border border-primary/15 bg-white p-4 text-center" key={badge.id}>
                  <img alt={`${badge.name} — ${badge.focus}`} className="aspect-square w-full max-w-44 rounded-full object-contain" src={`/api/student/badges/${badge.id}/download?inline=1`} />
                  <p className="mt-3 text-sm font-black text-brand-ink">{badge.focus}</p>
                  <a className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-extrabold text-primary transition hover:bg-primary-fixed" href={`/api/student/badges/${badge.id}/download`}>
                    <Download aria-hidden className="h-4 w-4" />
                    Telecharger
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
