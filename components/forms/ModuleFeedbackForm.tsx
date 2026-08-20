"use client";

import { Star } from "lucide-react";
import { FormEvent, useState } from "react";

export function ModuleFeedbackForm({ moduleId, onSubmitted }: { moduleId: string; onSubmitted?: () => void }) {
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
        understandingRating: formData.get("understandingRating"),
        usefulnessRating: formData.get("usefulnessRating"),
        pace: formData.get("pace"),
        feedback: formData.get("feedback"),
        suggestions: formData.get("suggestions"),
        publishConsent: formData.get("publishConsent") === "on"
      })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSubmitting(false);
    setMessage(result?.message ?? "Action terminee.");
    if (response.ok) {
      setSubmitted(true);
      onSubmitted?.();
    }
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
        <fieldset className="grid gap-3 rounded-lg border border-rose-200 bg-white p-4">
          <legend className="px-1 text-sm font-black text-brand-ink">Questions rapides</legend>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Le contenu etait-il facile a comprendre ?
            <select className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3" name="understandingRating" required defaultValue="">
              <option disabled value="">Choisir</option>
              <option value="5">Tres clair</option><option value="4">Clair</option><option value="3">Assez clair</option><option value="2">Difficile</option><option value="1">Tres difficile</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Ce module te sera-t-il utile dans la vie reelle ?
            <select className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3" name="usefulnessRating" required defaultValue="">
              <option disabled value="">Choisir</option>
              <option value="5">Tres utile</option><option value="4">Utile</option><option value="3">Un peu utile</option><option value="2">Peu utile</option><option value="1">Pas utile</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Comment as-tu trouve le rythme ?
            <select className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3" name="pace" required defaultValue="">
              <option disabled value="">Choisir</option>
              <option value="too_slow">Trop lent</option><option value="just_right">Bon rythme</option><option value="too_fast">Trop rapide</option>
            </select>
          </label>
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
        <label className="grid gap-2 text-sm font-black text-brand-ink">
          Tes suggestions pour ameliorer ce module (facultatif)
          <textarea className="min-h-24 rounded-lg border-2 border-secondary bg-white p-3 font-semibold" maxLength={1000} name="suggestions" placeholder="Une activite, une illustration ou une explication que tu aimerais ajouter..." />
        </label>
        <label className="flex items-start gap-3 text-sm font-semibold text-slate-700">
          <input className="mt-1" name="publishConsent" type="checkbox" />
          J&apos;autorise CyberAmbassadeurs a publier cet avis avec mon prenom uniquement, apres validation par un administrateur (facultatif).
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
