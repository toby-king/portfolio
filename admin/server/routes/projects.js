import { Router } from "express";
import fs from "fs/promises";
import { PROJECTS_FILE } from "../paths.js";

const router = Router();

async function readProjects() {
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeProjects(projects) {
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET /api/projects — list all
router.get("/", async (req, res) => {
  try {
    const projects = await readProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const projects = await readProjects();
    const project = projects.find((p) => p.id === req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects — create
router.post("/", async (req, res) => {
  try {
    const projects = await readProjects();
    const { title, type, desc, tags, gradient, img, placeholder, link, isNew, published } = req.body;

    if (!title) return res.status(400).json({ error: "Title required" });

    const project = {
      id: slugify(title),
      title,
      type: type || "",
      desc: desc || "",
      tags: tags || [],
      gradient: gradient ?? 0,
      img: img || null,
      placeholder: placeholder || title.charAt(0).toUpperCase(),
      link: link || null,
      isNew: isNew ?? false,
      sortOrder: projects.length,
      published: published ?? true,
    };

    projects.push(project);
    await writeProjects(projects);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects/:id — update
router.put("/:id", async (req, res) => {
  try {
    const projects = await readProjects();
    const index = projects.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Project not found" });

    projects[index] = { ...projects[index], ...req.body };
    await writeProjects(projects);
    res.json(projects[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    let projects = await readProjects();
    const index = projects.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Project not found" });

    projects.splice(index, 1);
    await writeProjects(projects);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects — reorder (send full array of { id, sortOrder })
router.put("/", async (req, res) => {
  try {
    const projects = await readProjects();
    const order = req.body; // [{ id, sortOrder }]

    for (const { id, sortOrder } of order) {
      const project = projects.find((p) => p.id === id);
      if (project) project.sortOrder = sortOrder;
    }

    projects.sort((a, b) => a.sortOrder - b.sortOrder);
    await writeProjects(projects);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
