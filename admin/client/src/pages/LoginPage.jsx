import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.login(password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-post-paper border border-post-rule rounded-2xl p-8 shadow-[0_10px_40px_rgba(28,36,24,0.08)]"
      >
        <h1 className="font-display text-post-ink text-2xl mb-6 text-center">Admin Login</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full bg-post-paper border border-post-rule rounded-lg px-4 py-3 text-sm text-post-ink placeholder:text-post-muted mb-3"
        />

        {error && (
          <p className="text-danger text-xs mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-bg text-sm font-medium py-3 rounded-lg hover:bg-gold-dim transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
