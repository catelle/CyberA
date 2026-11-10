import { requireApiRole } from "@/lib/api/authz";
import { renderCertificateSvg } from "@/lib/certificate-artwork";

export async function GET(request: Request) {
  const auth = await requireApiRole(["admin", "facilitator"]);
  if (!auth.ok) return auth.response;
  const type = new URL(request.url).searchParams.get("type") === "scholarship" ? "scholarship" as const : "ambassador" as const;
  const svg = renderCertificateSvg({ type, fullName: "Exemple Eleve", certificateNumber: type === "scholarship" ? "SC-2026-EXEMPLE" : "CA-2026-EXEMPLE", completedAt: new Date().toISOString(), moduleTitles: type === "scholarship" ? ["Sécurité numérique", "Recherche en ligne"] : ["Module 1", "Module 2", "Module 3"] });
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "private, no-store" } });
}
