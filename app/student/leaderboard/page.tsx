import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listLeaderboard } from "@/lib/db/cybera";

export default async function LeaderboardPage() {
  const user = await requireRole(["student"]);
  const leaderboardEntries = await listLeaderboard();

  return (
    <DashboardShell user={user} title="Classement">
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">
            Cohorte / National / Semaine
          </p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            Progression des ambassadeurs
          </h2>
        </section>

        <section className="overflow-hidden rounded-lg bg-white shadow-sm">
          {leaderboardEntries.map((entry) => (
            <div
              className={
                entry.isCurrentUser
                  ? "grid gap-3 border-b border-slate-100 bg-brand-sky p-4 sm:grid-cols-[4rem_1fr_8rem_8rem]"
                  : "grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-[4rem_1fr_8rem_8rem]"
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
              <p className="font-black text-brand-gold">{entry.points} pts</p>
            </div>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
