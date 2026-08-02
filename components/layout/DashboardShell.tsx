import type { ReactNode } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Flame,
  GraduationCap,
  Home,
  Layers,
  Link2,
  Megaphone,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  Trophy,
  User,
  UsersRound,
  type LucideIcon
} from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { DashboardTour } from "@/components/layout/DashboardTour";
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
          { href: "/admin/challenges", label: "Defis", Icon: Trophy },
          { href: "/admin/ambassadors", label: "Eleves", Icon: UsersRound },
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
  const roleLabel =
    user.role === "admin"
      ? "Admin LVL 99"
      : user.role === "parent"
        ? "Parent allié"
        : "Cyber-Éclaireur";
  const isStudent = user.role === "student";

  return (
    <main
      className={
        isStudent
          ? "learning-surface min-h-screen pb-24 font-body-md text-on-background lg:pb-0"
          : "min-h-screen bg-background pb-24 font-body-md text-on-background lg:pb-0"
      }
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/95 px-3 py-3 text-on-surface backdrop-blur sm:px-4 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-lg font-black text-white shadow-[0_8px_20px_rgba(181,18,63,0.2)]">
                C
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-base font-extrabold tracking-[-0.02em] text-primary sm:text-lg">
                  CyberAmbassadeurs
                </p>
                <p className="truncate text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Espace d&apos;apprentissage
                </p>
              </div>
            </div>

            <div className="lg:hidden">
              <LogoutButton label={t.logout} />
            </div>
          </div>

          <div className="mt-7 hidden rounded-xl border border-slate-200 bg-slate-50 p-3 lg:flex lg:items-center lg:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-extrabold text-primary ring-1 ring-slate-200">
              {user.profile.fullName.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-primary">
                {roleLabel}
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-600">
                {user.profile.fullName}
              </p>
            </div>
          </div>

          <nav className="mt-5 flex gap-1 overflow-x-auto pb-1 lg:mt-7 lg:grid lg:overflow-visible lg:pb-0">
            {navItems.map(({ Icon, ...item }) => (
              <Link
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-bold text-slate-600 transition hover:bg-primary-fixed hover:text-primary sm:text-sm lg:gap-3"
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 hidden border-t border-slate-200 pt-4 lg:block">
            <LogoutButton label={t.logout} />
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-3 py-4 sm:px-6 lg:px-9 lg:py-7">
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-6 grid gap-4 border-b border-slate-200 pb-5 lg:mb-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  {roleLabel}
                </p>
                <h1 className="mt-1.5 break-words font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-on-surface sm:text-3xl">
                  {title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {isStudent ? (
                  <>
                    <Link className="flex min-h-9 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 text-xs font-extrabold text-amber-950 transition hover:border-primary" href="/student/status">
                      <Flame aria-hidden className="h-4 w-4 text-primary" />
                      Ma serie
                    </Link>
                    <Link className="flex min-h-9 items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 text-xs font-extrabold text-cyan-950 transition hover:border-tertiary" href="/student/status">
                      <Sparkles aria-hidden className="h-4 w-4 text-tertiary" />
                      XP &amp; badges
                    </Link>
                  </>
                ) : (
                  <div className="flex w-fit items-center gap-2 rounded-full border-2 border-secondary bg-secondary-container px-4 py-2 shadow-[0_2px_0_0_rgba(88,96,98,1)]">
                    <Sparkles aria-hidden className="h-4 w-4 text-primary" />
                    <span className="text-sm font-black text-on-secondary-container">
                      Protocole actif
                    </span>
                  </div>
                )}
              </div>
            </header>

            {children}
          </div>
        </section>
      </div>

      {user.role !== "admin" ? (
        <DashboardTour role={user.role} userId={user.id} />
      ) : null}

      {user.role !== "admin" ? (
        <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_14px_36px_rgba(15,23,42,0.16)] backdrop-blur lg:hidden">
          {mobileNavItems.map(({ Icon, ...item }) => (
            <Link
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[0.68rem] font-bold leading-tight text-slate-600 transition hover:bg-primary-fixed hover:text-primary"
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
