"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";
import { dashboardForRole } from "@/lib/auth/roles";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Language } from "@/types/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>("fr");
  const [status, setStatus] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = getDictionary(language);

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored === "fr" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  function goToDashboard(role: string | undefined) {
    const requestedNext = searchParams.get("next");
    router.push(requestedNext ?? dashboardForRole(role));
    router.refresh();
  }

  async function bootstrapProfile() {
    const response = await fetch("/api/auth/profile/bootstrap", {
      method: "POST"
    });

    const body = (await response.json().catch(() => null)) as {
      message?: string;
      role?: string;
    } | null;

    if (!response.ok) {
      throw new Error(body?.message ?? "Impossible d'initialiser le profil.");
    }

    return body;
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password"))
    });

    setIsSubmitting(false);

    if (error || !data.user) {
      setStatus(
        language === "fr"
          ? "Email ou mot de passe incorrect."
          : "Incorrect email or password."
      );
      return;
    }

    let profile;

    try {
      profile = await bootstrapProfile();
    } catch (bootstrapError) {
      setStatus(
        bootstrapError instanceof Error
          ? bootstrapError.message
          : "Impossible d'initialiser le profil."
      );
      return;
    }

    goToDashboard(profile?.role);
  }

  return (
    <form className="grid gap-5" onSubmit={handleEmailSubmit}>
      <div className="field">
        <label htmlFor="language">Langue / Language</label>
        <select
          id="language"
          value={language}
          onChange={(event) => {
            const nextLanguage = event.target.value as Language;
            window.localStorage.setItem("language", nextLanguage);
            setLanguage(nextLanguage);
          }}
        >
          <option value="fr">Francais</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="email">{t.email}</label>
        <input
          autoComplete="email"
          id="email"
          name="email"
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="password">{t.password}</label>
        <div className="relative">
          <input
            autoComplete="current-password"
            className="w-full pr-12"
            id="password"
            name="password"
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            aria-label={showPassword ? (language === "fr" ? "Masquer le mot de passe" : "Hide password") : (language === "fr" ? "Afficher le mot de passe" : "Show password")}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-600 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary"
            onClick={() => setShowPassword((visible) => !visible)}
            type="button"
          >
            {showPassword ? <EyeOff aria-hidden className="h-5 w-5" /> : <Eye aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {status ? (
        <p className="rounded-lg border-2 border-secondary bg-primary-fixed px-3 py-2 text-sm font-bold text-primary">
          {status}
        </p>
      ) : null}

      <button
        className="min-h-12 rounded-xl bg-primary px-5 py-3 font-black text-white transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "..." : t.login}
      </button>

      <div className="grid gap-2 text-sm font-semibold text-secondary">
        <Link className="font-bold text-primary" href="/register/ambassador">
          {language === "fr"
            ? "Inscrire un eleve"
            : "Register an ambassador"}
        </Link>
        <Link className="font-bold text-primary" href="/register/parent">
          {language === "fr"
            ? "Je suis parent et j'ai deja un eleve"
            : "I am a parent with an existing student"}
        </Link>
      </div>
    </form>
  );
}
