import { useRef, useState, useCallback } from "react";

export default function useTilt(intensity = 6) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = useCallback(
    (e) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(600px) rotateY(${normalizedX * intensity}deg) rotateX(${-normalizedY * intensity}deg) scale(1.012)`,
        transition: "transform 0.1s ease",
      });
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform: "perspective(600px) rotateY(0) rotateX(0) scale(1)",
      transition: "transform 0.5s ease",
    });
  }, []);

  return [ref, style, handleMove, handleLeave];
}
