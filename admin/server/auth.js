import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

export async function verifyPassword(password) {
  if (!ADMIN_PASSWORD_HASH) {
    // Fallback for development: accept the env var ADMIN_PASSWORD directly
    return password === (process.env.ADMIN_PASSWORD || "admin");
  }
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function generateToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Helper to generate a password hash (run once to set up):
// node -e "import('bcryptjs').then(b => b.hash('yourpassword', 10).then(console.log))"
