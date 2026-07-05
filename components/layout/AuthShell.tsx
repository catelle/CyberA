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
    <main className="min-h-screen bg-brand-ink text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link className="text-lg font-black tracking-wide sm:text-xl" href="/login">
            Cyberambassadeurs
          </Link>
          <LanguageToggle />
        </header>

        <section className="grid flex-1 items-center gap-7 py-8 sm:py-10 lg:grid-cols-[0.9fr_1fr] lg:gap-12">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-brand-rose px-4 py-2 text-sm font-black text-brand-blue">
              Cameroun · Afrique
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {subtitle}
            </p>
            <div className="mt-6 grid max-w-md grid-cols-3 gap-2 text-center text-xs font-black uppercase text-white/80">
              <div className="rounded-lg border border-white/10 bg-white/10 px-2 py-3">
                Learn
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 px-2 py-3">
                Act
              </div>
              <div className="rounded-lg border border-white/10 bg-white/10 px-2 py-3">
                Lead
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-rose-100 bg-white p-4 text-brand-ink shadow-glow sm:p-7">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
