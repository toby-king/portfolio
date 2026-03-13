import { useState, useEffect, useRef, useCallback } from "react";

const PASTEL_GRADIENTS = [
  "linear-gradient(135deg, #FFB5A7, #FCD5CE)",
  "linear-gradient(135deg, #F8B4D9, #E0AAFF)",
  "linear-gradient(135deg, #BDB2FF, #A0C4FF)",
  "linear-gradient(135deg, #A0C4FF, #90DBF4)",
  "linear-gradient(135deg, #8EECF5, #98F5E1)",
  "linear-gradient(135deg, #B9FBC0, #CFE1B9)",
  "linear-gradient(135deg, #FDE2A7, #FFB5A7)",
];
const FULL_RAINBOW = "linear-gradient(135deg, #FFB5A7, #F8B4D9, #BDB2FF, #A0C4FF, #8EECF5, #98F5E1, #FDE2A7, #FFB5A7)";

const C = {
  bg: "#1c2418", bgLight: "#232e1e", card: "#2a3624", gold: "#F5C842", goldDim: "#C49A1A",
  goldFaint: "rgba(245,200,66,0.12)", cream: "#e8e0d0", creamDim: "#b0a890", creamFaint: "#7a7260",
  green: "#4ade80", border: "rgba(255,255,255,0.06)", borderLight: "rgba(255,255,255,0.1)",
};

const PROJECTS = [
  { type: "Platform", title: "Acquiro", isNew: true, desc: "AI-powered M&A advisory — \"Rightmove for businesses.\" Aggregates 30k+ UK business listings with voice agents for buyer discovery calls.", tags: ["React", "Supabase", "ElevenLabs", "Pinecone", "OpenAI"], gradient: 6, img: null, placeholder: "A", link: "#" },
  { type: "Hardware + Software", title: "Mac Plus Terminal", desc: "Restored 1986 Mac Plus running a React smart-home dashboard styled after System 7. Voice control, CRT glass mounted over OLED.", tags: ["React", "Vite", "N100", "Mini-ITX", "Hardware"], gradient: 2, img: null, placeholder: "M", link: "#" },
  { type: "Analysis", title: "Legacy ERP Migration", desc: "Reverse-engineered a 1989 bespoke ERP system — 258 active functions, 23+ database tables. Mapped complete migration to modern SaaS.", tags: ["Pick/MV", "Xero", "Cin7", "Documentation"], gradient: 4, img: null, placeholder: "E", link: "#" },
  { type: "Agency", title: "Web Dev Agency", desc: "Marketing & web development agency building recurring revenue through care plans, AI-driven SEO, and industrial client lead generation.", tags: ["Strategy", "SEO", "Lead Gen", "Web Dev"], gradient: 1, img: null, placeholder: "W", link: "#" },
];

const SKILLS = [
  { title: "Frontend", items: ["React / Vite", "HTML / CSS / JS", "Tailwind CSS", "Chart.js"], gradient: 0 },
  { title: "Backend", items: ["Node / Express", "Supabase / Postgres", "Bubble.io", "REST APIs"], gradient: 2 },
  { title: "AI / ML", items: ["OpenAI / GPT-4o", "ElevenLabs", "Pinecone", "Prompt Engineering"], gradient: 3 },
  { title: "Product", items: ["Strategy", "User Research", "Notion", "Stripe / SendGrid"], gradient: 5 },
];

const POSTS = [
  { date: "Mar 08, 2026", title: "Putting an OLED Behind a CRT — What I Learned", cat: "Hardware", link: "#" },
  { date: "Feb 21, 2026", title: "Designing Voice Agent Personalities That Don't Suck", cat: "AI", link: "#" },
  { date: "Jan 14, 2026", title: "Reverse-Engineering a 35-Year-Old ERP System", cat: "Analysis", link: "#" },
  { date: "Dec 02, 2025", title: "No-Code to Pro-Code: When to Leave Bubble Behind", cat: "Product", link: "#" },
];

