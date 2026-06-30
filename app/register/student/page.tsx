import { StudentRegistrationForm } from "@/components/auth/StudentRegistrationForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function StudentRegistrationPage() {
  const t = getDictionary("fr");

  return (
    <AuthShell title={t.studentRegistration} subtitle={t.mission}>
      <StudentRegistrationForm />
    </AuthShell>
  );
}
