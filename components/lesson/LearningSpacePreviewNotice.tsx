import Link from "next/link";
import { Eye } from "lucide-react";

type LearningSpacePreviewNoticeProps = {
  /** Explains what the admin can and cannot do on this specific page. */
  detail?: string;
};

/**
 * Admins browse the real learning space to check the content learners receive.
 * Nothing they do there is recorded as progress, so the banner makes the
 * read-only nature of the visit explicit.
 */
export function LearningSpacePreviewNotice({ detail }: LearningSpacePreviewNoticeProps) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border-2 border-secondary bg-[#fff4c2] p-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Eye aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-black text-brand-ink">Apercu formateur</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-amber-950">
            {detail ??
              "Tu vois l'espace d'apprentissage exactement comme un eleve. Aucune progression, aucun point et aucun badge ne sont enregistres pour ton compte admin."}
          </p>
        </div>
      </div>
      <Link
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border-2 border-secondary bg-white px-4 text-sm font-black text-brand-blue shadow-[0_2px_0_0_rgba(88,96,98,1)] transition hover:bg-primary-fixed"
        href="/admin/modules"
      >
        Retour au CMS
      </Link>
    </section>
  );
}
