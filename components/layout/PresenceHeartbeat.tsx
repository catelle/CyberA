"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const HEARTBEAT_MS = 60_000;

/**
 * Tells the server the account is still on the platform so admins can see who
 * is connected, and so time spent inside a module is measured for real instead
 * of being guessed from lesson completion timestamps.
 */
export function PresenceHeartbeat() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    let cancelled = false;

    const ping = () => {
      if (cancelled || typeof document === "undefined" || document.hidden) return;
      fetch("/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathRef.current ?? "/" }),
        keepalive: true
      }).catch(() => undefined);
    };

    // The path effect below covers the first beat and every navigation.
    const timer = window.setInterval(ping, HEARTBEAT_MS);
    document.addEventListener("visibilitychange", ping);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", ping);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || document.hidden) return;
    fetch("/api/presence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname ?? "/" })
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
