"use client";

import { useEffect } from "react";

import { SoundToggleButton } from "@/components/lesson/SoundToggleButton";
import { startAmbientLoop, stopAmbientLoop } from "@/lib/sounds";

export function LessonAudio() {
  useEffect(() => {
    const start = () => startAmbientLoop();
    start();
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      stopAmbientLoop();
    };
  }, []);

  return <SoundToggleButton />;
}
