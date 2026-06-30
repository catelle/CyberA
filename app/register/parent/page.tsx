import { ParentRegistrationForm } from "@/components/auth/ParentRegistrationForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function ParentRegistrationPage() {
  const t = getDictionary("fr");

  return (
    <AuthShell title={t.parentRegistration} subtitle={t.mission}>
      <ParentRegistrationForm />
    </AuthShell>
  );
}
