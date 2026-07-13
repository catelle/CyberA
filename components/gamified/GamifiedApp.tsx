/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MonitorSmartphone } from "lucide-react";

import { gamifiedDefaultSlug, gamifiedScreens } from "./screens";

function ScreenCard({ screen }: { screen: (typeof gamifiedScreens)[number] }) {
  return (
    <Link
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
      href={`/gamified/${screen.slug}`}
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          alt={screen.stitchTitle}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          src={screen.screenshotUrl}
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-black uppercase text-primary">{screen.deviceType}</p>
        <h2 className="mt-1 text-lg font-black text-slate-950">{screen.stitchTitle}</h2>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          React route: /gamified/{screen.slug}
        </p>
      </div>
    </Link>
  );
}

export function GamifiedApp() {
  return (
    <main className="min-h-screen bg-background text-on-background">
      <section className="border-b-2 border-secondary bg-surface px-4 py-8 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-secondary bg-primary text-on-primary shadow-[0_4px_0_0_#586062]">
              <MonitorSmartphone aria-hidden className="h-6 w-6" />
            </span>
            <div>
              <p className="font-label-bold text-label-bold uppercase text-secondary">
                Cyberambassadeurs
              </p>
              <h1 className="font-display text-headline-lg text-primary">
                Gamified Next.js screens
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl font-body-lg text-body-lg text-secondary">
            These pages are React components generated from the current gamified Stitch screens,
            using the same visual structure, images, tokens, and route-specific layouts.
          </p>
          <Link
            className="tactile-button mt-6 inline-flex min-h-12 items-center rounded-xl bg-primary px-5 font-label-bold text-on-primary"
            href={`/gamified/${gamifiedDefaultSlug}`}
          >
            Open first React screen
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {gamifiedScreens.map((screen) => (
          <ScreenCard key={screen.slug} screen={screen} />
        ))}
      </section>
    </main>
  );
}
