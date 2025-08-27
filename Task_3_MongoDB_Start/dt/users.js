import { connectDB } from "./db.js";

export const insertUsers = async () => {
  const db = await connectDB();
  const users = db.collection("users");
  await users.insertMany([
    { _id: 1, name: "Abebe", email: "abebe@example.com" },
    { _id: 2, name: "Mekdes", email: "mekdes@example.com" },
    { _id: 3, name: "Dawit", email: "dawit@example.com" },
    { _id: 4, name: "Selam", email: "selam@example.com" }
  ]);
};

export const findAllUsers = async () => {
  const db = await connectDB();
  const users = db.collection("users");
  return await users.find().toArray();
};

export const updateUserEmail = async (name, newEmail) => {
  const db = await connectDB();
  const users = db.collection("users");
  await users.updateOne({ name }, { $set: { email: newEmail } });
};

export const deleteUserByName = async (name) => {
  const db = await connectDB();
  const users = db.collection("users");
  await users.deleteOne({ name });
};
