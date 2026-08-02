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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff1f2_0,_#f7f9fc_38%,_#eceef1_100%)] font-body-md text-on-background">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-3" href="/login">
            <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary bg-primary font-display text-xl font-black text-white shadow-[0_4px_14px_rgba(181,18,63,0.22)]">
              C
            </span>
            <span className="font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-primary sm:text-xl">
              Cyberambassadeurs
            </span>
          </Link>
          <LanguageToggle />
        </header>

        <section className="grid flex-1 items-center gap-7 py-8 sm:py-10 lg:grid-cols-[0.9fr_1fr] lg:gap-12">
          <div className="max-w-xl">
            <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-primary bg-white/70 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
              Cameroun - Afrique
            </p>
            <h1 className="max-w-lg font-display text-3xl font-black leading-[1.08] tracking-[-0.035em] text-on-surface sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base font-semibold leading-7 text-secondary sm:text-lg sm:leading-8">
              {subtitle}
            </p>
            <div className="mt-7 grid max-w-md grid-cols-3 divide-x divide-outline-variant border-y border-outline-variant bg-white/55 py-3 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-secondary">
              <div className="px-2 py-1">
                Learn
              </div>
              <div className="px-2 py-1">
                Act
              </div>
              <div className="px-2 py-1">
                Lead
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant bg-white p-4 text-on-surface shadow-[0_20px_55px_rgba(25,28,30,0.12)] sm:p-7">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
