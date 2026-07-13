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
    <main className="min-h-screen bg-background font-body-md text-on-background">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-3" href="/login">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-secondary bg-primary-container font-display text-xl font-black text-white shadow-[0_3px_0_0_rgba(88,96,98,1)]">
              C
            </span>
            <span className="font-display text-lg font-black uppercase text-primary sm:text-xl">
              Cyberambassadeurs
            </span>
          </Link>
          <LanguageToggle />
        </header>

        <section className="grid flex-1 items-center gap-7 py-8 sm:py-10 lg:grid-cols-[0.9fr_1fr] lg:gap-12">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full border-2 border-secondary bg-primary-fixed px-4 py-2 text-sm font-black uppercase text-primary shadow-[0_2px_0_0_rgba(88,96,98,1)]">
              Cameroun - Afrique
            </p>
            <h1 className="font-display text-3xl font-black leading-tight text-on-surface sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base font-semibold leading-7 text-secondary sm:text-lg sm:leading-8">
              {subtitle}
            </p>
            <div className="mt-6 grid max-w-md grid-cols-3 gap-2 text-center text-xs font-black uppercase text-secondary">
              <div className="rounded-xl border-2 border-secondary bg-surface-container-low px-2 py-3 shadow-[0_3px_0_0_rgba(88,96,98,1)]">
                Learn
              </div>
              <div className="rounded-xl border-2 border-secondary bg-surface-container-low px-2 py-3 shadow-[0_3px_0_0_rgba(88,96,98,1)]">
                Act
              </div>
              <div className="rounded-xl border-2 border-secondary bg-surface-container-low px-2 py-3 shadow-[0_3px_0_0_rgba(88,96,98,1)]">
                Lead
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-secondary bg-white p-4 text-on-surface shadow-[0_8px_0_0_rgba(88,96,98,1)] sm:p-7">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
