import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Task Management API ",
    data: null
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
