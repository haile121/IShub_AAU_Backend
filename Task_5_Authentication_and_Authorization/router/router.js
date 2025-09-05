import { Router } from "express";
import * as C from "../controllers/controller.js";
import { requireAuth, requireRole } from "../middleware/auth_middleware.js";

const router = Router();

// Auth routes
router.post("/register", C.register); // first user becomes admin automatically
router.post("/login", C.login);

// User admin route
router.post("/users/:id/promote", requireAuth, requireRole("admin"), C.promote);

// Task routes
router.get("/tasks", requireAuth, C.getAllTasks);
router.get("/tasks/:id", requireAuth, C.getTaskById);
router.post("/tasks", requireAuth, requireRole("admin"), C.createTask);
router.put("/tasks/:id", requireAuth, requireRole("admin"), C.updateTask);
router.delete("/tasks/:id", requireAuth, requireRole("admin"), C.deleteTask);

export default router;
