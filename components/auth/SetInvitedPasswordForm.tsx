"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";

export function SetInvitedPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");
    if (password.length < 8) {
      setStatus("Le mot de passe doit contenir au moins 8 caracteres.");
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmation) {
      setStatus("Les mots de passe ne correspondent pas.");
      setIsSubmitting(false);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("Ce lien est invalide ou a expire. Demandez une nouvelle invitation.");
      setIsSubmitting(false);
      return;
    }
    await supabase.auth.signOut();
    router.replace("/login?password_configured=1");
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <div className="field"><label htmlFor="password">Nouveau mot de passe</label><input autoComplete="new-password" id="password" minLength={8} name="password" required type="password" /></div>
      <div className="field"><label htmlFor="confirmation">Confirmer le mot de passe</label><input autoComplete="new-password" id="confirmation" minLength={8} name="confirmation" required type="password" /></div>
      {status ? <p className="rounded-lg bg-rose-50 p-3 text-sm font-bold text-red-700">{status}</p> : null}
      <button className="min-h-12 rounded-lg bg-primary px-5 font-black text-white disabled:opacity-50" disabled={isSubmitting} type="submit">{isSubmitting ? "Configuration..." : "Configurer mon mot de passe"}</button>
    </form>
  );
}
