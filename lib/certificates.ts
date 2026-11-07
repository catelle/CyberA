import { createSupabaseAdminClient } from "@/lib/auth/supabase-server";
import { renderCertificateSvg } from "@/lib/certificate-artwork";
import { createCertificatePng } from "@/lib/certificate-png";

export async function getCertificateDocument(userId: string) {
  const supabase = createSupabaseAdminClient();
  const [certificateResult, { data: user }] = await Promise.all([
    supabase.from("training_certificates").select("certificate_number, certificate_type, issued_at, program_completion_at, module_titles").eq("user_id", userId).maybeSingle(),
    supabase.from("users").select("full_name").eq("id", userId).maybeSingle()
  ]);
  let certificate: any = certificateResult.data;
  if (certificateResult.error?.message.includes("does not exist")) {
    const fallback = await supabase.from("training_certificates").select("certificate_number, issued_at").eq("user_id", userId).maybeSingle();
    certificate = fallback.data ? { ...fallback.data, certificate_type: "ambassador", program_completion_at: null, module_titles: [] } : null;
  }
  if (!certificate || !user) return null;
  const type = certificate.certificate_type === "scholarship" ? "scholarship" as const : "ambassador" as const;
  let moduleTitles = certificate.module_titles ?? [];
  if (!moduleTitles.length && type === "scholarship") {
    const { data: access } = await supabase.from("scholarship_module_access").select("modules(title, order_index)").eq("user_id", userId);
    moduleTitles = (access ?? []).map((row: any) => Array.isArray(row.modules) ? row.modules[0] : row.modules).filter(Boolean).sort((left: any, right: any) => left.order_index - right.order_index).map((module: any) => module.title);
  } else if (!moduleTitles.length) {
    const { data: modules } = await supabase.from("modules").select("title, order_index").eq("is_published", true).gte("order_index", 1).lte("order_index", 3).order("order_index");
    moduleTitles = (modules ?? []).map((module) => module.title);
  }
  const artwork = { type, fullName: user.full_name, certificateNumber: certificate.certificate_number, completedAt: certificate.program_completion_at ?? certificate.issued_at, moduleTitles };
  return { number: certificate.certificate_number, type, svg: renderCertificateSvg(artwork), png: await createCertificatePng(artwork) };
}

export async function listAwardedCertificates() {
  const supabase = createSupabaseAdminClient();
  const result = await supabase.from("training_certificates").select("user_id, certificate_number, certificate_type, issued_at, users(full_name)").order("issued_at", { ascending: false });
  const data = result.error?.message.includes("does not exist")
    ? (await supabase.from("training_certificates").select("user_id, certificate_number, issued_at, users(full_name)").order("issued_at", { ascending: false })).data?.map((row: any) => ({ ...row, certificate_type: "ambassador" }))
    : result.data;
  return (data ?? []).map((row: any) => ({ userId: row.user_id as string, fullName: row.users?.full_name ?? "Eleve", number: row.certificate_number as string, type: row.certificate_type === "scholarship" ? "scholarship" as const : "ambassador" as const, issuedAt: row.issued_at as string }));
}

export type CertificateCandidate = {
  userId: string;
  fullName: string;
  modulesCompleted: number;
  capstoneSubmitted: boolean;
  certificateNumber: string | null;
  issuedAt: string | null;
  adminDecision: boolean | null;
  decisionNote: string | null;
};

export async function listCertificateCandidates(): Promise<CertificateCandidate[]> {
  const supabase = createSupabaseAdminClient();
  const [usersResult, { data: modules }, { data: progress }, { data: capstones }, certificatesResult, { data: decisions }] = await Promise.all([
    supabase.from("users").select("id, full_name, program_track, ambassador_profiles(modules_completed)").eq("role", "ambassador").eq("program_track", "ambassador").order("full_name"),
    supabase.from("modules").select("id, order_index").eq("is_published", true).gte("order_index", 1).lte("order_index", 3),
    supabase.from("module_progress").select("user_id, module_id, status").eq("status", "completed"),
    supabase.from("capstone_projects").select("user_id, submitted_at"),
    supabase.from("training_certificates").select("user_id, certificate_number, issued_at, certificate_type"),
    supabase.from("certificate_decisions").select("user_id, allow_certificate, note")
  ]);
  const users = usersResult.error?.message.includes("program_track")
    ? (await supabase.from("users").select("id, full_name, ambassador_profiles(modules_completed)").eq("role", "ambassador").order("full_name")).data
    : usersResult.data;
  const certificates = certificatesResult.error?.message.includes("does not exist")
    ? (await supabase.from("training_certificates").select("user_id, certificate_number, issued_at")).data
    : certificatesResult.data;

  const requiredModuleIds = new Set((modules ?? []).map((module) => module.id));
  const completedByUser = new Map<string, Set<string>>();
  for (const row of progress ?? []) {
    if (!requiredModuleIds.has(row.module_id)) continue;
    const set = completedByUser.get(row.user_id) ?? new Set<string>();
    set.add(row.module_id);
    completedByUser.set(row.user_id, set);
  }
  const capstoneByUser = new Set((capstones ?? []).filter((row) => row.submitted_at).map((row) => row.user_id));
  const certificateByUser = new Map((certificates ?? []).map((row) => [row.user_id, row]));
  const decisionByUser = new Map((decisions ?? []).map((row) => [row.user_id, row]));

  return (users ?? [])
    .map((user) => {
      const certificate = certificateByUser.get(user.id);
      const decision = decisionByUser.get(user.id);
      const profile = Array.isArray(user.ambassador_profiles) ? user.ambassador_profiles[0] : user.ambassador_profiles;
      const modulesCompleted = Math.max(completedByUser.get(user.id)?.size ?? 0, profile?.modules_completed ?? 0);
      return {
        userId: user.id,
        fullName: user.full_name,
        modulesCompleted,
        capstoneSubmitted: capstoneByUser.has(user.id),
        certificateNumber: certificate?.certificate_number ?? null,
        issuedAt: certificate?.issued_at ?? null,
        adminDecision: decision?.allow_certificate ?? null,
        decisionNote: decision?.note ?? null
      };
    })
    .filter((candidate) => candidate.modulesCompleted >= 3);
}
