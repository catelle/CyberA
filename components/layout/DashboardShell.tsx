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
import { CyberMascot } from "@/components/gamified/CyberMascot";
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
        <aside className="border-b-2 border-secondary bg-surface-container-lowest px-3 py-3 text-on-surface shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:px-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r-2 lg:px-5 lg:py-6 lg:shadow-[4px_0_0_0_rgba(88,96,98,1)]">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-secondary bg-primary-container font-display text-xl font-black text-white shadow-[0_3px_0_0_rgba(88,96,98,1)]">
                C
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-black uppercase text-primary sm:text-xl">
                  Cyber
                </p>
                <p className="truncate text-xs font-black uppercase tracking-widest text-secondary">
                  Mission control
                </p>
              </div>
            </div>

            <div className="lg:hidden">
              <LogoutButton label={t.logout} />
            </div>
          </div>

          <div className="mt-5 hidden rounded-xl border-2 border-secondary bg-surface-container p-3 lg:flex lg:items-center lg:gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-black text-primary">
              {user.profile.fullName.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-label-bold font-label-bold uppercase text-primary">
                {roleLabel}
              </p>
              <p className="truncate text-xs font-bold text-secondary">
                {user.profile.fullName}
              </p>
            </div>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:grid lg:overflow-visible lg:pb-0">
            {navItems.map(({ Icon, ...item }) => (
              <Link
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border-2 border-transparent px-3 text-xs font-black text-secondary transition hover:bg-surface-container-high hover:text-primary sm:text-sm lg:min-h-12 lg:gap-3 lg:px-4 lg:hover:translate-x-1"
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 hidden border-t-2 border-secondary pt-4 lg:block">
            <LogoutButton label={t.logout} />
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-3 py-4 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-5 grid gap-4 overflow-hidden rounded-lg border-2 border-secondary bg-white px-4 py-4 shadow-[0_4px_0_0_rgba(88,96,98,1)] sm:px-5 lg:mb-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-widest text-secondary">
                  {roleLabel}
                </p>
                <h1 className="mt-1 break-words font-display text-2xl font-black leading-tight text-primary sm:text-3xl">
                  {title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {isStudent ? (
                  <>
                    <div className="flex min-h-10 items-center gap-2 rounded-full border-2 border-secondary bg-[#fff4c2] px-3 text-sm font-black text-on-surface shadow-[0_2px_0_0_rgba(88,96,98,1)]">
                      <Flame aria-hidden className="h-4 w-4 text-primary" />
                      3 jours
                    </div>
                    <div className="flex min-h-10 items-center gap-2 rounded-full border-2 border-secondary bg-tertiary-fixed px-3 text-sm font-black text-on-surface shadow-[0_2px_0_0_rgba(88,96,98,1)]">
                      <Sparkles aria-hidden className="h-4 w-4 text-tertiary" />
                      +120 XP
                    </div>
                    <CyberMascot className="hidden sm:grid" mood="cheer" size="sm" />
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
        <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-xl border-2 border-secondary bg-surface/95 p-1 shadow-[0_4px_0_0_rgba(88,96,98,1)] backdrop-blur lg:hidden">
          {mobileNavItems.map(({ Icon, ...item }) => (
            <Link
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-1 text-center text-[0.68rem] font-black leading-tight text-secondary transition hover:bg-primary-container hover:text-white"
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
