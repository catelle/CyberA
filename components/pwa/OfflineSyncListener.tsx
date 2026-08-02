"use client";

import { RefreshCw, WifiOff, X, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  discardPendingSyncItem,
  getPendingSyncSummary,
  syncPending
} from "@/lib/offline/db";
import { useNetworkStore } from "@/lib/stores/network";

export function OfflineSyncListener() {
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [failedCount, setFailedCount] = useState(0);
  const [lastError, setLastError] = useState<string | undefined>();
  const [lastFailedId, setLastFailedId] = useState<number | undefined>();
  const [dismissed, setDismissed] = useState(false);
  const pendingCount = useNetworkStore((state) => state.pendingCount);
  const setOnline = useNetworkStore((state) => state.setOnline);
  const setPendingCount = useNetworkStore((state) => state.setPendingCount);

  const updateNetworkState = useCallback(async () => {
    const online = navigator.onLine;
    setIsOffline(!online);
    setOnline(online);

    if (online) {
      setIsSyncing(true);
      await syncPending().catch(() => undefined);
      setIsSyncing(false);
    }

    const summary = await getPendingSyncSummary().catch(() => ({
      count: 0,
      failedCount: 0,
      lastError: undefined,
      lastFailedId: undefined
    }));

    setPendingCount(summary.count);
    setFailedCount(summary.failedCount);
    setLastError(summary.lastError);
    setLastFailedId(summary.lastFailedId);
    if (summary.count === 0) setDismissed(false);
    window.dispatchEvent(
      new CustomEvent(online ? "cybera:online" : "cybera:offline")
    );
  }, [setOnline, setPendingCount]);

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

    registerServiceWorker().catch(() => undefined);
    updateNetworkState();

    function revealAndUpdate() {
      setDismissed(false);
      void updateNetworkState();
    }

    window.addEventListener("online", updateNetworkState);
    window.addEventListener("offline", updateNetworkState);
    window.addEventListener("cybera:pending-sync-changed", revealAndUpdate);

    return () => {
      window.removeEventListener("online", updateNetworkState);
      window.removeEventListener("offline", updateNetworkState);
      window.removeEventListener("cybera:pending-sync-changed", revealAndUpdate);
    };
  }, [updateNetworkState]);

  if ((!isOffline && pendingCount === 0) || dismissed) {
    return null;
  }

  const hasFailed = !isOffline && failedCount > 0;

  return (
    <div
      className={
        "fixed left-1/2 top-3 z-50 flex w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-[0_12px_32px_rgba(15,23,42,0.16)] " +
        (hasFailed
          ? "border-red-200 bg-red-50 text-red-900"
          : "border-amber-200 bg-amber-50 text-amber-950")
      }
      role="status"
    >
      {isOffline ? (
        <WifiOff aria-hidden className="h-5 w-5 shrink-0" />
      ) : hasFailed ? (
        <XCircle aria-hidden className="h-5 w-5 shrink-0" />
      ) : (
        <RefreshCw
          aria-hidden
          className={"h-5 w-5 shrink-0 " + (isSyncing ? "animate-spin" : "")}
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-extrabold">
          {isOffline
            ? "Mode hors connexion"
            : hasFailed
              ? "La synchronisation a échoué"
              : "Synchronisation de votre progression…"}
        </p>
        <p className="mt-0.5 truncate text-xs font-medium opacity-80">
          {hasFailed && lastError
            ? lastError
            : `${pendingCount} action${pendingCount > 1 ? "s" : ""} à synchroniser`}
        </p>
      </div>
      {hasFailed ? (
        <div className="flex shrink-0 items-center gap-2">
          {lastFailedId ? (
            <button
              className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-extrabold text-red-900 transition hover:bg-red-100"
              onClick={async () => {
                await discardPendingSyncItem(lastFailedId);
                await updateNetworkState();
              }}
              type="button"
            >
              Retirer
            </button>
          ) : null}
          <button
            className="rounded-lg bg-red-900 px-3 py-2 text-xs font-extrabold text-white transition hover:bg-red-800 disabled:opacity-60"
            disabled={isSyncing}
            onClick={() => void updateNetworkState()}
            type="button"
          >
            Réessayer
          </button>
        </div>
      ) : null}
      <button
        aria-label="Fermer le message de synchronisation"
        className="shrink-0 rounded-md p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
        onClick={() => setDismissed(true)}
        type="button"
      >
        <X aria-hidden className="h-4 w-4" />
      </button>
    </div>
  );
}
