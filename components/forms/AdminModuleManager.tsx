"use client";

import { Plus, Save } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import type { ModuleRow } from "@/lib/db/cybera";

type AdminModuleManagerProps = {
  modules: ModuleRow[];
};

export function AdminModuleManager({ modules }: AdminModuleManagerProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0]?.id ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitJson(url: string, formData: FormData) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      throw new Error(result?.message ?? "Action impossible.");
    }

    return result;
  }

  async function handleCreateModule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitJson("/api/admin/modules", new FormData(event.currentTarget));
      setStatus("Module cree.");
      event.currentTarget.reset();
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Action impossible.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCreateLesson(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await submitJson(
        `/api/admin/modules/${selectedModuleId}/lessons`,
        new FormData(event.currentTarget)
      );
      setStatus("Lecon ajoutee.");
      event.currentTarget.reset();
      router.refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Action impossible.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function toggleModule(module: ModuleRow) {
    setStatus(null);
    const response = await fetch(`/api/admin/modules/${module.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !module.is_published })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setStatus(response.ok ? "Publication mise a jour." : result?.message ?? "Action impossible.");
    router.refresh();
  }

  async function deleteModule(moduleId: string) {
    setStatus(null);
    const response = await fetch(`/api/admin/modules/${moduleId}`, {
      method: "DELETE"
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setStatus(response.ok ? "Module supprime." : result?.message ?? "Action impossible.");
    router.refresh();
  }

  return (
    <div className="grid gap-5">
      {status ? (
        <p className="rounded-lg bg-brand-sky p-4 text-sm font-bold text-brand-blue">
          {status}
        </p>
      ) : null}

      <section className="grid gap-4 rounded-lg bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-black uppercase text-brand-gold">Modules</p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            Creer un module
          </h2>
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateModule}>
          <div className="field">
            <label htmlFor="orderIndex">Ordre</label>
            <input id="orderIndex" min={1} name="orderIndex" required type="number" />
          </div>
          <div className="field">
            <label htmlFor="title">Titre</label>
            <input id="title" name="title" required />
          </div>
          <div className="field">
            <label htmlFor="subtitle">Sous-titre</label>
            <input id="subtitle" name="subtitle" />
          </div>
          <div className="field">
            <label htmlFor="color">Couleur</label>
            <input defaultValue="#1A5276" id="color" name="color" />
          </div>
          <div className="field md:col-span-2">
            <label htmlFor="description">Description</label>
            <textarea
              className="min-h-28 rounded-lg border border-slate-200 p-3"
              id="description"
              name="description"
            />
          </div>
          <label className="flex min-h-12 items-center gap-3 font-bold">
            <input name="isPublished" type="checkbox" value="true" />
            Publier
          </label>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 font-black text-white disabled:opacity-50"
            disabled={isSubmitting}
            type="submit"
          >
            <Plus size={18} />
            Creer
          </button>
        </form>
      </section>

      <section className="grid gap-4 rounded-lg bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-black uppercase text-brand-gold">Lecons</p>
          <h2 className="mt-2 text-2xl font-black text-brand-ink">
            Ajouter une lecon a un module
          </h2>
        </div>
        <form className="grid gap-4" onSubmit={handleCreateLesson}>
          <div className="field">
            <label htmlFor="moduleId">Module</label>
            <select
              id="moduleId"
              onChange={(event) => setSelectedModuleId(event.target.value)}
              value={selectedModuleId}
            >
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.order_index}. {module.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="field">
              <label htmlFor="lessonOrder">Ordre</label>
              <input id="lessonOrder" min={1} name="orderIndex" required type="number" />
            </div>
            <div className="field">
              <label htmlFor="lessonTitle">Titre</label>
              <input id="lessonTitle" name="title" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contentText">Contenu</label>
            <textarea
              className="min-h-40 rounded-lg border border-slate-200 p-3"
              id="contentText"
              name="contentText"
              required
            />
          </div>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 font-black text-white disabled:opacity-50"
            disabled={isSubmitting || !selectedModuleId}
            type="submit"
          >
            <Save size={18} />
            Ajouter la lecon
          </button>
        </form>
      </section>

      <section className="grid gap-4">
        {modules.map((module) => (
          <article className="rounded-lg bg-white p-5 shadow-sm" key={module.id}>
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">
                  Module {module.order_index}
                </p>
                <h2 className="mt-2 text-xl font-black text-brand-blue">
                  {module.title}
                </h2>
                <p className="mt-2 leading-7 text-slate-600">{module.description}</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-500">
                {module.is_published ? "publie" : "brouillon"}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                className="min-h-12 rounded-lg border border-slate-200 px-4 font-black text-brand-blue"
                onClick={() => toggleModule(module)}
                type="button"
              >
                {module.is_published ? "Depublier" : "Publier"}
              </button>
              <button
                className="min-h-12 rounded-lg bg-red-700 px-4 font-black text-white"
                onClick={() => deleteModule(module.id)}
                type="button"
              >
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
