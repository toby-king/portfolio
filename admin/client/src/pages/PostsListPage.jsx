import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (slug, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await api.deletePost(slug);
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  if (loading) {
    return <div className="text-cream-faint text-sm">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gold text-xl">Posts</h1>
        <Link
          to="/posts/new"
          className="bg-gold text-bg text-xs font-medium px-4 py-2 rounded-lg hover:bg-gold-dim transition-colors no-underline"
        >
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-cream-faint text-sm">No posts yet.</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              className={`flex items-center justify-between px-5 py-3.5 ${
                index < posts.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <Link
                  to={`/posts/${post.slug}`}
                  className="text-sm text-cream hover:text-gold transition-colors no-underline block truncate"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-cream-faint">{post.date}</span>
                  <span className="text-[10px] text-cream-faint uppercase tracking-wider">{post.category}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    post.published
                      ? "bg-terminal/10 text-terminal"
                      : "bg-gold-faint text-gold-dim"
                  }`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(post.slug, post.title)}
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
