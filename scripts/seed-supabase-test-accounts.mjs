import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import ws from "ws";

function loadEnvFile(fileName) {
  const filePath = resolve(process.cwd(), fileName);
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: ws }
});

const accounts = [
  {
    email: "admin.cybera@example.com",
    password: "CyberA123!",
    fullName: "Admin CyberA",
    role: "admin",
    city: "Yaounde"
  },
  {
    email: "amina.ambassador@example.com",
    password: "CyberA123!",
    fullName: "Amina Ambassador",
    role: "ambassador",
    city: "Yaounde"
  },
  {
    email: "eric.ambassador@example.com",
    password: "CyberA123!",
    fullName: "Eric Ambassador",
    role: "ambassador",
    city: "Douala"
  },
  {
    email: "parent.cybera@example.com",
    password: "CyberA123!",
    fullName: "Parent CyberA",
    role: "parent",
    city: "Yaounde"
  }
];

const trainingModules = [
  {
    orderIndex: 1,
    title: "Risques en ligne",
    subtitle: "Online Risks",
    description:
      "Identifier les arnaques, le phishing, le cyberharcelement, la desinformation et les situations qui demandent de l'aide.",
    color: "#1A5276",
    icon: "shield",
    lessons: [
      {
        orderIndex: 1,
        title: "Reconnaitre une arnaque",
        estimatedMins: 8,
        contentText:
          "Observe le message, verifie l'expediteur, cherche les signes d'urgence artificielle et demande conseil avant de cliquer."
      }
    ]
  },
  {
    orderIndex: 2,
    title: "Opportunites numeriques",
    subtitle: "Digital Opportunities",
    description:
      "Utiliser internet pour apprendre, creer, trouver des opportunites utiles et construire une presence numerique positive.",
    color: "#1E8449",
    icon: "globe",
    lessons: [
      {
        orderIndex: 1,
        title: "Transformer internet en outil de croissance",
        estimatedMins: 7,
        contentText:
          "Choisis un objectif concret, trouve deux sources fiables et transforme ce que tu apprends en action utile pour ton ecole ou ta famille."
      }
    ]
  },
  {
    orderIndex: 3,
    title: "Hygiene numerique",
    subtitle: "Digital Hygiene",
    description:
      "Installer des reflexes concrets: mots de passe solides, confidentialite, double verification, gestion du temps et protection des donnees.",
    color: "#B7950B",
    icon: "lock",
    lessons: [
      {
        orderIndex: 1,
        title: "Proteger ses comptes essentiels",
        estimatedMins: 9,
        contentText:
          "Cree une phrase de passe unique, active la double verification et verifie les parametres de confidentialite de tes comptes principaux."
      }
    ]
  },
  {
    orderIndex: 4,
    title: "Leadership citoyen numerique",
    subtitle: "Digital Citizen Leadership",
    description:
      "Passer de l'apprentissage a l'action: sensibiliser, aider d'autres eleves, documenter ses preuves et inspirer sa communaute.",
    color: "#6C3483",
    icon: "trophy",
    lessons: [
      {
        orderIndex: 1,
        title: "Mener une action de sensibilisation",
        estimatedMins: 10,
        contentText:
          "Prepare un message simple, choisis un public, partage une bonne pratique et collecte une preuve de ton action de leadership."
      }
    ]
  }
];

async function findAuthUserByEmail(email) {
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 1000
    });

    if (error) {
      throw error;
    }

    const user = data.users.find(
      (item) => item.email?.toLowerCase() === email.toLowerCase()
    );

    if (user) {
      return user;
    }

    if (data.users.length < 1000) {
      return null;
    }

    page += 1;
  }
}

