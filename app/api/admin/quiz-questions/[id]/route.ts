import { requireApiRole, jsonError } from "@/lib/api/authz";
import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { NextResponse } from "next/server";

type QuizQuestionRouteProps = {
  params: { id: string };
};

export async function DELETE(_request: Request, { params }: QuizQuestionRouteProps) {
  const auth = await requireApiRole(["admin"]);
  if (!auth.ok) return auth.response;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("quiz_questions").delete().eq("id", params.id);
  if (error) return jsonError(error, "Impossible de supprimer la question.");
  return NextResponse.json({ message: "Question supprimee." });
}
