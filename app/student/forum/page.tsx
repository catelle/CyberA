import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { forumReports } from "@/lib/program";

export default async function ForumPage() {
  const user = await requireRole(["student"]);

  return (
    <DashboardShell user={user} title="Forum">
      <div className="grid gap-5">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-black uppercase text-brand-gold">
            Signalements et alertes
          </p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            Agir sans exposer de donnees sensibles
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            L&apos;acces a la publication sera bloque tant que les 4 modules ne sont pas termines.
          </p>
          <Link
            className="mt-5 inline-flex min-h-12 items-center rounded-lg bg-brand-blue px-4 font-black text-white transition hover:bg-brand-ink"
            href="/student/forum/report"
          >
            Nouveau rapport
          </Link>
        </section>

        <section className="grid gap-4">
          {forumReports.map((report) => (
            <article className="rounded-lg bg-white p-5 shadow-sm" key={report.id}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-black uppercase text-brand-gold">
                    {report.platform} / {report.type}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-brand-blue">
                    {report.description}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    Cible: {report.target}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                  {report.status}
                </span>
              </div>
              {report.actionInstructions ? (
                <div className="mt-4 grid gap-2 rounded-lg bg-brand-sky p-4">
                  {report.actionInstructions.map((instruction) => (
                    <p className="text-sm font-bold text-brand-blue" key={instruction}>
                      {instruction}
                    </p>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
