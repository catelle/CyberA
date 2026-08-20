"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export function CohortNameForm({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/cohorts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.get("name") })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setSaving(false);
    setStatus(response.ok ? "Nom de Fellowship mis à jour." : result?.message ?? "Mise à jour impossible.");
    if (response.ok) router.refresh();
  }

  return (
    <form className="mt-5 border-t border-slate-200 pt-4" onSubmit={submit}>
      <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500" htmlFor={`cohort-${id}`}>Nom de la Fellowship</label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-3 font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" defaultValue={name} id={`cohort-${id}`} minLength={2} name="name" required />
        <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 font-extrabold text-white disabled:opacity-50" disabled={saving} type="submit"><Save className="h-4 w-4" />{saving ? "Enregistrement…" : "Enregistrer"}</button>
      </div>
      {status ? <p className="mt-2 text-sm font-bold text-slate-600" role="status">{status}</p> : null}
    </form>
  );
}
