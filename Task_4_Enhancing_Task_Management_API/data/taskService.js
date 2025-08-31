import Task from "../models/task.js";

class TaskService {
  static async getAllTasks() {
    return await Task.find();
  }

  static async getTaskById(id) {
    return await Task.findById(id);
  }

  static async createTask(title, description, dueDate, status) {
    const newTask = new Task({ title, description, dueDate, status });
    return await newTask.save();
  }

  static async updateTask(id, updatedData) {
    return await Task.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteTask(id) {
    const deletedTask = await Task.findByIdAndDelete(id);
    return !!deletedTask;
  }
}

export default TaskService;
