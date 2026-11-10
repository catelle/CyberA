"use client";

import { FormEvent, useState } from "react";

const practiceOptions = [
  ["two_factor", "J’ai activé la double authentification"],
  ["passwords", "J’utilise des mots de passe plus solides ou uniques"],
  ["verify", "Je vérifie une information avant de la partager"],
  ["privacy", "J’ai renforcé mes réglages de confidentialité"],
  ["report", "Je sais mieux signaler, bloquer ou demander de l’aide"],
  ["other", "Autre pratique"],
] as const;

export function M1EvaluationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setIsSubmitting(true);
    setMessage(null);
    const response = await fetch("/api/m1-evaluation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        participantCode: data.get("participantCode"),
        fullName: data.get("fullName"),
        email: data.get("email"),
        city: data.get("city"),
        cohort: data.get("cohort"),
        completionDate: data.get("completionDate"),
        newPracticeAdopted: data.get("newPracticeAdopted") === "yes",
        newPractices: data.getAll("newPractices"),
        practiceExample: data.get("practiceExample"),
        voluntaryActionTaken: data.get("voluntaryActionTaken") === "yes",
        voluntaryActionDetails: data.get("voluntaryActionDetails"),
        riskActionTaken: data.get("riskActionTaken") === "yes",
        riskActionExample: data.get("riskActionExample"),
        maintenanceObstacle: data.get("maintenanceObstacle"),
        contactConsent: data.get("contactConsent") === "on",
        website: data.get("website")
      })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSubmitting(false);
    setMessage(result?.message ?? "Action terminée.");
    if (response.ok) { setSubmitted(true); form.reset(); }
  }

  if (submitted) {
    return <section className="mt-8 rounded-xl border-2 border-emerald-700 bg-emerald-50 p-5 font-bold text-emerald-950">Merci. Ton évaluation M+1 a bien été enregistrée.</section>;
  }

  return (
    <form className="mt-8 grid gap-7" onSubmit={submit}>
      <fieldset className="grid gap-4 rounded-xl border-2 border-secondary bg-slate-50 p-4 sm:grid-cols-2 sm:p-5">
        <legend className="px-1 font-display text-xl font-black text-brand-ink">À propos de toi</legend>
        <label className="grid gap-2 text-sm font-black text-brand-ink">Code participant<input className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3 font-semibold" name="participantCode" placeholder="Ex. CA-001" required /></label>
        <label className="grid gap-2 text-sm font-black text-brand-ink">Nom complet<input className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3 font-semibold" name="fullName" required /></label>
        <label className="grid gap-2 text-sm font-black text-brand-ink">E-mail<input className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3 font-semibold" name="email" type="email" required /></label>
        <label className="grid gap-2 text-sm font-black text-brand-ink">Ville (facultatif)<input className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3 font-semibold" name="city" /></label>
        <label className="grid gap-2 text-sm font-black text-brand-ink">Date de fin de formation (facultatif)<input className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3 font-semibold" name="completionDate" type="date" /></label>
        <label className="grid gap-2 text-sm font-black text-brand-ink">Cohorte<select className="min-h-11 rounded-lg border-2 border-secondary bg-white px-3 font-semibold" defaultValue="CyberA-Rise" name="cohort"><option>CyberA-Rise</option><option>CyberAmbassador</option></select></label>
        <input aria-hidden="true" className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      </fieldset>

      <fieldset className="grid gap-4 rounded-xl border-2 border-secondary bg-white p-4 sm:p-5">
        <legend className="px-1 font-display text-xl font-black text-brand-ink">1. Nouvelles pratiques numériques</legend>
        <p className="text-sm font-semibold leading-6 text-secondary">Depuis la fin de la formation, as-tu adopté et maintenu au moins une nouvelle pratique de sécurité ou de citoyenneté numérique ?</p>
        <div className="grid gap-2 sm:grid-cols-2"><label className="flex items-center gap-2 font-bold"><input name="newPracticeAdopted" type="radio" value="yes" required /> Oui</label><label className="flex items-center gap-2 font-bold"><input name="newPracticeAdopted" type="radio" value="no" /> Non</label></div>
        <div className="grid gap-2 sm:grid-cols-2">{practiceOptions.map(([value, label]) => <label className="flex items-start gap-2 text-sm font-semibold" key={value}><input className="mt-1" name="newPractices" type="checkbox" value={value} /> {label}</label>)}</div>
        <label className="grid gap-2 text-sm font-black">Exemple ou précision (facultatif)<textarea className="min-h-24 rounded-lg border-2 border-secondary p-3 font-semibold" maxLength={1200} name="practiceExample" /></label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-xl border-2 border-secondary bg-white p-4 sm:p-5">
        <legend className="px-1 font-display text-xl font-black text-brand-ink">2. Relais volontaire</legend>
        <p className="text-sm font-semibold leading-6 text-secondary">En dehors du Capstone et des activités obligatoires, as-tu mené au moins une action volontaire de sensibilisation, d’accompagnement ou d’orientation ?</p>
        <div className="grid gap-2 sm:grid-cols-2"><label className="flex items-center gap-2 font-bold"><input name="voluntaryActionTaken" type="radio" value="yes" required /> Oui</label><label className="flex items-center gap-2 font-bold"><input name="voluntaryActionTaken" type="radio" value="no" /> Non</label></div>
        <label className="grid gap-2 text-sm font-black">Décris l’action, le public et le canal utilisé<textarea className="min-h-28 rounded-lg border-2 border-secondary p-3 font-semibold" maxLength={1600} name="voluntaryActionDetails" /></label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-xl border-2 border-secondary bg-white p-4 sm:p-5">
        <legend className="px-1 font-display text-xl font-black text-brand-ink">3. Capacité d’action</legend>
        <p className="text-sm font-semibold leading-6 text-secondary">Peux-tu décrire une situation concrète dans laquelle tu as identifié un risque numérique et su agir, conseiller ou orienter une personne ?</p>
        <div className="grid gap-2 sm:grid-cols-2"><label className="flex items-center gap-2 font-bold"><input name="riskActionTaken" type="radio" value="yes" required /> Oui</label><label className="flex items-center gap-2 font-bold"><input name="riskActionTaken" type="radio" value="no" /> Non</label></div>
        <label className="grid gap-2 text-sm font-black">Décris brièvement le risque et ta réaction<textarea className="min-h-28 rounded-lg border-2 border-secondary p-3 font-semibold" maxLength={1600} name="riskActionExample" /></label>
      </fieldset>

      <fieldset className="grid gap-4 rounded-xl border-2 border-secondary bg-slate-50 p-4 sm:p-5">
        <legend className="px-1 font-display text-xl font-black text-brand-ink">Maintien et suivi</legend>
        <label className="grid gap-2 text-sm font-black">Qu’est-ce qui rend difficile le maintien de ces pratiques ?<textarea className="min-h-24 rounded-lg border-2 border-secondary bg-white p-3 font-semibold" maxLength={1200} name="maintenanceObstacle" /></label>
        <label className="flex items-start gap-3 text-sm font-semibold"><input className="mt-1" name="contactConsent" type="checkbox" /> J’autorise l’équipe à me recontacter pour clarifier ma réponse (facultatif).</label>
      </fieldset>

      {message ? <p className="rounded-lg bg-primary-fixed p-3 text-sm font-bold text-primary">{message}</p> : null}
      <button className="min-h-12 w-fit rounded-lg bg-primary px-6 py-3 font-black text-white shadow-[0_4px_0_0_rgba(88,96,98,1)] disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? "Envoi…" : "Envoyer mon évaluation"}</button>
    </form>
  );
}
