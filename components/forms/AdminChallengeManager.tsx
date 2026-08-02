"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, Pencil, Plus, Trash2 } from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  points: number;
  week_start: string;
  requires_photo: boolean;
  requires_report: boolean;
  is_active: boolean;
  archived_at: string | null;
  registrations: number;
  activeRegistrations: number;
  submittedRegistrations: number;
};

export function AdminChallengeManager({ challenges }: { challenges: Challenge[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function createChallenge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          instructions: formData.get("instructions"),
          points: formData.get("points"),
          weekStart: formData.get("weekStart"),
          requiresPhoto: formData.get("requiresPhoto") === "on",
          requiresReport: formData.get("requiresReport") === "on",
          isActive: formData.get("isActive") === "on"
        })
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message ?? "Impossible de creer le defi.");

      form.reset();
      setStatus("Defi publie. Il est maintenant visible par les eleves.");
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Action impossible.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteChallenge(id: string) {
    if (!window.confirm("Supprimer ce defi ?")) return;
    const response = await fetch(`/api/admin/challenges/${id}`, { method: "DELETE" });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setStatus(response.ok ? "Defi supprime." : result?.message ?? "Suppression impossible.");
    if (response.ok) router.refresh();
  }

  async function updateChallenge(id: string, payload: Record<string, unknown>, message: string) {
    const response = await fetch(`/api/admin/challenges/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setStatus(response.ok ? message : result?.message ?? "Modification impossible.");
    if (response.ok) router.refresh();
  }

  async function editChallenge(challenge: Challenge) {
    const title = window.prompt("Titre du defi", challenge.title);
    if (!title) return;
    const description = window.prompt("Description", challenge.description);
    if (!description) return;
    const instructions = window.prompt("Instructions", challenge.instructions);
    if (!instructions) return;
    const points = window.prompt("XP", String(challenge.points));
    if (!points) return;
    await updateChallenge(challenge.id, { title, description, instructions, points }, "Defi modifie.");
  }

  const fieldClass = "min-h-11 rounded-lg border border-slate-300 bg-white px-3 font-semibold text-slate-800 outline-none focus:border-primary";

  return (
    <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
      <form className="grid h-fit gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={createChallenge}>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-primary">Nouveau</p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-brand-ink">Creer un defi</h2>
        </div>
        <label className="grid gap-1.5 text-sm font-bold">Titre<input className={fieldClass} minLength={3} name="title" required /></label>
        <label className="grid gap-1.5 text-sm font-bold">Description<textarea className={`${fieldClass} min-h-24 py-3`} minLength={10} name="description" required /></label>
        <label className="grid gap-1.5 text-sm font-bold">Instructions<textarea className={`${fieldClass} min-h-28 py-3`} minLength={10} name="instructions" placeholder="Une instruction par ligne" required /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1.5 text-sm font-bold">XP<input className={fieldClass} defaultValue={50} min={1} name="points" required type="number" /></label>
          <label className="grid gap-1.5 text-sm font-bold">Date de debut<input className={fieldClass} defaultValue={new Date().toISOString().slice(0, 10)} name="weekStart" required type="date" /></label>
        </div>
        <label className="flex items-center gap-2 text-sm font-bold"><input defaultChecked name="requiresPhoto" type="checkbox" /> Photo requise</label>
        <label className="flex items-center gap-2 text-sm font-bold"><input defaultChecked name="requiresReport" type="checkbox" /> Rapport requis</label>
        <label className="flex items-center gap-2 text-sm font-bold"><input defaultChecked name="isActive" type="checkbox" /> Publier immediatement</label>
        {status ? <p className="rounded-lg bg-slate-100 p-3 text-sm font-bold text-slate-700" role="status">{status}</p> : null}
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 font-extrabold text-white disabled:opacity-50" disabled={isSubmitting} type="submit"><Plus className="h-4 w-4" />{isSubmitting ? "Publication..." : "Publier le defi"}</button>
      </form>

      <section className="grid content-start gap-3">
        <h2 className="font-display text-2xl font-extrabold text-brand-ink">Defis existants</h2>
        {challenges.length === 0 ? <p className="rounded-xl bg-white p-5 text-sm font-semibold text-slate-500">Aucun defi cree.</p> : null}
        {challenges.map((challenge) => (
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" key={challenge.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${challenge.is_active && !challenge.archived_at ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>{challenge.archived_at ? "Archive" : challenge.is_active ? "Visible aux eleves" : "Brouillon"}</span>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-extrabold text-cyan-900">{challenge.points} XP</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-extrabold text-brand-blue">{challenge.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{challenge.description}</p>
                <p className="mt-3 text-xs font-bold text-slate-500">Debut: {challenge.week_start} · {challenge.registrations} inscription(s) · {challenge.activeRegistrations} en cours · {challenge.submittedRegistrations} rapport(s)</p>
                <details className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700"><summary className="cursor-pointer font-extrabold">Voir les details</summary><p className="mt-2 whitespace-pre-line font-semibold">{challenge.instructions}</p><p className="mt-2 text-xs font-bold">Photo: {challenge.requires_photo ? "requise" : "optionnelle"} · Rapport: {challenge.requires_report ? "requis" : "optionnel"}</p></details>
              </div>
              <div className="flex shrink-0 gap-2">
                <button aria-label="Modifier le defi" className="rounded-lg border border-slate-200 p-2 text-brand-blue hover:bg-slate-50" onClick={() => void editChallenge(challenge)} type="button"><Pencil className="h-4 w-4" /></button>
                <button aria-label="Archiver le defi" className="rounded-lg border border-amber-200 p-2 text-amber-800 hover:bg-amber-50" disabled={Boolean(challenge.archived_at)} onClick={() => void updateChallenge(challenge.id, { archived: true }, "Defi archive.")} type="button"><Archive className="h-4 w-4" /></button>
                <button aria-label="Supprimer le defi" className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50" onClick={() => void deleteChallenge(challenge.id)} type="button"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
