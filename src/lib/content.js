// Load all markdown posts at build time via Vite's import.meta.glob
const postFiles = import.meta.glob("/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse booleans
    if (value === "true") value = true;
    else if (value === "false") value = false;

    // Parse arrays (simple comma-separated in brackets)
    if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }

    meta[key] = value;
  }

  return { meta, content: match[2].trim() };
}

export function getAllPosts() {
  const posts = Object.values(postFiles).map((raw) => {
    const { meta, content } = parseFrontmatter(raw);
    return { ...meta, content };
  });

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Load projects JSON at build time
import projectsData from "/content/projects.json";

export function getAllProjects() {
  return projectsData
    .filter((project) => project.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
