import TaskService from "../data/taskService.js";
import mongoose from "mongoose";

// GET all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json({
      success: true,
      error: false,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// GET task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid task ID",
      });
    }

    const task = await TaskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// CREATE task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }

    const newTask = await TaskService.createTask(
      title,
      description,
      dueDate,
      status
    );

    res.status(201).json({
      success: true,
      error: false,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// UPDATE task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid task ID",
      });
    }

    const updatedTask = await TaskService.updateTask(id, req.body);
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid task ID",
      });
    }

    const success = await TaskService.deleteTask(id);
    if (!success) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};
