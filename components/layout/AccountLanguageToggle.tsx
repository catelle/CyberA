"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Language } from "@/types/auth";

export function AccountLanguageToggle({ initialLanguage }: { initialLanguage: Language }) {
  const router = useRouter();
  const [language, setLanguage] = useState(initialLanguage);
  const [pending, setPending] = useState(false);

  async function choose(next: Language) {
    if (pending || next === language) return;
    setPending(true);
    const response = await fetch("/api/auth/language", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: next })
    });
    if (response.ok) {
      setLanguage(next);
      window.localStorage.setItem("language", next);
      document.documentElement.lang = next;
      router.refresh();
    }
    setPending(false);
  }

  return (
    <div aria-label="Language / Langue" className="inline-flex rounded-full border border-slate-300 bg-white p-1 text-xs font-black shadow-sm">
      {(["fr", "en"] as const).map((item) => (
        <button className={`rounded-full px-3 py-1.5 transition ${language === item ? "bg-primary text-white" : "text-slate-500 hover:text-primary"}`} disabled={pending} key={item} onClick={() => void choose(item)} type="button">
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
