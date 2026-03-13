import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Content lives in the portfolio repo root
export const REPO_ROOT = path.resolve(__dirname, "../..");
export const CONTENT_DIR = path.join(REPO_ROOT, "content");
export const POSTS_DIR = path.join(CONTENT_DIR, "posts");
export const PROJECTS_FILE = path.join(CONTENT_DIR, "projects.json");
