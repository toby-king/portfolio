import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return <div className="text-cream-faint text-sm">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gold text-xl">Projects</h1>
        <Link
          to="/projects/new"
          className="bg-gold text-bg text-xs font-medium px-4 py-2 rounded-lg hover:bg-gold-dim transition-colors no-underline"
        >
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-cream-faint text-sm">No projects yet.</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex items-center justify-between px-5 py-3.5 ${
                index < projects.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-sm text-cream hover:text-gold transition-colors no-underline block truncate"
                >
                  {project.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-cream-faint uppercase tracking-wider">{project.type}</span>
                  {project.isNew && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold-faint text-gold">NEW</span>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    project.published
                      ? "bg-terminal/10 text-terminal"
                      : "bg-gold-faint text-gold-dim"
                  }`}>
                    {project.published ? "Published" : "Hidden"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="text-[10px] text-cream-faint hover:text-danger transition-colors ml-4"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