// ====== CUSTOM CURSOR ======
function GoldCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const clickable = el.closest("a, button, [role='button'], [onclick]");
        setIsPointer(!!clickable);
      }
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mousedown", onDown); window.removeEventListener("mouseup", onUp); };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10000 }}>
      {isPointer ? (
        /* Pointer hand */
        <svg
          width="20" height="22" viewBox="0 0 26 30"
          style={{
            position: "absolute",
            left: pos.x - 6, top: pos.y,
            transform: `scale(${clicking ? 0.85 : 1})`,
            transition: "transform 0.1s ease",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
          }}
        >
          <path
            d="M10 8V3.5a2 2 0 1 1 4 0V8m0 0V2.5a2 2 0 1 1 4 0V8m0 0V4a2 2 0 1 1 4 0v9c0 5.5-3.5 9-8.5 9S5 22 4 19.5L2 15a2 2 0 0 1 1.5-2.5c1-.2 2 .3 2.5 1.5l1 2V5.5a2 2 0 1 1 4 0V8"
            fill={clicking ? C.goldDim : C.gold}
            stroke={C.goldDim}
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        /* Arrow pointer */
        <svg
          width="18" height="21" viewBox="0 0 24 28"
          style={{
            position: "absolute",
            left: pos.x, top: pos.y,
            transform: `scale(${clicking ? 0.85 : 1})`,
            transition: "transform 0.1s ease",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
          }}
        >
          <path
            d="M2 1L2 21L7.5 15.5L12.5 25L15.5 23.5L10.5 14L18 13L2 1Z"
            fill={C.gold}
            stroke={C.goldDim}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

// ====== STICKY NAV ======
function StickyNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 32;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <div style={{
      position: "fixed", top: 4, left: 0, right: 0, zIndex: 999,
      transform: show ? "translateY(0)" : "translateY(-100%)",
      opacity: show ? 1 : 0,
      transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease",
      pointerEvents: show ? "auto" : "none",
    }}>
      <div style={{
        maxWidth: 600, margin: "0 auto",
        background: "rgba(28, 36, 24, 0.85)", backdropFilter: "blur(16px)",
        borderRadius: 12, border: `1px solid ${C.border}`,
        padding: "10px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}>
        <span style={{ fontFamily: "'Caprasimo', serif", fontSize: 16, color: C.gold }}>Toby.</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["about", "projects", "skills", "blog"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1,
              color: C.creamFaint, padding: "4px 0", transition: "color 0.2s",
              textTransform: "capitalize",
            }} onMouseEnter={e => e.target.style.color = C.gold}
               onMouseLeave={e => e.target.style.color = C.creamFaint}>
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== SPLASH SCREEN ======
function SplashScreen({ onComplete }) {
  const PHRASE = "Let's build something.";
  const [showLetters, setShowLetters] = useState(false);
  const [dotsVisible, setDotsVisible] = useState([false, false, false]);
  const [lineExpanded, setLineExpanded] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [textFading, setTextFading] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const timers = [];
    const t = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); };
    t(() => setDotsVisible([true, false, false]), 400);
    t(() => setDotsVisible([true, true, false]), 700);
    t(() => setDotsVisible([true, true, true]), 1000);
    t(() => setShowLetters(true), 1400);
    t(() => setLineExpanded(true), 2700);
    t(() => setSubVisible(true), 3100);
    t(() => setTextFading(true), 5300);
    t(() => setCurtainOpen(true), 5600);
    t(() => { setGone(true); onComplete(); }, 6700);
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (gone) return null;
  const STAGGER = 0.04;
  const DURATION = 0.5;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: curtainOpen ? "none" : "auto" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50.5%", background: C.bg, zIndex: 2, transform: curtainOpen ? "translateY(-100%)" : "translateY(0)", transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50.5%", background: C.bg, zIndex: 2, transform: curtainOpen ? "translateY(100%)" : "translateY(0)", transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: textFading ? 0 : 1, transform: textFading ? "translateY(-50px)" : "translateY(0)", transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 14, marginBottom: 36 }}>
          {dotsVisible.map((vis, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, opacity: vis ? 0.7 : 0, transform: vis ? "scale(1) translateY(0)" : "scale(0.3) translateY(6px)", transition: "opacity 0.5s ease, transform 0.5s ease" }} />
          ))}
        </div>
        <h2 style={{ fontFamily: "'Caprasimo', serif", fontSize: "clamp(32px, 8vw, 76px)", color: C.gold, lineHeight: 1.15, textAlign: "center", letterSpacing: -1 }}>
          {(() => {
            const words = PHRASE.split(" ");
            let charOffset = 0;
            return words.map((word, wi) => {
              const wordChars = word.split("").map((char, ci) => {
                const i = charOffset + ci;
                return (<span key={i} style={{ display: "inline-block", opacity: showLetters ? 1 : 0, transform: showLetters ? "translateY(0)" : "translateY(24px)", transition: `opacity ${DURATION}s cubic-bezier(0.23, 1, 0.32, 1) ${i * STAGGER}s, transform ${DURATION}s cubic-bezier(0.23, 1, 0.32, 1) ${i * STAGGER}s` }}>{char}</span>);
              });
              charOffset += word.length + 1;
              return (<span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>{wordChars}{wi < words.length - 1 && <span style={{ display: "inline-block", width: "0.3em" }}>{" "}</span>}</span>);
            });
          })()}
        </h2>
        <div style={{ height: 2, background: C.gold, borderRadius: 1, marginTop: 28, width: lineExpanded ? "min(320px, 55vw)" : "0px", opacity: lineExpanded ? 0.8 : 0, transition: "width 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease" }} />
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.creamFaint, marginTop: 18, letterSpacing: 2, textTransform: "uppercase", opacity: subVisible ? 0.5 : 0, transform: subVisible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>toby · developer & product manager</p>
      </div>
    </div>
  );
}

