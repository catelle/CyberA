"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  if (!promptEvent || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[18rem] items-center gap-3 rounded-lg bg-brand-ink p-3 text-white shadow-soft">
      <p className="text-sm font-bold">Installer CyberAmbassador</p>
      <button
        className="min-h-12 rounded-lg bg-brand-gold px-3 text-sm font-black text-brand-ink"
        onClick={async () => {
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
