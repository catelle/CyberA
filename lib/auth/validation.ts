import { z } from "zod";

const languageSchema = z.enum(["fr", "en"]).default("fr");

const emailSchema = z.string().trim().email().toLowerCase();
const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters");

export const studentRegistrationSchema = z.object({
  student: z.object({
    fullName: z.string().trim().min(2),
    email: emailSchema,
    password: passwordSchema,
    age: z.coerce.number().int().min(12).max(18),
    city: z.string().trim().min(2),
    school: z.string().trim().min(2),
    gradeLevel: z.string().trim().min(1),
    language: languageSchema
  }),
  parent: z.object({
    fullName: z.string().trim().min(2),
    email: emailSchema,
    password: passwordSchema,
    phone: z.string().trim().min(6)
  }),
  consentGiven: z.literal(true)
});

export const parentRegistrationSchema = z.object({
  parent: z.object({
    fullName: z.string().trim().min(2),
    email: emailSchema,
    password: passwordSchema,
    phone: z.string().trim().min(6),
    language: languageSchema
  }),
  studentEmail: emailSchema.optional().or(z.literal(""))
});

export const adminBootstrapSchema = z.object({
  token: z.string().min(1),
  fullName: z.string().trim().min(2),
  email: emailSchema,
  password: passwordSchema,
  language: languageSchema
});
