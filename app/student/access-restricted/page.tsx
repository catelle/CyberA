import { LockKeyhole } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireRole } from "@/lib/auth/guards";

export default async function StudentAccessRestrictedPage() {
  const user = await requireRole(["student"]);
  const en = user.language === "en";

  return (
    <DashboardShell user={user} title={en ? "Access restricted" : "Accès restreint"}>
      <section className="mx-auto max-w-2xl rounded-2xl border-2 border-secondary bg-white p-8 text-center shadow-[0_6px_0_0_rgba(88,96,98,1)] sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-700">
          <LockKeyhole aria-hidden className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-black text-brand-ink sm:text-3xl">
          {en ? "This area is not part of your scholarship path yet." : "Cet espace ne fait pas encore partie de ton parcours de bourse."}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
          {en
            ? "Your scholarship account currently includes the learning modules. Use the Modules menu to continue your programme."
            : "Ton compte de bourse comprend actuellement les modules d'apprentissage. Utilise le menu Modules pour poursuivre ton parcours."}
        </p>
      </section>
    </DashboardShell>
  );
}
