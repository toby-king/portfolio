import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import Editor from "../components/Editor";

export default function PostEditPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = !slug;

  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    published: false,
    date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(isNew);

  useEffect(() => {
    if (!isNew) {
      api.getPost(slug).then((post) => {
        setForm({
          title: post.title || "",
          category: post.category || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          published: post.published || false,
          date: post.date || "",
        });
        setLoaded(true);
      });
    }
  }, [slug, isNew]);

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleContentChange = (markdown) => {
    setForm((prev) => ({ ...prev, content: markdown }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (isNew) {
        const result = await api.createPost(form);
        navigate(`/posts/${result.slug}`, { replace: true });
      } else {
        await api.updatePost(slug, form);
      }
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return <div className="text-cream-faint text-sm">Loading...</div>;
  }

  return (
    <div>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-gold text-xl">{isNew ? "New Post" : "Edit Post"}</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-terminal text-xs">Saved</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold text-bg text-xs font-medium px-4 py-2 rounded-lg hover:bg-gold-dim transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && <p className="text-danger text-xs mb-4">{error}</p>}

      {/* Metadata fields */}
      <div className="space-y-3 mb-5">
        <input
          type="text"
          value={form.title}
          onChange={handleChange("title")}
          placeholder="Post title"
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-lg text-cream placeholder:text-cream-faint font-display"
        />

        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            value={form.category}
            onChange={handleChange("category")}
            placeholder="Category"
            className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-cream-faint"
          />
          <input
            type="date"
            value={form.date}
            onChange={handleChange("date")}
            className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-cream"
          />
          <input
            type="text"
            value={form.excerpt}
            onChange={handleChange("excerpt")}
            placeholder="Short excerpt"
            className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-cream-faint"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-cream-dim cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={handleChange("published")}
            className="accent-gold"
          />
          Published
        </label>
      </div>

      {/* WYSIWYG Editor */}
      <Editor content={form.content} onChange={handleContentChange} />
    </div>
  );
}
