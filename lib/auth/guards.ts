import { redirect } from "next/navigation";

import { getUserBySupabaseId, serializeUser } from "@/lib/db/users";
import { getSupabaseSafeUser } from "@/lib/db/supabase-users";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";
import type { SafeUser, UserRole } from "@/types/auth";

export async function requireAuthenticatedUser(): Promise<SafeUser> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const supabaseUser = await getSupabaseSafeUser(user);

  if (supabaseUser) {
    return supabaseUser;
  }

  const mongoUser = await getUserBySupabaseId(user.id);

  if (!mongoUser) {
    redirect("/login?error=profile_missing");
  }

  return serializeUser(mongoUser);
}

export async function requireRole(roles: UserRole[]): Promise<SafeUser> {
  const user = await requireAuthenticatedUser();

  if (!roles.includes(user.role)) {
    redirect(`/${user.role}/dashboard`);
  }

  return user;
}
