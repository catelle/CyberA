"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";
import type { Language } from "@/types/auth";

export function ScholarshipRegistrationForm() {
  const [language, setLanguage] = useState<Language>("fr");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored === "fr" || stored === "en") setLanguage(stored);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim().toLowerCase();
    const password = String(formData.get("password"));

    const response = await fetch("/api/auth/register/scholarship", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, language })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setStatus(result?.message ?? (language === "fr" ? "Inscription impossible." : "Registration failed."));
      setIsSubmitting(false);
      return;
    }

    const { error } = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password });
    if (error) {
      setStatus(language === "fr" ? "Compte créé. Connectez-vous maintenant." : "Account created. Please log in now.");
      setIsSubmitting(false);
      return;
    }

    window.location.href = "/student/dashboard";
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-black text-brand-blue">
        {language === "fr" ? "Inscription bourse" : "Scholarship registration"}
      </h2>
      <p className="text-sm font-semibold leading-6 text-secondary">
        {language === "fr"
          ? "Utilisez exactement l'adresse email fournie dans votre candidature à la bourse."
          : "Use exactly the email address you provided in your scholarship application."}
      </p>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input autoComplete="email" id="email" name="email" required type="email" />
      </div>
      <div className="field">
        <label htmlFor="password">{language === "fr" ? "Créer un mot de passe" : "Create a password"}</label>
        <input autoComplete="new-password" id="password" minLength={8} name="password" required type="password" />
      </div>

      {status ? <p className="rounded-lg border-2 border-error bg-error-container px-3 py-2 text-sm font-semibold text-error">{status}</p> : null}
      <button className="rounded-xl bg-primary px-5 py-3 font-black text-white disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? "..." : language === "fr" ? "Créer mon compte" : "Create my account"}
      </button>
      <Link className="text-sm font-bold text-primary" href="/login">
        {language === "fr" ? "J'ai déjà un compte" : "I already have an account"}
      </Link>
    </form>
  );
}
