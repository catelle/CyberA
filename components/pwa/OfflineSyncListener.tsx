"use client";

import { useEffect, useState } from "react";

import { countPendingSyncItems, syncPending } from "@/lib/offline/db";
import { useNetworkStore } from "@/lib/stores/network";

export function OfflineSyncListener() {
  const [isOffline, setIsOffline] = useState(false);
  const pendingCount = useNetworkStore((state) => state.pendingCount);
  const setOnline = useNetworkStore((state) => state.setOnline);
  const setPendingCount = useNetworkStore((state) => state.setPendingCount);

  useEffect(() => {
    async function registerServiceWorker() {
      if ("serviceWorker" in navigator) {
        if (process.env.NODE_ENV !== "production") {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((registration) => registration.unregister()));
          const cacheKeys = await caches.keys();
          await Promise.all(
            cacheKeys
              .filter((key) => key.startsWith("cyberambassador-"))
              .map((key) => caches.delete(key))
          );
          return;
        }

        await navigator.serviceWorker.register("/sw.js");
      }
    }

    async function updateNetworkState() {
      const online = navigator.onLine;
      if (online) {
        await syncPending().catch(() => undefined);
      }
      const queuedItems = await countPendingSyncItems().catch(() => 0);

      setIsOffline(!online);
      setOnline(online);
      setPendingCount(queuedItems);
      window.dispatchEvent(
        new CustomEvent(online ? "cybera:online" : "cybera:offline")
      );
    }

    registerServiceWorker().catch(() => undefined);
    updateNetworkState();

    window.addEventListener("online", updateNetworkState);
    window.addEventListener("offline", updateNetworkState);
    window.addEventListener("cybera:pending-sync-changed", updateNetworkState);

    return () => {
      window.removeEventListener("online", updateNetworkState);
      window.removeEventListener("offline", updateNetworkState);
      window.removeEventListener("cybera:pending-sync-changed", updateNetworkState);
    };
  }, [setOnline, setPendingCount]);

  if (!isOffline && pendingCount === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 top-3 z-50 rounded-lg bg-amber-100 px-4 py-3 text-center text-sm font-black text-amber-900 shadow-sm">
      {isOffline ? "Mode hors ligne actif" : "Synchronisation en attente"}{" "}
      {pendingCount > 0 ? `- ${pendingCount} action(s)` : null}
    </div>
  );
}
