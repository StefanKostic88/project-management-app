import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "./env";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is undefined. Check your .env file.");
}

export const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Succesfully connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};
