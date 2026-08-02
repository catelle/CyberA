import { requireApiRole } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;"
  })[character] ?? character);
}

export async function GET() {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const [{ data: certificate }, { data: student }] = await Promise.all([
    supabase.from("training_certificates").select("certificate_number, issued_at").eq("user_id", auth.user.supabaseUserId).maybeSingle(),
    supabase.from("users").select("full_name").eq("id", auth.user.supabaseUserId).maybeSingle()
  ]);
  if (!certificate) return new Response("Certificat non disponible.", { status: 404 });

  const name = escapeXml(student?.full_name ?? auth.user.profile.fullName);
  const number = escapeXml(certificate.certificate_number);
  const date = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Africa/Douala" }).format(new Date(certificate.issued_at));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100"><rect width="1600" height="1100" fill="#fffdf8"/><rect x="35" y="35" width="1530" height="1030" fill="none" stroke="#B5123F" stroke-width="14"/><rect x="60" y="60" width="1480" height="980" fill="none" stroke="#FFCC32" stroke-width="4"/><text x="800" y="210" text-anchor="middle" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#B5123F">CYBERAMBASSADEURS</text><text x="800" y="335" text-anchor="middle" font-family="Georgia,serif" font-size="78" font-weight="700" fill="#172033">Certificat de formation</text><text x="800" y="430" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" fill="#64748b">Ce certificat atteste que</text><text x="800" y="550" text-anchor="middle" font-family="Georgia,serif" font-size="66" font-weight="700" fill="#B5123F">${name}</text><text x="800" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="31" fill="#334155">a termine avec succes la formation CyberAmbassador</text><circle cx="800" cy="790" r="82" fill="#B5123F"/><path d="M800 735l18 37 41 6-30 29 7 41-36-19-36 19 7-41-30-29 41-6z" fill="#FFCC32"/><text x="800" y="930" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#64748b">Delivre le ${escapeXml(date)} · ${number}</text></svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `attachment; filename="certificat-${certificate.certificate_number}.svg"`,
      "Cache-Control": "private, no-store"
    }
  });
}
