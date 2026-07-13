"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Language } from "@/types/auth";

export function StudentRegistrationForm() {
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
    const email = String(formData.get("studentEmail"));
    const password = String(formData.get("studentPassword"));

    const response = await fetch("/api/auth/register/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student: {
          fullName: formData.get("studentFullName"),
          email,
          password,
          age: formData.get("age"),
          city: formData.get("city"),
          school: formData.get("school"),
          gradeLevel: formData.get("gradeLevel"),
          language
        },
        parent: {
          fullName: formData.get("parentFullName"),
          email: formData.get("parentEmail"),
          password: formData.get("parentPassword"),
          phone: formData.get("parentPhone")
        },
        consentGiven: formData.get("consentGiven") === "on"
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
      setStatus(
        language === "fr"
          ? "Compte cree. Connectez-vous avec vos identifiants."
          : "Account created. Please log in with your credentials."
      );
      router.push("/login");
      return;
    }

    router.push("/student/dashboard");
    router.refresh();
  }

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field sm:col-span-2">
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

        <h2 className="font-display text-lg font-black text-primary sm:col-span-2">
          {language === "fr" ? "Eleve" : "Student"}
        </h2>

        <div className="field sm:col-span-2">
          <label htmlFor="studentFullName">{t.fullName}</label>
          <input id="studentFullName" name="studentFullName" required />
        </div>

        <div className="field">
          <label htmlFor="studentEmail">{t.email}</label>
          <input id="studentEmail" name="studentEmail" required type="email" />
        </div>

        <div className="field">
          <label htmlFor="studentPassword">{t.password}</label>
          <input
            id="studentPassword"
            minLength={8}
            name="studentPassword"
            required
            type="password"
          />
        </div>

        <div className="field">
          <label htmlFor="age">{t.age}</label>
          <input id="age" max={18} min={12} name="age" required type="number" />
        </div>

        <div className="field">
          <label htmlFor="city">{t.city}</label>
          <input id="city" name="city" required />
        </div>

        <div className="field">
          <label htmlFor="school">{t.school}</label>
          <input id="school" name="school" required />
        </div>

        <div className="field">
          <label htmlFor="gradeLevel">{t.gradeLevel}</label>
          <input id="gradeLevel" name="gradeLevel" required />
        </div>

        <h2 className="font-display text-lg font-black text-primary sm:col-span-2">
          {language === "fr" ? "Parent ou tuteur" : "Parent or guardian"}
        </h2>

        <div className="field sm:col-span-2">
          <label htmlFor="parentFullName">{t.fullName}</label>
          <input id="parentFullName" name="parentFullName" required />
        </div>

        <div className="field">
          <label htmlFor="parentEmail">{t.email}</label>
          <input id="parentEmail" name="parentEmail" required type="email" />
        </div>

        <div className="field">
          <label htmlFor="parentPassword">{t.password}</label>
          <input
            id="parentPassword"
            minLength={8}
            name="parentPassword"
            required
            type="password"
          />
        </div>

        <div className="field sm:col-span-2">
          <label htmlFor="parentPhone">{t.phone}</label>
          <input id="parentPhone" name="parentPhone" required />
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-xl border-2 border-secondary bg-surface-container-low p-4 text-sm font-semibold text-on-surface shadow-[0_3px_0_0_rgba(88,96,98,1)]">
        <input
          className="mt-1 h-4 w-4"
          name="consentGiven"
          required
          type="checkbox"
        />
        <span>{t.parentConsent}</span>
      </label>

      {status ? (
        <p className="rounded-lg border-2 border-error bg-error-container px-3 py-2 text-sm font-semibold text-error">
          {status}
        </p>
      ) : null}

      <button
        className="rounded-xl bg-primary px-5 py-3 font-black text-white transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "..." : t.createStudentAccount}
      </button>

      <Link className="text-sm font-bold text-primary" href="/login">
        {language === "fr" ? "J'ai deja un compte" : "I already have an account"}
      </Link>
    </form>
  );
}
