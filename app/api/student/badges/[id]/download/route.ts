import { requireApiRole } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;"
  })[character] ?? character);
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const [{ data: badge }, { data: student }] = await Promise.all([
    supabase
      .from("module_badges")
      .select("id, badge_name, badge_focus, awarded_at, modules(color)")
      .eq("id", params.id)
      .eq("user_id", auth.user.supabaseUserId)
      .maybeSingle(),
    supabase.from("users").select("full_name").eq("id", auth.user.supabaseUserId).maybeSingle()
  ]);
  if (!badge) return new Response("Badge introuvable.", { status: 404 });

  const moduleInfo = Array.isArray(badge.modules) ? badge.modules[0] : badge.modules;
  const color = moduleInfo?.color ?? "#B5123F";
  const name = escapeXml(student?.full_name ?? auth.user.profile.fullName);
  const badgeName = escapeXml(badge.badge_name);
  const focus = escapeXml(badge.badge_focus);
  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Africa/Douala" }).format(new Date(badge.awarded_at));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" rx="48" fill="#f8fafc"/><rect x="24" y="24" width="1152" height="752" rx="36" fill="none" stroke="${color}" stroke-width="12"/><circle cx="600" cy="220" r="112" fill="${color}"/><path d="M600 135l26 53 58 8-42 41 10 58-52-27-52 27 10-58-42-41 58-8z" fill="white"/><text x="600" y="405" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#64748b">CYBERAMBASSADEURS</text><text x="600" y="475" text-anchor="middle" font-family="Arial,sans-serif" font-size="52" font-weight="800" fill="#172033">${badgeName}</text><text x="600" y="530" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="${color}">${focus}</text><text x="600" y="620" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#475569">Attribue a ${name}</text><text x="600" y="665" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#64748b">${escapeXml(date)}</text></svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `attachment; filename="badge-${params.id}.svg"`,
      "Cache-Control": "private, no-store"
    }
  });
}
