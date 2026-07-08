"use client";

import Link from "next/link";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CyberMascot, MascotCoach } from "@/components/gamified/CyberMascot";
import { cacheModuleForOffline, saveQuizProgress } from "@/lib/offline/db";
import type { ProgramModule } from "@/lib/program";

type QuizEngineProps = {
  module: ProgramModule;
  userId: string;
};

export function QuizEngine({ module, userId }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
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
  const totalPoints = module.quiz.reduce((sum, question) => sum + question.points, 0);
  const pointsEarned = passed ? totalPoints : 0;

  useEffect(() => {
    cacheModuleForOffline(module).catch(() => undefined);
  }, [module]);

  async function completeQuiz(nextAnswers: Record<string, number>) {
    const nextCorrectAnswers = module.quiz.filter(
      (question) => nextAnswers[question.id] === question.correctIndex
    ).length;
    const nextScorePercent = Math.round((nextCorrectAnswers / module.quiz.length) * 100);
    const nextPassed = nextScorePercent >= 70;

    await saveQuizProgress({
      userId,
      moduleId: module.id,
      lessonsRead: module.lessons.map((lesson) => lesson.id),
      quizAnswers: nextAnswers,
      quizScore: nextScorePercent,
      passed: nextPassed,
      pointsEarned: nextPassed ? totalPoints : 0,
      updatedAt: new Date()
    });

    window.dispatchEvent(new CustomEvent("cybera:pending-sync-changed"));
    setStatus(
      nextPassed
        ? "Progression enregistree localement. Les points seront synchronises en ligne."
        : "Tentative enregistree localement. Tu peux recommencer pour atteindre 70%."
    );
    setIsComplete(true);
  }

  async function handleNext() {
    if (selectedIndex === null) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: selectedIndex
    };
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
    setStatus(null);
  }

  if (isComplete) {
    return (
      <section className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">Resultat</p>
            <h2 className="mt-2 break-words font-display text-3xl font-black leading-tight text-brand-ink">
              {scorePercent}% - {passed ? "Module reussi" : "Encore un effort"}
            </h2>
            <p className="mt-3 font-semibold leading-7 text-slate-600">
              {correctAnswers}/{module.quiz.length} bonnes reponses.{" "}
              {passed
                ? `${pointsEarned} points sont prets a etre synchronises.`
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
            href="/student/challenges"
          >
            Voir le defi
          </Link>
        </div>
      </section>
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
