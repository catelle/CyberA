"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, XCircle, Zap } from "lucide-react";
import { useState } from "react";

import { CyberMascot, MascotCoach } from "@/components/gamified/CyberMascot";
import { playCelebrate, playCorrect, playLessonOpen, playWrong } from "@/lib/sounds";

type StrikeQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type StrikeResult = {
  score: number;
  total: number;
  passed: boolean;
  pointsAwarded: number;
};

type Phase = "start" | "loading" | "playing" | "submitting" | "result";

export function StrikeGame() {
  const [phase, setPhase] = useState<Phase>("start");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<StrikeQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<StrikeResult | null>(null);

  const currentQuestion = questions[questionIndex];

  async function startStrike() {
    setPhase("loading");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/student/strike/start", { method: "POST" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(data.message ?? "Impossible de demarrer le Strike.");
        setPhase("start");
        return;
      }
      playLessonOpen();
      setAttemptId(data.attemptId);
      setQuestions(data.questions);
      setQuestionIndex(0);
      setSelectedIndex(null);
      setAnswers({});
      setResult(null);
      setPhase("playing");
    } catch {
      setErrorMessage("Le Strike est momentanement indisponible.");
      setPhase("start");
    }
  }

  function selectOption(optionIndex: number) {
    if (selectedIndex !== null) return;
    setSelectedIndex(optionIndex);
    if (optionIndex === currentQuestion.correctIndex) playCorrect(); else playWrong();
  }

  async function goToNext() {
    if (selectedIndex === null) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: selectedIndex };
    setAnswers(nextAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
      setSelectedIndex(null);
      return;
    }

    setPhase("submitting");
    try {
      const response = await fetch("/api/student/strike/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attemptId, answers: nextAnswers })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(data.message ?? "Impossible d'enregistrer le Strike.");
        setPhase("playing");
        return;
      }
      if (data.passed) playCelebrate();
      setResult(data);
      setPhase("result");
    } catch {
      setErrorMessage("Le Strike est momentanement indisponible.");
      setPhase("playing");
    }
  }

  if (phase === "result" && result) {
    return (
      <section className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-tertiary">Resultat du Strike</p>
            <h2 className="mt-2 break-words font-display text-3xl font-black leading-tight text-brand-ink">
              {result.score}/{result.total} — {result.passed ? "Strike reussi !" : "Presque !"}
            </h2>
            <p className="mt-3 font-semibold leading-7 text-slate-600">
              {result.passed
                ? `Bravo, tu gagnes ${result.pointsAwarded} XP bonus. Ton classement va bouger.`
                : "Il faut au moins 7/10 bonnes reponses pour gagner les 50 XP. Retente quand tu veux, sans pression."}
            </p>
          </div>
          <CyberMascot mood={result.passed ? "celebrate" : "focus"} size="lg" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-white px-4 font-black text-brand-blue shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-sky sm:w-fit"
            onClick={() => void startStrike()}
            type="button"
          >
            <RotateCcw size={18} /> Retenter un Strike
          </button>
          <Link
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-secondary bg-brand-blue px-4 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink sm:w-fit"
            href="/student/leaderboard"
          >
            Voir le classement
          </Link>
        </div>
      </section>
    );
  }

  if (phase === "playing" || phase === "submitting") {
    return (
      <section className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_21rem] lg:items-center">
          <div>
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <p className="text-sm font-black uppercase text-tertiary">
                Question {questionIndex + 1} de {questions.length}
              </p>
              <p className="text-sm font-bold text-slate-500">7/10 pour gagner 50 XP</p>
            </div>
            <div className="progress-sheen mt-3 h-3 rounded-full bg-slate-100">
              <div
                className="progress-fill-animate h-3 rounded-full bg-[#ffcc32]"
                style={{ width: `${Math.round(((questionIndex + 1) / questions.length) * 100)}%` }}
              />
            </div>
          </div>
          <MascotCoach mascotMood={selectedIndex === null ? "focus" : "cheer"}>
            {selectedIndex === null ? "Choisis la meilleure reponse." : "Lis l'explication, puis continue."}
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
                  onClick={() => selectOption(optionIndex)}
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

        {errorMessage ? (
          <p className="rounded-lg border-2 border-red-500 bg-red-50 p-4 text-sm font-bold text-red-800">{errorMessage}</p>
        ) : null}

        <button
          className="min-h-12 rounded-lg border-2 border-secondary bg-brand-blue px-5 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
          disabled={selectedIndex === null || phase === "submitting"}
          onClick={() => void goToNext()}
          type="button"
        >
          {phase === "submitting" ? "Enregistrement..." : questionIndex === questions.length - 1 ? "Terminer le Strike" : "Question suivante"}
        </button>
      </section>
    );
  }

  return (
    <section className="grid gap-5 rounded-lg border-2 border-secondary bg-white p-4 text-center shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:p-8">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-tertiary-fixed text-tertiary">
        <Zap aria-hidden className="h-8 w-8" />
      </div>
      <div>
        <h1 className="font-display text-2xl font-black text-brand-ink">Strike : 10 questions, +50 XP</h1>
        <p className="mx-auto mt-3 max-w-xl font-semibold leading-7 text-slate-600">
          Un mini-quiz bonus, entierement optionnel, avec des questions choisies au hasard parmi les lecons que tu as deja terminees. Obtiens au moins 7/10 pour gagner 50 XP et grimper au classement. Tu peux le retenter autant de fois que tu veux.
        </p>
      </div>
      {errorMessage ? (
        <p className="mx-auto max-w-xl rounded-lg border-2 border-red-500 bg-red-50 p-4 text-sm font-bold text-red-800">{errorMessage}</p>
      ) : null}
      <button
        className="mx-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-6 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
        disabled={phase === "loading"}
        onClick={() => void startStrike()}
        type="button"
      >
        {phase === "loading" ? "Preparation..." : "Lancer le Strike"} <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
