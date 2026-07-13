import { notFound } from "next/navigation";

import { stitchScreenComponents } from "@/components/gamified/component-map";
import { gamifiedScreenBySlug, gamifiedScreens } from "@/components/gamified/screens";

type GamifiedScreenPageProps = {
  params: {
    screen: string;
  };
};

export function generateStaticParams() {
  return gamifiedScreens.map((screen) => ({
    screen: screen.slug
  }));
}

export function generateMetadata({ params }: GamifiedScreenPageProps) {
  const screen = gamifiedScreenBySlug.get(params.screen);

  return {
    title: screen ? `${screen.stitchTitle} | Cyberambassadeurs` : "Cyberambassadeurs"
  };
}

export default function GamifiedScreenPage({ params }: GamifiedScreenPageProps) {
  const screen = gamifiedScreenBySlug.get(params.screen);
  const Screen = stitchScreenComponents[params.screen as keyof typeof stitchScreenComponents];

  if (!screen || !Screen) {
    notFound();
  }

  return <Screen />;
}
