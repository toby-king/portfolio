import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

const GRADIENT_OPTIONS = [0, 1, 2, 3, 4, 5, 6];
const GRADIENT_LABELS = ["Pink/Peach", "Pink/Purple", "Purple/Blue", "Blue/Sky", "Cyan/Mint", "Green/Lime", "Yellow/Pink"];

export default function ProjectEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [form, setForm] = useState({
    title: "",
    type: "",
    desc: "",
    tags: "",
    gradient: 0,
    img: "",
    placeholder: "",
    link: "",
    isNew: false,
    published: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      api.getProject(id).then((project) => {
        setForm({
          title: project.title || "",
          type: project.type || "",
          desc: project.desc || "",
          tags: (project.tags || []).join(", "),
          gradient: project.gradient ?? 0,
          img: project.img || "",
          placeholder: project.placeholder || "",
          link: project.link || "",
          isNew: project.isNew || false,
          published: project.published ?? true,
        });
      });
    }
  }, [id, isNew]);

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const data = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        gradient: Number(form.gradient),
        img: form.img || null,
        link: form.link || null,
      };

      if (isNew) {
        const result = await api.createProject(data);
        navigate(`/projects/${result.id}`, { replace: true });
      } else {
        await api.updateProject(id, data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-post-ink text-3xl">{isNew ? "New Project" : "Edit Project"}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-bg text-xs font-medium px-4 py-2 rounded-lg hover:bg-gold-dim transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {error && <p className="text-danger text-xs mb-4">{error}</p>}

      <div className="space-y-4">
        <input
          type="text"
          value={form.title}
          onChange={handleChange("title")}
          placeholder="Project title"
          className="w-full bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={form.type}
            onChange={handleChange("type")}
            placeholder="Type (e.g. Platform, Agency)"
            className="bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted"
          />
          <input
            type="text"
            value={form.placeholder}
            onChange={handleChange("placeholder")}
            placeholder="Placeholder letter (e.g. A)"
            className="bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted"
          />
        </div>

        <textarea
          value={form.desc}
          onChange={handleChange("desc")}
          placeholder="Description"
          rows={3}
          className="w-full bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted resize-y"
        />

        <input
          type="text"
          value={form.tags}
          onChange={handleChange("tags")}
          placeholder="Tags (comma-separated: React, Supabase, AI)"
          className="w-full bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={form.link}
            onChange={handleChange("link")}
            placeholder="Project URL (optional)"
            className="bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted"
          />
          <input
            type="text"
            value={form.img}
            onChange={handleChange("img")}
            placeholder="Image URL (optional)"
            className="bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted"
          />
        </div>

        {/* Gradient picker */}
        <div>
          <label className="font-mono text-[10px] tracking-[1.5px] uppercase text-post-muted block mb-2">Card gradient</label>
          <div className="flex gap-2">
            {GRADIENT_OPTIONS.map((g) => (
              <button
                key={g}
                onClick={() => setForm((prev) => ({ ...prev, gradient: g }))}
                className={`w-10 h-10 rounded-lg border-2 transition-all text-[8px] text-center leading-tight ${
                  form.gradient === g ? "border-gold scale-110" : "border-post-rule hover:border-post-muted"
                }`}
                style={{
                  background: [
                    "linear-gradient(135deg, #FFB5A7, #FCD5CE)",
                    "linear-gradient(135deg, #F8B4D9, #E0AAFF)",
                    "linear-gradient(135deg, #BDB2FF, #A0C4FF)",
                    "linear-gradient(135deg, #A0C4FF, #90DBF4)",
                    "linear-gradient(135deg, #8EECF5, #98F5E1)",
                    "linear-gradient(135deg, #B9FBC0, #CFE1B9)",
                    "linear-gradient(135deg, #FDE2A7, #FFB5A7)",
                  ][g],
                }}
                title={GRADIENT_LABELS[g]}
              />
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-post-body cursor-pointer">
            <input type="checkbox" checked={form.isNew} onChange={handleChange("isNew")} className="accent-gold" />
            Show NEW badge
          </label>
          <label className="flex items-center gap-2 text-sm text-post-body cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={handleChange("published")} className="accent-gold" />
            Published
          </label>
        </div>
      </div>
    </div>
  );
}
