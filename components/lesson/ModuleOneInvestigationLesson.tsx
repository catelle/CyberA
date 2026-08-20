"use client";

/* eslint-disable react/no-unescaped-entities -- French investigative copy intentionally uses apostrophes. */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { CyberMascot } from "@/components/gamified/CyberMascot";
import type { InvestigationLesson } from "@/lib/curriculum/module-one-investigations";
import { SoundToggleButton } from "@/components/lesson/SoundToggleButton";
import {
  playCelebrate,
  playCorrect,
  playLessonOpen,
  playWrong,
  startAmbientLoop,
  stopAmbientLoop,
} from "@/lib/sounds";

type Props = {
  lesson: InvestigationLesson;
  moduleId: string;
  canComplete: boolean;
  startImmediately?: boolean;
};
const MIN_SCENE_SECONDS = 15;

const glossary = [
  ["chiffrement", "une façon de rendre un message illisible sans la bonne clé"],
  [
    "métadonnée",
    "une information sur le message, comme son heure ou son destinataire",
  ],
  [
    "algorithme",
    "une suite d'étapes utilisée par un système pour prendre une décision",
  ],
  ["signal", "une action mesurable qui donne un indice au système"],
  ["score", "un nombre utilisé pour comparer plusieurs possibilités"],
  ["classement", "l'ordre choisi pour afficher les contenus"],
  ["engagement", "une réaction mesurable : commenter, partager ou aimer"],
  [
    "viralité",
    "la circulation rapide d'un contenu entre de nombreuses personnes",
  ],
  ["feed", "le fil de publications affiché sur l'écran"],
  ["stories", "des publications temporaires affichées séparément du fil"],
  ["reels", "de courtes vidéos proposées dans un flux continu"],
  ["explore", "l'espace Instagram qui recommande de nouveaux contenus"],
  ["crawling", "l'exploration automatique des pages et de leurs liens"],
  ["index", "une liste organisée de pages déjà découvertes"],
  ["intention", "ce que la personne cherche réellement à obtenir"],
  ["sponsorisé", "payé pour obtenir un emplacement publicitaire"],
  ["modèle de langage", "un système entraîné à prédire la suite d'un texte"],
  ["paramètre", "une valeur interne ajustée pendant l'entraînement de l'IA"],
  [
    "hallucination",
    "une information inventée par l'IA mais présentée de façon crédible",
  ],
  ["prompt", "l'instruction ou la question donnée à une IA"],
  ["cookie", "un petit identifiant enregistré par un site dans le navigateur"],
  [
    "adresse IP",
    "le numéro utilisé pour acheminer les données vers une connexion Internet",
  ],
  ["empreinte passive", "une trace collectée sans publication volontaire"],
  ["freemium", "un service gratuit dont certaines fonctions sont payantes"],
  [
    "audience",
    "le groupe de personnes qu'un contenu ou une publicité cherche à atteindre",
  ],
  [
    "modèle économique",
    "la manière dont un service gagne l'argent nécessaire à son fonctionnement",
  ],
  [
    "consentement",
    "un accord libre et informé avant une action concernant une personne",
  ],
] as const;

