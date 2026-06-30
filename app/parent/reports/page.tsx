import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listParentChildren, listParentReportsForUser } from "@/lib/db/cybera";

export default async function ParentReportsPage() {
  const user = await requireRole(["parent"]);
  const [children, parentReports] = await Promise.all([
    listParentChildren(user.supabaseUserId),
    listParentReportsForUser(user.supabaseUserId)
  ]);

  return (
    <DashboardShell user={user} title="Rapports">
      <section className="grid gap-4">
        {parentReports.length === 0 ? (
          <article className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-black uppercase text-brand-gold">
              Aucun rapport
            </p>
            <h2 className="mt-2 text-2xl font-black text-brand-ink">
              {children.length === 0
                ? "Ajoutez un enfant pour recevoir ses rapports."
                : "Aucun rapport n'a encore ete genere pour vos enfants lies."}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {children.length === 0
                ? "Le rapport parent apparaitra ici apres la liaison et la prochaine generation par l'equipe programme."
                : "Les rapports hebdomadaires apparaitront ici des qu'ils seront disponibles."}
            </p>
            {children.length === 0 ? (
              <Link
                className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-5 font-black text-white transition hover:bg-brand-ink"
                href="/parent/link"
              >
                Ajouter un enfant
              </Link>
            ) : null}
          </article>
        ) : (
          parentReports.map((report) => (
            <article className="rounded-lg bg-white p-5 shadow-sm" key={report.id}>
              <p className="text-sm font-black uppercase text-brand-gold">
                {report.weekPeriod}
              </p>
              <h2 className="mt-2 text-2xl font-black text-brand-blue">
                {report.childName}: {report.pointsEarned} points
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Defis</p>
                  <p className="mt-2 text-3xl font-black text-brand-blue">
                    {report.challengesCompleted}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Rang</p>
                  <p className="mt-2 text-3xl font-black text-brand-blue">
                    #{report.currentRank}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Niveau</p>
                  <p className="mt-2 text-3xl font-black capitalize text-brand-blue">
                    {report.level}
                  </p>
                </div>
              </div>
              <p className="mt-4 leading-7 text-slate-600">{report.message}</p>
            </article>
          ))
        )}
      </section>
    </DashboardShell>
  );
}
