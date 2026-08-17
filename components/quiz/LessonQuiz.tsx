"use client";

import { ArrowRight, RotateCcw, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CyberMascot } from "@/components/gamified/CyberMascot";
import { saveLessonProgress, syncPending } from "@/lib/offline/db";
import { playCelebrate, playCorrect, playLessonOpen, playWrong } from "@/lib/sounds";
import type { LessonQuizQuestion } from "@/lib/program";

type LessonQuizProps = {
  lessonId: string;
  moduleId: string;
  nextLesson?: { id: string; title: string };
  questions?: LessonQuizQuestion[];
  quiz: LessonQuizQuestion;
  userId: string;
  /** Admin walkthrough: answer everything without recording any progress. */
  preview?: boolean;
};

type Phase = "question" | "review" | "result";

function questionKey(question: LessonQuizQuestion, index: number) {
  return question.id ?? String(index);
}

export function LessonQuiz({ lessonId, moduleId, nextLesson, questions, quiz, userId, preview = false }: LessonQuizProps) {
  const quizQuestions = questions?.length ? questions : [quiz];
  const passThreshold = Math.ceil(quizQuestions.length * 0.7);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("question");
  const [passed, setPassed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(6);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentQuestion = quizQuestions[questionIndex];
  const isCorrect = selectedIndex === currentQuestion.correctIndex;
  const correctCount = Object.entries(answers).filter(([key, value]) => {
    const question = quizQuestions.find((item, index) => questionKey(item, index) === key);
    return question && value === question.correctIndex;
  }).length;

  // Play lesson-open sound once on mount
  useEffect(() => { playLessonOpen(); }, []);

  // Countdown timer when quiz is passed — keeps mascot visible for 6 s
  useEffect(() => {
    if (phase !== "result" || !passed) return;
    playCelebrate();
    setCountdown(6);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(countdownRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [phase, passed]);

  function submitAnswer() {
    if (selectedIndex === null) return;

    if (isCorrect) playCorrect(); else playWrong();
    setAnswers((current) => ({ ...current, [questionKey(currentQuestion, questionIndex)]: selectedIndex }));
    setPhase("review");
  }

  async function goToNext() {
    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex((index) => index + 1);
      setSelectedIndex(null);
      setPhase("question");
      return;
    }

    // Last question just answered — finalize the attempt.
    const finalAnswers = { ...answers, [questionKey(currentQuestion, questionIndex)]: selectedIndex! };
    const finalCorrectCount = Object.entries(finalAnswers).filter(([key, value]) => {
      const question = quizQuestions.find((item, index) => questionKey(item, index) === key);
      return question && value === question.correctIndex;
    }).length;
    const didPass = finalCorrectCount >= passThreshold;
    setPassed(didPass);

    if (!didPass || preview) {
      setPhase("result");
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    try {
      await saveLessonProgress({ userId, moduleId, lessonId, answers: finalAnswers });
      window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
      if (navigator.onLine) {
        await syncPending();
      }
      setPhase("result");
    } catch (error) {
      console.error("Lesson completion failed:", error);
      setSaveError(
        error instanceof Error
          ? error.message
          : "Impossible d'enregistrer ta progression."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function restart() {
    setQuestionIndex(0);
    setSelectedIndex(null);
    setAnswers({});
    setPhase("question");
    setPassed(false);
  }

  if (phase === "result") {
    if (passed) {
      return (
        <section className="grid gap-4 rounded-lg border-2 border-secondary bg-brand-sky p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
          <div className="relative overflow-hidden rounded-2xl border-2 border-green-600 bg-gradient-to-br from-green-50 via-cyan-50 to-violet-50 p-5 text-brand-ink shadow-[0_6px_0_0_rgba(22,163,74,1)]" role="status">
            <Sparkles className="absolute right-5 top-5 h-8 w-8 animate-pulse text-amber-500" aria-hidden />
            <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="animate-[bounce_1.4s_ease-in-out_infinite]"><CyberMascot mood="celebrate" size="lg" /></div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-green-700">Mission réussie !</p>
                <h3 className="mt-1 font-display text-2xl font-black">Bravo, ton énergie est au maximum !</h3>
                <p className="mt-2 font-bold leading-7 text-slate-700">Tu as obtenu {correctCount}/{quizQuestions.length} bonnes réponses.</p>
                <p className="mt-3 rounded-xl bg-white/70 p-3 font-semibold leading-6 text-slate-600">{nextLesson ? <>Je suis sûr que tu veux maintenant découvrir « {nextLesson.title} ». C&apos;est justement notre prochaine enquête.</> : <>Tu as terminé cette leçon et tu es prêt à poursuivre ton parcours CyberAmbassador.</>}</p>
                {countdown > 0 && (
                  <p className="mt-2 text-xs font-black uppercase tracking-widest text-green-600">
                    Coach Cyber reste avec toi encore {countdown}s…
                  </p>
                )}
              </div>
            </div>
          </div>
          <Link
            className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit ${
              countdown > 0 ? "opacity-60 pointer-events-none" : ""
            }`}
            href={nextLesson ? `/student/modules/${moduleId}/lesson/${nextLesson.id}` : `/student/modules/${moduleId}`}
            aria-disabled={countdown > 0}
          >
            {countdown > 0
              ? `Continuer dans ${countdown}s…`
              : nextLesson
                ? `Continuer vers « ${nextLesson.title} »`
                : "Continuer le parcours"}
            <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
          </Link>
        </section>
      );
    }

    return (
      <section className="grid gap-4 rounded-lg border-2 border-secondary bg-brand-sky p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
        <div className="grid gap-3 rounded-2xl border-2 border-red-500 bg-red-50 p-5 text-red-800 sm:grid-cols-[auto_1fr] sm:items-center" role="status">
          <CyberMascot mood="sad" size="lg" />
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-red-700">Pas encore assez d&apos;énergie</p>
            <h3 className="mt-1 font-display text-xl font-black">Tu as obtenu {correctCount}/{quizQuestions.length}.</h3>
            <p className="mt-2 font-bold leading-6">Il faut au moins {passThreshold}/{quizQuestions.length} bonnes réponses pour terminer cette leçon. Relis les explications, puis retente le quiz.</p>
          </div>
        </div>
        <button
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
          onClick={restart}
          type="button"
        >
          <RotateCcw className="h-4 w-4" /> Recommencer le quiz
        </button>
      </section>
    );
  }

  return (
    <section className="grid gap-4 rounded-lg border-2 border-secondary bg-brand-sky p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
      <div>
        <p className="text-sm font-black uppercase text-tertiary">Quiz de validation</p>
        <h2 className="mt-2 font-display text-xl font-black text-brand-ink">
          {currentQuestion.question}
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          {quizQuestions.length === 1 ? "Réponds correctement pour terminer la leçon." : `Obtiens au moins ${passThreshold}/${quizQuestions.length} bonnes réponses pour terminer la leçon.`}
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} /></div>
        <p className="mt-2 text-xs font-black uppercase tracking-widest text-tertiary">Question {questionIndex + 1} sur {quizQuestions.length}</p>
      </div>

      <div className="grid gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            className={
              "rounded-lg border-2 px-4 py-3 text-left font-bold transition " +
              (selectedIndex === index
                ? "border-brand-blue bg-white text-brand-blue"
                : "border-secondary bg-white/70 text-slate-700 hover:bg-white")
            }
            disabled={phase === "review"}
            key={option}
            onClick={() => setSelectedIndex(index)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>

      {phase === "review" ? (
        isCorrect ? (
          <div className="grid gap-3 rounded-lg border-2 border-green-600 bg-green-50 p-3 font-bold text-green-800 sm:grid-cols-[auto_1fr] sm:items-center" role="status">
            <CyberMascot mood="cheer" size="sm" />
            <p>Bonne réponse. {currentQuestion.explanation}</p>
          </div>
        ) : (
          <div className="grid gap-3 rounded-lg border-2 border-red-500 bg-red-50 p-3 font-bold text-red-800 sm:grid-cols-[auto_1fr] sm:items-center" role="status">
            <CyberMascot mood="sad" size="sm" />
            <div><p className="flex items-center gap-2"><XCircle aria-hidden className="h-5 w-5 shrink-0" />Pas tout à fait.</p><p className="mt-1 text-sm leading-6">{currentQuestion.explanation}</p></div>
          </div>
        )
      ) : null}

      {saveError && (
        <div
          className="rounded-lg border-2 border-red-500 bg-red-50 p-4 font-bold text-red-800"
          role="alert"
        >
          <p>Ta réponse est correcte, mais ta progression n&apos;a pas pu être enregistrée.</p>
          <p className="mt-2 text-sm">{saveError}</p>
          <button
            className="mt-3 rounded-lg bg-brand-blue px-4 py-2 font-black text-white"
            onClick={() => void goToNext()}
            type="button"
          >
            Réessayer l&apos;enregistrement
          </button>
        </div>
      )}
      {phase === "review" ? (
        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-primary px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
          disabled={isSaving}
          onClick={() => void goToNext()}
          type="button"
        >
          {isSaving ? "Enregistrement..." : questionIndex < quizQuestions.length - 1 ? "Question suivante" : "Voir mon résultat"} <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      ) : (
        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
          disabled={selectedIndex === null}
          onClick={submitAnswer}
          type="button"
        >
          Valider ma reponse
        </button>
      )}
    </section>
  );
}
