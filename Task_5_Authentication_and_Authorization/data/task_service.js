import Task from "../models/task.js";

export async function createTask({
  title,
  description = "",
  status = "pending",
  createdBy,
}) {
  if (!title)
    throw Object.assign(new Error("Title is required"), { status: 400 });
  const task = await Task.create({ title, description, status, createdBy });
  return task.toJSON();
}

export async function updateTask(id, updates) {
  const task = await Task.findByIdAndUpdate(id, updates, { new: true });
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  return task.toJSON();
}

export async function deleteTask(id) {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  return { deleted: true };
}

export async function getTaskById(id) {
  const task = await Task.findById(id).populate("createdBy", "username role");
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  return task.toJSON();
}

export async function getAllTasks() {
  const tasks = await Task.find({})
    .sort({ createdAt: -1 })
    .populate("createdBy", "username role");
  return tasks.map((t) => t.toJSON());
}
