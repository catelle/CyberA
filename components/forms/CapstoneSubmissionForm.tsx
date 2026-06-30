"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { queuePendingSync } from "@/lib/offline/db";

const capstoneSubmissionSchema = z.object({
  title: z.string().trim().min(5, "Le titre est trop court."),
  actionType: z.enum(["whatsapp_broadcast", "school_talk", "social_post", "other"]),
  description: z.string().trim().min(80, "La description doit faire au moins 80 caracteres."),
  reachCount: z.coerce.number().int().min(1, "Indique au moins une personne touchee.")
});

type CapstoneSubmissionFormValues = z.infer<typeof capstoneSubmissionSchema>;

export function CapstoneSubmissionForm({ userId }: { userId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm<CapstoneSubmissionFormValues>({
    resolver: zodResolver(capstoneSubmissionSchema),
    defaultValues: {
      title: "",
      actionType: "school_talk",
      description: "",
      reachCount: 1
    }
  });

  async function onSubmit(values: CapstoneSubmissionFormValues) {
    if (navigator.onLine) {
      const response = await fetch("/api/student/capstone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        reset();
        setStatus("Projet capstone envoye a l'equipe programme.");
        return;
      }
    }

    await queuePendingSync("capstone_submission", {
      userId,
      ...values,
      submittedAt: new Date().toISOString()
    });

    window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
    reset();
    setStatus("Projet capstone enregistre localement et pret pour synchronisation.");
  }

  return (
    <form className="grid gap-5 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className="text-sm font-black uppercase text-brand-gold">Projet communautaire</p>
        <h2 className="mt-2 text-2xl font-black text-brand-ink">
          Soumettre une action mesurable
        </h2>
      </div>

      <div className="field">
        <label htmlFor="title">Titre</label>
        <input id="title" {...register("title")} />
        {errors.title ? (
          <p className="text-sm font-bold text-red-700">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="actionType">Type d&apos;action</label>
        <select id="actionType" {...register("actionType")}>
          <option value="whatsapp_broadcast">Diffusion WhatsApp</option>
          <option value="school_talk">Causerie scolaire</option>
          <option value="social_post">Post social</option>
          <option value="other">Autre</option>
        </select>
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

      <div className="field">
        <label htmlFor="reachCount">Personnes touchees</label>
        <input id="reachCount" min={1} type="number" {...register("reachCount")} />
        {errors.reachCount ? (
          <p className="text-sm font-bold text-red-700">{errors.reachCount.message}</p>
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
        <Send size={18} />
        {isSubmitting ? "Enregistrement..." : "Soumettre"}
      </button>
    </form>
  );
}
