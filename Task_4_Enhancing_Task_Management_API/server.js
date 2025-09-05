import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Task Management API with MongoDB",
    data: null,
  });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1);
  });
