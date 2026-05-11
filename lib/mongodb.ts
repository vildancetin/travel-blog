import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.NEXT_PUBLIC_MONGODB_URI || "";

if (!MONGODB_URI) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("MONGODB_URI is not set. Database operations will fail until it's provided.");
  } else {
    throw new Error("Please define the MONGODB_URI environment variable in production.");
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI)
      .then((m: typeof mongoose) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectToDatabase;
