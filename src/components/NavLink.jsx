import { useCallback } from "react";

export default function NavLink({ href, children }) {
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 32;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [href]
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group relative font-mono text-xs tracking-wider no-underline text-cream-faint py-2 transition-colors duration-250 hover:text-gold"
    >
      {children}
      <span className="nav-underline absolute bottom-0.5 left-0 right-0 h-[2.5px] rounded-sm bg-gold scale-x-0 group-hover:scale-x-100" />
    </a>
  );
}
