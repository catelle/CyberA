"use client";

import { Share, SquarePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const navigatorWithStandalone = window.navigator as Navigator & {
      standalone?: boolean;
    };
    const ios = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    const safari = /Safari/.test(window.navigator.userAgent) &&
      !/CriOS|FxiOS|EdgiOS|OPiOS/.test(window.navigator.userAgent);
    setIsIosSafari(ios && safari);
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        navigatorWithStandalone.standalone === true
    );

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return;
      }
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (isStandalone || dismissed || (!promptEvent && !isIosSafari)) {
    return null;
  }

  if (isIosSafari) {
    return (
      <div className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-sm rounded-xl border-2 border-secondary bg-white p-4 text-brand-ink shadow-[0_7px_0_0_rgba(88,96,98,1)] sm:bottom-4 sm:right-4 sm:left-auto sm:mx-0">
        <div className="flex items-start gap-3">
          <SquarePlus aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="font-black">Installer CyberAmbassador</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
              Dans Safari, touche <Share aria-label="Partager" className="mx-1 inline h-5 w-5 text-primary" />, puis
              choisis « Sur l’écran d’accueil ».
            </p>
          </div>
          <button aria-label="Fermer" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100" onClick={() => setDismissed(true)} type="button">
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[18rem] items-center gap-3 rounded-lg bg-brand-ink p-3 text-white shadow-soft">
      <p className="text-sm font-bold">Installer CyberAmbassador</p>
      <button
        className="min-h-12 rounded-lg bg-brand-gold px-3 text-sm font-black text-brand-ink"
        onClick={async () => {
          if (!promptEvent) return;
          await promptEvent.prompt();
          await promptEvent.userChoice;
          setDismissed(true);
        }}
        type="button"
      >
        Installer
      </button>
      <button
        aria-label="Fermer"
        className="min-h-12 px-2 text-sm font-black text-white/80"
        onClick={() => setDismissed(true)}
        type="button"
      >
        X
      </button>
    </div>
  );
}
