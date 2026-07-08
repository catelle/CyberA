"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/auth/supabase-client";

export function LogoutButton({ label }: { label: string }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const supabase = createSupabaseBrowserClient();

    await Promise.allSettled([
      fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
        signal: controller.signal
      }),
      supabase.auth.signOut({ scope: "local" })
    ]);

    window.clearTimeout(timeout);

    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="grid gap-2">
      <button
        className="min-h-11 rounded-xl border-2 border-secondary bg-white px-4 text-sm font-black text-primary shadow-[0_3px_0_0_rgba(88,96,98,1)] transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoggingOut}
        type="button"
        onClick={handleLogout}
      >
        {isLoggingOut ? "..." : label}
      </button>
    </div>
  );
}
