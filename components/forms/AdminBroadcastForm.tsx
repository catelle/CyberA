"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function AdminBroadcastForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const response = await fetch("/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries()))
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    setIsSubmitting(false);
    setStatus(result?.message ?? "Action terminee.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="grid gap-5 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-black uppercase text-brand-gold">
          Notification programme
        </p>
        <h2 className="mt-2 text-2xl font-black text-brand-ink">
          Envoyer une alerte
        </h2>
      </div>
      <div className="field">
        <label htmlFor="audience">Audience</label>
        <select id="audience" name="audience">
          <option value="ambassadors">Ambassadeurs</option>
          <option value="parents">Parents</option>
          <option value="all">Tous</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="title">Titre</label>
        <input id="title" name="title" required />
      </div>
      <div className="field">
        <label htmlFor="body">Message</label>
        <textarea
          className="min-h-36 rounded-lg border border-slate-200 p-3 outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
          id="body"
          name="body"
          required
        />
      </div>
      {status ? (
        <p className="rounded-lg bg-brand-sky p-4 text-sm font-bold text-brand-blue">
          {status}
        </p>
      ) : null}
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-blue px-5 font-black text-white transition hover:bg-brand-ink disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        <Send size={18} />
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
