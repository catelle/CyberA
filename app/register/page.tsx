import Link from "next/link";

import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function RegisterPage() {
  const t = getDictionary("fr");

  return (
    <AuthShell title="Inscription" subtitle={t.mission}>
      <div className="grid gap-4">
        <Link
          className="rounded-lg bg-brand-blue p-5 font-black text-white transition hover:bg-brand-ink"
          href="/register/ambassador"
        >
          Ambassadeur
        </Link>
        <Link
          className="rounded-lg border border-slate-200 p-5 font-black text-brand-blue transition hover:bg-brand-sky"
          href="/register/parent"
        >
          Parent
        </Link>
      </div>
    </AuthShell>
  );
}
