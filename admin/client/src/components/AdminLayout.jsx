import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { api } from "../api";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/posts", label: "Posts" },
  { to: "/projects", label: "Projects" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      {/* Green brand bar — matches the public post page chrome */}
      <nav className="sticky top-0 z-40 bg-bg border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-display text-gold text-[19px] -tracking-[0.01em]">
              Toby Admin
            </span>
            <div className="flex gap-1">
              {navItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `font-mono text-[11px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? "text-gold"
                        : "text-cream-dim hover:text-gold"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="font-mono text-[11px] tracking-[1.5px] uppercase text-cream-dim hover:text-danger transition-colors"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* Light content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
