import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./router/router.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// API routes
app.use("/api", router);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB || undefined,
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.error("Failed to start:", e);
    process.exit(1);
  }
}

start();
