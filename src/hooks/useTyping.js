import { useState, useEffect } from "react";

export default function useTyping(text, speed = 48, delay = 900) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || displayedText.length >= text.length) return;
    const timer = setTimeout(
      () => setDisplayedText(text.slice(0, displayedText.length + 1)),
      speed
    );
    return () => clearTimeout(timer);
  }, [started, displayedText, text, speed]);

  return displayedText;
}
