import Task from "../models/task.js";

let tasks = [];
let currentId = 1;

class TaskService {
  static getAllTasks() {
    return tasks;
  }

  static getTaskById(id) {
    return tasks.find(task => task.id === id);
  }

  static createTask(title, description, dueDate, status) {
    const newTask = new Task(currentId++, title, description, dueDate, status);
    tasks.push(newTask);
    return newTask;
  }

  static updateTask(id, updatedData) {
    const task = tasks.find(task => task.id === id);
    if (!task) return null;

    task.title = updatedData.title || task.title;
    task.description = updatedData.description || task.description;
    task.dueDate = updatedData.dueDate || task.dueDate;
    task.status = updatedData.status || task.status;

    return task;
  }

  static deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}

export default TaskService;
