"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";

export function SetInvitedPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    const confirmationResponse = await fetch("/api/auth/password-configured", { method: "POST" });
    if (!confirmationResponse.ok) {
      setStatus("Le mot de passe a été enregistré, mais la finalisation a échoué. Réessaie.");
      setIsSubmitting(false);
      return;
    }
    await supabase.auth.signOut();
    router.replace("/login?password_configured=1");
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <PasswordField id="password" label="Nouveau mot de passe" name="password" onToggle={() => setShowPassword((visible) => !visible)} visible={showPassword} />
      <PasswordField id="confirmation" label="Confirmer le mot de passe" name="confirmation" onToggle={() => setShowConfirmation((visible) => !visible)} visible={showConfirmation} />
      {status ? <p className="rounded-lg bg-rose-50 p-3 text-sm font-bold text-red-700">{status}</p> : null}
      <button className="min-h-12 rounded-lg bg-primary px-5 font-black text-white disabled:opacity-50" disabled={isSubmitting} type="submit">{isSubmitting ? "Configuration..." : "Configurer mon mot de passe"}</button>
    </form>
  );
}

function PasswordField({ id, label, name, onToggle, visible }: { id: string; label: string; name: string; onToggle: () => void; visible: boolean }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input autoComplete="new-password" className="w-full pr-12" id={id} minLength={8} name={name} required type={visible ? "text" : "password"} />
        <button
          aria-label={visible ? `Masquer : ${label.toLowerCase()}` : `Afficher : ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-600 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary"
          onClick={onToggle}
          type="button"
        >
          {visible ? <EyeOff aria-hidden className="h-5 w-5" /> : <Eye aria-hidden className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
