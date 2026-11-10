"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Student = { id: string; name: string; programTrack: "ambassador" | "scholarship" };
type Module = { id: string; order_index: number; title: string; is_published: boolean };

export function ScholarshipAssignmentManager({ students, modules }: { students: Student[]; modules: Module[] }) {
  const router = useRouter();
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const publishedModules = useMemo(() => modules.filter((module) => module.is_published).sort((a, b) => a.order_index - b.order_index), [modules]);

  function toggle(value: string, values: string[], setter: (next: string[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  async function save() {
    setBusy(true); setMessage(null);
    const response = await fetch("/api/admin/scholarships/assign", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userIds: studentIds, moduleIds })
    });
    const result = await response.json().catch(() => null);
    setBusy(false); setMessage(result?.message ?? "Action terminee.");
    if (response.ok) { setStudentIds([]); router.refresh(); }
  }

  return (
    <section className="rounded-xl border-2 border-primary/20 bg-primary-fixed p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-primary">Bourse des 100</p>
      <h2 className="mt-1 font-display text-2xl font-black text-brand-ink">Marquer les boursiers et attribuer leurs modules</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">Selectionne jusqu&apos;a 100 eleves, puis les modules qui composeront leur parcours certifiant.</p>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div><div className="flex items-center justify-between"><h3 className="font-black text-brand-blue">Eleves ({studentIds.length})</h3><button className="text-sm font-black text-primary" onClick={() => setStudentIds(studentIds.length === students.length ? [] : students.map((student) => student.id))} type="button">{studentIds.length === students.length ? "Tout retirer" : "Tout selectionner"}</button></div>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto rounded-lg border border-primary/20 bg-white p-3">{students.map((student) => <label className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-primary-fixed" key={student.id}><input checked={studentIds.includes(student.id)} onChange={() => toggle(student.id, studentIds, setStudentIds)} type="checkbox"/><span className="font-bold text-slate-700">{student.name}</span>{student.programTrack === "scholarship" ? <span className="ml-auto rounded-full bg-rose-100 px-2 py-1 text-[10px] font-black uppercase text-primary">100 Scholar</span> : null}</label>)}</div>
        </div>
        <div><h3 className="font-black text-brand-blue">Modules attribues ({moduleIds.length})</h3>
          <div className="mt-3 space-y-2 rounded-lg border border-primary/20 bg-white p-3">{publishedModules.map((module) => <label className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-primary-fixed" key={module.id}><input checked={moduleIds.includes(module.id)} onChange={() => toggle(module.id, moduleIds, setModuleIds)} type="checkbox"/><span className="font-bold text-slate-700">Module {module.order_index} · {module.title}</span></label>)}</div>
        </div>
      </div>
      {message ? <p className="mt-4 rounded-lg bg-white p-3 text-sm font-bold text-slate-700">{message}</p> : null}
      <button className="mt-5 min-h-12 rounded-lg bg-primary px-5 font-black text-white disabled:opacity-50" disabled={busy || !studentIds.length || !moduleIds.length} onClick={save} type="button">Marquer comme 100 Scholars et enregistrer l&apos;acces</button>
    </section>
  );
}
