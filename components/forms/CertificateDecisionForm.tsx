"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CertificateDecisionForm({ userId, currentDecision }: { userId: string; currentDecision: boolean | null }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function decide(allow: boolean) {
    setBusy(true);
    const response = await fetch(`/api/admin/certificates/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allow, note })
    });
    const result = await response.json().catch(() => null);
    setBusy(false);
    setMessage(result?.message ?? "Action terminee.");
    if (response.ok) router.refresh();
  }

  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-end">
      <label className="field"><span>Note admin (facultatif)</span><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Ex. exception validee" /></label>
      <button className="min-h-11 rounded-lg bg-green-700 px-4 font-black text-white disabled:opacity-50" disabled={busy} onClick={() => decide(true)} type="button">Autoriser</button>
      <button className="min-h-11 rounded-lg bg-red-700 px-4 font-black text-white disabled:opacity-50" disabled={busy} onClick={() => decide(false)} type="button">Refuser</button>
      {message ? <p className="text-sm font-bold text-slate-600 sm:col-span-3">{message}</p> : null}
      {currentDecision !== null ? <p className="text-xs font-black uppercase text-slate-400 sm:col-span-3">Decision actuelle : {currentDecision ? "autorisee" : "refusee"}</p> : null}
    </div>
  );
}
