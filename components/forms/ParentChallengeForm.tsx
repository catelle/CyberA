"use client";

import { CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ParentChallengeFormProps = {
  challengeId: string;
  childId?: string;
};

export function ParentChallengeForm({ challengeId, childId }: ParentChallengeFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    if (!childId) {
      setIsSubmitting(false);
      setStatus("Aucun compte enfant n'est encore lie.");
      return;
    }

    const response = await fetch("/api/parent/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        childId,
        challengeId,
        message: new FormData(event.currentTarget).get("message")
      })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    setIsSubmitting(false);
    setStatus(result?.message ?? "Action terminee.");
    if (response.ok) router.refresh();
  }

  return (
    <form className="grid gap-5 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="message">Message pour l&apos;enfant</label>
        <textarea
          className="min-h-32 rounded-lg border border-slate-200 p-3 outline-none focus:border-brand-blue focus:ring-4 focus:ring-blue-100"
          id="message"
          name="message"
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
        <CheckCircle2 size={18} />
        {isSubmitting ? "Validation..." : "Accepter le defi"}
      </button>
    </form>
  );
}
