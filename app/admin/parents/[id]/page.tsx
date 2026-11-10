import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { getAdminParentDetail } from "@/lib/db/cybera";

const statusLabel: Record<string, string> = {
  invited: "Invité",
  submitted: "Soumis",
  approved: "Approuvé",
  rejected: "Rejeté"
};

export default async function AdminParentDetailPage({ params }: { params: { id: string } }) {
  const user = await requireRole(["admin", "facilitator"]);
  const parent = await getAdminParentDetail(params.id);
  if (!parent) notFound();

  return (
    <DashboardShell user={user} title={parent.fullName}>
      <div className="grid gap-5">
        <section className="grid gap-4 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-3">
          <div><p className="text-xs font-black uppercase text-slate-500">Téléphone</p><p className="mt-1 font-bold">{parent.phone || "Non renseigné"}</p></div>
          <div><p className="text-xs font-black uppercase text-slate-500">Ville</p><p className="mt-1 font-bold">{parent.city || "Non renseignée"}</p></div>
          <div><p className="text-xs font-black uppercase text-slate-500">Inscription</p><p className="mt-1 font-bold">{parent.joinedAt ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(parent.joinedAt)) : "Inconnue"}</p></div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-brand-ink">Élèves liés ({parent.children.length})</h2>
          <div className="mt-4 grid gap-3">
            {parent.children.length === 0 ? <p className="text-sm font-semibold text-slate-500">Ce parent n’est lié à aucun élève.</p> : null}
            {parent.children.map((child) => (
              <Link className="rounded-lg border border-slate-200 p-4 font-black text-brand-blue hover:border-brand-blue" href={`/admin/ambassadors/${child.id}`} key={child.id}>
                {child.fullName} — voir la progression
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-brand-ink">Rapports de défis familiaux ({parent.challengeReports.length})</h2>
          <div className="mt-4 grid gap-3">
            {parent.challengeReports.length === 0 ? <p className="text-sm font-semibold text-slate-500">Aucun rapport familial.</p> : null}
            {parent.challengeReports.map((report) => (
              <article className="rounded-lg border border-slate-200 p-4" key={report.id}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-black text-brand-ink">{report.title}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black">{statusLabel[report.status] ?? report.status}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600">Élève : {report.childName} · {report.pointsAwarded} point(s)</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
