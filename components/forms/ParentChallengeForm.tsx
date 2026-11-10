"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ParentChallengeForm({ invitationId }: { invitationId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    const response = await fetch("/api/parent/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitationId,
        reportText: new FormData(event.currentTarget).get("reportText")
      })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSubmitting(false);
    setStatus(result?.message ?? "Action terminee.");
    if (response.ok) router.refresh();
  }

  return (
    <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={`report-${invitationId}`}>Rapport de votre action</label>
        <textarea className="min-h-32 rounded-lg border border-slate-200 p-3" id={`report-${invitationId}`} name="reportText" placeholder="Expliquez ce que vous avez fait ensemble et ce que vous avez appris..." required />
      </div>
      {status ? <p className="rounded-lg bg-brand-sky p-3 text-sm font-bold text-brand-blue">{status}</p> : null}
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-black text-white disabled:opacity-50" disabled={isSubmitting} type="submit">
        <Send size={18} /> {isSubmitting ? "Envoi..." : "Envoyer le rapport"}
      </button>
    </form>
  );
}
