import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl text-gold mb-4">404</h1>
        <p className="font-body text-cream-dim mb-6">This post doesn't exist.</p>
        <Link to="/" className="font-mono text-sm text-gold hover:underline">← Back home</Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>{post.title} — Toby</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        {post.coverImg && <meta property="og:image" content={post.coverImg} />}
      </Helmet>

      <div className="max-w-[720px] mx-auto px-[clamp(16px,4vw,24px)] pt-[clamp(48px,8vw,80px)] pb-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-cream-faint hover:text-gold transition-colors duration-200 mb-10"
        >
          <span>←</span> Back home
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] tracking-[3px] uppercase text-cream-faint">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-cream-faint opacity-40" />
            <span className="font-mono text-xs text-cream-faint">
              {formattedDate}
            </span>
          </div>
          <h1 className="font-display text-[clamp(32px,6vw,48px)] text-gold leading-tight -tracking-wide">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="font-body text-lg text-cream-dim mt-4 leading-relaxed italic">
              {post.excerpt}
            </p>
          )}
          <div className="h-px bg-border-subtle mt-8" />
        </header>

        {/* Post content */}
        <article>
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border-subtle">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-gold hover:underline"
          >
            <span>←</span> All posts
          </Link>
        </div>
      </div>
    </>
  );
}
