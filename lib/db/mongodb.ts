import mongoose from "mongoose";

import { getMongoEnv } from "@/lib/env";

type CachedConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseConnection ?? {
  conn: null,
  promise: null
};

if (!global.mongooseConnection) {
  global.mongooseConnection = cached;
}

export async function connectToMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const { mongodbUri, mongodbDb } = getMongoEnv();

    cached.promise = mongoose.connect(mongodbUri, {
      dbName: mongodbDb,
      bufferCommands: false
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
