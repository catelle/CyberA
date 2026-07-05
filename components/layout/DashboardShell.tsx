import type { ReactNode } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Home,
  Layers,
  Link2,
  Megaphone,
  MessageCircle,
  ShieldAlert,
  Trophy,
  User,
  UsersRound,
  type LucideIcon
} from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { SafeUser } from "@/types/auth";

type DashboardShellProps = {
  user: SafeUser;
  title: string;
  children: ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

export function DashboardShell({ user, title, children }: DashboardShellProps) {
  const t = getDictionary(user.language);
  const navItems: NavItem[] =
    user.role === "admin"
      ? [
          { href: "/admin/dashboard", label: "Dashboard", Icon: Home },
          { href: "/admin/ambassadors", label: "Ambassadeurs", Icon: UsersRound },
          { href: "/admin/submissions", label: "Soumissions", Icon: ClipboardCheck },
          { href: "/admin/forum", label: "Forum", Icon: ShieldAlert },
          { href: "/admin/capstone", label: "Capstone", Icon: GraduationCap },
          { href: "/admin/cohorts", label: "Cohortes", Icon: UsersRound },
          { href: "/admin/modules", label: "Modules", Icon: Layers },
          { href: "/admin/notifications", label: "Notifications", Icon: Megaphone }
        ]
      : user.role === "parent"
        ? [
            { href: "/parent/dashboard", label: "Accueil", Icon: Home },
            { href: "/parent/reports", label: "Rapports", Icon: FileText },
            { href: "/parent/challenge", label: "Defi", Icon: ClipboardCheck },
            { href: "/parent/link", label: "Lien enfant", Icon: Link2 }
          ]
        : [
            { href: "/student/dashboard", label: "Accueil", Icon: Home },
            { href: "/student/modules", label: "Modules", Icon: BookOpen },
            { href: "/student/challenges", label: "Defis", Icon: ClipboardCheck },
            { href: "/student/leaderboard", label: "Classement", Icon: Trophy },
            { href: "/student/forum", label: "Forum", Icon: MessageCircle },
            { href: "/student/profile", label: "Profil", Icon: User }
          ];
  const mobileNavItems =
    user.role === "admin" ? navItems.slice(0, 4) : navItems.slice(0, 5);

  return (
    <main className="min-h-screen bg-brand-sky pb-24 text-brand-ink lg:pb-0">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="bg-brand-ink px-4 py-4 text-white shadow-glow lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:px-5 lg:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-lg font-black sm:text-xl">Cyberambassadeurs</p>
              <p className="mt-1 truncate text-sm font-semibold text-white/70">
                {user.profile.fullName}
              </p>
            </div>
            <LogoutButton label={t.logout} />
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:grid lg:overflow-visible lg:pb-0">
            {navItems.map(({ Icon, ...item }) => (
              <Link
                className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm font-bold text-white/80 transition hover:bg-brand-blue hover:text-white lg:px-4"
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-6 rounded-lg border border-rose-100 bg-white px-4 py-4 shadow-soft sm:px-6 lg:mb-8">
              <p className="text-xs font-black uppercase tracking-wide text-brand-blue">
                {user.role}
              </p>
              <h1 className="mt-1 text-2xl font-black leading-tight text-brand-ink sm:text-3xl">
                {title}
              </h1>
            </header>

            {children}
          </div>
        </section>
      </div>

      {user.role !== "admin" ? (
        <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-lg border border-rose-100 bg-white/95 p-1 shadow-glow backdrop-blur lg:hidden">
          {mobileNavItems.map(({ Icon, ...item }) => (
            <Link
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-1 text-center text-[0.68rem] font-black leading-tight text-brand-graphite transition hover:bg-brand-sky hover:text-brand-blue"
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </main>
  );
}
