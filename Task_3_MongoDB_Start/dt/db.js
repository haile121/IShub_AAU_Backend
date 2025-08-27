import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db("taskManagementDB");
  }
  return db;
};

export const closeDB = async () => {
  await client.close();
};
