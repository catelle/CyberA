import { requireApiRole } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { createBadgePng } from "@/lib/badge-artwork";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireApiRole(["student"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data: badge } = await supabase
      .from("module_badges")
      .select("id, badge_name, badge_focus")
      .eq("id", params.id)
      .eq("user_id", auth.user.supabaseUserId)
      .maybeSingle();
  if (!badge) return new Response("Badge introuvable.", { status: 404 });

  const png = await createBadgePng({
    badgeName: badge.badge_name,
    moduleTitle: badge.badge_focus
  });
  const inline = new URL(request.url).searchParams.get("inline") === "1";

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="badge-${params.id}.png"`,
      "Cache-Control": "private, max-age=60"
    }
  });
}
