import mongoose from "mongoose";

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  const MONGO_URI = process.env.DATABASE_URL;

  if (!MONGO_URI) {
    throw new Error("Немає DATABASE_URL в .env.local");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
