const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Not authenticated");
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  login: (password) => request("/auth/login", { method: "POST", body: JSON.stringify({ password }) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  checkAuth: () => request("/auth/check"),

  // Posts
  getPosts: () => request("/posts"),
  getPost: (slug) => request(`/posts/${slug}`),
  createPost: (data) => request("/posts", { method: "POST", body: JSON.stringify(data) }),
  updatePost: (slug, data) => request(`/posts/${slug}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePost: (slug) => request(`/posts/${slug}`, { method: "DELETE" }),

  // Projects
  getProjects: () => request("/projects"),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (data) => request("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),

  // Git
  gitStatus: () => request("/git/status"),
  publish: (message) => request("/git/publish", { method: "POST", body: JSON.stringify({ message }) }),
};
