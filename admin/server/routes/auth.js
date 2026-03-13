import { Router } from "express";
import { verifyPassword, generateToken, authMiddleware } from "../auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = generateToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ ok: true });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

router.get("/check", authMiddleware, (req, res) => {
  res.json({ authenticated: true });
});

export default router;
