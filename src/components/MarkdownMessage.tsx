import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // simple, readable in light/dark

export default function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        a: (props) => (
          <a
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-slate-400 hover:decoration-slate-700"
          />
        ),
        pre: (props) => (
          <pre
            {...props}
            className="rounded-xl p-3 overflow-x-auto border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
          />
        ),
        code: ({ inline, className, children, ...props }) => {
          if (inline) {
            return (
              <code
                {...props}
                className={`rounded px-1 py-0.5 bg-slate-100 dark:bg-slate-800 ${className || ""}`}
              >
                {children}
              </code>
            );
          }
          return (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        ul: (props) => <ul {...props} className="list-disc pl-6 my-2" />,
        ol: (props) => <ol {...props} className="list-decimal pl-6 my-2" />,
        p: (props) => <p {...props} className="my-2" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
