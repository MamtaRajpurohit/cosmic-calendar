import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", eventRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Cosmic Calendar Backend is running...");
});

// Connect DB and start server
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
});
