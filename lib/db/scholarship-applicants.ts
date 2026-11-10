import mongoose from "mongoose";

type ScholarshipApplicant = {
  fullName?: string;
  email: string;
  city?: string;
  cybercomp?: {
    taken?: boolean;
    initialTaken?: boolean;
    finalTaken?: boolean;
  };
};

declare global {
  // eslint-disable-next-line no-var
  var scholarshipMongoConnection: mongoose.Connection | undefined;
}

export async function findEligibleScholarshipApplicant(email: string) {
  const uri = process.env.WEBSITE_MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  const connection = global.scholarshipMongoConnection ??= mongoose.createConnection(uri);
  if (connection.readyState !== 1) await connection.asPromise();

  return connection.collection<ScholarshipApplicant>("scholarshipapplications").findOne(
    {
      email: email.trim().toLowerCase(),
      cohort: "scholarship-2026"
    },
    { projection: { fullName: 1, email: 1, city: 1, cybercomp: 1 } }
  );
}
