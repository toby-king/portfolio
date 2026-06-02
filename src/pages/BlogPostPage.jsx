import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug, getAllPosts } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "blog", label: "Writing", here: true },
];

function readingTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Shared green brand bar — matches the editorial design's chrome.
function BrandBar() {
  return (
    <header className="sticky top-0 z-40 bg-base-bg border-b border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-[clamp(18px,5vw,40px)] py-3">
        <Link
          to="/"
          className="font-display text-gold text-[19px] -tracking-[0.01em] no-underline"
        >
          Toby King.
        </Link>
        <nav className="flex gap-[clamp(14px,3vw,28px)]">
          {NAV.map((n) => (
            <Link
              key={n.id}
              to={`/#${n.id}`}
              className={`font-mono text-[11px] tracking-[1.5px] uppercase no-underline transition-colors duration-200 ${
                n.here ? "text-gold" : "text-cream-dim hover:text-gold"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const progressRef = useRef(null);

  // Reading-progress bar.
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-post-paper flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-5xl text-post-ink mb-4">404</h1>
        <p className="font-body text-post-muted mb-6">This post doesn't exist.</p>
        <Link to="/" className="font-mono text-sm text-post-accent hover:underline">
          ← Back home
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null; // older
  const next = idx > 0 ? all[idx - 1] : null; // newer
  const minutes = post.readTime || readingTime(post.content);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => {
    if (navigator.clipboard && shareUrl) navigator.clipboard.writeText(shareUrl);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — Toby King</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        {post.coverImg && <meta property="og:image" content={post.coverImg} />}
      </Helmet>

      {/* Reading progress */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-post-accent origin-left"
        style={{ transform: "scaleX(0)", transition: "transform .08s linear" }}
      />

      {/* Light editorial reading surface */}
      <div className="min-h-screen bg-post-paper">
        <BrandBar />

        <main className="max-w-[720px] mx-auto px-[clamp(20px,5vw,24px)] pt-[clamp(40px,7vw,76px)] pb-24">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[.5px] text-post-muted hover:text-post-accent no-underline mb-[38px] transition-colors duration-200"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>{" "}
            All writing
          </Link>

          {/* Header */}
          <header>
            <div className="flex items-center gap-3 mb-[22px] font-mono text-[11px] tracking-[2.5px] uppercase text-post-muted">
              {post.category && <span className="text-post-accent">{post.category}</span>}
              {post.category && <span className="w-1 h-1 rounded-full bg-post-muted opacity-50" />}
              <span>{minutes} min read</span>
            </div>

            <h1 className="font-display font-normal text-[clamp(34px,6.2vw,56px)] leading-[1.04] -tracking-[0.015em] text-post-ink m-0 mb-[22px] text-balance">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="font-body italic text-[clamp(18px,2.6vw,21px)] leading-[1.5] text-post-muted m-0 max-w-[58ch]">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-[14px] mt-[30px] pt-[26px] border-t border-post-rule">
              <div
                className="w-10 h-10 rounded-full grid place-items-center font-display text-post-ink text-[18px] border border-post-edge"
                style={{ background: "linear-gradient(135deg, #B9FBC0, #A0C4FF)" }}
              >
                T
              </div>
              <div>
                <div className="font-body text-[15px] text-post-ink font-semibold leading-tight">
                  Toby King
                </div>
                <div className="font-mono text-[11px] text-post-muted tracking-[.5px] mt-[3px]">
                  {formattedDate} · Dorset
                </div>
              </div>
            </div>
          </header>

          {/* Optional cover image */}
          {post.coverImg && (
            <div className="mt-10">
              <img
                src={post.coverImg}
                alt=""
                className="w-full rounded-[14px] border border-post-rule object-cover"
                style={{ aspectRatio: "21 / 9" }}
              />
            </div>
          )}

          {/* Article */}
          <article className="mt-[44px]">
            <MarkdownRenderer content={post.content} />
          </article>

          {/* Footer */}
          <footer className="mt-[72px] pt-8 border-t border-post-rule">
            <div className="flex items-center gap-[14px] mb-[44px]">
              <span className="font-mono text-[11px] tracking-[1.5px] uppercase text-post-muted">
                Share
              </span>
              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="w-[38px] h-[38px] rounded-full border border-post-rule grid place-items-center text-post-ink no-underline transition-all duration-200 hover:border-post-accent hover:text-post-accent hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <button
                onClick={copyLink}
                aria-label="Copy link"
                className="w-[38px] h-[38px] rounded-full border border-post-rule grid place-items-center text-post-ink transition-all duration-200 hover:border-post-accent hover:text-post-accent hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>
            </div>

            {(prev || next) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prev ? (
                  <Link
                    to={`/blog/${prev.slug}`}
                    className="block no-underline px-[22px] py-5 border border-post-rule rounded-[14px] transition-all duration-200 hover:border-post-accent hover:-translate-y-0.5"
                  >
                    <div className="font-mono text-[10px] tracking-[2px] uppercase text-post-muted mb-2">
                      ← Previous
                    </div>
                    <div className="font-body text-[16px] text-post-ink leading-[1.3]">
                      {prev.title}
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    to={`/blog/${next.slug}`}
                    className="block no-underline px-[22px] py-5 border border-post-rule rounded-[14px] transition-all duration-200 hover:border-post-accent hover:-translate-y-0.5 text-right"
                  >
                    <div className="font-mono text-[10px] tracking-[2px] uppercase text-post-muted mb-2">
                      Next →
                    </div>
                    <div className="font-body text-[16px] text-post-ink leading-[1.3]">
                      {next.title}
                    </div>
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            )}
          </footer>
        </main>
      </div>
    </>
  );
}
