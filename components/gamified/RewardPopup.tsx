"use client";

import Link from "next/link";
import { Award, Download, Sparkles, Trophy, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type RewardSnapshot = {
  totalPoints: number;
  badges: Array<{ id: string; name: string; awardedAt: string }>;
  certificateNumber: string | null;
};

type RewardAnnouncement = {
  pointsGained: number;
  newBadges: RewardSnapshot["badges"];
  newCertificate: boolean;
};

export function RewardPopup({ userId }: { userId: string }) {
  const storageKey = `cybera:reward-snapshot:${userId}`;
  const [announcement, setAnnouncement] = useState<RewardAnnouncement | null>(null);

  const checkRewards = useCallback(async () => {
    const response = await fetch("/api/student/rewards", { cache: "no-store" });
    if (!response.ok) return;

    const current = (await response.json()) as RewardSnapshot;
    const storedValue = window.localStorage.getItem(storageKey);
    if (!storedValue) {
      window.localStorage.setItem(storageKey, JSON.stringify(current));
      return;
    }

    let previous: RewardSnapshot;
    try {
      previous = JSON.parse(storedValue) as RewardSnapshot;
    } catch {
      window.localStorage.setItem(storageKey, JSON.stringify(current));
      return;
    }

    const knownBadges = new Set(previous.badges?.map((badge) => badge.id) ?? []);
    const nextAnnouncement = {
      pointsGained: Math.max(current.totalPoints - (previous.totalPoints ?? 0), 0),
      newBadges: current.badges.filter((badge) => !knownBadges.has(badge.id)),
      newCertificate: Boolean(
        current.certificateNumber &&
          current.certificateNumber !== previous.certificateNumber
      )
    };

    window.localStorage.setItem(storageKey, JSON.stringify(current));
    if (
      nextAnnouncement.pointsGained > 0 ||
      nextAnnouncement.newBadges.length > 0 ||
      nextAnnouncement.newCertificate
    ) {
      setAnnouncement(nextAnnouncement);
    }
  }, [storageKey]);

  useEffect(() => {
    void checkRewards();
    const handleRewardChange = () => void checkRewards();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") void checkRewards();
    };
    const interval = window.setInterval(checkRewards, 30_000);
    window.addEventListener("cybera:rewards-changed", handleRewardChange);
    window.addEventListener("focus", handleRewardChange);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("cybera:rewards-changed", handleRewardChange);
      window.removeEventListener("focus", handleRewardChange);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [checkRewards]);

  if (!announcement) return null;

  const latestBadge = announcement.newBadges.at(-1);
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="reward-popup-title">
      <section className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-secondary bg-white shadow-[0_18px_0_0_rgba(88,96,98,0.35)]">
        <div className="relative bg-brand-blue px-6 py-7 text-center text-white">
          <button aria-label="Fermer" className="absolute right-3 top-3 rounded-full bg-white/10 p-2 hover:bg-white/20" onClick={() => setAnnouncement(null)} type="button"><X className="h-5 w-5" /></button>
          <Trophy className="mx-auto h-12 w-12 text-brand-gold" />
          <h2 className="mt-3 font-display text-3xl font-black" id="reward-popup-title">Nouvelle recompense !</h2>
          <p className="mt-2 font-semibold text-white/75">Bravo, tes efforts viennent d&apos;etre recompenses.</p>
        </div>
        <div className="grid gap-3 p-5">
          {announcement.pointsGained > 0 ? <p className="flex items-center gap-3 rounded-xl bg-cyan-50 p-4 font-black text-cyan-950"><Sparkles className="h-6 w-6 text-tertiary" />+{announcement.pointsGained} XP gagnes</p> : null}
          {announcement.newBadges.map((badge) => <p className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 font-black text-emerald-950" key={badge.id}><Award className="h-6 w-6 text-emerald-600" />Nouveau badge : {badge.name}</p>)}
          {announcement.newCertificate ? <p className="flex items-center gap-3 rounded-xl bg-amber-50 p-4 font-black text-amber-950"><Trophy className="h-6 w-6 text-brand-gold" />Ton certificat est disponible</p> : null}
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <Link className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-blue px-4 font-black text-white" href="/student/status" onClick={() => setAnnouncement(null)}>Voir mes recompenses</Link>
            {announcement.newCertificate ? <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-secondary px-4 font-black text-brand-blue" href="/api/student/certificate/download"><Download className="h-4 w-4" />Certificat</a> : latestBadge ? <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-secondary px-4 font-black text-brand-blue" href={`/api/student/badges/${latestBadge.id}/download`}><Download className="h-4 w-4" />Badge</a> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
