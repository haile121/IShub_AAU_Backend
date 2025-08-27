import { connectDB } from "./db.js";

export const insertTasks = async () => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  await tasks.insertMany([
    { title: "Develop Homepage", assignedTo: 1, status: "pending", tags: ["frontend", "ui"] },
    { title: "Configure Database", assignedTo: 2, status: "done", tags: ["backend", "database"] },
    { title: "Write API Documentation", assignedTo: 1, status: "pending", tags: ["api", "docs"] },
    { title: "Create Login System", assignedTo: 3, status: "pending", tags: ["auth", "backend"] },
    { title: "Design User Profile Page", assignedTo: 4, status: "pending", tags: ["ui", "frontend"] }
  ]);
};

export const findTasksByUser = async (userId) => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  return await tasks.find({ assignedTo: userId }).toArray();
};

export const findCompletedTasks = async () => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  return await tasks.find({ status: "done" }).toArray();
};

export const findTaskTitles = async () => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  return await tasks.find({}, { projection: { title: 1, _id: 0 } }).toArray();
};

export const updateTaskStatus = async (fromStatus, toStatus) => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  await tasks.updateMany({ status: fromStatus }, { $set: { status: toStatus } });
};

export const addTagToTask = async (title, tag) => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  await tasks.updateOne({ title }, { $push: { tags: tag } });
};

export const deleteCompletedTasks = async () => {
  const db = await connectDB();
  const tasks = db.collection("tasks");
  await tasks.deleteMany({ status: "done" });
};
