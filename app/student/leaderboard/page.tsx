import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getStrikeEligibility, listLeaderboard } from "@/lib/db/cybera";

export default async function LeaderboardPage() {
  const user = await requireRole(["student"]);
  const en = user.language === "en";
  const [leaderboardEntries, strikeEligibility] = await Promise.all([
    listLeaderboard(user.supabaseUserId),
    getStrikeEligibility(user.supabaseUserId)
  ]);

  return (
    <DashboardShell user={user} title={en ? "Leaderboard" : "Classement"}>
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">
            {en ? "Cohort / National / Week" : "Cohorte / National / Semaine"}
          </p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            {en ? "Student progress" : "Progression des élèves"}
          </h2>
        </section>

        <section className="grid gap-4 overflow-hidden rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-tertiary-fixed text-tertiary">
            <Zap aria-hidden className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-black text-brand-ink">{en ? "Strike: earn 50 bonus XP" : "Strike : gagne 50 XP bonus"}</h3>
            <p className="text-sm font-semibold text-slate-600">
              {strikeEligibility.eligible
                ? en ? "10 random questions about what you have learned. Optional and retryable." : "10 questions au hasard sur ce que tu as déjà appris. Optionnel, retentable à volonté."
                : en ? "Complete at least one lesson to unlock this bonus." : "Termine au moins une leçon pour débloquer ce bonus."}
            </p>
          </div>
          {strikeEligibility.eligible ? (
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
              href="/student/strike"
            >
              {en ? "Start" : "Lancer"} <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          ) : null}
        </section>

        <section className="overflow-hidden rounded-lg bg-white shadow-sm">
          {leaderboardEntries.map((entry) => (
            <div
              className={
                entry.isCurrentUser
                  ? "grid gap-3 border-b border-slate-100 bg-brand-sky p-4 sm:grid-cols-[4rem_1fr_8rem_10rem]"
                  : "grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-[4rem_1fr_8rem_10rem]"
              }
              key={entry.rank}
            >
              <p className="text-2xl font-black text-brand-blue">#{entry.rank}</p>
              <div>
                <h3 className="font-black text-brand-ink">{entry.name}</h3>
                <p className="text-sm text-slate-600">
                  {entry.city} / {entry.cohort}
                </p>
              </div>
              <p className="font-black capitalize text-brand-blue">{entry.level}</p>
              <div className="sm:text-right">
                <p className="font-black text-brand-gold">
                  {entry.performanceScore}% performance
                </p>
                <p className="text-xs font-bold text-slate-500">
                  {entry.points} {en ? "reward points" : "pts de récompense"}
                </p>
                <p className="text-xs font-bold text-slate-400">
                  {entry.weeklyPoints} {en ? "points this week" : "pts cette semaine"}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
