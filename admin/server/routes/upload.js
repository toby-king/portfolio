import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { REPO_ROOT } from "../paths.js";

const router = Router();

const uploadsDir = path.join(REPO_ROOT, "public", "uploads");

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(8).toString("hex");
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${hash}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${ext} not allowed`));
    }
  },
});

// POST /api/upload — upload an image, return its public URL
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
