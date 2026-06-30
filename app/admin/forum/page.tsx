import Link from "next/link";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listForumReportsWithFallback } from "@/lib/db/cybera";

export default async function AdminForumPage() {
  const user = await requireRole(["admin"]);
  const reports = await listForumReportsWithFallback();

  return (
    <DashboardShell user={user} title="Forum admin">
      <section className="grid gap-4">
        {reports.map((report: any) => (
          <Link
            className="rounded-lg bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
            href={`/admin/forum/${report.id}`}
            key={report.id}
          >
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">
                  {report.platform} / {report.type}
                </p>
                <h2 className="mt-2 text-xl font-black text-brand-blue">
                  {report.description}
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {report.target_url}
                </p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                {report.status}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </DashboardShell>
  );
}
