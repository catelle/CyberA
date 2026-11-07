import { requireApiRole } from "@/lib/api/authz";
import { getCertificateDocument } from "@/lib/certificates";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const auth = await requireApiRole(["admin", "facilitator"]);
  if (!auth.ok) return auth.response;
  const certificate = await getCertificateDocument(params.userId);
  if (!certificate) return new Response("Certificat non disponible.", { status: 404 });
  const inline = new URL(request.url).searchParams.get("inline") === "1";
  return new Response(certificate.png, { headers: { "Content-Type": "image/png", "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="certificat-${certificate.number}.png"`, "Cache-Control": "private, no-store" } });
}
