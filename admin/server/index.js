import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import projectsRoutes from "./routes/projects.js";
import gitRoutes from "./routes/git.js";
import uploadRoutes from "./routes/upload.js";
import { authMiddleware } from "./auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5180",
  credentials: true,
}));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/posts", authMiddleware, postsRoutes);
app.use("/api/projects", authMiddleware, projectsRoutes);
app.use("/api/git", authMiddleware, gitRoutes);
app.use("/api/upload", authMiddleware, uploadRoutes);

// Serve built admin client in production
const clientDist = path.resolve(__dirname, "../dist-client");
app.use(express.static(clientDist));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Admin server running on http://localhost:${PORT}`);
});
