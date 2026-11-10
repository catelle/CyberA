import { ScholarshipRegistrationForm } from "@/components/auth/ScholarshipRegistrationForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function ScholarshipRegistrationPage() {
  const fr = getDictionary("fr");
  const en = getDictionary("en");

  return (
    <AuthShell title={{ fr: "Inscription bourse", en: "Scholarship registration" }} subtitle={{ fr: fr.mission, en: en.mission }}>
      <ScholarshipRegistrationForm />
    </AuthShell>
  );
}
