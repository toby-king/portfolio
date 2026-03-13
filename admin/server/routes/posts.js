import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { POSTS_DIR } from "../paths.js";

const router = Router();

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === "true") value = true;
    else if (value === "false") value = false;
    meta[key] = value;
  }

  return { meta, content: match[2].trim() };
}

function toFrontmatter(meta, content) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(meta)) {
    if (typeof value === "string" && (value.includes(":") || value.includes('"'))) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push("---", "", content);
  return lines.join("\n");
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET /api/posts — list all posts
router.get("/", async (req, res) => {
  try {
    await fs.mkdir(POSTS_DIR, { recursive: true });
    const files = await fs.readdir(POSTS_DIR);
    const posts = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
      const { meta } = parseFrontmatter(raw);
      posts.push({ ...meta, filename: file });
    }

    posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:slug — get single post
router.get("/:slug", async (req, res) => {
  try {
    const files = await fs.readdir(POSTS_DIR);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
      const { meta, content } = parseFrontmatter(raw);
      if (meta.slug === req.params.slug) {
        return res.json({ ...meta, content, filename: file });
      }
    }
    res.status(404).json({ error: "Post not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts — create new post
router.post("/", async (req, res) => {
  try {
    const { title, category, content, excerpt, published } = req.body;

    if (!title) return res.status(400).json({ error: "Title required" });

    const slug = slugify(title);
    const date = new Date().toISOString().split("T")[0];
    const filename = `${slug}.md`;

    const meta = {
      title,
      slug,
      category: category || "General",
      date,
      excerpt: excerpt || "",
      published: published ?? false,
    };

    const fileContent = toFrontmatter(meta, content || `# ${title}\n\n`);
    await fs.writeFile(path.join(POSTS_DIR, filename), fileContent, "utf-8");

    res.json({ ...meta, filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/posts/:slug — update existing post
router.put("/:slug", async (req, res) => {
  try {
    const files = await fs.readdir(POSTS_DIR);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const filePath = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(filePath, "utf-8");
      const { meta: existingMeta } = parseFrontmatter(raw);

      if (existingMeta.slug === req.params.slug) {
        const { title, category, content, excerpt, published, date } = req.body;

        const updatedMeta = {
          ...existingMeta,
          ...(title !== undefined && { title }),
          ...(category !== undefined && { category }),
          ...(excerpt !== undefined && { excerpt }),
          ...(published !== undefined && { published }),
          ...(date !== undefined && { date }),
        };

        const updatedContent = content !== undefined ? content : "";
        const fileContent = toFrontmatter(updatedMeta, updatedContent);

        // If title changed, rename the file
        const newSlug = title ? slugify(title) : existingMeta.slug;
        const newFilename = `${newSlug}.md`;
        updatedMeta.slug = newSlug;

        if (newFilename !== file) {
          await fs.unlink(filePath);
        }

        await fs.writeFile(path.join(POSTS_DIR, newFilename), toFrontmatter(updatedMeta, updatedContent), "utf-8");

        return res.json({ ...updatedMeta, filename: newFilename });
      }
    }
    res.status(404).json({ error: "Post not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/posts/:slug
router.delete("/:slug", async (req, res) => {
  try {
    const files = await fs.readdir(POSTS_DIR);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf-8");
      const { meta } = parseFrontmatter(raw);
      if (meta.slug === req.params.slug) {
        await fs.unlink(path.join(POSTS_DIR, file));
        return res.json({ ok: true });
      }
    }
    res.status(404).json({ error: "Post not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
