"use client";

import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";

export function LogoutButton({ label }: { label: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="rounded-lg border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
      type="button"
      onClick={handleLogout}
    >
      {label}
    </button>
  );
}
