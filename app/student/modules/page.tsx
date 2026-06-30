import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { programModules } from "@/lib/program";

export default async function StudentModulesPage() {
  const user = await requireRole(["student"]);

  return (
    <DashboardShell user={user} title="Modules">
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">Parcours</p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            4 modules pour devenir CyberAmbassadeur
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Les lecons restent courtes, pratiques et pensees pour etre relues hors connexion
            apres leur premiere ouverture.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {programModules.map((module) => (
            <article className="rounded-lg bg-white p-5 shadow-sm" key={module.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-brand-gold">Module {module.week}</p>
                  <h3 className="mt-2 text-xl font-black text-brand-blue">{module.title}</h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                  {module.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{module.summary}</p>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-brand-gold"
                  style={{ width: `${module.progressPercent}%` }}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {module.outcomes.map((outcome) => (
                  <span
                    className="rounded-full bg-brand-sky px-3 py-1 text-xs font-bold text-brand-blue"
                    key={outcome}
                  >
                    {outcome}
                  </span>
                ))}
              </div>
              <Link
                className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
                href={`/student/modules/${module.id}`}
              >
                Ouvrir
              </Link>
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
