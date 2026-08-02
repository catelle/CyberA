"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { saveLessonProgress, syncPending } from "@/lib/offline/db";
import type { LessonQuizQuestion } from "@/lib/program";

type LessonQuizProps = {
  lessonId: string;
  moduleId: string;
  quiz: LessonQuizQuestion;
  userId: string;
};

export function LessonQuiz({ lessonId, moduleId, quiz, userId }: LessonQuizProps) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<"passed" | "failed" | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function submitAnswer() {
    if (selectedIndex === null || isSaving) return;

    if (selectedIndex !== quiz.correctIndex) {
      setResult("failed");
      router.replace(`/student/modules/${moduleId}/lesson/${lessonId}`);
      return;
    }

    setIsSaving(true);

    try {
      await saveLessonProgress({
        userId,
        moduleId,
        lessonId,
        selectedIndex
      });
      window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
      if (navigator.onLine) {
        await syncPending();
      }
      setResult("passed");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="grid gap-4 rounded-lg border-2 border-secondary bg-brand-sky p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
      <div>
        <p className="text-sm font-black uppercase text-tertiary">Quiz de validation</p>
        <h2 className="mt-2 font-display text-xl font-black text-brand-ink">
          {quiz.question}
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          La lecon sera marquee comme terminee uniquement apres une bonne reponse.
        </p>
      </div>

      <div className="grid gap-3">
        {quiz.options.map((option, index) => (
          <button
            className={
              "rounded-lg border-2 px-4 py-3 text-left font-bold transition " +
              (selectedIndex === index
                ? "border-brand-blue bg-white text-brand-blue"
                : "border-secondary bg-white/70 text-slate-700 hover:bg-white")
            }
            disabled={result === "passed"}
            key={option}
            onClick={() => {
              setSelectedIndex(index);
              setResult(null);
            }}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>

      {result ? (
        <div
          className={
            "flex items-start gap-2 rounded-lg border-2 p-3 font-bold " +
            (result === "passed"
              ? "border-green-600 bg-green-50 text-green-800"
              : "border-red-500 bg-red-50 text-red-800")
          }
          role="status"
        >
          {result === "passed" ? (
            <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <XCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
          )}
          <p>
            {result === "passed"
              ? `Bonne reponse. ${quiz.explanation} La lecon est maintenant fermee.`
              : "Ce n'est pas la bonne reponse. Relis la lecon puis essaie encore."}
          </p>
        </div>
      ) : null}

      {result !== "passed" ? (
        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
          disabled={selectedIndex === null || isSaving}
          onClick={() => void submitAnswer()}
          type="button"
        >
          {isSaving ? "Enregistrement..." : "Valider ma reponse"}
        </button>
      ) : (
        <Link
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
          href={`/student/modules/${moduleId}`}
        >
          Continuer le parcours
        </Link>
      )}
    </section>
  );
}
