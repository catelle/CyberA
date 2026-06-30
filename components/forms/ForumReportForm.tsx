"use client";

import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { queuePendingSync } from "@/lib/offline/db";

const forumReportSchema = z.object({
  type: z.enum(["scam", "bullying", "misinformation", "other"]),
  platform: z.enum(["Facebook", "WhatsApp", "TikTok", "Instagram", "Other"]),
  target: z.string().trim().min(3, "Ajoute un lien, handle ou numero masque."),
  description: z.string().trim().min(50, "La description doit faire au moins 50 caracteres.")
});

type ForumReportFormValues = z.infer<typeof forumReportSchema>;

export function ForumReportForm({ userId }: { userId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm<ForumReportFormValues>({
    resolver: zodResolver(forumReportSchema),
    defaultValues: {
      type: "scam",
      platform: "WhatsApp",
      target: "",
      description: ""
    }
  });

  async function onSubmit(values: ForumReportFormValues) {
    if (navigator.onLine) {
      const response = await fetch("/api/student/forum-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        reset();
        setStatus("Rapport envoye a l'equipe de moderation.");
        return;
      }

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      setStatus(result?.message ?? "Rapport garde localement pour synchronisation.");
    }

    await queuePendingSync("forum_report", {
      userId,
      ...values,
      createdAt: new Date().toISOString()
    });

    window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
    reset();
    setStatus("Rapport enregistre localement. Il sera envoye quand la synchronisation sera disponible.");
  }

  return (
    <form className="grid gap-5 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-lg bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
        Ne mets pas de nom complet, de numero non masque ou d&apos;information privee dans
        un rapport public.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="field">
          <label htmlFor="type">Type</label>
          <select id="type" {...register("type")}>
            <option value="scam">Scam</option>
            <option value="bullying">Harcelement</option>
            <option value="misinformation">Desinformation</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="platform">Plateforme</label>
          <select id="platform" {...register("platform")}>
            <option>Facebook</option>
            <option>WhatsApp</option>
            <option>TikTok</option>
            <option>Instagram</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="target">Lien, handle ou numero masque</label>
        <input id="target" {...register("target")} />
        {errors.target ? (
          <p className="text-sm font-bold text-red-700">{errors.target.message}</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          className="min-h-36 rounded-lg border border-slate-200 p-3 outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
          id="description"
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-sm font-bold text-red-700">{errors.description.message}</p>
        ) : null}
      </div>

      {status ? (
        <p className="rounded-lg bg-brand-sky p-4 text-sm font-bold text-brand-blue">
          {status}
        </p>
      ) : null}

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 font-black text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        <ShieldAlert size={18} />
        {isSubmitting ? "Enregistrement..." : "Enregistrer le rapport"}
      </button>
    </form>
  );
}
