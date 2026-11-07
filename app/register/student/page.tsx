import { StudentRegistrationForm } from "@/components/auth/StudentRegistrationForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function StudentRegistrationPage() {
  const fr = getDictionary("fr");
  const en = getDictionary("en");

  return (
    <AuthShell title={{ fr: fr.studentRegistration, en: en.studentRegistration }} subtitle={{ fr: fr.mission, en: en.mission }}>
      <StudentRegistrationForm />
    </AuthShell>
  );
}
