import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listParentChildren, listParentReportsForUser } from "@/lib/db/cybera";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function ParentDashboardPage() {
  const user = await requireRole(["parent"]);
  const t = getDictionary(user.language);
  const [children, reports] = await Promise.all([
    listParentChildren(user.supabaseUserId),
    listParentReportsForUser(user.supabaseUserId)
  ]);
  const totalPoints = children.reduce((sum, child) => sum + child.totalPoints, 0);

  return (
    <DashboardShell user={user} title={t.parentDashboard}>
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              {user.language === "fr" ? "Comptes lies" : "Linked accounts"}
            </p>
            <p className="mt-2 text-4xl font-black text-brand-blue">
              {children.length}
            </p>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">Points suivis</p>
            <p className="mt-2 text-4xl font-black text-brand-blue">{totalPoints}</p>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Rapports disponibles
            </p>
            <p className="mt-2 text-4xl font-black text-brand-blue">{reports.length}</p>
          </section>
        </div>

        {children.length === 0 ? (
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-black uppercase text-brand-gold">Lien enfant</p>
              <h2 className="mt-2 text-2xl font-black text-brand-ink">
                Aucun compte enfant n&apos;est encore lie
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Demandez a l&apos;ambassadeur son code famille de 6 caracteres, puis
                ajoutez-le a votre espace parent.
              </p>
            </div>
            <Link
              className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-5 font-black text-white transition hover:bg-brand-ink"
              href="/parent/link"
            >
              Ajouter un enfant
            </Link>
          </section>
        ) : (
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">
                  Enfants lies
                </p>
                <h2 className="mt-2 text-2xl font-black text-brand-ink">
                  Suivi parental
                </h2>
              </div>
              <Link className="text-sm font-black text-brand-blue" href="/parent/link">
                Ajouter un autre enfant
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {children.map((child) => (
                <article className="rounded-lg border border-slate-200 p-4" key={child.id}>
                  <p className="text-sm font-black text-brand-gold">
                    {child.city ?? "Ville non renseignee"}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-brand-blue">
                    {child.fullName}
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="font-bold text-slate-500">Niveau</p>
                      <p className="mt-1 font-black capitalize text-brand-ink">
                        {child.level}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-500">Points</p>
                      <p className="mt-1 font-black text-brand-ink">
                        {child.totalPoints}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-500">Defis</p>
                      <p className="mt-1 font-black text-brand-ink">
                        {child.approvedChallenges}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