// ====== HOOKS ======
function useReveal(th = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return [ref, v];
}

function useTilt(int = 6) {
  const ref = useRef(null);
  const [s, setS] = useState({});
  const move = useCallback((e) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; setS({ transform: `perspective(600px) rotateY(${x * int}deg) rotateX(${-y * int}deg) scale(1.012)`, transition: "transform 0.1s ease" }); }, [int]);
  const leave = useCallback(() => { setS({ transform: "perspective(600px) rotateY(0) rotateX(0) scale(1)", transition: "transform 0.5s ease" }); }, []);
  return [ref, s, move, leave];
}

function useTyping(text, speed = 48, delay = 900) {
  const [d, setD] = useState("");
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => { if (!go || d.length >= text.length) return; const t = setTimeout(() => setD(text.slice(0, d.length + 1)), speed); return () => clearTimeout(t); }, [go, d, text, speed]);
  return d;
}

// ====== SMALL COMPONENTS ======
function FloatingShapes() {
  const shapes = useRef(Array.from({ length: 6 }, (_, i) => ({ id: i, size: 160 + Math.random() * 240, x: Math.random() * 100, y: 5 + Math.random() * 85, dur: 24 + Math.random() * 18, del: Math.random() * -20, grad: PASTEL_GRADIENTS[i % PASTEL_GRADIENTS.length] }))).current;
  return (<div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>{shapes.map(s => (<div key={s.id} style={{ position: "absolute", width: s.size, height: s.size, left: `${s.x}%`, top: `${s.y}%`, background: s.grad, borderRadius: "50%", opacity: 0.04, filter: "blur(80px)", animation: `floatBlob ${s.dur}s ease-in-out ${s.del}s infinite alternate` }} />))}<style>{`@keyframes floatBlob { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px,-50px) scale(1.15); } }`}</style></div>);
}

