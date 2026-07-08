"use client";

import imageCompression from "browser-image-compression";
import { AlertTriangle, Camera, CheckCircle2, Save, WifiOff } from "lucide-react";
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
  onlineSubmissionsEnabled?: boolean;
  userId: string;
};

type SubmissionStatus = {
  tone: "success" | "error" | "offline";
  message: string;
};

export function ChallengeSubmissionForm({
  challenge,
  onlineSubmissionsEnabled = true,
  userId
}: ChallengeSubmissionFormProps) {
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
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

    if (!onlineSubmissionsEnabled) {
      setStatus({
        tone: "error",
        message:
          "Ce defi vient du mode demo local. Cree ou active un defi Supabase pour envoyer une vraie soumission en ligne."
      });
      return;
    }

    if (navigator.onLine) {
      const apiFormData = new FormData();
      apiFormData.set("challengeId", challenge.id);
      apiFormData.set("reportText", values.reportText);
      apiFormData.set("city", values.city);
      if (compressedPhoto) apiFormData.set("photo", compressedPhoto);

      try {
        const response = await fetch("/api/student/challenge-submissions", {
          method: "POST",
          body: apiFormData
        });

        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        if (response.ok) {
          reset();
          setPhoto(null);
          setStatus({
            tone: "success",
            message: "Soumission envoyee et en attente de revision."
          });
          return;
        }

        setStatus({
          tone: "error",
          message:
            result?.message ??
            "La soumission n'a pas ete envoyee. Verifie le defi actif et reessaie."
        });
        return;
      } catch {
        await queuePendingSync("challenge_submission", payload);

        window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
        reset();
        setPhoto(null);
        setStatus({
          tone: "offline",
          message:
            "Connexion instable: soumission enregistree localement et ajoutee a la file de synchronisation."
        });
        return;
      }
    }

    await queuePendingSync("challenge_submission", payload);

    window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
    reset();
    setPhoto(null);
    setStatus({
      tone: "offline",
      message: "Mode hors ligne: soumission ajoutee a la file de synchronisation."
    });
  }

  return (
    <form
      className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <p className="text-sm font-black uppercase text-primary">{challenge.title}</p>
        <h2 className="mt-2 break-words font-display text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
          Rapport et preuve
        </h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
          Le rapport doit faire au moins 100 caracteres. Les photos sont compressees
          cote client avant d&apos;etre ajoutees a la file hors ligne.
        </p>
        {!onlineSubmissionsEnabled ? (
          <p className="mt-4 rounded-lg border-2 border-secondary bg-[#fff4c2] p-3 text-sm font-black text-amber-900 shadow-[0_3px_0_0_rgba(88,96,98,1)]">
            Mode demo local: cette soumission ne peut pas etre envoyee a Supabase.
          </p>
        ) : null}
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
        <p
          className={
            status.tone === "success"
              ? "grid grid-cols-[auto_1fr] gap-2 rounded-lg border-2 border-secondary bg-[#d9fbe8] p-4 text-sm font-bold text-[#075f3f] shadow-[0_4px_0_0_rgba(88,96,98,1)]"
              : status.tone === "offline"
                ? "grid grid-cols-[auto_1fr] gap-2 rounded-lg border-2 border-secondary bg-[#fff4c2] p-4 text-sm font-bold text-amber-900 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                : "grid grid-cols-[auto_1fr] gap-2 rounded-lg border-2 border-secondary bg-red-50 p-4 text-sm font-bold text-red-800 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
          }
        >
          {status.tone === "success" ? (
            <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5" />
          ) : status.tone === "offline" ? (
            <WifiOff aria-hidden className="mt-0.5 h-5 w-5" />
          ) : (
            <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5" />
          )}
          <span>
            {status.message}
          </span>
        </p>
      ) : null}

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        <Save size={18} />
        {isSubmitting ? "Enregistrement..." : "Enregistrer la soumission"}
      </button>
    </form>
  );
}
