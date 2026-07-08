import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listProgramModulesForStudent } from "@/lib/db/cybera";
import { getProgramCompletionPercent, leaderboardEntries } from "@/lib/program";

export default async function ProfilePage() {
  const user = await requireRole(["student"]);
  const modules = await listProgramModulesForStudent(user.supabaseUserId);
  const currentEntry = leaderboardEntries.find((entry) => entry.isCurrentUser);

  return (
    <DashboardShell user={user} title="Profil">
      <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">Ambassadeur</p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            {user.profile.fullName}
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            {user.profile.city ?? "Ville non renseignee"} /{" "}
            {user.consentGiven ? "Consentement confirme" : "Consentement a confirmer"}
          </p>
          {user.familyCode ? (
            <div className="mt-5 rounded-lg bg-brand-sky p-4">
              <p className="text-sm font-black uppercase text-brand-gold">
                Code famille
              </p>
              <p className="mt-2 text-3xl font-black tracking-[0.2em] text-brand-blue">
                {user.familyCode}
              </p>
              <p className="mt-2 text-sm font-bold text-slate-600">
                Partage ce code avec ton parent pour confirmer le lien familial.
              </p>
            </div>
          ) : null}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">Points</p>
              <p className="mt-2 text-3xl font-black text-brand-blue">
                {currentEntry?.points ?? 0}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">Niveau</p>
              <p className="mt-2 text-3xl font-black capitalize text-brand-blue">
                {currentEntry?.level ?? "junior"}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">Progression</p>
              <p className="mt-2 text-3xl font-black text-brand-blue">
                {getProgramCompletionPercent(modules)}%
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-brand-blue p-5 text-white shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">Certification</p>
          <h3 className="mt-2 text-2xl font-black">Senior Ambassador</h3>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Complete les 4 modules et 4 defis pour passer au niveau senior.
          </p>
        </section>
      </div>
    </DashboardShell>
  );
}
