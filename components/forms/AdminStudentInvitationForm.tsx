"use client";

import { Check, Copy, Link2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminStudentInvitationForm() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [setupUrl, setSetupUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setStatus(null);
    setSetupUrl(null);
    setCopied(false);
    const response = await fetch("/api/admin/student-invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
    });
    const result = (await response.json().catch(() => null)) as { message?: string; setupUrl?: string } | null;
    setIsSubmitting(false);
    setStatus(result?.message ?? "Action terminee.");
    if (response.ok && result?.setupUrl) {
      setSetupUrl(result.setupUrl);
      form.reset();
      router.refresh();
    }
  }

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-brand-gold">Eleves selectionnes</p>
      <h2 className="mt-2 text-2xl font-black text-brand-ink">Generer un lien de premiere connexion</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Utilisez exactement l&apos;email fourni dans la candidature. L&apos;eleve configure son mot de passe sans remplir le formulaire d&apos;inscription.</p>
      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={submit}>
        <div className="field"><label htmlFor="invite-full-name">Nom complet</label><input id="invite-full-name" name="fullName" required /></div>
        <div className="field"><label htmlFor="invite-email">Email de candidature</label><input autoComplete="email" id="invite-email" name="email" required type="email" /></div>
        <div className="field"><label htmlFor="invite-city">Ville</label><input id="invite-city" name="city" /></div>
        <div className="field"><label htmlFor="invite-language">Langue</label><select defaultValue="fr" id="invite-language" name="language"><option value="fr">Francais</option><option value="en">English</option></select></div>
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-black text-white disabled:opacity-50 md:col-span-2" disabled={isSubmitting} type="submit"><Link2 size={18} />{isSubmitting ? "Generation..." : "Generer le lien unique"}</button>
      </form>
      {status ? <p className="mt-4 rounded-lg bg-brand-sky p-3 text-sm font-bold text-brand-blue">{status}</p> : null}
      {setupUrl ? (
        <div className="mt-4 rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-black text-emerald-900">Copiez et envoyez ce lien au candidat selectionne:</p>
          <p className="mt-2 break-all rounded-lg bg-white p-3 text-xs font-semibold text-slate-600">{setupUrl}</p>
          <button className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-blue px-4 font-black text-white" onClick={async () => { await navigator.clipboard.writeText(setupUrl); setCopied(true); }} type="button">{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Lien copie" : "Copier le lien"}</button>
        </div>
      ) : null}
    </section>
  );
}
