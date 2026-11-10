"use client";

import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminFeedbackReviewActions({ id }: { id: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function review(status: "approved" | "rejected") {
    setIsSubmitting(true);
    setMessage(null);
    const response = await fetch(`/api/admin/module-feedback/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    setIsSubmitting(false);
    setMessage(result?.message ?? "Action terminee.");
    if (response.ok) router.refresh();
  }

  return (
    <div className="mt-4 grid gap-2">
      {message ? <p className="rounded-lg bg-slate-100 p-3 text-sm font-bold">{message}</p> : null}
      <div className="flex flex-wrap gap-2">
        <button className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-green-700 px-4 font-black text-white disabled:opacity-50" disabled={isSubmitting} onClick={() => review("approved")} type="button"><Check size={18} />Approuver et publier</button>
        <button className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-red-700 px-4 font-black text-white disabled:opacity-50" disabled={isSubmitting} onClick={() => review("rejected")} type="button"><X size={18} />Rejeter</button>
      </div>
    </div>
  );
}
