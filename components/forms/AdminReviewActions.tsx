"use client";

import { Check, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ReviewTarget = "submission" | "forum" | "capstone";

type AdminReviewActionsProps = {
  id: string;
  target: ReviewTarget;
  defaultPoints?: number;
};

function endpointFor(target: ReviewTarget, id: string) {
  if (target === "submission") return `/api/admin/submissions/${id}/review`;
  if (target === "forum") return `/api/admin/forum/${id}/review`;
  return `/api/admin/capstone/${id}/review`;
}

export function AdminReviewActions({ id, target, defaultPoints = 50 }: AdminReviewActionsProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitReview(nextStatus: string) {
    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(formRef.current);
    const payload =
      target === "submission"
        ? {
            status: nextStatus,
            pointsAwarded: formData.get("pointsAwarded") || defaultPoints,
            reviewerNote: formData.get("reviewerNote") || ""
          }
        : target === "forum"
          ? {
              status: nextStatus,
              adminNote: formData.get("adminNote") || ""
            }
          : { status: nextStatus };

    const response = await fetch(endpointFor(target, id), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    setIsSubmitting(false);
    setStatus(result?.message ?? "Action terminee.");
    if (response.ok) router.refresh();
  }

  return (
    <form className="mt-5 grid gap-3" ref={formRef}>
      {target === "submission" ? (
        <>
          <div className="field">
            <label htmlFor={`points-${id}`}>Points</label>
            <input
              defaultValue={defaultPoints}
              id={`points-${id}`}
              min={0}
              name="pointsAwarded"
              type="number"
            />
          </div>
          <div className="field">
            <label htmlFor={`note-${id}`}>Note de revision</label>
            <textarea
              className="min-h-24 rounded-lg border border-slate-200 p-3"
              id={`note-${id}`}
              name="reviewerNote"
            />
          </div>
        </>
      ) : null}

      {target === "forum" ? (
        <div className="field">
          <label htmlFor={`admin-note-${id}`}>Instructions / raison</label>
          <textarea
            className="min-h-28 rounded-lg border border-slate-200 p-3"
            id={`admin-note-${id}`}
            name="adminNote"
            required
          />
        </div>
      ) : null}

      {status ? (
        <p className="rounded-lg bg-brand-sky p-3 text-sm font-bold text-brand-blue">
          {status}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        {target === "forum" ? (
          <button
            className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-green-700 px-4 font-black text-white disabled:opacity-50"
            disabled={isSubmitting}
            onClick={() => submitReview("verified")}
            type="button"
          >
            <Send size={18} />
            Verifier et notifier
          </button>
        ) : (
          <button
            className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-green-700 px-4 font-black text-white disabled:opacity-50"
            disabled={isSubmitting}
            onClick={() => submitReview("approved")}
            type="button"
          >
            <Check size={18} />
            Approuver
          </button>
        )}
        <button
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-red-700 px-4 font-black text-white disabled:opacity-50"
          disabled={isSubmitting}
          onClick={() => submitReview("rejected")}
          type="button"
        >
          <X size={18} />
          Rejeter
        </button>
      </div>
    </form>
  );
}
