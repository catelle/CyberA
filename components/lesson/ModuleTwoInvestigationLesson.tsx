"use client";

/* eslint-disable react/no-unescaped-entities -- French investigative copy intentionally uses apostrophes. */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

import { CyberMascot } from "@/components/gamified/CyberMascot";
import { SoundToggleButton } from "@/components/lesson/SoundToggleButton";
import {
  playCelebrate,
  playCorrect,
  playLessonOpen,
  playWrong,
  startAmbientLoop,
  stopAmbientLoop,
} from "@/lib/sounds";
import type {
  InvestigationLesson,
  InvestigationVisual,
} from "@/lib/curriculum/module-one-investigations";







// ─── Glossary (cybersecurity terms) ──────────────────────────────────────────

const glossary: [string, string][] = [
  ["phishing", "un message qui imite un service connu pour voler tes informations"],
  ["hameçonnage", "même chose que phishing — un piège déguisé en message officiel"],
  ["ingénierie sociale", "manipuler une personne pour qu'elle agisse sans réfléchir"],
  ["arnaque", "une tromperie conçue pour voler de l'argent ou des informations"],
  ["authentification", "la vérification que tu es bien la personne que tu prétends être"],
  ["MFA", "une deuxième preuve d'identité en plus du mot de passe"],
  ["double authentification", "une deuxième preuve d'identité en plus du mot de passe"],
  ["malware", "un programme malveillant qui s'installe sans ta permission"],
  ["ransomware", "un malware qui bloque tes fichiers et réclame de l'argent"],
  ["sextorsion", "une menace de diffuser des images intimes pour extorquer de l'argent"],
  ["deepfake", "une vidéo ou image fabriquée par IA pour faire croire à quelque chose de faux"],
  ["désinformation", "une fausse information diffusée volontairement pour tromper"],
  ["mésinformation", "une fausse information partagée sans intention de nuire"],
  ["permission", "l'autorisation donnée à une application d'accéder à une ressource"],
  ["mise à jour", "une correction qui répare des failles dans une application ou un système"],
  ["faille", "une faiblesse dans un programme qui peut être exploitée par un attaquant"],
  ["compte compromis", "un compte dont quelqu'un d'autre a pris le contrôle"],
  ["usurpation d'identité", "se faire passer pour quelqu'un d'autre pour tromper"],
  ["Mobile Money", "un service de paiement par téléphone très utilisé en Afrique"],
  ["lien suspect", "une adresse web qui peut mener vers un site piégé"],
];

// ─── Visual renderer ──────────────────────────────────────────────────────────