function Section({ children, delay = 0, id }) {
  const [ref, v] = useReveal(0.08);
  return (<section ref={ref} id={id} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}s` }}>{children}</section>);
}

function GradientCard({ gradient, children, style: extra, onMouseMove, onMouseLeave, tiltStyle }) {
  return (<div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ background: C.card, borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.2)", transition: "box-shadow 0.35s, transform 0.35s, border-color 0.35s", ...tiltStyle, ...extra }}><div style={{ height: 4, background: gradient }} /><div style={{ padding: "clamp(16px, 3vw, 24px) clamp(16px, 3.5vw, 28px)" }}>{children}</div></div>);
}

// ====== PROJECT CARD with CTA ======
function ProjectCard({ project, revealDelay }) {
  const [tR, tS, onM, onL] = useTilt(5);
  const [h, setH] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [ref, vis] = useReveal(0.1);
  const showImg = project.img && !imgError;

  return (<div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${revealDelay}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${revealDelay}s` }}>
    <div ref={tR} onMouseMove={onM} onMouseLeave={(e) => { onL(e); setH(false); }} onMouseEnter={() => setH(true)} style={{ willChange: "transform" }}>
      <div style={{
        background: C.card, borderRadius: 14, overflow: "hidden",
        border: `1px solid ${h ? C.borderLight : C.border}`,
        boxShadow: h ? "0 12px 48px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.35s, transform 0.35s, border-color 0.35s", ...tS,
      }}>
        <div style={{ height: 4, background: PASTEL_GRADIENTS[project.gradient] }} />
        <div style={{ height: 140, position: "relative", overflow: "hidden", background: showImg ? "transparent" : `linear-gradient(135deg, ${C.bgLight}, ${C.card})` }}>
          {showImg ? (
            <img src={project.img} alt={project.title} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45, filter: "saturate(0.6) brightness(0.7)", transition: "opacity 0.4s, filter 0.4s", ...(h ? { opacity: 0.65, filter: "saturate(0.8) brightness(0.8)" } : {}) }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, rgba(0,0,0,0.15), transparent), ${PASTEL_GRADIENTS[project.gradient]}`, opacity: 0.12, transition: "opacity 0.4s", ...(h ? { opacity: 0.18 } : {}) }}>
              <span style={{ fontFamily: "'Caprasimo', serif", fontSize: 72, color: "#fff", opacity: 0.5 }}>{project.placeholder}</span>
            </div>
          )}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: `linear-gradient(transparent, ${C.card})` }} />
        </div>
        <div style={{ padding: "16px clamp(16px, 3.5vw, 28px) clamp(16px, 3vw, 24px)" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.creamFaint, marginBottom: 6 }}>{project.type}</div>
          <h3 style={{ fontFamily: "'Caprasimo', serif", fontSize: 24, color: C.cream, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 10, lineHeight: 1.2 }}>
            {project.title}
            {project.isNew && <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", padding: "3px 10px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, color: C.bg, borderRadius: 5, animation: "pulse 2.5s ease infinite", letterSpacing: 1, fontWeight: 500 }}>NEW</span>}
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: C.creamDim, fontFamily: "'Source Serif 4', Georgia, serif" }}>{project.desc}</p>
          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map(t => (<span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, padding: "3px 10px", background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`, borderRadius: 5, color: C.creamFaint }}>{t}</span>))}
          </div>
          {/* CTA */}
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 18,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.gold,
            textDecoration: "none", padding: "8px 16px", borderRadius: 8,
            border: `1px solid ${C.goldDim}44`, background: C.goldFaint,
            transition: "all 0.25s",
          }} onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = C.bg; e.currentTarget.style.borderColor = C.gold; }}
             onMouseLeave={e => { e.currentTarget.style.background = C.goldFaint; e.currentTarget.style.color = C.gold; e.currentTarget.style.borderColor = `${C.goldDim}44`; }}>
            View project <span style={{ fontSize: 14, transition: "transform 0.2s", display: "inline-block" }}>→</span>
          </a>
        </div>
      </div>
    </div>
  </div>);
}

// ====== BLOG ROW with link ======
function BlogRow({ post }) {
  const [h, setH] = useState(false);
  return (<a href={post.link} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} className="br" style={{ display: "grid", gridTemplateColumns: "110px 1fr auto", gap: 20, alignItems: "baseline", padding: "18px 12px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", borderRadius: 8, transition: "background 0.2s", background: h ? C.goldFaint : "transparent", textDecoration: "none" }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.creamFaint }}>{post.date}</span>
    <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 17, color: h ? C.gold : C.cream, transition: "color 0.2s" }}>{post.title}</span>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.creamFaint, display: "flex", alignItems: "center", gap: 6 }}>{post.cat}<span style={{ opacity: h ? 1 : 0, transition: "opacity 0.2s", color: C.gold }}>→</span></span>
  </a>);
}

