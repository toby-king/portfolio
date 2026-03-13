import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gitStatus, setGitStatus] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState("");

  useEffect(() => {
    api.getPosts().then(setPosts).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
    api.gitStatus().then(setGitStatus).catch(() => {});
  }, []);

  const handlePublish = async () => {
    setPublishing(true);
    setPublishMessage("");
    try {
      const result = await api.publish();
      setPublishMessage(result.message);
      api.gitStatus().then(setGitStatus);
    } catch (err) {
      setPublishMessage(`Error: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  };

  const publishedPosts = posts.filter((p) => p.published);
  const draftPosts = posts.filter((p) => !p.published);
  const hasChanges = gitStatus && !gitStatus.isClean;

  return (
    <div>
      <h1 className="text-gold text-xl mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Published posts" value={publishedPosts.length} />
        <StatCard label="Drafts" value={draftPosts.length} />
        <StatCard label="Projects" value={projects.length} />
      </div>

      {/* Publish section */}
      <div className="bg-card border border-border rounded-xl p-5 mb-8">
        <h2 className="text-cream text-sm mb-3">Publish to site</h2>
        {gitStatus && (
          <p className="text-xs text-cream-faint mb-3">
            Branch: <span className="text-cream">{gitStatus.branch}</span>
            {" · "}
            {hasChanges
              ? <span className="text-gold">{gitStatus.modified.length + gitStatus.created.length} pending changes</span>
              : <span className="text-terminal">Up to date</span>
            }
          </p>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublish}
            disabled={publishing || !hasChanges}
            className="bg-gold text-bg text-xs font-medium px-4 py-2 rounded-lg hover:bg-gold-dim transition-colors disabled:opacity-40"
          >
            {publishing ? "Publishing..." : "Commit & Push"}
          </button>
          {publishMessage && (
            <span className="text-xs text-cream-faint">{publishMessage}</span>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex gap-3">
        <Link to="/posts/new" className="bg-card border border-border rounded-lg px-4 py-3 text-xs text-cream hover:border-gold-dim transition-colors no-underline">
          + New post
        </Link>
        <Link to="/projects/new" className="bg-card border border-border rounded-lg px-4 py-3 text-xs text-cream hover:border-gold-dim transition-colors no-underline">
          + New project
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="text-2xl text-gold mb-1">{value}</div>
      <div className="text-xs text-cream-faint">{label}</div>
    </div>
  );
}
