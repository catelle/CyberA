import { requireApiRole } from "@/lib/api/authz";
import { getCertificateDocument } from "@/lib/certificates";

export async function GET(request: Request) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;
  const certificate = await getCertificateDocument(auth.user.supabaseUserId);
  if (!certificate) return new Response("Certificat non disponible.", { status: 404 });
  const inline = new URL(request.url).searchParams.get("inline") === "1";
  return new Response(certificate.png, { headers: {
    "Content-Type": "image/png",
    "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="certificat-${certificate.number}.png"`,
    "Cache-Control": "private, no-store"
  }});
}
