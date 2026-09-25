import mongoose from "mongoose";
import dns from "dns/promises";

// Use public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is missing");
    }

    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    const conn = await mongoose.connect(uri, {
      dbName: "bitlinks",
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDb;