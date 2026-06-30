import { NextResponse } from "next/server";

import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

export async function POST() {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { data: links, error } = await supabase
    .from("family_links")
    .select("parent_id, child_id, users!family_links_child_id_fkey(full_name)")
    .not("parent_id", "is", null);

  if (error) return jsonError(error, "Impossible de charger les familles.");

  const rows =
    links?.flatMap((link: any) => {
      if (!link.parent_id || !link.child_id) return [];
      return [
        {
          user_id: link.parent_id,
          type: "parent_report",
          title: "Rapport hebdomadaire",
          body: `${link.users?.full_name ?? "Votre enfant"} poursuit sa progression CyberAmbassador.`,
          data: {
            child_id: link.child_id,
            child_name: link.users?.full_name ?? "Ambassadeur",
            week_period: "Semaine courante",
            points_earned_this_week: 0,
            challenges_completed: 0,
            current_rank: 0,
            level: "junior"
          }
        }
      ];
    }) ?? [];

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("notifications").insert(rows);
    if (insertError) return jsonError(insertError, "Impossible de creer les rapports.");
  }

  return NextResponse.json({ message: `${rows.length} rapport(s) parent crees.` });
}
