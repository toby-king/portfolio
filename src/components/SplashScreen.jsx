import { useState, useEffect } from "react";

const PHRASE = "Let's build something.";
const STAGGER = 0.04;
const DURATION = 0.5;

export default function SplashScreen({ onComplete }) {
  const [showLetters, setShowLetters] = useState(false);
  const [dotsVisible, setDotsVisible] = useState([false, false, false]);
  const [lineExpanded, setLineExpanded] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [textFading, setTextFading] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timers = [];
    const schedule = (fn, ms) => {
      timers.push(setTimeout(fn, ms));
    };

    schedule(() => setDotsVisible([true, false, false]), 400);
    schedule(() => setDotsVisible([true, true, false]), 700);
    schedule(() => setDotsVisible([true, true, true]), 1000);
    schedule(() => setShowLetters(true), 1400);
    schedule(() => setLineExpanded(true), 2700);
    schedule(() => setSubtitleVisible(true), 3100);
    schedule(() => setTextFading(true), 5300);
    schedule(() => setCurtainOpen(true), 5600);
    schedule(() => { setGone(true); onComplete(); }, 6700);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (gone) return null;

  const renderLetters = () => {
    const words = PHRASE.split(" ");
    let charOffset = 0;

    return words.map((word, wordIndex) => {
      const letters = word.split("").map((char, charIndex) => {
        const index = charOffset + charIndex;
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: showLetters ? 1 : 0,
              transform: showLetters ? "translateY(0)" : "translateY(24px)",
              transition: `opacity ${DURATION}s cubic-bezier(0.23, 1, 0.32, 1) ${index * STAGGER}s, transform ${DURATION}s cubic-bezier(0.23, 1, 0.32, 1) ${index * STAGGER}s`,
            }}
          >
            {char}
          </span>
        );
      });

      charOffset += word.length + 1;

      return (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {letters}
          {wordIndex < words.length - 1 && (
            <span className="inline-block w-[0.3em]">{" "}</span>
          )}
        </span>
      );
    });
  };

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ pointerEvents: curtainOpen ? "none" : "auto" }}
    >
      {/* Top curtain */}
      <div
        className="absolute top-0 left-0 right-0 bg-base-bg z-[2] curtain"
        style={{
          height: "50.5%",
          transform: curtainOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      />
      {/* Bottom curtain */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-base-bg z-[2] curtain"
        style={{
          height: "50.5%",
          transform: curtainOpen ? "translateY(100%)" : "translateY(0)",
        }}
      />

      {/* Center content */}
      <div
        className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-6 splash-text"
        style={{
          opacity: textFading ? 0 : 1,
          transform: textFading ? "translateY(-50px)" : "translateY(0)",
        }}
      >
        {/* Dots */}
        <div className="flex gap-3.5 mb-9">
          {dotsVisible.map((visible, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gold transition-all duration-500 ease-out"
              style={{
                opacity: visible ? 0.7 : 0,
                transform: visible ? "scale(1) translateY(0)" : "scale(0.3) translateY(6px)",
              }}
            />
          ))}
        </div>

        {/* Main heading */}
        <h2 className="font-display text-[clamp(32px,8vw,76px)] text-gold leading-[1.15] text-center -tracking-wide">
          {renderLetters()}
        </h2>

        {/* Expanding line */}
        <div
          className="h-0.5 bg-gold rounded-sm mt-7 transition-all duration-800"
          style={{
            width: lineExpanded ? "min(320px, 55vw)" : "0px",
            opacity: lineExpanded ? 0.8 : 0,
            transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />

        {/* Subtitle */}
        <p
          className="font-mono text-xs text-cream-faint mt-[18px] tracking-[2px] uppercase transition-all duration-600 ease-out"
          style={{
            opacity: subtitleVisible ? 0.5 : 0,
            transform: subtitleVisible ? "translateY(0)" : "translateY(8px)",
          }}
        >
          toby · developer & product manager
        </p>
      </div>
    </div>
  );
}
