//global connection
import mongoose from "mongoose";


let cached = global.mongoose; // ใช้ global สำหรับ Hot reload dev

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectMongoDB() {
  if (cached.conn) return cached.conn; // ใช้ connection เดิม

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // ลด memory overhead
      maxPoolSize: 10,       // จำกัด concurrent connections
      serverSelectionTimeoutMS: 5000, // 5s timeout
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongoDB;