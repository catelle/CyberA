import { ParentRegistrationForm } from "@/components/auth/ParentRegistrationForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function ParentRegistrationPage() {
  const fr = getDictionary("fr");
  const en = getDictionary("en");

  return (
    <AuthShell title={{ fr: fr.parentRegistration, en: en.parentRegistration }} subtitle={{ fr: fr.mission, en: en.mission }}>
      <ParentRegistrationForm />
    </AuthShell>
  );
}
