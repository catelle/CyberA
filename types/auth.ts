export type UserRole = "student" | "parent" | "admin" | "facilitator";

export type Language = "fr" | "en";
export type ProgramTrack = "ambassador" | "scholarship";

export type LinkedAccount = {
  userId: string;
  role: UserRole;
  relation: "child" | "parent" | "coordinator";
};

export type UserProfile = {
  fullName: string;
  age?: number;
  city?: string;
  school?: string;
  gradeLevel?: string;
  phone?: string;
};

export type SafeUser = {
  id: string;
  supabaseUserId: string;
  email: string;
  role: UserRole;
  programTrack: ProgramTrack;
  profile: UserProfile;
  language: Language;
  consentGiven: boolean;
  consentDate?: string;
  familyCode?: string;
  linkedAccounts: LinkedAccount[];
};
