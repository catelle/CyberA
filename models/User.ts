import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

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

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel =
  (mongoose.models.User as Model<UserDocument>) ??
  mongoose.model("User", userSchema);
