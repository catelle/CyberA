"use client";

import { useEffect, useState } from "react";

import type { Language } from "@/types/auth";

type LanguageToggleProps = {
  onChange?: (language: Language) => void;
};

export function LanguageToggle({ onChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored === "fr" || stored === "en") {
      setLanguage(stored);
      onChange?.(stored);
    }
  }, [onChange]);

  function updateLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
    onChange?.(nextLanguage);
  }

  return (
    <div
      className="inline-grid grid-cols-2 rounded-full border-2 border-secondary bg-surface-container p-1 text-sm font-black shadow-[0_3px_0_0_rgba(88,96,98,1)]"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((item) => (
        <button
          className={`rounded-full px-3 py-1.5 transition ${
            language === item
              ? "bg-primary text-white"
              : "text-secondary hover:bg-surface-container-high"
          }`}
          key={item}
          type="button"
          onClick={() => updateLanguage(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
