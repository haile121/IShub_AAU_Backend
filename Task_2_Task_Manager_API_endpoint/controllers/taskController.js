import TaskService from "../data/taskService.js";

// GET all tasks
export const getAllTasks = (req, res) => {
  const tasks = TaskService.getAllTasks();
  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",
    data: tasks
  });
};

// GET task by ID
export const getTaskById = (req, res) => {
  const task = TaskService.getTaskById(parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
      error: "Invalid task ID"
    });
  }
  res.status(200).json({
    success: true,
    message: "Task retrieved successfully",
    data: task
  });
};

// CREATE task
export const createTask = (req, res) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !description || !dueDate || !status) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      error: "Missing required fields"
    });
  }

  const newTask = TaskService.createTask(title, description, dueDate, status);
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask
  });
};

// UPDATE task
export const updateTask = (req, res) => {
  const updatedTask = TaskService.updateTask(parseInt(req.params.id), req.body);
  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
      error: "Invalid task ID"
    });
  }
  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask
  });
};

// DELETE task
export const deleteTask = (req, res) => {
  const success = TaskService.deleteTask(parseInt(req.params.id));
  if (!success) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
      error: "Invalid task ID"
    });
  }
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: null
  });
};
