"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

import { isSoundMuted, setSoundMuted } from "@/lib/sounds";

export function SoundToggleButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isSoundMuted());
  }, []);

  function toggle() {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  }

  return (
    <button
      aria-label={muted ? "Activer le son" : "Couper le son"}
      aria-pressed={muted}
      className="fixed bottom-4 right-4 z-[200] grid h-12 w-12 place-items-center rounded-full border-2 border-secondary bg-white text-brand-ink shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      onClick={toggle}
      type="button"
    >
      {muted ? <VolumeX aria-hidden className="h-5 w-5" /> : <Volume2 aria-hidden className="h-5 w-5" />}
    </button>
  );
}