export function ModuleOneInvestigationLesson({
  lesson,
  moduleId,
  canComplete,
  startImmediately = false,
}: Props) {
  const [started, setStarted] = useState(startImmediately);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [toast, setToast] = useState<"good" | "bad" | "done" | null>(null);
  const scene = lesson.scenes[sceneIndex];
  const answered = scene.correct === undefined || choice === scene.correct;
  const complete = sceneIndex === lesson.scenes.length - 1;
  const timeReady = sceneIndex === 0 || seconds >= MIN_SCENE_SECONDS;
  const remaining = Math.max(0, MIN_SCENE_SECONDS - seconds);
  const sceneCopy =
    `${scene.title} ${scene.narration} ${scene.evidence}`.toLocaleLowerCase(
      "fr",
    );
  const newWords = glossary
    .filter(([term]) => sceneCopy.includes(term.toLocaleLowerCase("fr")))
    .slice(0, 3);
  const phase = scene.eyebrow.includes("Observer")
    ? "observe"
    : scene.eyebrow.includes("Comprendre")
      ? "understand"
      : scene.eyebrow.includes("Vérifier")
        ? "verify"
        : "other";
  const evidence = scene.evidence.replace(/^Point de départ\s*:\s*/i, "");

  useEffect(() => {
    setChoice(null);
    setSeconds(0);
    setToast(null);
    if (sceneIndex === 0) return;
    const timer = window.setInterval(
      () => setSeconds((value) => Math.min(MIN_SCENE_SECONDS, value + 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [sceneIndex]);

  useEffect(() => stopAmbientLoop, []);

  const openLesson = () => {
    playLessonOpen();
    startAmbientLoop();
    setStarted(true);
  };

  const choose = (value: number) => {
    setChoice(value);
    const correct = value === scene.correct;
    if (correct) {
      playCorrect();
      setToast("good");
    } else {
      playWrong();
      setToast("bad");
    }
    window.setTimeout(() => setToast(null), 6500);
  };

  const goNext = () => {
    if (!answered || !timeReady || complete) return;
    if (sceneIndex === lesson.scenes.length - 2) {
      playCelebrate();
      setToast("done");
      window.setTimeout(() => setToast(null), 8000);
    }
    setSceneIndex((value) => value + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!started)
    return (
      <section className="relative grid min-h-[700px] place-items-center overflow-hidden rounded-2xl border-2 border-[#243047] bg-[#070b18] p-6 text-center text-white shadow-[0_8px_0_#30394a]">
        <Image
          alt="Atmosphère de l'enquête numérique"
          className="investigation-camera object-cover opacity-45"
          fill
          priority
          sizes="100vw"
          src={lesson.image}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/45 via-[#070b18]/70 to-[#070b18]" />
        <div
          className="investigation-grid absolute inset-0 opacity-35"
          style={{ color: lesson.accent }}
        />
        <div className="relative max-w-3xl">
          <p
            className="text-xs font-black uppercase tracking-[.25em]"
            style={{ color: lesson.accent }}
          >
            {lesson.atmosphere} · nouvelle enquête
          </p>
          <h1 className="mt-4 font-display text-4xl font-black sm:text-6xl">
            {lesson.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-black leading-8">
            {lesson.mystery}
          </p>
          <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur">
            <CyberMascot mood="focus" size="sm" />
            <p className="font-bold text-white/85">
              Coach Cyber va t'accompagner scène par scène. Lis, attends,
              réponds quand il y a une question, puis avance seulement quand
              l'idée est claire.
            </p>
          </div>
          <button
            className="mt-8 rounded-xl border-2 border-white px-7 py-4 font-black shadow-[0_4px_0_white] transition hover:-translate-y-1"
            onClick={openLesson}
            style={{ backgroundColor: lesson.accent }}
            type="button"
          >
            Ouvrir l'enquête <ArrowRight className="ml-2 inline h-4 w-4" />
          </button>
        </div>
      </section>
    );

  return (
    <section className="overflow-hidden rounded-2xl border-2 border-[#30394a] bg-[#f8fafc] shadow-[0_8px_0_#30394a]">
      <SoundToggleButton />
      {toast ? (
        <div
          className={`fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border-2 border-white p-4 font-black text-white shadow-2xl mascot-toast ${toast === "bad" ? "bg-[#8f1237] mascot-toast-sad" : "bg-[#087f67] mascot-toast-celebrate"}`}
        >
          <CyberMascot mood={toast === "bad" ? "sad" : "celebrate"} size="sm" />
          <span>
            {toast === "bad"
              ? "Pas encore. Relis l'idée principale et essaie autrement."
              : toast === "done"
                ? "Congratulations. Tu as reconstruit le mécanisme."
                : "Yeah. La piste est bonne, continue."}
          </span>
        </div>
      ) : null}
      <header className="bg-[#091020] px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[.16em]">
          <span>{lesson.title}</span>
          <span>
            {sceneIndex + 1}/{lesson.scenes.length}
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              backgroundColor: lesson.accent,
              width: `${((sceneIndex + 1) / lesson.scenes.length) * 100}%`,
            }}
          />
        </div>
      </header>
      <div className="mx-auto grid max-w-5xl gap-6 p-4 sm:p-6 lg:p-8">
        <figure className="relative h-[220px] overflow-hidden rounded-2xl bg-[#070b18] shadow-[0_16px_45px_rgba(7,11,24,.22)] sm:h-[280px] lg:h-[320px]">
          <Image
            alt={`Illustration de ${lesson.title}`}
            className="investigation-camera object-cover opacity-65"
            fill
            priority={sceneIndex === 0}
            sizes="(min-width:1024px) 42vw,100vw"
            src={lesson.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-[#070b18]/45" />
          <div
            className="investigation-grid absolute inset-0 opacity-40"
            style={{ color: lesson.accent }}
          />
          <div className="absolute inset-0">
            {Array.from({ length: 9 }, (_, index) => (
              <i
                className="investigation-node"
                key={index}
                style={{
                  backgroundColor: index % 3 === 0 ? "#3b82f6" : lesson.accent,
                  left: `${10 + ((index * 31) % 80)}%`,
                  top: `${12 + ((index * 23) % 72)}%`,
                  animationDelay: `${index * -0.4}s`,
                }}
              />
            ))}
            <span
              className="investigation-route"
              style={{
                background: `linear-gradient(90deg,transparent,${lesson.accent},#3b82f6,transparent)`,
              }}
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-[#071020]/80 p-3 text-white backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
            <p
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"
              style={{ color: lesson.accent }}
            >
              <Network className="h-4 w-4" />
              {lesson.atmosphere}
            </p>
            <p className="mt-2 font-bold">{scene.coach}</p>
          </div>
        </figure>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-7 lg:p-8">
          <p
            className="text-xs font-black uppercase tracking-[.2em]"
            style={{ color: lesson.accent }}
          >
            {scene.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#111827] sm:text-4xl">
            {scene.title}
          </h2>
          <div
            className="mt-5"
            aria-label={`Scène ${sceneIndex + 1} sur ${lesson.scenes.length}`}
          >
            <div className="flex gap-1">
              {lesson.scenes.map((item, index) => (
                <span
                  className={`h-2 flex-1 rounded-full ${index < sceneIndex ? "bg-emerald-400" : index > sceneIndex ? "bg-slate-200" : ""}`}
                  key={`${item.title}-${index}`}
                  style={
                    index === sceneIndex
                      ? { backgroundColor: lesson.accent }
                      : undefined
                  }
                />
              ))}
            </div>
            <p className="mt-2 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">
              Scène {sceneIndex + 1} sur {lesson.scenes.length}
            </p>
          </div>
          <div className="mt-5 rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: lesson.accent }}><Sparkles className="h-4 w-4" />{phase === "observe" ? "Observe la situation" : phase === "verify" ? "Prépare ta réponse" : "Comprendre la scène"}</p>
            <div className="mt-3 text-lg font-semibold leading-8 text-slate-700">
              <p>{scene.narration}</p>
              {phase === "observe" ? <p className="mt-3">Cette situation révèle une première idée : <strong className="text-slate-950">{evidence}</strong></p> : null}
              {phase === "understand" ? <p className="mt-3"><strong className="text-slate-950">Autrement dit : {evidence}</strong></p> : null}
              {phase === "verify" ? <p className="mt-3">Pour répondre, appuie-toi sur cette idée : <strong className="text-slate-950">{evidence}</strong></p> : null}
              {phase === "other" && evidence !== scene.narration ? <p className="mt-3"><strong className="text-slate-950">{evidence}</strong></p> : null}
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-[#f1b7c8] bg-[#fff7f9] p-4 sm:p-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#a90f3c]">
              <ShieldCheck className="h-4 w-4" /> Preuve collectée
            </p>
            <p className="mt-2 font-bold leading-7 text-slate-700">{evidence}</p>
          </div>
          {newWords.length ? (
            <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-amber-800">
                Mots utiles
              </p>
              <dl className="mt-3 grid gap-2">
                {newWords.map(([term, meaning]) => (
                  <div className="text-sm leading-6" key={term}>
                    <dt className="inline font-black capitalize text-slate-900">
                      {term}
                    </dt>
                    <dd className="inline font-semibold text-slate-600">
                      {" "}
                      = {meaning}.
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          {scene.question && scene.options ? (
            <div className="mt-5">
              <p className="font-black text-slate-900">{scene.question}</p>
              <div className="mt-3 grid gap-2">
                {scene.options.map((option, index) => (
                  <button
                    className={`rounded-xl border-2 p-3 text-left font-bold transition ${choice === index ? (index === scene.correct ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-red-400 bg-red-50 text-red-800") : "border-slate-200 bg-white hover:border-slate-400"}`}
                    key={option}
                    onClick={() => choose(index)}
                    type="button"
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {complete && answered ? (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
              <p className="flex items-center gap-2 font-black text-emerald-800">
                <ShieldCheck className="h-5 w-5" />
                Mission réelle
              </p>
              <ul className="mt-3 grid gap-2">
                {lesson.mission.map((item) => (
                  <li
                    className="flex gap-2 font-semibold text-slate-700"
                    key={item}
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-emerald-200 pt-4 font-black italic text-slate-800">
                {lesson.cliffhanger}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-200 bg-white p-4">
        <button
          className="rounded-lg border-2 border-slate-400 px-4 py-3 font-black disabled:opacity-30"
          disabled={sceneIndex === 0}
          onClick={() => { setSceneIndex((value) => value - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <ArrowLeft className="mr-2 inline h-4 w-4" />
          Retour
        </button>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-600">
          {sceneIndex === 0
            ? "Prends connaissance de la mission"
            : timeReady
            ? "Temps d'observation validé"
            : `Observe encore 0:${String(remaining).padStart(2, "0")}`}
        </span>
        {!complete ? (
          <button
            className="rounded-lg px-5 py-3 font-black text-white disabled:opacity-35"
            disabled={!answered || !timeReady}
            onClick={goNext}
            style={{ backgroundColor: lesson.accent }}
          >
            Continuer <ArrowRight className="ml-2 inline h-4 w-4" />
          </button>
        ) : canComplete ? (
          <Link
            className={`rounded-lg px-5 py-3 font-black text-white ${timeReady ? "" : "pointer-events-none opacity-35"}`}
            href={`/student/modules/${moduleId}/lesson/${lesson.id}/quiz`}
            style={{ backgroundColor: lesson.accent }}
          >
            Quiz final <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
        ) : (
          <span className="font-bold">Aperçu terminé</span>
        )}
      </footer>
    </section>
  );
}

