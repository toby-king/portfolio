import { useState } from "react";
import { PASTEL_GRADIENTS } from "../theme";
import useReveal from "../hooks/useReveal";
import useTilt from "../hooks/useTilt";

export default function ProjectCard({ project, revealDelay }) {
  const [tiltRef, tiltStyle, handleTiltMove, handleTiltLeave] = useTilt(5);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [revealRef, isVisible] = useReveal(0.1);
  const showImage = project.img && !imgError;
  const gradient = PASTEL_GRADIENTS[project.gradient];

  const LinkOrDiv = project.link ? "a" : "div";
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      ref={revealRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${revealDelay}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${revealDelay}s`,
      }}
    >
      <div
        ref={tiltRef}
        className="tilt-card"
        onMouseMove={handleTiltMove}
        onMouseLeave={(e) => { handleTiltLeave(e); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
      >
        <div
          className="bg-base-card rounded-[14px] overflow-hidden card-base"
          style={{
            border: `1px solid ${hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
            boxShadow: hovered ? "0 12px 48px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.2)",
            ...tiltStyle,
          }}
        >
          {/* Gradient stripe */}
          <div className="card-stripe" style={{ background: gradient }} />

          {/* Hero area */}
          <div className="project-hero relative overflow-hidden" style={{ background: showImage ? "transparent" : `linear-gradient(135deg, #232e1e, #2a3624)` }}>
            {showImage ? (
              <img
                src={project.img}
                alt={project.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-all duration-400"
                style={{
                  opacity: hovered ? 0.65 : 0.45,
                  filter: hovered ? "saturate(0.8) brightness(0.8)" : "saturate(0.6) brightness(0.7)",
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center transition-opacity duration-400"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.15), transparent), ${gradient}`,
                  opacity: hovered ? 0.18 : 0.12,
                }}
              >
                <span className="font-display text-[72px] text-white opacity-50">
                  {project.placeholder}
                </span>
              </div>
            )}
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-base-card to-transparent" />
          </div>

          {/* Content */}
          <div className="px-[clamp(16px,3.5vw,28px)] pt-4 pb-[clamp(16px,3vw,24px)]">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-cream-faint mb-1.5">
              {project.type}
            </div>

            <h3 className="font-display text-2xl text-cream mb-2.5 flex items-center gap-2.5 leading-tight">
              {project.title}
              {project.isNew && (
                <span className="text-[10px] font-mono px-2.5 py-[3px] rounded-[5px] tracking-wider font-medium animate-pulse-badge"
                  style={{ background: "linear-gradient(135deg, #F5C842, #C49A1A)", color: "#1c2418" }}
                >
                  NEW
                </span>
              )}
            </h3>

            <p className="text-sm leading-[1.75] text-cream-dim font-body">
              {project.desc}
            </p>

            {/* Tags */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10.5px] px-2.5 py-[3px] bg-white/[0.04] border border-border-subtle rounded-[5px] text-cream-faint"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            {project.link && (
              <LinkOrDiv
                {...linkProps}
                className="inline-flex items-center gap-1.5 mt-[18px] font-mono text-xs text-gold no-underline px-4 py-2 rounded-lg border border-gold-dim/25 bg-gold-faint transition-all duration-250 hover:bg-gold hover:text-base-bg hover:border-gold"
              >
                View project <span className="text-sm inline-block">→</span>
              </LinkOrDiv>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
