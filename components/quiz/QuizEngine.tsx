"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CyberMascot, MascotCoach } from "@/components/gamified/CyberMascot";
import { ModuleFeedbackForm } from "@/components/forms/ModuleFeedbackForm";
import { cacheModuleForOffline, saveQuizProgress } from "@/lib/offline/db";
import { playCelebrate, playCorrect, playLessonOpen, playWrong } from "@/lib/sounds";
import type { ProgramModule } from "@/lib/program";

type QuizEngineProps = {
  module: ProgramModule;
  userId: string;
  /** Admin walkthrough: answer everything without recording any progress. */
  preview?: boolean;
};

export function QuizEngine({ module, userId, preview = false }: QuizEngineProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const currentQuestion = module.quiz[currentIndex];
  const correctAnswers = useMemo(
    () =>
      module.quiz.filter(
        (question) => answers[question.id] === question.correctIndex
      ).length,
    [answers, module.quiz]
  );
  const scorePercent =
    module.quiz.length > 0 ? Math.round((correctAnswers / module.quiz.length) * 100) : 0;
  const passed = scorePercent >= 70;
  const earnedCorrectPoints = module.quiz.reduce(
    (sum, question) =>
      sum + (answers[question.id] === question.correctIndex ? question.points : 0),
    0
  );
  const pointsEarned = passed ? earnedCorrectPoints : 0;

  useEffect(() => {
    cacheModuleForOffline(module).catch(() => undefined);
    playLessonOpen();
  }, [module]);

  async function completeQuiz(nextAnswers: Record<string, number>) {
    const nextCorrectAnswers = module.quiz.filter(
      (question) => nextAnswers[question.id] === question.correctIndex
    ).length;
    const nextScorePercent = Math.round((nextCorrectAnswers / module.quiz.length) * 100);
    const nextPassed = nextScorePercent >= 70;
    const nextEarnedPoints = module.quiz.reduce(
      (sum, question) =>
        sum + (nextAnswers[question.id] === question.correctIndex ? question.points : 0),
      0
    );

    if (preview) {
      setStatus(
        "Apercu formateur: la tentative n'est pas enregistree et n'attribue aucun point."
      );
      setModuleCompleted(false);
      setIsComplete(true);
      if (nextPassed) playCelebrate();
      return;
    }

    const savedProgress = await saveQuizProgress({
      progressVersion: 3,
      userId,
      moduleId: module.id,
      // saveQuizProgress merges the lessons that were genuinely opened from
      // IndexedDB. Completing a quiz must not mark every lesson as read.
      lessonsRead: [],
      lessonQuizAnswers: {},
      quizAnswers: nextAnswers,
      quizScore: nextScorePercent,
      passed: nextPassed,
      pointsEarned: nextPassed ? nextEarnedPoints : 0,
      updatedAt: new Date()
    });
    const completedEveryLesson =
      module.lessons.length > 0 &&
      module.lessons.every((lesson) =>
        savedProgress.lessonsRead.includes(lesson.id)
      );
    const completedModule = nextPassed && completedEveryLesson;

    window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
    if (!nextPassed) {
      router.replace(`/student/modules/${module.id}`);
      return;
    }
    if (nextPassed) playCelebrate();
    setStatus(
      completedModule
        ? "Progression enregistree localement. Les points seront synchronises en ligne."
        : nextPassed
          ? "Quiz reussi. Termine toutes les lecons pour valider le module et gagner les points."
          : "Tentative enregistree localement. Tu peux recommencer pour atteindre 70%."
    );
    setModuleCompleted(completedModule);
    setFeedbackOpen(completedModule);
    setIsComplete(true);
  }

  async function handleNext() {
    if (selectedIndex === null) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    if (isCorrect) playCorrect(); else playWrong();

    const nextAnswers = { ...answers, [currentQuestion.id]: selectedIndex };
    setAnswers(nextAnswers);

    if (currentIndex === module.quiz.length - 1) {
      await completeQuiz(nextAnswers);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedIndex(null);
  }

  function resetQuiz() {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers({});
    setIsComplete(false);
    setModuleCompleted(false);
    setStatus(null);
  }

  if (isComplete) {
    return (
      <div className="grid gap-5">
        <section className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">Resultat</p>
            <h2 className="mt-2 break-words font-display text-3xl font-black leading-tight text-brand-ink">
              {scorePercent}% - {moduleCompleted
                ? "Module reussi"
                : passed
                  ? "Quiz reussi"
                  : "Encore un effort"}
            </h2>
            <p className="mt-3 font-semibold leading-7 text-slate-600">
              {correctAnswers}/{module.quiz.length} bonnes reponses.{" "}
              {moduleCompleted
                ? `${pointsEarned} points sont prets a etre synchronises.`
                : passed
                  ? "Termine les lecons restantes pour valider le module."
                : "Relis les explications et retente le quiz."}
            </p>
          </div>
          <CyberMascot mood={passed ? "celebrate" : "focus"} size="lg" />
        </div>

        {status ? (
          <p className="rounded-lg border-2 border-secondary bg-brand-sky p-4 text-sm font-bold text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)]">
            {status}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-white px-4 font-black text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-sky sm:w-fit"
            onClick={resetQuiz}
            type="button"
          >
            <RotateCcw size={18} />
            Recommencer
          </button>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
            href={preview ? `/student/modules/${module.id}` : "/student/challenges"}
          >
            {preview ? "Retour au module" : "Voir le defi"}
          </Link>
        </div>
        </section>
        {moduleCompleted && !preview && feedbackOpen ? (
          <div className="fixed inset-0 z-[250] grid place-items-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label="Evaluation du module">
            <div className="my-auto w-full max-w-2xl">
              <div className="mb-3 flex justify-end">
                <button className="rounded-lg bg-white px-4 py-2 text-sm font-black text-brand-blue" onClick={() => setFeedbackOpen(false)} type="button">Plus tard</button>
              </div>
              <ModuleFeedbackForm moduleId={module.id} onSubmitted={() => window.setTimeout(() => setFeedbackOpen(false), 1200)} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_21rem] lg:items-center">
        <div>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-sm font-black uppercase text-tertiary">
              Question {currentIndex + 1} de {module.quiz.length}
            </p>
            <p className="text-sm font-bold text-slate-500">Score minimum: 70%</p>
          </div>
          <div className="progress-sheen mt-3 h-3 rounded-full bg-slate-100">
            <div
              className="progress-fill-animate h-3 rounded-full bg-[#ffcc32]"
              style={{
                width: `${Math.round(((currentIndex + 1) / module.quiz.length) * 100)}%`
              }}
            />
          </div>
        </div>
        <MascotCoach mascotMood={selectedIndex === null ? "focus" : "cheer"}>
          {selectedIndex === null
            ? "Choisis la meilleure reponse."
            : "Lis l'explication, puis continue."}
        </MascotCoach>
      </div>

      <div>
        <h2 className="break-words font-display text-2xl font-black leading-tight text-brand-ink">
          {currentQuestion.question}
        </h2>
        <div className="mt-5 grid gap-3">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isCorrect = optionIndex === currentQuestion.correctIndex;
            const showFeedback = selectedIndex !== null;

            return (
              <button
                className={
                  showFeedback && isCorrect
                    ? "flex min-h-12 items-center justify-between gap-3 rounded-lg border-2 border-secondary bg-green-50 p-4 text-left font-bold text-green-800 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                    : showFeedback && isSelected
                      ? "flex min-h-12 items-center justify-between gap-3 rounded-lg border-2 border-secondary bg-red-50 p-4 text-left font-bold text-red-800 shadow-[0_4px_0_0_rgba(88,96,98,1)]"
                      : "min-h-12 rounded-lg border-2 border-secondary bg-white p-4 text-left font-bold text-slate-700 shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-0.5 hover:bg-brand-sky"
                }
                disabled={showFeedback}
                key={option}
                onClick={() => setSelectedIndex(optionIndex)}
                type="button"
              >
                <span>{option}</span>
                {showFeedback && isCorrect ? <CheckCircle2 size={20} /> : null}
                {showFeedback && isSelected && !isCorrect ? <XCircle size={20} /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {selectedIndex !== null ? (
        <p className="rounded-lg border-2 border-secondary bg-tertiary-fixed p-4 text-sm font-bold leading-6 text-tertiary shadow-[0_4px_0_0_rgba(88,96,98,1)]">
          {currentQuestion.explanation}
        </p>
      ) : null}

      <button
        className="min-h-12 rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
        disabled={selectedIndex === null}
        onClick={handleNext}
        type="button"
      >
        {currentIndex === module.quiz.length - 1 ? "Terminer" : "Question suivante"}
      </button>
    </section>
  );
}
