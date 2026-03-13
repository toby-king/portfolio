export default function GradientCard({ gradient, children, className = "", style: extraStyle, onMouseMove, onMouseLeave, tiltStyle }) {
  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`bg-base-card rounded-[14px] overflow-hidden border border-border-subtle shadow-[0_2px_12px_rgba(0,0,0,0.2)] card-base ${className}`}
      style={{ ...tiltStyle, ...extraStyle }}
    >
      <div className="card-stripe" style={{ background: gradient }} />
      <div className="p-[clamp(16px,3vw,24px)_clamp(16px,3.5vw,28px)]">
        {children}
      </div>
    </div>
  );
}
