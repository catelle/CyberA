import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";
import mongoose, { Schema } from "mongoose";
import WebSocket from "ws";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function readEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const linkedAccountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: ["student", "parent", "admin"],
      required: true
    },
    relation: {
      type: String,
      enum: ["child", "parent", "coordinator"],
      required: true
    }
  },
  { _id: false }
);

const profileSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, min: 12, max: 18 },
    city: { type: String, trim: true },
    school: { type: String, trim: true },
    gradeLevel: { type: String, trim: true },
    phone: { type: String, trim: true }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    supabaseUserId: { type: String, required: true, unique: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    role: {
      type: String,
      enum: ["student", "parent", "admin"],
      required: true,
      index: true
    },
    linkedAccounts: { type: [linkedAccountSchema], default: [] },
    profile: { type: profileSchema, required: true },
    language: {
      type: String,
      enum: ["fr", "en"],
      default: "fr",
      required: true
    },
    consentGiven: { type: Boolean, default: false, required: true },
    consentDate: { type: Date },
    requiresEnhancedProtection: { type: Boolean, default: false },
    onboardingCompletedAt: { type: Date }
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User ?? mongoose.model("User", userSchema);

async function findSupabaseUserByEmail(supabase, email) {
  const normalizedEmail = email.toLowerCase();
  let page = 1;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 100
    });

    if (error) {
      throw error;
    }

    const user = data.users.find(
      (candidate) => candidate.email?.toLowerCase() === normalizedEmail
    );

    if (user) {
      return user;
    }

    if (data.users.length < 100) {
      return null;
    }

    page += 1;
  }
}

async function main() {
  const supabaseUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  const mongodbUri = readEnv("MONGODB_URI");
  const adminEmail = readEnv("ADMIN_EMAIL").toLowerCase();
  const adminPassword = readEnv("ADMIN_PASSWORD");
  const adminName = readEnv("ADMIN_NAME");
  const mongodbDb = process.env.MONGODB_DB ?? "cyberambassadeurs";
  const language = process.env.ADMIN_LANGUAGE === "en" ? "en" : "fr";

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    realtime: {
      transport: WebSocket
    }
  });

  let authUser = await findSupabaseUserByEmail(supabase, adminEmail);

  if (!authUser) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        role: "admin",
        fullName: adminName,
        language
      }
    });

    if (error || !data.user) {
      throw error ?? new Error("Admin account creation failed");
    }

    authUser = data.user;
    console.log(`Created Supabase admin: ${adminEmail}`);
  } else {
    const { data, error } = await supabase.auth.admin.updateUserById(
      authUser.id,
      {
        password: adminPassword,
        user_metadata: {
          ...authUser.user_metadata,
          role: "admin",
          fullName: adminName,
          language
        }
      }
    );

    if (error || !data.user) {
      throw error ?? new Error("Admin account update failed");
    }

    authUser = data.user;
    console.log(`Updated Supabase admin: ${adminEmail}`);
  }

  await mongoose.connect(mongodbUri, {
    dbName: mongodbDb,
    bufferCommands: false
  });

  const now = new Date();
  const existingUser = await UserModel.findOne({
    $or: [{ email: adminEmail }, { supabaseUserId: authUser.id }]
  });

  if (existingUser) {
    existingUser.set({
      supabaseUserId: authUser.id,
      email: adminEmail,
      role: "admin",
      profile: { fullName: adminName },
      language,
      consentGiven: true,
      consentDate: existingUser.consentDate ?? now,
      onboardingCompletedAt: existingUser.onboardingCompletedAt ?? now
    });
    await existingUser.save();
    console.log(`Updated Mongo admin profile: ${adminEmail}`);
  } else {
    await UserModel.create({
      supabaseUserId: authUser.id,
      email: adminEmail,
      role: "admin",
      profile: { fullName: adminName },
      language,
      consentGiven: true,
      consentDate: now,
      onboardingCompletedAt: now
    });
    console.log(`Created Mongo admin profile: ${adminEmail}`);
  }
}

main()
  .then(async () => {
    await mongoose.disconnect();
    console.log("Admin seed complete.");
  })
  .catch(async (error) => {
    await mongoose.disconnect().catch(() => {});
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
