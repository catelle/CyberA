"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AutoRefreshProps = {
  /** How often the server component tree is refetched, in seconds. */
  intervalSeconds?: number;
};

/** Keeps live admin panels (who is connected right now) close to real time. */
export function AutoRefresh({ intervalSeconds = 60 }: AutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden) router.refresh();
    }, intervalSeconds * 1000);

    return () => window.clearInterval(timer);
  }, [intervalSeconds, router]);

  return null;
}
