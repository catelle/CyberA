"use client";

import imageCompression from "browser-image-compression";
import { Camera, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { queuePendingSync } from "@/lib/offline/db";
import type { WeeklyChallenge } from "@/lib/program";

const challengeSubmissionSchema = z.object({
  reportText: z.string().trim().min(100, "Le rapport doit faire au moins 100 caracteres."),
  city: z.string().trim().min(2, "La ville est requise.")
});

type ChallengeSubmissionFormValues = z.infer<typeof challengeSubmissionSchema>;

type ChallengeSubmissionFormProps = {
  challenge: WeeklyChallenge;
  userId: string;
};

export function ChallengeSubmissionForm({ challenge, userId }: ChallengeSubmissionFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm<ChallengeSubmissionFormValues>({
    resolver: zodResolver(challengeSubmissionSchema),
    defaultValues: {
      city: "Yaounde",
      reportText: ""
    }
  });

  async function onSubmit(values: ChallengeSubmissionFormValues) {
    setStatus(null);

    let compressedPhoto: File | null = null;
    if (photo) {
      compressedPhoto = await imageCompression(photo, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true
      });
      setCompressedSize(compressedPhoto.size);
    }

    const payload = {
      userId,
      challengeId: challenge.id,
      reportText: values.reportText,
      city: values.city,
      photo: compressedPhoto
        ? {
            name: compressedPhoto.name,
            type: compressedPhoto.type,
            size: compressedPhoto.size,
            blob: compressedPhoto
          }
        : null,
      submittedAt: new Date().toISOString()
    };

    if (navigator.onLine) {
      const apiFormData = new FormData();
      apiFormData.set("challengeId", challenge.id);
      apiFormData.set("reportText", values.reportText);
      apiFormData.set("city", values.city);
      if (compressedPhoto) apiFormData.set("photo", compressedPhoto);

      const response = await fetch("/api/student/challenge-submissions", {
        method: "POST",
        body: apiFormData
      });

      if (response.ok) {
        reset();
        setPhoto(null);
        setStatus("Soumission envoyee et en attente de revision.");
        return;
      }
    }

    await queuePendingSync("challenge_submission", payload);

    window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
    reset();
    setPhoto(null);
    setStatus("Soumission enregistree localement et ajoutee a la file de synchronisation.");
  }

  return (
    <form className="grid gap-5 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className="text-sm font-black uppercase text-brand-gold">{challenge.title}</p>
        <h2 className="mt-2 text-2xl font-black text-brand-ink">Rapport et preuve</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Le rapport doit faire au moins 100 caracteres. Les photos sont compressees
          cote client avant d&apos;etre ajoutees a la file hors ligne.
        </p>
      </div>

      <div className="field">
        <label htmlFor="reportText">Rapport</label>
        <textarea
          className="min-h-40 rounded-lg border border-slate-200 p-3 outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
          id="reportText"
          {...register("reportText")}
        />
        {errors.reportText ? (
          <p className="text-sm font-bold text-red-700">{errors.reportText.message}</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="city">Ville</label>
        <input id="city" {...register("city")} />
        {errors.city ? (
          <p className="text-sm font-bold text-red-700">{errors.city.message}</p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="photo">Photo ou capture</label>
        <input
          accept="image/*"
          id="photo"
          onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
          type="file"
        />
        <p className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Camera size={16} />
          {compressedSize
            ? `Derniere photo compressee: ${Math.round(compressedSize / 1024)} KB`
            : "Objectif compression: moins de 500 KB"}
        </p>
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
        <Save size={18} />
        {isSubmitting ? "Enregistrement..." : "Enregistrer la soumission"}
      </button>
    </form>
  );
}
