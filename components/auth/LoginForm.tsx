"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";
import { dashboardForRole } from "@/lib/auth/roles";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Language } from "@/types/auth";

type LoginMode = "phone" | "email";

const demoAccounts = [
  {
    label: "Parent",
    email: "parent.cybera@example.com",
    password: "CyberA123!"
  },
  {
    label: "Ambassadeur",
    email: "amina.ambassador@example.com",
    password: "CyberA123!"
  },
  {
    label: "Admin",
    email: "admin.cybera@example.com",
    password: "CyberA123!"
  }
];

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>("fr");
  const [mode, setMode] = useState<LoginMode>("email");
  const [status, setStatus] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
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

  function selectDemoAccount(account: (typeof demoAccounts)[number]) {
    setMode("email");
    setOtpSent(false);
    setStatus(null);
    setEmail(account.email);
    setPassword(account.password);
  }

  async function handlePhoneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const supabase = createSupabaseBrowserClient();

    if (!otpSent) {
      const nextPhone = String(formData.get("phone"));
      const { error } = await supabase.auth.signInWithOtp({
        phone: nextPhone,
        options: {
          data: {
            language
          }
        }
      });

      setIsSubmitting(false);

      if (error) {
        setStatus(error.message);
        return;
      }

      setPhone(nextPhone);
      setOtpSent(true);
      setStatus(
        language === "fr"
          ? "Code envoye par SMS. Entrez le code recu."
          : "SMS code sent. Enter the received code."
      );
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: String(formData.get("otp")),
      type: "sms"
    });

    setIsSubmitting(false);

    if (error || !data.user) {
      setStatus(
        language === "fr"
          ? "Code invalide ou expire."
          : "Invalid or expired code."
      );
      return;
    }

    try {
      const profile = await bootstrapProfile();
      goToDashboard(profile?.role);
    } catch (bootstrapError) {
      setStatus(
        bootstrapError instanceof Error
          ? bootstrapError.message
          : "Impossible d'initialiser le profil."
      );
      return;
    }
  }

  async function handleGoogleLogin() {
    setIsSubmitting(true);
    setStatus(null);

    const supabase = createSupabaseBrowserClient();
    const redirectTo = `${window.location.origin}/login`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    setIsSubmitting(false);

    if (error) {
      setStatus(error.message);
    }
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={mode === "phone" ? handlePhoneSubmit : handleEmailSubmit}
    >
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

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-brand-rose p-1">
        <button
          className={
            mode === "phone"
              ? "min-h-12 rounded-md bg-white px-3 text-sm font-black text-brand-blue shadow-sm"
              : "min-h-12 rounded-md px-3 text-sm font-black text-brand-graphite"
          }
          onClick={() => {
            setMode("phone");
            setOtpSent(false);
            setStatus(null);
          }}
          type="button"
        >
          SMS OTP
        </button>
        <button
          className={
            mode === "email"
              ? "min-h-12 rounded-md bg-white px-3 text-sm font-black text-brand-blue shadow-sm"
              : "min-h-12 rounded-md px-3 text-sm font-black text-brand-graphite"
          }
          onClick={() => {
            setMode("email");
            setOtpSent(false);
            setStatus(null);
          }}
          type="button"
        >
          Email
        </button>
      </div>

      {mode === "phone" ? (
        <>
          <div className="field">
            <label htmlFor="phone">Telephone</label>
            <input
              disabled={otpSent}
              id="phone"
              name="phone"
              placeholder="+237 6XX XXX XXX"
              required
              type="tel"
            />
          </div>

          {otpSent ? (
            <div className="field">
              <label htmlFor="otp">Code SMS</label>
              <input
                autoComplete="one-time-code"
                id="otp"
                inputMode="numeric"
                name="otp"
                required
                type="text"
              />
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div className="field">
            <label htmlFor="email">{t.email}</label>
            <input
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
            <input
              id="password"
              name="password"
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </>
      )}

      <div className="rounded-lg border border-rose-100 bg-brand-sky p-3">
        <p className="text-xs font-black uppercase tracking-wide text-brand-blue">
          Comptes demo
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {demoAccounts.map((account) => (
            <button
              className="min-h-11 rounded-md border border-rose-100 bg-white px-3 text-sm font-black text-brand-blue transition hover:border-brand-gold hover:bg-brand-rose"
              disabled={isSubmitting}
              key={account.email}
              onClick={() => selectDemoAccount(account)}
              type="button"
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>

      {status ? (
        <p className="rounded-md border border-rose-100 bg-brand-sky px-3 py-2 text-sm font-bold text-brand-blue">
          {status}
        </p>
      ) : null}

      <button
        className="min-h-12 rounded-lg bg-brand-blue px-5 py-3 font-black text-white shadow-glow transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting
          ? "..."
          : mode === "phone" && !otpSent
            ? language === "fr"
              ? "Recevoir le code"
              : "Send code"
            : t.login}
      </button>

      <button
        className="min-h-12 rounded-lg border border-rose-100 bg-white px-5 font-black text-brand-blue transition hover:bg-brand-sky disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        onClick={handleGoogleLogin}
        type="button"
      >
        Google
      </button>

      <div className="grid gap-2 text-sm text-slate-600">
        <Link className="font-bold text-brand-blue" href="/register/ambassador">
          {language === "fr"
            ? "Inscrire un ambassadeur"
            : "Register an ambassador"}
        </Link>
        <Link className="font-bold text-brand-blue" href="/register/parent">
          {language === "fr"
            ? "Je suis parent et j'ai deja un eleve"
            : "I am a parent with an existing student"}
        </Link>
      </div>
    </form>
  );
}
