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
      {/* Top nav */}
      <nav className="border-b border-border px-6 py-3 flex items-center justify-between bg-bg-light">
        <div className="flex items-center gap-8">
          <span className="text-gold text-sm font-medium">Toby Admin</span>
          <div className="flex gap-1">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `text-xs px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "bg-gold-faint text-gold"
                      : "text-cream-faint hover:text-cream hover:bg-border"
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
          className="text-xs text-cream-faint hover:text-danger transition-colors"
        >
          Log out
        </button>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
