"use client";

import { Star } from "lucide-react";
import { FormEvent, useState } from "react";

export function ModuleFeedbackForm({ moduleId }: { moduleId: string }) {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating) {
      setMessage("Choisis une note entre 1 et 5 etoiles.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setMessage(null);
    const response = await fetch("/api/student/module-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleId,
        rating,
        feedback: formData.get("feedback"),
        publishConsent: formData.get("publishConsent") === "on"
      })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSubmitting(false);
    setMessage(result?.message ?? "Action terminee.");
    if (response.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="rounded-xl border-2 border-secondary bg-emerald-50 p-5 font-bold text-emerald-900">
        Merci pour ton avis. Il sera relu par un administrateur avant toute publication.
      </section>
    );
  }

  return (
    <section className="rounded-xl border-2 border-secondary bg-primary-fixed p-5 shadow-[0_4px_0_0_rgba(88,96,98,1)]">
      <p className="text-sm font-black uppercase text-primary">Ton experience</p>
      <h3 className="mt-1 font-display text-2xl font-black text-brand-ink">
        Comment as-tu trouve ce module ?
      </h3>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Ta note aide notre equipe a ameliorer la formation.
      </p>
      <form className="mt-4 grid gap-4" onSubmit={submit}>
        <fieldset>
          <legend className="text-sm font-black text-brand-ink">Note sur 5</legend>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                aria-label={`${value} etoile${value > 1 ? "s" : ""}`}
                aria-pressed={rating === value}
                className="rounded-lg border-2 border-secondary bg-white p-2"
                key={value}
                onClick={() => setRating(value)}
                type="button"
              >
                <Star className={value <= rating ? "fill-brand-gold text-brand-gold" : "text-slate-300"} />
              </button>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-2 text-sm font-black text-brand-ink">
          Raconte-nous ton experience
          <textarea
            className="min-h-28 rounded-lg border-2 border-secondary bg-white p-3 font-semibold"
            maxLength={1000}
            minLength={20}
            name="feedback"
            placeholder="Ce que tu as aime, appris ou ce que nous pouvons ameliorer..."
            required
          />
        </label>
        <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
          <input className="mt-1" name="publishConsent" required type="checkbox" />
          J&apos;autorise CyberAmbassadeurs a publier cet avis avec mon prenom uniquement, apres validation par un administrateur.
        </label>
        {message ? <p className="rounded-lg bg-white p-3 text-sm font-bold text-primary">{message}</p> : null}
        <button
          className="min-h-12 w-fit rounded-lg bg-primary px-5 font-black text-white disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Envoi..." : "Envoyer mon avis"}
        </button>
      </form>
    </section>
  );
}
