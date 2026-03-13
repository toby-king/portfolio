import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: ({ children }) => (
    <h1 className="font-display text-[clamp(28px,5vw,40px)] text-gold mt-10 mb-4 leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-display text-[clamp(22px,4vw,30px)] text-cream mt-8 mb-3 leading-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl text-cream mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="font-body text-base leading-[1.85] text-cream-dim mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gold underline decoration-gold-dim/40 hover:decoration-gold transition-colors duration-200">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside font-body text-cream-dim mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside font-body text-cream-dim mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-[1.75]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gold/40 pl-4 my-4 italic text-cream-faint font-body">{children}</blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`block bg-[#111] rounded-lg p-4 my-4 font-mono text-sm text-terminal overflow-x-auto ${className || ""}`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono text-gold" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-[#111] rounded-lg p-4 my-4 overflow-x-auto">{children}</pre>
  ),
  hr: () => (
    <hr className="my-8 border-0 h-px bg-border-subtle" />
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="rounded-xl max-w-full my-6" loading="lazy" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full font-mono text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left px-3 py-2 border-b border-border-subtle text-cream font-medium">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 border-b border-border-subtle text-cream-dim">{children}</td>
  ),
  em: ({ children }) => (
    <em className="italic text-cream-faint">{children}</em>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-cream">{children}</strong>
  ),
};

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
