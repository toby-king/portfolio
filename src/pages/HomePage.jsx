import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PASTEL_GRADIENTS, FULL_RAINBOW } from "../theme";
import { getAllProjects, getAllPosts } from "../lib/content";
import { SKILLS } from "../data";
import useTyping from "../hooks/useTyping";
import SplashScreen from "../components/SplashScreen";
import FloatingShapes from "../components/FloatingShapes";
import Section from "../components/Section";
import GradientCard from "../components/GradientCard";
import ProjectCard from "../components/ProjectCard";
import BlogRow from "../components/BlogRow";
import NavLink from "../components/NavLink";
import SectionLabel from "../components/SectionLabel";

const projects = getAllProjects();
const posts = getAllPosts();

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(false);
  const typedText = useTyping("building things people actually want to use", 42, splashDone ? 800 : 99999);

  return (
    <>
      <Helmet>
        <title>Toby — Developer & Product Manager</title>
        <meta name="description" content="Developer & Product Manager. Builder of things." />
      </Helmet>

      <SplashScreen onComplete={() => setSplashDone(true)} />
      <FloatingShapes />

      {/* Marquee ticker */}
      <div
        className="border-b border-border-subtle py-2 overflow-hidden whitespace-nowrap mt-1 relative z-10"
        style={{ background: "rgba(28,36,24,0.9)", backdropFilter: "blur(12px)" }}
      >
        <div className="inline-block animate-marquee font-mono text-[11px] text-cream-faint tracking-wider opacity-50">
          {"✦ Welcome to Toby's homepage ✦ Developer & Product Manager ✦ Best viewed on any screen ✦ Last updated March 2026 ✦ Hand-crafted with care ✦ ".repeat(2)}
        </div>
      </div>

      <div className="relative z-[1]">
        {/* Hero header */}
        <header className="text-center max-w-[820px] mx-auto px-6 pt-[clamp(56px,10vw,96px)] pb-[clamp(32px,6vw,56px)]">
          <div className="flex justify-center gap-3 mb-7">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gold opacity-40" />
            ))}
          </div>

          <h1 className="font-display text-[clamp(56px,11vw,108px)] leading-[0.95] text-gold -tracking-wide animate-hero-float relative inline-block">
            <svg viewBox="0 0 40 40" className="absolute top-0 -left-10 w-9 h-9 pointer-events-none">
              <line x1="28" y1="6" x2="20" y2="2" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
              <line x1="24" y1="16" x2="14" y2="14" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
              <line x1="22" y1="26" x2="14" y2="28" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
            </svg>
            Hey, I'm<br />
            <span className="relative inline-block">
              Toby.
              <svg viewBox="0 0 40 44" className="absolute -bottom-2.5 -right-10 w-9 h-[38px] pointer-events-none rotate-[50deg]">
                <line x1="8" y1="6" x2="16" y2="2" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                <line x1="12" y1="16" x2="22" y2="14" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
                <line x1="14" y1="26" x2="22" y2="28" stroke="white" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />
              </svg>
            </span>
          </h1>

          <p className="font-body italic text-lg text-cream-dim mt-5 leading-relaxed">
            Developer & Product Manager. Builder of things.
          </p>

          <div className="max-w-[380px] mx-auto mt-9 h-px center-divider" />

          <nav className="flex justify-center flex-wrap mt-7 gap-[clamp(16px,4vw,36px)]">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#blog">Writing</NavLink>
          </nav>
        </header>

        {/* Main content */}
        <main className="max-w-[820px] mx-auto px-[clamp(16px,4vw,24px)] pb-20 flex flex-col gap-[clamp(40px,8vw,68px)]">

          {/* About */}
          <Section id="about" delay={0}>
            <SectionLabel number="01" text="About" />
            <GradientCard gradient={FULL_RAINBOW}>
              <div className="about-grid grid gap-8 items-start" style={{ gridTemplateColumns: "140px 1fr" }}>
                <div className="relative w-[140px] h-[140px]">
                  <img
                    src="/profile.jpg"
                    alt="Toby"
                    className="w-[140px] h-[140px] rounded-[14px] object-cover border-2 border-border-subtle"
                    style={{ objectPosition: "center 20%", filter: "brightness(0.95) contrast(1.05)" }}
                  />
                </div>
                <div className="font-body text-[15.5px] leading-[1.85] text-cream-dim">
                  <p>
                    <strong className="text-cream font-semibold">Hey — I'm Toby.</strong> I build products and write code, working across the full stack from early-stage product strategy through to shipping real software people want to use.
                  </p>
                  <p className="mt-3">
                    Right now I'm focused on AI-powered tools, voice interfaces, and acquisition advisory platforms. Previously built things with React, Bubble.io, Supabase, and more unusual stacks than I can count.
                  </p>
                  <p className="mt-3">
                    When I'm not shipping features, you'll find me restoring vintage hardware and putting modern guts inside old machines. Retro tech with a modern soul.
                  </p>

                  <div className="terminal-block mt-[22px] rounded-[10px] px-5 py-4 font-mono text-[clamp(11px,2.5vw,13px)] text-terminal relative overflow-hidden break-words">
                    <div className="terminal-bar absolute top-0 left-0 right-0 h-[3px] rounded-t-[10px]" />
                    <span className="text-[#555]">toby@home:~$</span> echo "{typedText}"
                    <span className="inline-block w-[9px] h-4 bg-gold ml-0.5 align-text-bottom animate-cursor-blink rounded-sm" />
                  </div>
                </div>
              </div>
            </GradientCard>
          </Section>

          {/* Projects */}
          <Section id="projects" delay={0.05}>
            <SectionLabel number="02" text="Projects" />
            <div className="projects-grid grid grid-cols-2 gap-[18px]">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} revealDelay={index * 0.1} />
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section id="skills" delay={0.05}>
            <SectionLabel number="03" text="Tech Stack" />
            <div className="skills-grid grid grid-cols-4 gap-3.5">
              {SKILLS.map((skill, index) => (
                <GradientCard key={index} gradient={PASTEL_GRADIENTS[skill.gradient]}>
                  <h4 className="font-display text-[17px] text-cream mb-3">{skill.title}</h4>
                  <ul className="list-none">
                    {skill.items.map((item) => (
                      <li key={item} className="font-mono text-xs py-[3.5px] text-cream-dim pl-4 relative">
                        <span className="absolute left-0 text-gold">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </GradientCard>
              ))}
            </div>
          </Section>

          {/* Blog */}
          <Section id="blog" delay={0.05}>
            <SectionLabel number="04" text="Writing" />
            <div>
              {posts.map((post) => (
                <BlogRow key={post.slug} post={post} />
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section delay={0.05}>
            <SectionLabel number="05" text="Find me" />
            <GradientCard gradient={FULL_RAINBOW}>
              <div className="flex justify-center flex-wrap py-2 gap-[clamp(24px,6vw,48px)]">
                {[
                  { label: "GitHub", href: "https://github.com/tobykeegan", icon: <GithubIcon /> },
                  { label: "LinkedIn", href: "https://linkedin.com/in/tobykeegan", icon: <LinkedInIcon /> },
                  { label: "X", href: "https://x.com/tobykeegan", icon: <XIcon /> },
                  { label: "Email", href: "mailto:hello@toby.dev", icon: <EmailIcon /> },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 no-underline text-cream-faint transition-all duration-250 hover:text-gold hover:-translate-y-[3px]"
                  >
                    {icon}
                    <span className="font-mono text-[11px] tracking-wider">{label}</span>
                  </a>
                ))}
              </div>
            </GradientCard>
          </Section>
        </main>

        {/* Footer */}
        <footer className="text-center px-6 pt-12 pb-13 border-t border-border-subtle mt-5">
          <div className="flex justify-center gap-2.5 mb-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-[5px] h-[5px] rounded-full bg-gold opacity-25" />
            ))}
          </div>
          <p className="font-display text-base text-cream-faint opacity-40 mb-3">
            Made with care & caffeine.
          </p>
          <p className="font-mono text-[11px] text-cream-faint opacity-35 leading-loose">
            © 2026 Toby · Hand-crafted in Dorset
          </p>
        </footer>
      </div>
    </>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.3L9 4H4z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  );
}