function SceneVisual({
  visual,
  accent,
}: {
  visual: InvestigationVisual;
  accent: string;
}) {
  if (visual.type === "flow") {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0d1117] p-4">
      {visual.items.map((item, i) => (
        <div
          className="flex items-center gap-2 animate-[fadeSlideIn_.45s_ease-out_both]"
          key={i}
          style={{ animationDelay: `${i * 0.25}s` }}
        >
          <span className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center font-black text-white">
            {item}
          </span>

          {i < visual.items.length - 1 && (
            <ArrowRight
              className="h-4 w-4 shrink-0 animate-pulse"
              style={{ color: accent }}
            />
          )}
        </div>
      ))}

      {visual.caption && (
        <p className="mt-3 w-full text-center text-xs font-bold text-white/50">
          {visual.caption}
        </p>
      )}
    </div>
  );
}

  if (visual.type === "comparison") return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-red-400/40 bg-red-950/30 p-4">
        {visual.leftLabel && <p className="mb-2 text-xs font-black uppercase tracking-widest text-red-300">{visual.leftLabel}</p>}
        {visual.left.map((item, i) => (
          <div className="flex items-start gap-2 py-1 font-bold text-red-200" key={i}>
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />{item}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-emerald-400/40 bg-emerald-950/30 p-4">
        {visual.rightLabel && <p className="mb-2 text-xs font-black uppercase tracking-widest text-emerald-300">{visual.rightLabel}</p>}
        {visual.right.map((item, i) => (
          <div className="flex items-start gap-2 py-1 font-bold text-emerald-200" key={i}>
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}
          </div>
        ))}
      </div>
    </div>
  );

  if (visual.type === "warning") {
  return (
    <div className="mt-5 grid gap-2">
      {visual.items.map((item, i) => (
        <div
          className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-950/25 p-3 font-bold text-red-200 animate-[fadeSlideIn_.45s_ease-out_both]"
          key={i}
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 animate-pulse text-red-400" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

  if (visual.type === "checklist") return (
    <div className="mt-5 grid gap-2">
      {visual.items.map((item, i) => (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-950/25 p-3 font-bold text-emerald-200" key={i}>
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{item}</span>
        </div>
      ))}
    </div>
  );

  if (visual.type === "signal") return (
    <div className="mt-5 flex flex-wrap justify-center gap-3 rounded-2xl border border-white/10 bg-[#0d1117] p-4">
      {visual.items.map((item, i) => (
        <span
          className="animate-pulse rounded-full border px-4 py-2 text-sm font-black"
          key={i}
          style={{ borderColor: accent, color: accent, animationDelay: `${i * 0.35}s` }}
        >{item}</span>
      ))}
      {visual.caption && <p className="mt-2 w-full text-center text-xs font-bold text-white/50">{visual.caption}</p>}
    </div>
  );

 if (visual.type === "timeline") {
  return (
    <div className="mt-5 grid gap-1">
      {visual.items.map((item, i) => (
        <div
          className="flex items-start gap-3 animate-[fadeSlideIn_.4s_ease-out_both]"
          key={i}
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <div className="flex flex-col items-center">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-xs font-black"
              style={{ borderColor: accent, color: accent }}
            >
              {i + 1}
            </span>

            {i < visual.items.length - 1 && (
              <span
                className="mt-1 h-5 w-0.5 animate-[growLine_.5s_ease-out_both]"
                style={{
                  backgroundColor: accent,
                  animationDelay: `${i * 0.3 + 0.2}s`,
                }}
              />
            )}
          </div>

          <p className="pt-0.5 pb-1 font-bold leading-6 text-white/80">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

  if (visual.type === "vs") return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-red-400/40 bg-red-950/30 p-4">
        <p className="mb-1 text-xs font-black uppercase tracking-widest text-red-300">⚠ Danger</p>
        <p className="font-bold leading-6 text-red-200">{visual.bad}</p>
      </div>
      <div className="rounded-xl border border-emerald-400/40 bg-emerald-950/30 p-4">
        <p className="mb-1 text-xs font-black uppercase tracking-widest text-emerald-300">✓ Réflexe sûr</p>
        <p className="font-bold leading-6 text-emerald-200">{visual.good}</p>
      </div>
    </div>
  );

  if (visual.type === "phone") return (
    <div className="mt-5 mx-auto w-full max-w-xs rounded-3xl border-4 border-white/20 bg-[#0d1117] p-3 shadow-2xl">
      <div className="rounded-2xl bg-[#1a1a2e] p-3">
        {visual.sender && (
          <div className="mb-2 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-black text-white/60">?</span>
            <span className="text-xs font-black text-white/50">{visual.sender}</span>
          </div>
        )}
        <div className="space-y-2">
         {visual.lines.map((line, i) => (
  <div
    className="rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-sm font-semibold leading-5 text-white/85 animate-[messageIn_.4s_ease-out_both]"
    key={i}
    style={{ animationDelay: `${i * 0.45}s` }}
  >
    {line}
  </div>
))}
        </div>
      </div>
    </div>
  );

  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  lesson: InvestigationLesson;
  moduleId: string;
  canComplete: boolean;
};

const MIN_SCENE_SECONDS = 15;

export function ModuleTwoInvestigationLesson({ lesson, moduleId, canComplete }: Props) {
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [toast, setToast] = useState<"good" | "bad" | "done" | null>(null);

  const scene = lesson.scenes[sceneIndex];
  const answered = scene.correct === undefined || choice === scene.correct;
  const complete = sceneIndex === lesson.scenes.length - 1;
  const timeReady = sceneIndex === 0 || seconds >= MIN_SCENE_SECONDS;
  const remaining = Math.max(0, MIN_SCENE_SECONDS - seconds);

  const sceneCopy = `${scene.title} ${scene.narration} ${scene.evidence}`.toLocaleLowerCase("fr");
  const newWords = glossary
    .filter(([term]) => sceneCopy.includes(term.toLocaleLowerCase("fr")))
    .slice(0, 3);

  useEffect(() => {
    setChoice(null);
    setSeconds(0);
    setToast(null);
    if (sceneIndex === 0) return;
    const timer = window.setInterval(
      () => setSeconds((v) => Math.min(MIN_SCENE_SECONDS, v + 1)),
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
    if (value === scene.correct) { playCorrect(); setToast("good"); }
    else { playWrong(); setToast("bad"); }
    window.setTimeout(() => setToast(null), 6500);
  };

  const goNext = () => {
    if (!answered || !timeReady || complete) return;
    if (sceneIndex === lesson.scenes.length - 2) {
      playCelebrate();
      setToast("done");
      window.setTimeout(() => setToast(null), 8000);
    }
    setSceneIndex((v) => v + 1);
  };

  // ── Splash screen ──
  if (!started) return (
    <section className="relative grid min-h-[700px] place-items-center overflow-hidden rounded-2xl border-2 border-[#3a0a1e] bg-[#0f0208] p-6 text-center text-white shadow-[0_8px_0_#3a0a1e]">
      <Image
        alt="Dossier de survie numérique"
        className="investigation-camera object-cover opacity-40"
        fill priority sizes="100vw"
        src={lesson.image}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0208]/50 via-[#0f0208]/70 to-[#0f0208]" />
      <div className="investigation-grid absolute inset-0 opacity-30" style={{ color: lesson.accent }} />
      <div className="relative max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[.25em]" style={{ color: lesson.accent }}>
          {lesson.atmosphere} · dossier d'enquête
        </p>
        <h1 className="mt-4 font-display text-4xl font-black sm:text-6xl">{lesson.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl font-black leading-8">{lesson.mystery}</p>
        <div className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur">
          <CyberMascot mood="focus" size="sm" />
          <p className="font-bold text-white/85">
            Chaque scène introduit une seule idée. Lis, observe le visuel, réponds si une question apparaît, puis avance.
          </p>
        </div>
        <button
          className="mt-8 rounded-xl border-2 border-white px-7 py-4 font-black shadow-[0_4px_0_white] transition hover:-translate-y-1"
          onClick={openLesson}
          style={{ backgroundColor: lesson.accent }}
          type="button"
        >
          Ouvrir le dossier <ArrowRight className="ml-2 inline h-4 w-4" />
        </button>
      </div>
    </section>
  );

  // ── Active lesson ──
  return (
    <section className="overflow-hidden rounded-2xl border-2 border-[#30394a] bg-[#f8fafc] shadow-[0_8px_0_#30394a]">
      <SoundToggleButton />

      {toast && (
        <div className={`fixed right-5 top-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border-2 border-white p-4 font-black text-white shadow-2xl mascot-toast ${toast === "bad" ? "bg-[#8f1237] mascot-toast-sad" : "bg-[#087f67] mascot-toast-celebrate"}`}>
          <CyberMascot mood={toast === "bad" ? "sad" : "celebrate"} size="sm" />
          <span>
            {toast === "bad"
              ? "Pas encore. Relis l'indice et essaie autrement."
              : toast === "done"
                ? "Dossier résolu. Tu as tous les réflexes."
                : "Bonne piste. Continue l'enquête."}
          </span>
        </div>
      )}

      {/* Header + progress bar */}
      <header className="bg-[#0f0208] px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[.16em]">
          <span>{lesson.title}</span>
          <span>{sceneIndex + 1}/{lesson.scenes.length}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ backgroundColor: lesson.accent, width: `${((sceneIndex + 1) / lesson.scenes.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-6 p-4 sm:p-6 lg:p-8">

        {/* Hero image with animated overlay */}
        <figure className="relative h-[220px] overflow-hidden rounded-2xl bg-[#0f0208] shadow-[0_16px_45px_rgba(15,2,8,.3)] sm:h-[280px] lg:h-[320px]">
          <Image
            alt={`Illustration — ${lesson.title}`}
            className="investigation-camera object-cover opacity-60"
            fill
            priority={sceneIndex === 0}
            sizes="(min-width:1024px) 42vw,100vw"
            src={lesson.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0208] via-transparent to-[#0f0208]/45" />
          <div className="investigation-grid absolute inset-0 opacity-35" style={{ color: lesson.accent }} />
          <div className="absolute inset-0">
            {Array.from({ length: 9 }, (_, i) => (
              <i
                className="investigation-node"
                key={i}
                style={{
                  backgroundColor: i % 3 === 0 ? "#ef4444" : lesson.accent,
                  left: `${10 + ((i * 31) % 80)}%`,
                  top: `${12 + ((i * 23) % 72)}%`,
                  animationDelay: `${i * -0.4}s`,
                }}
              />
            ))}
            <span
              className="investigation-route"
              style={{ background: `linear-gradient(90deg,transparent,${lesson.accent},#ef4444,transparent)` }}
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-[#0f0208]/80 p-3 text-white backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: lesson.accent }}>
              <ShieldAlert className="h-4 w-4" />
              {lesson.atmosphere}
            </p>
            <p className="mt-2 font-bold">{scene.coach}</p>
          </div>
        </figure>

        {/* Scene content card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-7 lg:p-8">
          <p className="text-xs font-black uppercase tracking-[.2em]" style={{ color: lesson.accent }}>
            {scene.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-[#111827] sm:text-4xl">
            {scene.title}
          </h2>

          {/* Scene progress dots */}
          <div className="mt-5" aria-label={`Scène ${sceneIndex + 1} sur ${lesson.scenes.length}`}>
            <div className="flex gap-1">
              {lesson.scenes.map((_, index) => (
                <span
                  className={`h-2 flex-1 rounded-full ${index < sceneIndex ? "bg-emerald-400" : index > sceneIndex ? "bg-slate-200" : ""}`}
                  key={index}
                  style={index === sceneIndex ? { backgroundColor: lesson.accent } : undefined}
                />
              ))}
            </div>
            <p className="mt-2 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">
              Scène {sceneIndex + 1} sur {lesson.scenes.length}
            </p>
          </div>

          {/* Narration */}
          <div className="mt-5 rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: lesson.accent }}>
              <Sparkles className="h-4 w-4" />
              Observe la situation
            </p>
            <p className="mt-3 text-lg font-semibold leading-8 text-slate-700">{scene.narration}</p>
            {scene.evidence !== scene.narration && (
              <p className="mt-3 font-black text-slate-950">{scene.evidence}</p>
            )}
          </div>

          {/* Animated visual */}
          {scene.visual && <SceneVisual visual={scene.visual} accent={lesson.accent} />}

          {/* Evidence badge */}
          <div className="mt-4 rounded-2xl border border-[#f1b7c8] bg-[#fff7f9] p-4 sm:p-5">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#a90f3c]">
              <ShieldCheck className="h-4 w-4" /> Preuve collectée
            </p>
            <p className="mt-2 font-bold leading-7 text-slate-700">{scene.evidence}</p>
          </div>

          {/* Glossary */}
          {newWords.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-amber-800">Mots utiles</p>
              <dl className="mt-3 grid gap-2">
                {newWords.map(([term, meaning]) => (
                  <div className="text-sm leading-6" key={term}>
                    <dt className="inline font-black capitalize text-slate-900">{term}</dt>
                    <dd className="inline font-semibold text-slate-600"> = {meaning}.</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quiz */}
          {scene.question && scene.options && (
            <div className="mt-5">
              <p className="font-black text-slate-900">{scene.question}</p>
              <div className="mt-3 grid gap-2">
                {scene.options.map((option, index) => (
                  <button
                    className={`rounded-xl border-2 p-3 text-left font-bold transition ${
                      choice === index
                        ? index === scene.correct
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                          : "border-red-400 bg-red-50 text-red-800"
                        : "border-slate-200 bg-white hover:border-slate-400"
                    }`}
                    key={option}
                    onClick={() => choose(index)}
                    type="button"
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Final mission */}
          {complete && answered && (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
              <p className="flex items-center gap-2 font-black text-emerald-800">
                <ShieldCheck className="h-5 w-5" />
                Mission réelle
              </p>
              <ul className="mt-3 grid gap-2">
                {lesson.mission.map((item) => (
                  <li className="flex gap-2 font-semibold text-slate-700" key={item}>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-emerald-200 pt-4 font-black italic text-slate-800">
                {lesson.cliffhanger}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer navigation */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-slate-200 bg-white p-4">
        <button
          className="rounded-lg border-2 border-slate-400 px-4 py-3 font-black disabled:opacity-30"
          disabled={sceneIndex === 0}
          onClick={() => setSceneIndex((v) => v - 1)}
        >
          <ArrowLeft className="mr-2 inline h-4 w-4" />
          Retour
        </button>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-600">
          {sceneIndex === 0
            ? "Prends connaissance du dossier"
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
