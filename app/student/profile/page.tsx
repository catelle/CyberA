import { DashboardShell } from "@/components/layout/DashboardShell";
import { Award, CheckCircle2, GraduationCap } from "lucide-react";
import { requireRole } from "@/lib/auth/guards";
import { getStudentProfileStats, listProgramModulesForStudent } from "@/lib/db/cybera";
import { getProgramCompletionPercent } from "@/lib/program";

export default async function ProfilePage() {
  const user = await requireRole(["student"]);
  const [modules, profileStats] = await Promise.all([
    listProgramModulesForStudent(user.supabaseUserId),
    getStudentProfileStats(user.supabaseUserId)
  ]);

  return (
    <DashboardShell user={user} title="Profil">
      <div className="grid gap-5 lg:grid-cols-[1fr_18rem]">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">
            {profileStats.isGraduated ? "CyberAmbassadeur certifie" : "Eleve"}
          </p>
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
                {profileStats.totalPoints}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">Niveau</p>
              <p className="mt-2 text-3xl font-black capitalize text-brand-blue">
                {profileStats.level}
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
          <h3 className="mt-2 text-2xl font-black">
            {profileStats.isGraduated ? "Diplome obtenu" : "Objectif: CyberAmbassadeur"}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/75">
            {profileStats.isGraduated
              ? "Tu es maintenant un CyberAmbassadeur certifie."
              : "Complete tous les modules de la formation pour obtenir ton certificat."}
          </p>
          {profileStats.certificateNumber ? (
            <div className="mt-5 rounded-lg bg-white/10 p-4">
              <GraduationCap aria-hidden className="h-8 w-8 text-brand-gold" />
              <p className="mt-3 text-xs font-black uppercase text-white/60">
                Numero du certificat
              </p>
              <p className="mt-1 break-all font-black text-brand-gold">
                {profileStats.certificateNumber}
              </p>
            </div>
          ) : null}
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <Award aria-hidden className="h-6 w-6 text-brand-gold" />
            <div>
              <p className="text-sm font-black uppercase text-brand-gold">Badges</p>
              <h3 className="font-display text-2xl font-black text-brand-ink">
                Expertises validees
              </h3>
            </div>
          </div>
          {profileStats.badges.length === 0 ? (
            <p className="mt-4 rounded-lg bg-slate-50 p-4 font-semibold text-slate-500">
              Termine un module pour obtenir le badge lie a son domaine.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {profileStats.badges.map((badge) => (
                <article
                  className="rounded-lg border-2 border-slate-200 p-4"
                  key={badge.id}
                  style={{ borderTopColor: badge.color }}
                >
                  <CheckCircle2 aria-hidden className="h-7 w-7" style={{ color: badge.color }} />
                  <h4 className="mt-3 font-black text-brand-blue">{badge.name}</h4>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Domaine: {badge.focus}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
