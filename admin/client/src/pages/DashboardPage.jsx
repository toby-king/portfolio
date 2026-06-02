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
      <h1 className="font-display text-post-ink text-3xl mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Published posts" value={publishedPosts.length} />
        <StatCard label="Drafts" value={draftPosts.length} />
        <StatCard label="Projects" value={projects.length} />
      </div>

      {/* Publish section */}
      <div className="bg-post-paper border border-post-rule rounded-xl p-5 mb-8">
        <h2 className="font-display text-post-ink text-lg mb-3">Publish to site</h2>
        {gitStatus && (
          <p className="text-xs text-post-muted mb-3">
            Branch: <span className="text-post-ink">{gitStatus.branch}</span>
            {" · "}
            {hasChanges
              ? <span className="text-gold-dim font-medium">{gitStatus.modified.length + gitStatus.created.length} pending changes</span>
              : <span className="text-[#1f7a44] font-medium">Up to date</span>
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
            <span className="text-xs text-post-muted">{publishMessage}</span>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex gap-3">
        <Link to="/posts/new" className="bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-xs text-post-ink hover:border-post-accent transition-colors no-underline">
          + New post
        </Link>
        <Link to="/projects/new" className="bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-xs text-post-ink hover:border-post-accent transition-colors no-underline">
          + New project
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-post-paper border border-post-rule rounded-xl p-5">
      <div className="font-display text-3xl text-post-accent mb-1">{value}</div>
      <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-post-muted">{label}</div>
    </div>
  );
}
