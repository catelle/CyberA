import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { leaderboardEntries } from "@/lib/program";

export default async function AdminAmbassadorsPage() {
  const user = await requireRole(["admin"]);

  return (
    <DashboardShell user={user} title="Ambassadeurs">
      <section className="overflow-hidden rounded-lg bg-white shadow-sm">
        {leaderboardEntries.map((entry) => (
          <div
            className="grid gap-3 border-b border-slate-100 p-4 md:grid-cols-[1fr_8rem_8rem_8rem]"
            key={entry.rank}
          >
            <div>
              <h2 className="font-black text-brand-blue">{entry.name}</h2>
              <p className="text-sm text-slate-600">
                {entry.city} / {entry.cohort}
              </p>
            </div>
            <p className="font-black capitalize text-brand-ink">{entry.level}</p>
            <p className="font-black text-brand-gold">{entry.points} pts</p>
            <p className="font-bold text-slate-500">Rang #{entry.rank}</p>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
