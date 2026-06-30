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
      className="inline-grid grid-cols-2 rounded-full border border-white/30 bg-white/10 p-1 text-sm font-semibold"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((item) => (
        <button
          className={`rounded-full px-3 py-1.5 transition ${
            language === item
              ? "bg-white text-brand-blue shadow-sm"
              : "text-white hover:bg-white/10"
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
