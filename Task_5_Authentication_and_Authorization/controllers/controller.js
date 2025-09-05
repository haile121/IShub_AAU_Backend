import * as UserService from "../data/user_service.js";
import * as TaskService from "../data/task_service.js";

// Auth
export async function register(req, res, next) {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { token, user } = await UserService.authenticate(req.body);
    res.json({ token, user });
  } catch (e) {
    next(e);
  }
}

export async function promote(req, res, next) {
  try {
    const updated = await UserService.promoteToAdmin(req.params.id);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

// Tasks (admin-only for write operations)
export async function createTask(req, res, next) {
  try {
    const created = await TaskService.createTask({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}

export async function updateTask(req, res, next) {
  try {
    const updated = await TaskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const out = await TaskService.deleteTask(req.params.id);
    res.json(out);
  } catch (e) {
    next(e);
  }
}

export async function getAllTasks(req, res, next) {
  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (e) {
    next(e);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    res.json(task);
  } catch (e) {
    next(e);
  }
}
