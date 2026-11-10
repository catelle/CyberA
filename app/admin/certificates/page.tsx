import { CertificateDecisionForm } from "@/components/forms/CertificateDecisionForm";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";
import { listAwardedCertificates, listCertificateCandidates } from "@/lib/certificates";

export default async function AdminCertificatesPage() {
  const user = await requireRole(["admin"]);
  const [candidates, awarded] = await Promise.all([listCertificateCandidates(), listAwardedCertificates()]);

  return (
    <DashboardShell user={user} title="Certificats">
      <section className="grid gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl bg-white p-4 shadow-sm"><h2 className="font-black text-brand-blue">Apercu CyberAmbassador</h2><img alt="Apercu du certificat CyberAmbassador" className="mt-3 w-full rounded-lg border" src="/api/admin/certificates/preview?type=ambassador" /></article>
          <article className="rounded-xl bg-white p-4 shadow-sm"><h2 className="font-black text-primary">Apercu Bourse des 100</h2><img alt="Apercu du certificat Bourse des 100" className="mt-3 w-full rounded-lg border" src="/api/admin/certificates/preview?type=scholarship" /></article>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-950">
          Les modules 1, 2 et 3 sont requis. Un capstone soumis donne automatiquement droit au certificat. Pour un eleve sans capstone, l&apos;admin decide ici au cas par cas.
        </div>
        {candidates.length === 0 ? <p className="rounded-lg bg-white p-6 text-center font-semibold text-slate-500">Aucun eleve n&apos;a encore termine les trois modules requis.</p> : null}
        {candidates.map((candidate) => (
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" key={candidate.userId}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><h2 className="text-xl font-black text-brand-blue">{candidate.fullName}</h2><p className="mt-1 text-sm font-semibold text-slate-500">Modules 1–3 termines · {candidate.capstoneSubmitted ? "capstone soumis" : "capstone non soumis"}</p></div>
              <span className={`rounded-full px-3 py-1 text-xs font-black uppercase ${candidate.certificateNumber ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>{candidate.certificateNumber ? "Certificat disponible" : "En attente"}</span>
            </div>
            {!candidate.capstoneSubmitted ? <div className="mt-5"><CertificateDecisionForm currentDecision={candidate.adminDecision} userId={candidate.userId} /></div> : <p className="mt-4 text-sm font-bold text-emerald-700">Le certificat est gere automatiquement par la soumission du capstone.</p>}
          </article>
        ))}
        <section className="mt-4 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-display text-2xl font-black text-brand-ink">Certificats attribues ({awarded.length})</h2>
          <div className="mt-4 grid gap-3">{awarded.length === 0 ? <p className="text-sm font-semibold text-slate-500">Aucun certificat attribue.</p> : awarded.map((certificate) => <article className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4" key={certificate.number}><div><p className="font-black text-brand-blue">{certificate.fullName}</p><p className="text-sm font-semibold text-slate-500">{certificate.type === "scholarship" ? "Bourse des 100" : "CyberAmbassador"} · {certificate.number}</p></div><a className="inline-flex min-h-10 items-center rounded-lg bg-brand-blue px-4 font-black text-white" href={`/api/admin/certificates/${certificate.userId}/download`}>Voir et telecharger</a></article>)}</div>
        </section>
      </section>
    </DashboardShell>
  );
}
