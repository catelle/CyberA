import { notFound } from "next/navigation";

import { AdminReviewActions } from "@/components/forms/AdminReviewActions";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listForumReportsWithFallback } from "@/lib/db/cybera";

type AdminForumDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function AdminForumDetailPage({ params }: AdminForumDetailPageProps) {
  const user = await requireRole(["admin"]);
  const reports = await listForumReportsWithFallback();
  const report = reports.find((item: any) => item.id === params.id);

  if (!report) {
    notFound();
  }

  return (
    <DashboardShell user={user} title="Detail forum">
      <article className="grid gap-5 rounded-lg bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-black uppercase text-brand-gold">
            {report.platform} / {report.type}
          </p>
          <h2 className="mt-2 text-2xl font-black text-brand-blue">
            {report.description}
          </h2>
          <p className="mt-3 font-bold text-slate-600">Cible: {report.target_url}</p>
        </div>
        <AdminReviewActions id={report.id} target="forum" />
      </article>
    </DashboardShell>
  );
}
