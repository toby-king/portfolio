import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import { useEffect, useCallback } from "react";
import Toolbar from "./Toolbar";

export default function Editor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { HTMLAttributes: { class: "editor-code-block" } },
      }),
      Image.configure({
        HTMLAttributes: { class: "editor-image" },
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "editor-link" },
      }),
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "editor-content",
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (files?.length) {
          event.preventDefault();
          for (const file of files) {
            if (file.type.startsWith("image/")) {
              uploadAndInsertImage(file, view);
            }
          }
          return true;
        }
        return false;
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) uploadAndInsertImage(file, view);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      onChange(markdown);
    },
  });

  // Sync external content changes (e.g. initial load)
  useEffect(() => {
    if (editor && content !== undefined) {
      const currentMarkdown = editor.storage.markdown.getMarkdown();
      if (content !== currentMarkdown) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <div className="border border-post-rule rounded-xl overflow-hidden bg-post-paper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

async function uploadAndInsertImage(file, view) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      const { state } = view;
      const node = state.schema.nodes.image.create({ src: data.url });
      const tr = state.tr.replaceSelectionWith(node);
      view.dispatch(tr);
    }
  } catch (err) {
    console.error("Image upload failed:", err);
  }
}
