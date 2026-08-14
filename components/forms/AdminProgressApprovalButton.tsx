"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminProgressApprovalButtonProps = {
  progressId: string;
};

export function AdminProgressApprovalButton({
  progressId
}: AdminProgressApprovalButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function approve() {
    setIsSubmitting(true);
    setMessage(null);

    const response = await fetch(
      `/api/admin/module-progress/${progressId}/approve`,
      { method: "POST" }
    );
    const result = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setIsSubmitting(false);
    setMessage(result?.message ?? "Action terminee.");
    if (response.ok) router.refresh();
  }

  return (
    <div className="mt-4 grid gap-2">
      {message ? (
        <p className="rounded-lg bg-brand-sky p-3 text-sm font-bold text-brand-blue">
          {message}
        </p>
      ) : null}
      <button
        className="inline-flex min-h-12 w-fit items-center gap-2 rounded-lg bg-green-700 px-4 font-black text-white disabled:opacity-50"
        disabled={isSubmitting}
        onClick={approve}
        type="button"
      >
        <Check aria-hidden size={18} />
        {isSubmitting ? "Approbation..." : "Approuver l'acces au module 2"}
      </button>
    </div>
  );
}
