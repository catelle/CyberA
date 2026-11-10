import { Award } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listModulesWithFallback } from "@/lib/db/cybera";

export default async function AdminBadgesPage() {
  const user = await requireRole(["admin", "facilitator"]);
  const modules = await listModulesWithFallback();

  return (
    <DashboardShell user={user} title="Aperçu des badges">
      <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-fixed text-primary">
            <Award aria-hidden className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black uppercase text-brand-gold">Sykoti Center</p>
            <h2 className="mt-1 text-2xl font-black text-brand-ink">Tous les badges de modules</h2>
            <p className="mt-2 max-w-2xl font-semibold leading-7 text-slate-600">
              Chaque aperçu utilise le nom actuel du module. Le même visuel est remis à l&apos;élève après validation du module.
            </p>
          </div>
        </div>

        {modules.length === 0 ? (
          <p className="mt-6 rounded-xl bg-slate-50 p-5 font-semibold text-slate-500">
            Aucun module n&apos;est configuré pour le moment.
          </p>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <article className="flex flex-col items-center rounded-2xl border border-primary/15 bg-[#fffafb] p-5 text-center" key={module.id}>
                <img
                  alt={`Badge de fin du module ${module.title}`}
                  className="aspect-square w-full max-w-72 object-contain"
                  src={`/api/admin/badges/${encodeURIComponent(module.id)}/preview`}
                />
                <p className="mt-4 text-xs font-black uppercase tracking-wide text-brand-gold">
                  Module {module.order_index}
                </p>
                <h3 className="mt-1 text-lg font-black text-brand-ink">{module.title}</h3>
                <span className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                  {module.is_published ? "Publié" : "Brouillon"}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardShell>
  );
}
