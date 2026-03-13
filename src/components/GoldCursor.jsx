import { useState, useEffect, useRef } from "react";

export default function GoldCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const lastCheck = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Throttle elementFromPoint to ~60fps
      const now = performance.now();
      if (now - lastCheck.current < 16) return;
      lastCheck.current = now;

      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const clickable = element.closest("a, button, [role='button'], [onclick]");
        setIsPointer(!!clickable);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const cursorScale = clicking ? "scale(0.85)" : "scale(1)";

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {isPointer ? (
        <svg
          width="20" height="22" viewBox="0 0 26 30"
          className="absolute transition-transform duration-100 ease-linear"
          style={{
            left: position.x - 6,
            top: position.y,
            transform: cursorScale,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
          }}
        >
          <path
            d="M10 8V3.5a2 2 0 1 1 4 0V8m0 0V2.5a2 2 0 1 1 4 0V8m0 0V4a2 2 0 1 1 4 0v9c0 5.5-3.5 9-8.5 9S5 22 4 19.5L2 15a2 2 0 0 1 1.5-2.5c1-.2 2 .3 2.5 1.5l1 2V5.5a2 2 0 1 1 4 0V8"
            fill={clicking ? "#C49A1A" : "#F5C842"}
            stroke="#C49A1A"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width="18" height="21" viewBox="0 0 24 28"
          className="absolute transition-transform duration-100 ease-linear"
          style={{
            left: position.x,
            top: position.y,
            transform: cursorScale,
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
          }}
        >
          <path
            d="M2 1L2 21L7.5 15.5L12.5 25L15.5 23.5L10.5 14L18 13L2 1Z"
            fill="#F5C842"
            stroke="#C49A1A"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
