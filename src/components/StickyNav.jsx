import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 32;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  }, [isHome, navigate]);

  return (
    <div
      className="fixed top-1 left-0 right-0 z-[999] sticky-nav"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="max-w-[600px] mx-auto flex items-center justify-between rounded-xl border border-border-subtle px-6 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        style={{ background: "rgba(28, 36, 24, 0.85)", backdropFilter: "blur(16px)" }}
      >
        <span className="font-display text-base text-gold">Toby King.</span>
        <div className="flex gap-5">
          {[{ id: "about", label: "About" }, { id: "projects", label: "Projects" }, { id: "skills", label: "Skills" }, { id: "blog", label: "Writing" }].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="bg-transparent border-none font-mono text-[11px] tracking-wider text-cream-faint capitalize p-0 py-1 transition-colors duration-200 hover:text-gold"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
