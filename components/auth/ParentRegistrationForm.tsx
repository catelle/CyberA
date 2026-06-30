"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Language } from "@/types/auth";

export function ParentRegistrationForm() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("fr");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = getDictionary(language);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const response = await fetch("/api/auth/register/parent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parent: {
          fullName: formData.get("fullName"),
          email,
          password,
          phone: formData.get("phone"),
          language
        },
        studentEmail: formData.get("studentEmail")
      })
    });

    const result = (await response.json()) as { message?: string };

    if (!response.ok) {
      setStatus(result.message ?? "Inscription impossible.");
      setIsSubmitting(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsSubmitting(false);

    if (error) {
      router.push("/login");
      return;
    }

    router.push("/parent/dashboard");
    router.refresh();
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="language">Langue / Language</label>
        <select
          id="language"
          value={language}
          onChange={(event) => setLanguage(event.target.value as Language)}
        >
          <option value="fr">Francais</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="fullName">{t.fullName}</label>
        <input id="fullName" name="fullName" required />
      </div>

      <div className="field">
        <label htmlFor="email">{t.email}</label>
        <input id="email" name="email" required type="email" />
      </div>

      <div className="field">
        <label htmlFor="password">{t.password}</label>
        <input id="password" minLength={8} name="password" required type="password" />
      </div>

      <div className="field">
        <label htmlFor="phone">{t.phone}</label>
        <input id="phone" name="phone" required />
      </div>

      <div className="field">
        <label htmlFor="studentEmail">
          {language === "fr"
            ? "Email de l'eleve a lier"
            : "Student email to link"}
        </label>
        <input id="studentEmail" name="studentEmail" type="email" />
      </div>

      {status ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {status}
        </p>
      ) : null}

      <button
        className="rounded-lg bg-brand-blue px-5 py-3 font-black text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "..." : t.createParentAccount}
      </button>

      <Link className="text-sm font-bold text-brand-blue" href="/login">
        {language === "fr" ? "J'ai deja un compte" : "I already have an account"}
      </Link>
    </form>
  );
}
