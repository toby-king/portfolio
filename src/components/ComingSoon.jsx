// Empty-state placeholder for sections whose content is all unpublished.
export default function ComingSoon({ message }) {
  return (
    <div className="rounded-[14px] border border-dashed border-border-subtle-light bg-white/[0.02] px-6 py-10 text-center">
      <div className="flex justify-center gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold opacity-40" />
        ))}
      </div>
      <p className="font-mono text-[11px] tracking-[2.5px] uppercase text-gold mb-2">Coming soon</p>
      <p className="font-body italic text-[15.5px] text-cream-dim">{message}</p>
    </div>
  );
}
