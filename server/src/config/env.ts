import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

const PORT = Number(process.env.PORT) || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI as string;

export { PORT, NODE_ENV, MONGO_URI };
