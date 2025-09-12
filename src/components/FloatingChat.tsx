import { useEffect, useRef, useState } from "react";
import { useChatStream } from "../hooks/useChatStream";
import type { Msg } from "../hooks/useChatStream";
import MarkdownMessage from "./MarkdownMessage";

// narrow out "system"
function isChatMessage(m: Msg): m is Msg & { role: "user" | "assistant" } {
  return m.role !== "system";
}

/* Inline icons */
function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 8h10M7 12h6M5 20l3.5-3H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2v3Z"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  const { messages, input, setInput, isStreaming, error, send, stop } =
    useChatStream({
      systemPrompt:
        "You are a helpful assistant for Casimir Lundberg's portfolio site.",
      offlineMessage:
        "I am still being constructed. Please try again later.",
    });

  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => textareaRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming, open]);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    send();
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  // ✅ tiny anti-double-post fix: stopPropagation so form onSubmit doesn't also fire
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onSubmit();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={[
          "fixed bottom-4 right-4 z-[9999]",
          "rounded-full shadow-lg ring-1 ring-black/10",
          "bg-primary text-secondary",
          "hover:scale-105 active:scale-95 transition-transform",
          "w-14 h-14 flex items-center justify-center",
        ].join(" ")}
      >
        {open ? <CloseIcon className="w-6 h-6" /> : <ChatIcon className="w-7 h-7" />}
      </button>

      {/* Chat panel */}
      <div
        className={[
          "fixed right-4 z-[9999]",
          "bottom-20 sm:bottom-24",
          "w-[min(420px,95vw)] h-[min(70vh,640px)]",
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm",
          "border border-slate-200/70 dark:border-slate-700/60 shadow-2xl rounded-2xl",
          "transition-all duration-300",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none",
        ].join(" ")}
        role="dialog"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center justify-between text-primary px-3 py-2 border-b border-slate-200/70 dark:border-slate-700/60">
          <div className="font-semibold">AI Assistant</div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close chat"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="px-3 py-3 overflow-auto h-[calc(100%-3rem-3.25rem)]"
        >
          {messages.filter(isChatMessage).map((m, i) => (
            <MessageBubble key={i} role={m.role} text={m.content} />
          ))}

          {isStreaming && (
            <div className="mt-2 flex gap-2 items-center text-slate-400 text-sm">
              <span className="animate-pulse">Assistant is typing…</span>
              <span className="w-1 h-1 rounded-full animate-bounce bg-slate-400" />
            </div>
          )}

          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}
        </div>

        {/* Input (fixed height; textarea scrolls internally) */}
        <form
          onSubmit={onSubmit}
          className="h-[3.25rem] px-3 border-t border-slate-200/70 dark:border-slate-700/60 flex items-center gap-2"
        >
          <textarea
            ref={textareaRef}
            aria-label="Type your message"
            rows={1}
            className="h-9 max-h-full flex-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-1 leading-6
                       focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600
                       bg-white/80 dark:bg-slate-900/80
                       resize-none overflow-y-auto whitespace-pre-wrap"
            placeholder="Ask about Casi and his work…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
              onMouseDown={(e) => e.preventDefault()} // keep textarea focus
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-xl px-4 py-2 bg-primary text-white hover:bg-slate-7000 dark:text-slate-900 dark:hover:bg-slate-300 disabled:opacity-50"
              disabled={!input.trim()}
              onMouseDown={(e) => e.preventDefault()} // keep textarea focus
            >
              Send
            </button>
          )}
        </form>
      </div>
    </>
  );
}

function MessageBubble({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm leading-snug",
          isUser
            ? "bg-primary text-white dark:bg-slate-100 dark:text-slate-900"
            : "bg-secondary/90 text-slate-900 dark:bg-slate-800/90 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60",
        ].join(" ")}
      >
        <MarkdownMessage content={text} />
      </div>
    </div>
  );
}