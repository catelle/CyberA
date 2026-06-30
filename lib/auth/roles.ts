import type { UserRole } from "@/types/auth";

export type SupabaseProfileRole = "ambassador" | "parent" | "admin";

export function appRoleFromSupabaseRole(role: string | null | undefined): UserRole {
  if (role === "parent" || role === "admin") {
    return role;
  }

  return "student";
}

export function dashboardForRole(role: string | null | undefined) {
  const appRole = appRoleFromSupabaseRole(role);

  if (appRole === "parent") {
    return "/parent/dashboard";
  }

  if (appRole === "admin") {
    return "/admin/dashboard";
  }

  return "/student/dashboard";
}