function NavLink({ href, children }) {
  const [h, setH] = useState(false);
  const handleClick = useCallback((e) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 32;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [href]);
  return (<a href={href} onClick={handleClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1, textDecoration: "none", color: h ? C.gold : C.creamFaint, padding: "8px 0", position: "relative", transition: "color 0.25s", cursor: "pointer" }}>
    {children}
    <span style={{ position: "absolute", bottom: 2, left: 0, right: 0, height: 2.5, borderRadius: 2, background: C.gold, transform: h ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.3s ease", transformOrigin: "left" }} />
  </a>);
}

function SectionLabel({ number, text }) {
  return (<div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 14px)", marginBottom: 22 }}>
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.creamFaint, whiteSpace: "nowrap" }}>{number} —</span>
    <span style={{ fontFamily: "'Caprasimo', serif", fontSize: "clamp(22px, 5vw, 30px)", color: C.gold, lineHeight: 1 }}>{text}</span>
    <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.goldDim}44, transparent)`, minWidth: 20 }} />
  </div>);
}

// ====== MAIN APP ======
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const typedText = useTyping("building things people actually want to use", 42, splashDone ? 800 : 99999);

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Caprasimo&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }
      a, button, input, select, textarea, [role="button"] { cursor: none !important; }
      html { scroll-behavior: smooth; }
      body { background: ${C.bg}; color: ${C.cream}; overflow-x: hidden; }
      ::selection { background: ${C.gold}; color: ${C.bg}; }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      @keyframes heroFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
      @media (max-width: 640px) {
        .pg { grid-template-columns: 1fr !important; }
        .sg { grid-template-columns: 1fr 1fr !important; }
        .br { grid-template-columns: 1fr !important; gap: 4px !important; }
        .fg { grid-template-columns: 1fr !important; }
        .aboutGrid { grid-template-columns: 1fr !important; }
        .aboutGrid > div:first-child { justify-self: center; }
        * { cursor: auto !important; }
      }
      @media (max-width: 400px) {
        .sg { grid-template-columns: 1fr !important; }
      }
    `}</style>

    <SplashScreen onComplete={() => setSplashDone(true)} />
    <GoldCursor />
    <StickyNav />
    <FloatingShapes />

    <div style={{ height: 4, background: FULL_RAINBOW, backgroundSize: "300% 100%", animation: "gradientShift 8s ease infinite", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }} />

    <div style={{ background: `rgba(28,36,24,0.9)`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap", marginTop: 4, position: "relative", zIndex: 10 }}>
      <div style={{ display: "inline-block", animation: "marqueeScroll 35s linear infinite", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.creamFaint, letterSpacing: 1, opacity: 0.5 }}>
        {"✦ Welcome to Toby's homepage ✦ Developer & Product Manager ✦ Best viewed on any screen ✦ Last updated March 2026 ✦ Hand-crafted with care ✦ ".repeat(2)}
      </div>
    </div>

    <div style={{ position: "relative", zIndex: 1 }}>
      <header style={{ textAlign: "center", padding: "clamp(56px, 10vw, 96px) 24px clamp(32px, 6vw, 56px)", maxWidth: 820, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 28 }}>
          {[0, 1, 2].map(i => (<div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, opacity: 0.4 }} />))}
        </div>
        <h1 style={{ fontFamily: "'Caprasimo', serif", fontSize: "clamp(56px, 11vw, 108px)", lineHeight: 0.95, color: C.gold, letterSpacing: -1, animation: "heroFloat 4s ease-in-out infinite alternate", position: "relative", display: "inline-block" }}>
          <svg viewBox="0 0 40 40" style={{ position: "absolute", top: 0, left: -40, width: 36, height: 36, pointerEvents: "none" }}>
            <line x1="28" y1="6" x2="20" y2="2" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
            <line x1="24" y1="16" x2="14" y2="14" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
            <line x1="22" y1="26" x2="14" y2="28" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
          </svg>
          Hey, I'm<br />
          <span style={{ position: "relative", display: "inline-block" }}>
            Toby.
            <svg viewBox="0 0 40 44" style={{ position: "absolute", bottom: -10, right: -40, width: 36, height: 38, pointerEvents: "none", transform: "rotate(50deg)" }}>
              <line x1="8" y1="6" x2="16" y2="2" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
              <line x1="12" y1="16" x2="22" y2="14" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
              <line x1="14" y1="26" x2="22" y2="28" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
            </svg>
          </span>
        </h1>
        <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: "italic", fontSize: 18, color: C.creamDim, marginTop: 20, lineHeight: 1.5 }}>Developer & Product Manager. Builder of things.</p>
        <div style={{ maxWidth: 380, margin: "36px auto 0", height: 1, background: `linear-gradient(90deg, transparent, ${C.goldDim}55, transparent)` }} />
        <nav style={{ display: "flex", justifyContent: "center", gap: "clamp(16px, 4vw, 36px)", marginTop: 28, flexWrap: "wrap" }}>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#blog">Writing</NavLink>
        </nav>
      </header>

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px) 80px", display: "flex", flexDirection: "column", gap: "clamp(40px, 8vw, 68px)" }}>

        <Section id="about" delay={0}>
          <SectionLabel number="01" text="About" />
          <GradientCard gradient={FULL_RAINBOW}>
            <div className="aboutGrid" style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, alignItems: "start" }}>
              <div style={{ position: "relative", width: 140, height: 140 }}>
                <img src="/profile.jpg" alt="Toby" style={{ width: 140, height: 140, borderRadius: 14, objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.95) contrast(1.05)", border: `2px solid ${C.border}` }} />
              </div>
              <div style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 15.5, lineHeight: 1.85, color: C.creamDim }}>
                <p><strong style={{ color: C.cream, fontWeight: 600 }}>Hey — I'm Toby.</strong> I build products and write code, working across the full stack from early-stage product strategy through to shipping real software people want to use.</p>
                <p style={{ marginTop: 12 }}>Right now I'm focused on AI-powered tools, voice interfaces, and acquisition advisory platforms. Previously built things with React, Bubble.io, Supabase, and more unusual stacks than I can count.</p>
                <p style={{ marginTop: 12 }}>When I'm not shipping features, you'll find me restoring vintage hardware and putting modern guts inside old machines. Retro tech with a modern soul.</p>
                <div style={{ marginTop: 22, background: "#111", borderRadius: 10, padding: "16px 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(11px, 2.5vw, 13px)", color: C.green, position: "relative", overflow: "hidden", wordBreak: "break-word" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.gold}, ${C.goldDim})`, borderRadius: "10px 10px 0 0" }} />
                  <span style={{ color: "#555" }}>toby@home:~$</span> echo "{typedText}"
                  <span style={{ display: "inline-block", width: 9, height: 16, background: C.gold, marginLeft: 2, verticalAlign: "text-bottom", animation: "cursorBlink 1s step-end infinite", borderRadius: 1 }} />
                </div>
              </div>
            </div>
          </GradientCard>
        </Section>

        <Section id="projects" delay={0.05}>
          <SectionLabel number="02" text="Projects" />
          <div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} revealDelay={i * 0.1} />)}
          </div>
        </Section>

        <Section id="skills" delay={0.05}>
          <SectionLabel number="03" text="Tech Stack" />
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {SKILLS.map((s, i) => (
              <GradientCard key={i} gradient={PASTEL_GRADIENTS[s.gradient]}>
                <h4 style={{ fontFamily: "'Caprasimo', serif", fontSize: 17, color: C.cream, marginBottom: 12 }}>{s.title}</h4>
                <ul style={{ listStyle: "none" }}>
                  {s.items.map(item => (<li key={item} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, padding: "3.5px 0", color: C.creamDim, paddingLeft: 16, position: "relative" }}><span style={{ position: "absolute", left: 0, color: C.gold }}>›</span>{item}</li>))}
                </ul>
              </GradientCard>
            ))}
          </div>
        </Section>

        <Section id="blog" delay={0.05}>
          <SectionLabel number="04" text="Writing" />
          <div>{POSTS.map((p, i) => <BlogRow key={i} post={p} />)}</div>
        </Section>

        <Section delay={0.05}>
          <SectionLabel number="05" text="Find me" />
          <GradientCard gradient={FULL_RAINBOW}>
            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 48px)", flexWrap: "wrap", padding: "8px 0" }}>
              {[
                { label: "GitHub", href: "https://github.com/toby", icon: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>) },
                { label: "LinkedIn", href: "https://linkedin.com/in/toby", icon: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>) },
                { label: "X", href: "https://x.com/toby", icon: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L9 4H4z" /></svg>) },
                { label: "Email", href: "mailto:hello@toby.dev", icon: (<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>) },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textDecoration: "none", color: C.creamFaint, transition: "color 0.25s, transform 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = C.gold; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = C.creamFaint; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {icon}
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1 }}>{label}</span>
                </a>
              ))}
            </div>
          </GradientCard>
        </Section>

      </main>

      {/* Footer — retro charm, less jokey */}
      <footer style={{ textAlign: "center", padding: "48px 24px 52px", borderTop: `1px solid ${C.border}`, marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          {[0, 1, 2].map(i => (<div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.25 }} />))}
        </div>
        <p style={{ fontFamily: "'Caprasimo', serif", fontSize: 16, color: C.creamFaint, opacity: 0.4, marginBottom: 12 }}>Made with care & caffeine.</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.creamFaint, opacity: 0.35, lineHeight: 2 }}>
          © 2026 Toby · Hand-crafted in Dorset
        </p>
      </footer>
    </div>
  </>);
}
