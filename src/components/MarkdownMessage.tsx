import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // keep single \n as <br/>
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // swap to 'github-dark.css' if you prefer

const components: Components = {
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
      className="my-2 rounded-xl p-3 overflow-x-auto border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
    />
  ),
  code: (props) => {
    // react-markdown v8+ passes 'inline' status via props.node.inline
    const { className, children, node, ...rest } = props as any;
    const inline = node?.inline;
    if (inline) {
      return (
        <code
          {...rest}
          className={`rounded px-1 py-0.5 bg-slate-100 dark:bg-slate-800 ${className || ""}`}
        >
          {children}
        </code>
      );
    }
    return (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  },
  ul: (props) => <ul {...props} className="my-1 pl-5 space-y-1 list-disc" />,
  ol: (props) => <ol {...props} className="my-1 pl-5 space-y-1 list-decimal" />,
  li: (props) => <li {...props} className="m-0" />,
  // 🔑 tighter lines, no extra margins, and no pre-wrap (remark-breaks will insert <br/>)
  p: (props) => <p {...props} className="m-0 leading-snug break-words" />,
};

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export default function MarkdownMessage({ content, className = "" }: MarkdownMessageProps) {
  // Normalize CRLF to LF so we don't get accidental double spacing on <br/>
  const normalized = content.replace(/\r\n/g, "\n");

  // Handle empty content - let typing indicator handle empty states
  if (!normalized.trim()) {
    return <div className={className}></div>;
  }

  try {
    return (
      <div className={className}>
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
        >
          {normalized}
        </ReactMarkdown>
      </div>
    );
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return (
      <div className={`text-red-500 ${className}`}>
        <p>😿 Donna encountered an error while formatting this message.</p>
        <pre className="text-xs mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
          {normalized}
        </pre>
      </div>
    );
  }
}

