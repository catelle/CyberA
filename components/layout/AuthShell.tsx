import Link from "next/link";
import type { ReactNode } from "react";

import { LanguageToggle } from "@/components/layout/LanguageToggle";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-brand-blue text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6">
        <header className="flex items-center justify-between gap-4">
          <Link className="text-xl font-black tracking-wide" href="/login">
            Cyberambassadeurs
          </Link>
          <LanguageToggle />
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.85fr_1fr]">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-brand-gold px-4 py-2 text-sm font-bold text-brand-ink">
              Cameroun · Afrique
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/78">{subtitle}</p>
          </div>

          <div className="rounded-lg bg-white p-5 text-brand-ink shadow-soft sm:p-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
