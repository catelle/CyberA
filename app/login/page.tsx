import { Suspense } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function LoginPage() {
  const fr = getDictionary("fr");
  const en = getDictionary("en");

  return (
    <AuthShell title={{ fr: fr.brand, en: en.brand }} subtitle={{ fr: fr.mission, en: en.mission }}>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
