"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Language } from "@/types/auth";

export function RegisterOptions() {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored === "fr" || stored === "en") setLanguage(stored);
    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<Language>).detail;
      if (nextLanguage === "fr" || nextLanguage === "en") setLanguage(nextLanguage);
    };
    window.addEventListener("cybera-language-change", handleLanguageChange);
    return () => window.removeEventListener("cybera-language-change", handleLanguageChange);
  }, []);

  return (
    <div className="grid gap-4">
      <Link className="rounded-xl border-2 border-secondary bg-primary-fixed p-5 font-black text-primary transition hover:bg-white" href="/register/scholarship">
        {language === "fr" ? "Candidat à la bourse" : "Scholarship applicant"}
      </Link>
      <Link className="rounded-xl bg-primary p-5 font-black text-white transition hover:bg-primary-container" href="/register/ambassador">
        {language === "fr" ? "Eleve" : "Student"}
      </Link>
      <Link className="rounded-xl border-2 border-secondary bg-white p-5 font-black text-primary shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-surface-container-low" href="/register/parent">
        Parent
      </Link>
    </div>
  );
}
