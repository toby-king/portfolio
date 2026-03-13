export default function SectionLabel({ number, text }) {
  return (
    <div className="flex items-center gap-[clamp(8px,2vw,14px)] mb-[22px]">
      <span className="font-mono text-[10px] tracking-[4px] uppercase text-cream-faint whitespace-nowrap">
        {number} —
      </span>
      <span className="font-display text-[clamp(22px,5vw,30px)] text-gold leading-none">
        {text}
      </span>
      <span className="flex-1 h-px section-divider min-w-5" />
    </div>
  );
}
