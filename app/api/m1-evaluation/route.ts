import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";

const evaluationSchema = z.object({
  participantCode: z.string().trim().min(2).max(80),
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200).toLowerCase(),
  city: z.string().trim().max(120).optional().default(""),
  cohort: z.string().trim().min(2).max(120).default("CyberA-Rise"),
  completionDate: z.string().trim().max(20).optional().default(""),
  newPracticeAdopted: z.boolean(),
  newPractices: z.array(z.string().trim().min(1).max(120)).max(8).default([]),
  practiceExample: z.string().trim().max(1200).optional().default(""),
  voluntaryActionTaken: z.boolean(),
  voluntaryActionDetails: z.string().trim().max(1600).optional().default(""),
  riskActionTaken: z.boolean(),
  riskActionExample: z.string().trim().max(1600).optional().default(""),
  maintenanceObstacle: z.string().trim().max(1200).optional().default(""),
  contactConsent: z.boolean().default(false),
  website: z.string().max(0).optional().default("")
}).superRefine((value, ctx) => {
  if (value.website) ctx.addIssue({ code: "custom", path: ["website"], message: "Invalid submission" });
  if (value.newPracticeAdopted && !value.newPractices.length && !value.practiceExample) {
    ctx.addIssue({ code: "custom", path: ["newPractices"], message: "Describe at least one practice." });
  }
  if (value.voluntaryActionTaken && !value.voluntaryActionDetails) {
    ctx.addIssue({ code: "custom", path: ["voluntaryActionDetails"], message: "Describe the action." });
  }
  if (value.riskActionTaken && !value.riskActionExample) {
    ctx.addIssue({ code: "custom", path: ["riskActionExample"], message: "Describe the situation." });
  }
});

export async function POST(request: Request) {
  const parsed = evaluationSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Vérifie les champs obligatoires et les exemples demandés." }, { status: 400 });
  }

  const value = parsed.data;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("m1_evaluations").upsert(
    {
      participant_code: value.participantCode.toUpperCase(),
      full_name: value.fullName,
      email: value.email,
      city: value.city || null,
      cohort: value.cohort,
      completion_date: value.completionDate || null,
      new_practice_adopted: value.newPracticeAdopted,
      new_practices: value.newPractices,
      practice_example: value.practiceExample || null,
      voluntary_action_taken: value.voluntaryActionTaken,
      voluntary_action_details: value.voluntaryActionDetails || null,
      risk_action_taken: value.riskActionTaken,
      risk_action_example: value.riskActionExample || null,
      maintenance_obstacle: value.maintenanceObstacle || null,
      contact_consent: value.contactConsent,
      verification_status: "self_reported",
      updated_at: new Date().toISOString()
    },
    { onConflict: "participant_code" }
  );

  if (error) {
    console.error("m1 evaluation insert failed", error);
    return NextResponse.json({ message: "Le formulaire n’a pas pu être enregistré. Réessaie dans quelques instants." }, { status: 500 });
  }

  return NextResponse.json({ message: "Merci. Ton évaluation M+1 a bien été enregistrée." });
}
