import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Editorial article body. Styling lives in `.post-article` (src/index.css),
// ported from the Claude Design editorial.html prototype. We only override the
// nodes that need behaviour the stylesheet can't provide.
const components = {
  // Unwrap paragraphs that contain only an image so we can emit a <figure>
  // as a direct child of .post-article (a <figure> inside <p> is invalid HTML).
  p: ({ node, children }) => {
    const onlyImage =
      node?.children?.length === 1 && node.children[0].tagName === "img";
    if (onlyImage) return <>{children}</>;
    return <p>{children}</p>;
  },
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <figure>
      <img src={src} alt={alt || ""} loading="lazy" />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  ),
};

export default function MarkdownRenderer({ content }) {
  return (
    <div className="post-article">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
