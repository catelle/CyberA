import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AppProviders } from "@/components/providers/AppProviders";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { OfflineSyncListener } from "@/components/pwa/OfflineSyncListener";

import "./globals.css";

export const metadata: Metadata = {
  title: "Cyberambassadeurs",
  description:
    "Youth digital education platform for safe, useful, and community-minded internet use.",
  manifest: "/manifest.json",
  applicationName: "CyberAmbassador",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CyberAmbassador"
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/icon-192.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#be185d"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders>
          <OfflineSyncListener />
          {children}
          <InstallPrompt />
        </AppProviders>
      </body>
    </html>
  );
}
