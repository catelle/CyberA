import type { ReactNode } from "react";
import Link from "next/link";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { SafeUser } from "@/types/auth";

type DashboardShellProps = {
  user: SafeUser;
  title: string;
  children: ReactNode;
};

export function DashboardShell({ user, title, children }: DashboardShellProps) {
  const t = getDictionary(user.language);
  const navItems =
    user.role === "admin"
      ? [
          { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/ambassadors", label: "Ambassadeurs" },
          { href: "/admin/submissions", label: "Soumissions" },
          { href: "/admin/forum", label: "Forum" },
          { href: "/admin/capstone", label: "Capstone" },
          { href: "/admin/cohorts", label: "Cohortes" },
          { href: "/admin/modules", label: "Modules" },
          { href: "/admin/notifications", label: "Notifications" }
        ]
      : user.role === "parent"
        ? [
            { href: "/parent/dashboard", label: "Accueil" },
            { href: "/parent/reports", label: "Rapports" },
            { href: "/parent/challenge", label: "Defi" },
            { href: "/parent/link", label: "Lien enfant" }
          ]
        : [
            { href: "/student/dashboard", label: "Accueil" },
            { href: "/student/modules", label: "Modules" },
            { href: "/student/challenges", label: "Defis" },
            { href: "/student/leaderboard", label: "Classement" },
            { href: "/student/forum", label: "Forum" },
            { href: "/student/profile", label: "Profil" }
          ];
  const mobileNavItems =
    user.role === "admin" ? navItems.slice(0, 4) : navItems.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 lg:pb-0">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="bg-brand-blue px-5 py-5 text-white lg:w-72">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div>
              <p className="text-xl font-black">Cyberambassadeurs</p>
              <p className="mt-2 text-sm text-white/70">{user.profile.fullName}</p>
            </div>
            <LogoutButton label={t.logout} />
          </div>

          <nav className="mt-8 hidden gap-2 lg:grid">
            {navItems.map((item) => (
              <Link
                className="rounded-lg bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/20"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="flex-1 px-5 py-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <header className="mb-8">
              <p className="text-sm font-black uppercase text-brand-gold">
                {user.role}
              </p>
              <h1 className="mt-2 text-3xl font-black text-brand-ink">{title}</h1>
            </header>

            {children}
          </div>
        </section>
      </div>

      {user.role !== "admin" ? (
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white shadow-lg lg:hidden">
          {mobileNavItems.map((item) => (
            <Link
              className="flex min-h-14 items-center justify-center px-2 text-center text-xs font-black text-brand-blue"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </main>
  );
}
