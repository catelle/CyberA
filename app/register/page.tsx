import Link from "next/link";

import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function RegisterPage() {
  const t = getDictionary("fr");

  return (
    <AuthShell title="Inscription" subtitle={t.mission}>
      <div className="grid gap-4">
        <Link
          className="rounded-xl bg-primary p-5 font-black text-white transition hover:bg-primary-container"
          href="/register/ambassador"
        >
          Ambassadeur
        </Link>
        <Link
          className="rounded-xl border-2 border-secondary bg-white p-5 font-black text-primary shadow-[0_4px_0_0_rgba(88,96,98,1)] transition hover:bg-surface-container-low"
          href="/register/parent"
        >
          Parent
        </Link>
      </div>
    </AuthShell>
  );
}
