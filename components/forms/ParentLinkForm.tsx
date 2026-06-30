"use client";

import { LinkIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ParentLinkForm() {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/parent/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyCode: formData.get("familyCode")
        })
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      setStatus(result?.message ?? "Action terminee.");

      if (response.ok) {
        router.refresh();
        router.push("/parent/dashboard");
      }
    } catch {
      setStatus("Le serveur est injoignable. Verifiez votre connexion puis reessayez.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-black uppercase text-brand-gold">Code famille</p>
        <h2 className="mt-2 text-2xl font-black text-brand-ink">
          Lier un compte ambassadeur
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          Le code a 6 caracteres est affiche au jeune apres son inscription.
        </p>
      </div>
      <div className="field">
        <label htmlFor="familyCode">Code</label>
        <input
          className="uppercase"
          id="familyCode"
          maxLength={6}
          minLength={6}
          name="familyCode"
          placeholder="KJH7P2"
          required
        />
      </div>

      {status ? (
        <p className="rounded-lg bg-brand-sky p-4 text-sm font-bold text-brand-blue">
          {status}
        </p>
      ) : null}

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 font-black text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        <LinkIcon size={18} />
        {isSubmitting ? "Liaison..." : "Lier"}
      </button>
    </form>
  );
}
