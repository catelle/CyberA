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
  PackageOpen,
  ShieldAlert,
  Sparkles,
  Trophy,
  User,
  UsersRound,
  type LucideIcon
} from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { RewardPopup } from "@/components/gamified/RewardPopup";
import { DashboardTour } from "@/components/layout/DashboardTour";
import { PresenceHeartbeat } from "@/components/layout/PresenceHeartbeat";
import { AccountLanguageToggle } from "@/components/layout/AccountLanguageToggle";
import { getDictionary } from "@/lib/i18n/dictionary";
import { countUnreadNotificationsForUser, ensureModuleFeedbackNotifications } from "@/lib/db/cybera";
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

export async function DashboardShell({ user, title, children }: DashboardShellProps) {
  const t = getDictionary(user.language);
  const en = user.language === "en";
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
          { href: "/student/modules", label: "Espace eleve", Icon: BookOpen },
          { href: "/admin/notifications", label: "Notifications", Icon: Megaphone },
          { href: "/admin/feedback", label: "Temoignages", Icon: MessageCircle }
        ]
      : user.role === "facilitator"
        ? [
            { href: "/admin/dashboard", label: "Dashboard", Icon: Home },
            { href: "/admin/ambassadors", label: "Eleves", Icon: UsersRound },
            { href: "/student/modules", label: "Espace eleve", Icon: BookOpen }
          ]
      : user.role === "parent"
        ? [
            { href: "/parent/dashboard", label: "Accueil", Icon: Home },
            { href: "/parent/reports", label: "Rapports", Icon: FileText },
            { href: "/parent/challenge", label: "Defi", Icon: ClipboardCheck },
            { href: "/parent/notifications", label: "Notifications", Icon: Megaphone },
            { href: "/parent/link", label: "Lien enfant", Icon: Link2 }
          ]
        : [
            { href: "/student/dashboard", label: en ? "Home" : "Accueil", Icon: Home },
            { href: "/student/kit", label: en ? "My Kit" : "Mon Kit", Icon: PackageOpen },
            { href: "/student/modules", label: "Modules", Icon: BookOpen },
            { href: "/student/challenges", label: en ? "Challenges" : "Défis", Icon: ClipboardCheck },
            { href: "/student/leaderboard", label: en ? "Leaderboard" : "Classement", Icon: Trophy },
            { href: "/student/forum", label: "Forum", Icon: MessageCircle },
            { href: "/student/notifications", label: "Notifications", Icon: Megaphone },
            { href: "/student/profile", label: en ? "Profile" : "Profil", Icon: User }
          ];
  const roleLabel =
    user.role === "admin"
      ? "Admin LVL 99"
      : user.role === "facilitator"
        ? "Facilitateur"
      : user.role === "parent"
        ? "Parent allié"
        : "Cyber-Éclaireur";
  const isStudent = user.role === "student";
  if (isStudent) await ensureModuleFeedbackNotifications(user.supabaseUserId);
  const unreadNotifications = await countUnreadNotificationsForUser(user.supabaseUserId);

  const notificationBadge = (href: string) =>
    href.includes("/notifications") && unreadNotifications > 0 ? (
      <span className="grid min-w-5 place-items-center rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-black leading-none text-white" aria-label={`${unreadNotifications} notifications non lues`}>
        {unreadNotifications > 99 ? "99+" : unreadNotifications}
      </span>
    ) : null;

  return (
    <main
      className={
        isStudent
          ? "learning-surface min-h-screen overflow-x-hidden pb-24 font-body-md text-on-background lg:pb-0"
          : "min-h-screen overflow-x-hidden bg-background pb-24 font-body-md text-on-background lg:pb-0"
      }
    >
      <div className="dashboard-layout flex min-h-screen flex-col lg:flex-row">
        <aside className={`dashboard-sidebar ${user.role === "admin" || user.role === "facilitator" ? "" : "hidden lg:block"} border-b border-slate-200 bg-white/95 px-3 py-3 text-on-surface backdrop-blur sm:px-4 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-6`}>
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
                  {en ? "Learning space" : "Espace d'apprentissage"}
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
                {notificationBadge(item.href)}
              </Link>
            ))}
          </nav>

          <div className="mt-6 hidden border-t border-slate-200 pt-4 lg:block">
            <LogoutButton label={t.logout} />
          </div>
        </aside>

        <section className="dashboard-content min-w-0 flex-1 px-3 py-4 sm:px-6 lg:px-9 lg:py-7">
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-6 grid grid-cols-[1fr_auto] items-start gap-4 border-b border-slate-200 pb-5 lg:mb-8 lg:items-center">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  {roleLabel}
                </p>
                <h1 className="mt-1.5 break-words font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-on-surface sm:text-3xl">
                  {title}
                </h1>
              </div>
              <div className="col-span-2 flex flex-wrap items-center gap-2 lg:col-span-1 lg:justify-end">
                <AccountLanguageToggle initialLanguage={user.language} />
                {isStudent ? (
                  <>
                    <Link className="flex min-h-9 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 text-xs font-extrabold text-amber-950 transition hover:border-primary" href="/student/status">
                      <Flame aria-hidden className="h-4 w-4 text-primary" />
                      {en ? "My streak" : "Ma série"}
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

      <PresenceHeartbeat />

      {user.role !== "admin" && user.role !== "facilitator" ? (
        <DashboardTour role={user.role} userId={user.id} />
      ) : null}

      {isStudent ? <RewardPopup userId={user.supabaseUserId} /> : null}

        <nav className="dashboard-mobile-nav fixed inset-x-3 bottom-3 z-40 flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_14px_36px_rgba(15,23,42,0.16)] backdrop-blur lg:hidden">
          {navItems.map(({ Icon, ...item }) => (
            <Link
              className="flex min-h-14 min-w-[4.5rem] shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[0.65rem] font-bold leading-tight text-slate-600 transition hover:bg-primary-fixed hover:text-primary"
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden className="h-4 w-4" />
              {item.label}
              {notificationBadge(item.href)}
            </Link>
          ))}
          <div className="dashboard-mobile-logout min-w-[5rem] shrink-0">
            <LogoutButton label={t.logout} />
          </div>
        </nav>
    </main>
  );
}
