import { Link } from "react-router-dom";

export default function BlogRow({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group blog-row grid gap-5 items-baseline py-[18px] px-3 border-b border-border-subtle rounded-lg transition-colors duration-200 no-underline hover:bg-gold-faint"
    >
      <span className="font-mono text-xs text-cream-faint">{formattedDate}</span>
      <span className="font-body text-[17px] text-cream transition-colors duration-200 group-hover:text-gold">
        {post.title}
      </span>
      <span className="font-mono text-[10px] tracking-[2px] uppercase text-cream-faint flex items-center gap-1.5">
        {post.category}
        <span className="opacity-0 transition-opacity duration-200 text-gold group-hover:opacity-100">→</span>
      </span>
    </Link>
  );
}
