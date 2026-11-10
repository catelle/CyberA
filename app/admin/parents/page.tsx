import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listAdminParents } from "@/lib/db/cybera";

export default async function AdminParentsPage() {
  const user = await requireRole(["admin", "facilitator"]);
  const parents = await listAdminParents();
  const linkedCount = parents.filter((parent) => parent.children.length > 0).length;

  return (
    <DashboardShell user={user} title="Parents">
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-500">
            {parents.length} compte(s) parent · {linkedCount} lié(s) à au moins un élève
          </p>
        </section>

        <section className="overflow-hidden rounded-lg bg-white shadow-sm">
          {parents.length === 0 ? (
            <p className="p-6 text-sm font-semibold text-slate-500">Aucun parent enregistré.</p>
          ) : null}
          {parents.map((parent) => (
            <article className="grid gap-4 border-b border-slate-100 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center" key={parent.id}>
              <div>
                <h2 className="flex items-center gap-2 font-black text-brand-blue">
                  <UserRound aria-hidden className="h-4 w-4" />
                  {parent.fullName}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{parent.phone || "Téléphone non renseigné"}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-slate-500">Élève(s) lié(s)</p>
                <p className="mt-1 font-bold text-brand-ink">
                  {parent.children.length ? parent.children.map((child) => child.fullName).join(", ") : "Aucun lien"}
                </p>
              </div>
              <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 font-black text-white hover:bg-brand-ink" href={`/admin/parents/${parent.id}`}>
                Détails <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
