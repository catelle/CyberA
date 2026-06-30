import { Suspense } from "react";

import { LoginForm } from "@/components/auth/LoginForm";
import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function LoginPage() {
  const t = getDictionary("fr");

  return (
    <AuthShell title={t.brand} subtitle={t.mission}>
      <h2 className="mb-6 text-2xl font-black text-brand-blue">{t.login}</h2>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
