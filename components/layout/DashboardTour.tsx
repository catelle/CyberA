"use client";

import { ArrowRight, CheckCircle2, Info, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { UserRole } from "@/types/auth";

type DashboardTourProps = {
  role: UserRole;
  userId: string;
};

type TourTip = {
  title: string;
  body: string;
};

const studentTips: TourTip[] = [
  {
    title: "Commence par l'accueil",
    body: "La mission du jour te montre la prochaine action utile et ton avance reelle dans le programme."
  },
  {
    title: "Ouvre les modules",
    body: "Lis les lecons dans l'ordre. Un nouveau compte reste a 0% tant qu'aucune progression n'est enregistree."
  },
  {
    title: "Passe le quiz",
    body: "Le quiz valide le module a partir de 70%. Les points sont ajoutes une seule fois par module reussi."
  },
  {
    title: "Continue avec les defis",
    body: "Les defis servent a appliquer ce que tu apprends avec ta famille, ton ecole ou ta communaute."
  }
];

const parentTips: TourTip[] = [
  {
    title: "Surveille l'accueil",
    body: "Les cartes affichent les comptes enfants lies, les points suivis et les rapports disponibles."
  },
  {
    title: "Lie un enfant",
    body: "Utilise le code famille donne par l'ambassadeur pour connecter son compte a ton espace parent."
  },
  {
    title: "Lis les rapports",
    body: "Les rapports resument la progression, les points et les moments ou un encouragement peut aider."
  },
  {
    title: "Ajoute un defi",
    body: "Les defis parent donnent une action simple a faire ensemble pour transformer l'apprentissage en habitude."
  }
];

export function DashboardTour({ role, userId }: DashboardTourProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const tips = useMemo(() => {
    if (role === "parent") {
      return parentTips;
    }

    if (role === "student") {
      return studentTips;
    }

    return [];
  }, [role]);
  const storageKey = `cybera-dashboard-tour:${role}:${userId}:v1`;
  const currentTip = tips[currentIndex];
  const isLastTip = currentIndex === tips.length - 1;

  useEffect(() => {
    if (tips.length === 0) {
      return;
    }

    const hasFinished = window.localStorage.getItem(storageKey) === "done";
    setIsVisible(!hasFinished);
  }, [storageKey, tips.length]);

  function closeTour() {
    window.localStorage.setItem(storageKey, "done");
    setIsVisible(false);
  }

  function showNextTip() {
    if (isLastTip) {
      closeTour();
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  if (!isVisible || !currentTip) {
    return null;
  }

  return (
    <aside className="fixed bottom-8 right-8 z-50 hidden w-[min(24rem,calc(100vw-4rem))] rounded-lg border-2 border-secondary bg-white p-4 text-on-surface shadow-[0_6px_0_0_rgba(88,96,98,1)] lg:block">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-primary text-white">
            <Info aria-hidden className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-tertiary">
              Guide {currentIndex + 1}/{tips.length}
            </p>
            <h2 className="mt-1 break-words font-display text-xl font-black leading-tight text-brand-ink">
              {currentTip.title}
            </h2>
          </div>
        </div>
        <button
          aria-label="Fermer le guide"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-secondary bg-white text-secondary shadow-[0_2px_0_0_rgba(88,96,98,1)] transition hover:bg-surface-container"
          onClick={closeTour}
          title="Fermer"
          type="button"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
        {currentTip.body}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-1.5" aria-hidden>
          {tips.map((tip, index) => (
            <span
              className={
                index === currentIndex
                  ? "h-2.5 w-6 rounded-full bg-primary"
                  : "h-2.5 w-2.5 rounded-full bg-slate-200"
              }
              key={tip.title}
            />
          ))}
        </div>

        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-brand-blue px-4 text-sm font-black text-white shadow-[0_3px_0_0_rgba(88,96,98,1)] transition hover:bg-brand-ink"
          onClick={showNextTip}
          type="button"
        >
          {isLastTip ? (
            <>
              <CheckCircle2 aria-hidden className="h-4 w-4" />
              Terminer
            </>
          ) : (
            <>
              Suivant
              <ArrowRight aria-hidden className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
