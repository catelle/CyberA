"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

import type { Language } from "@/types/auth";

type PasswordFieldProps = {
  autoComplete: string;
  id: string;
  label: string;
  name: string;
  onToggle: () => void;
  visible: boolean;
};

export function ChangePasswordForm({ language }: { language: Language }) {
  const en = language === "en";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

  function toggle(field: string) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const currentPassword = String(formData.get("currentPassword") ?? "");
    const newPassword = String(formData.get("newPassword") ?? "");
    const confirmation = String(formData.get("confirmation") ?? "");

    if (newPassword.length < 8) {
      setMessage(en ? "The new password must contain at least 8 characters." : "Le nouveau mot de passe doit contenir au moins 8 caracteres.");
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmation) {
      setMessage(en ? "The new passwords do not match." : "Les nouveaux mots de passe ne correspondent pas.");
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/auth/change-password", {
      body: JSON.stringify({ confirmation, currentPassword, newPassword }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setMessage(result?.message ?? (en ? "The password could not be changed." : "Le mot de passe n'a pas pu etre modifie."));
      setIsSubmitting(false);
      return;
    }

    form.reset();
    setVisibleFields({});
    setSuccess(true);
    setMessage(en ? "Your password has been changed." : "Ton mot de passe a bien ete modifie.");
    setIsSubmitting(false);
  }

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm lg:col-span-2">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <KeyRound aria-hidden className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-black uppercase text-primary">{en ? "Account security" : "Securite du compte"}</p>
          <h3 className="font-display text-2xl font-black text-brand-ink">{en ? "Change my password" : "Changer mon mot de passe"}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-600">{en ? "Confirm your current password, then choose a new one." : "Confirme ton mot de passe actuel, puis choisis-en un nouveau."}</p>
        </div>
      </div>

      <form className="mt-5 grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
        <PasswordField autoComplete="current-password" id="currentPassword" label={en ? "Current password" : "Mot de passe actuel"} name="currentPassword" onToggle={() => toggle("currentPassword")} visible={Boolean(visibleFields.currentPassword)} />
        <PasswordField autoComplete="new-password" id="newPassword" label={en ? "New password" : "Nouveau mot de passe"} name="newPassword" onToggle={() => toggle("newPassword")} visible={Boolean(visibleFields.newPassword)} />
        <PasswordField autoComplete="new-password" id="confirmation" label={en ? "Confirm new password" : "Confirmer le nouveau mot de passe"} name="confirmation" onToggle={() => toggle("confirmation")} visible={Boolean(visibleFields.confirmation)} />

        {message ? (
          <p className={`rounded-lg p-3 text-sm font-bold md:col-span-3 ${success ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-red-700"}`} role="status">
            {message}
          </p>
        ) : null}

        <button className="min-h-12 rounded-lg bg-primary px-5 font-black text-white shadow-button disabled:cursor-wait disabled:opacity-60 md:col-span-3 md:justify-self-start" disabled={isSubmitting} type="submit">
          {isSubmitting ? (en ? "Changing..." : "Modification...") : (en ? "Change my password" : "Changer mon mot de passe")}
        </button>
      </form>
    </section>
  );
}

function PasswordField({ autoComplete, id, label, name, onToggle, visible }: PasswordFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input autoComplete={autoComplete} className="w-full pr-12" id={id} minLength={name === "currentPassword" ? undefined : 8} name={name} required type={visible ? "text" : "password"} />
        <button aria-label={visible ? `Masquer : ${label.toLowerCase()}` : `Afficher : ${label.toLowerCase()}`} aria-pressed={visible} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-600 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary" onClick={onToggle} type="button">
          {visible ? <EyeOff aria-hidden className="h-5 w-5" /> : <Eye aria-hidden className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
