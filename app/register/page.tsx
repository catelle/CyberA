import { RegisterOptions } from "@/components/auth/RegisterOptions";

import { AuthShell } from "@/components/layout/AuthShell";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function RegisterPage() {
  const fr = getDictionary("fr");
  const en = getDictionary("en");

  return (
    <AuthShell title={{ fr: "Inscription", en: "Registration" }} subtitle={{ fr: fr.mission, en: en.mission }}>
      <RegisterOptions />
    </AuthShell>
  );
}
