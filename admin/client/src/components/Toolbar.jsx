import { useCallback } from "react";

const GROUPS = [
  {
    buttons: [
      { label: "B", command: "toggleBold", active: "bold", title: "Bold" },
      { label: "I", command: "toggleItalic", active: "italic", title: "Italic", italic: true },
      { label: "S", command: "toggleStrike", active: "strike", title: "Strikethrough", strike: true },
      { label: "<>", command: "toggleCode", active: "code", title: "Inline code", mono: true },
    ],
  },
  {
    buttons: [
      { label: "H1", command: "toggleHeading", args: { level: 1 }, active: "heading", activeArgs: { level: 1 }, title: "Heading 1" },
      { label: "H2", command: "toggleHeading", args: { level: 2 }, active: "heading", activeArgs: { level: 2 }, title: "Heading 2" },
      { label: "H3", command: "toggleHeading", args: { level: 3 }, active: "heading", activeArgs: { level: 3 }, title: "Heading 3" },
    ],
  },
  {
    buttons: [
      { label: "•", command: "toggleBulletList", active: "bulletList", title: "Bullet list" },
      { label: "1.", command: "toggleOrderedList", active: "orderedList", title: "Numbered list" },
      { label: "❝", command: "toggleBlockquote", active: "blockquote", title: "Blockquote" },
      { label: "—", command: "setHorizontalRule", title: "Horizontal rule" },
    ],
  },
  {
    buttons: [
      { label: "⇤", command: "setTextAlign", args: "left", active: "textAlign", activeArgs: "left", title: "Align left" },
      { label: "⇔", command: "setTextAlign", args: "center", active: "textAlign", activeArgs: "center", title: "Align center" },
      { label: "⇥", command: "setTextAlign", args: "right", active: "textAlign", activeArgs: "right", title: "Align right" },
    ],
  },
  {
    buttons: [
      { label: "🔗", action: "link", title: "Insert link" },
      { label: "🖼", action: "image", title: "Insert image" },
      { label: "{ }", command: "toggleCodeBlock", active: "codeBlock", title: "Code block", mono: true },
    ],
  },
];

export default function Toolbar({ editor }) {
  if (!editor) return null;

  const handleClick = useCallback(
    (btn) => {
      if (btn.action === "link") {
        const previousUrl = editor.getAttributes("link").href;
        const url = prompt("Link URL:", previousUrl || "https://");
        if (url === null) return;
        if (url === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
        return;
      }

      if (btn.action === "image") {
        const url = prompt("Image URL (or paste/drop an image into the editor):");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        return;
      }

      const chain = editor.chain().focus();
      if (btn.args !== undefined) {
        chain[btn.command](btn.args).run();
      } else {
        chain[btn.command]().run();
      }
    },
    [editor]
  );

  const isActive = (btn) => {
    if (!btn.active) return false;
    if (btn.activeArgs !== undefined) {
      return editor.isActive(btn.active, typeof btn.activeArgs === "object" ? btn.activeArgs : btn.activeArgs);
    }
    return editor.isActive(btn.active);
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-post-rule bg-[#f4f2ec]">
      {GROUPS.map((group, gi) => (
        <div key={gi} className="flex items-center gap-0.5">
          {gi > 0 && <div className="w-px h-5 bg-post-rule mx-1.5" />}
          {group.buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn)}
              title={btn.title}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                isActive(btn)
                  ? "bg-gold-faint text-gold-dim"
                  : "text-post-muted hover:text-post-ink hover:bg-black/5"
              } ${btn.mono ? "font-mono" : ""} ${btn.italic ? "italic" : ""} ${btn.strike ? "line-through" : ""}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