async function upsertAuthUser(account) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: account.email,
    password: account.password,
    email_confirm: true,
    user_metadata: {
      role: account.role,
      fullName: account.fullName
    }
  });

  if (!error && data.user) {
    return data.user;
  }

  if (!error || !error.message.toLowerCase().includes("already")) {
    throw error ?? new Error(`Could not create ${account.email}`);
  }

  const existingUser = await findAuthUserByEmail(account.email);

  if (!existingUser) {
    throw new Error(`Could not find existing auth user for ${account.email}`);
  }

  const { data: updated, error: updateError } =
    await supabase.auth.admin.updateUserById(existingUser.id, {
      password: account.password,
      email_confirm: true,
      user_metadata: {
        role: account.role,
        fullName: account.fullName
      }
    });

  if (updateError || !updated.user) {
    throw updateError ?? new Error(`Could not update ${account.email}`);
  }

  return updated.user;
}

async function upsertTrainingModule(module) {
  const { data: existingModules, error: readError } = await supabase
    .from("modules")
    .select("id")
    .eq("order_index", module.orderIndex)
    .order("created_at", { ascending: true })
    .limit(1);

  if (readError) {
    throw readError;
  }

  const payload = {
    order_index: module.orderIndex,
    title: module.title,
    subtitle: module.subtitle,
    description: module.description,
    color: module.color,
    icon: module.icon,
    is_published: true
  };

  const existingModuleId = existingModules?.[0]?.id;

  if (existingModuleId) {
    const { data, error } = await supabase
      .from("modules")
      .update(payload)
      .eq("id", existingModuleId)
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    return data.id;
  }

  const { data, error } = await supabase
    .from("modules")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}

async function upsertStarterLesson(moduleId, lesson) {
  const { data: existingLessons, error: readError } = await supabase
    .from("lessons")
    .select("id")
    .eq("module_id", moduleId)
    .eq("order_index", lesson.orderIndex)
    .order("created_at", { ascending: true })
    .limit(1);

  if (readError) {
    throw readError;
  }

  const payload = {
    module_id: moduleId,
    order_index: lesson.orderIndex,
    title: lesson.title,
    estimated_mins: lesson.estimatedMins,
    content: [{ type: "text", content: lesson.contentText }]
  };

  const existingLessonId = existingLessons?.[0]?.id;

  if (existingLessonId) {
    const { error } = await supabase
      .from("lessons")
      .update(payload)
      .eq("id", existingLessonId);

    if (error) {
      throw error;
    }

    return;
  }

  const { error } = await supabase.from("lessons").insert(payload);

  if (error) {
    throw error;
  }
}

const { data: cohort } = await supabase
  .from("cohorts")
  .upsert(
    {
      name: "Yaounde Pilot - Juillet 2025",
      type: "onsite",
      start_date: "2025-07-01",
      max_size: 15,
      is_active: true
    },
    { onConflict: "name" }
  )
  .select("id")
  .single();

const created = new Map();

for (const account of accounts) {
  const authUser = await upsertAuthUser(account);
  const userId = authUser.id;
  created.set(account.email, userId);

  await supabase.from("users").upsert(
    {
      id: userId,
      full_name: account.fullName,
      role: account.role,
      city: account.city
    },
    { onConflict: "id" }
  );

  if (account.role === "ambassador") {
    await supabase.from("ambassador_profiles").upsert(
      {
        user_id: userId,
        cohort_id: cohort?.id,
        total_points: account.email.startsWith("amina") ? 620 : 160,
        modules_completed: account.email.startsWith("amina") ? 4 : 1,
        parental_consent_given: true,
        parental_consent_at: new Date().toISOString()
      },
      { onConflict: "user_id" }
    );
  }
}

const parentId = created.get("parent.cybera@example.com");
const childId = created.get("amina.ambassador@example.com");
if (parentId && childId) {
  await supabase.from("family_links").upsert(
    {
      parent_id: parentId,
      child_id: childId,
      family_code: "AMINA1"
    },
    { onConflict: "family_code" }
  );
}

for (const module of trainingModules) {
  const moduleId = await upsertTrainingModule(module);

  for (const lesson of module.lessons) {
    await upsertStarterLesson(moduleId, lesson);
  }
}

console.log("Seeded test accounts:");
for (const account of accounts) {
  console.log(`${account.role}: ${account.email} / ${account.password}`);
}
console.log("Seeded editable training modules and starter lessons.");
