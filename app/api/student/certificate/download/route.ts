import { requireApiRole } from "@/lib/api/authz";
import { getCertificateDocument } from "@/lib/certificates";

export async function GET() {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;
  const certificate = await getCertificateDocument(auth.user.supabaseUserId);
  if (!certificate) return new Response("Certificat non disponible.", { status: 404 });
  return new Response(certificate.png, { headers: {
    "Content-Type": "image/png",
    "Content-Disposition": `attachment; filename="certificat-${certificate.number}.png"`,
    "Cache-Control": "private, no-store"
  }});
}
