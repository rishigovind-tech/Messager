import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connectDB from "./config/db.js";
import { app, server } from "./config/socket.js";

// Proper __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// Production configuration
if (process.env.NODE_ENV === "production") {
  const staticPath = path.resolve(__dirname, "../../frontend/dist");
  
  app.use(express.static(staticPath));
  
  // Handle client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});