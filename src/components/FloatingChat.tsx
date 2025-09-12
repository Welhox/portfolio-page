import { useEffect, useRef, useState } from "react";
import { useChatStream } from "../hooks/useChatStream";
import type { Msg } from "../hooks/useChatStream";

// Type guard: only render user/assistant bubbles
function isChatMessage(m: Msg): m is Msg & { role: "user" | "assistant" } {
  return m.role !== "system";
}

// Simple inline icons (no extra deps)
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

  const {
    messages,
    input,
    setInput,
    isStreaming,
    error,
    send,
    stop,
  } = useChatStream({
    systemPrompt:
      "You are a helpful assistant for Casimir Lundberg's portfolio site.",
  });

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when chat opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-scroll on new messages/stream
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming, open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fire-and-forget: don't await so we keep the UI responsive
    send();
    // keep caret in the field immediately
    requestAnimationFrame(() => inputRef.current?.focus());
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
          "fixed bottom-4 right-4 z-50",
          "rounded-full shadow-lg ring-1 ring-black/10",
          "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
          "hover:scale-105 active:scale-95 transition-transform",
          "w-14 h-14 flex items-center justify-center",
        ].join(" ")}
      >
        {open ? <CloseIcon className="w-6 h-6" /> : <ChatIcon className="w-7 h-7" />}
      </button>

      {/* Chat panel */}
      <div
        className={[
          "fixed right-4 z-50",
          // position above the button
          "bottom-20 sm:bottom-24",
          // responsive size
          "w-[min(420px,95vw)] h-[min(70vh,640px)]",
          // subtle transparency + blur (slightly opaque)
          "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm",
          // border & shadow
          "border border-slate-200/70 dark:border-slate-700/60 shadow-2xl rounded-2xl",
          // animation
          "transition-all duration-300",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none",
        ].join(" ")}
        role="dialog"
        aria-modal="false"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/70 dark:border-slate-700/60">
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
          // header ~3rem, footer ~3.25rem
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

        {/* Input */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 px-3 py-2 border-t border-slate-200/70 dark:border-slate-700/60"
        >
          <input
            ref={inputRef}
            aria-label="Type your message"
            className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 bg-white/80 dark:bg-slate-900/80"
            placeholder="Ask about projects, stack, experience…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // 👇 keep it enabled during streaming so focus doesn't drop
            // removed: disabled={isStreaming}
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-xl px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
              // Optional: keep input focus even on mouse click
              onMouseDown={(e) => e.preventDefault()}
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-xl px-4 py-2 bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 disabled:opacity-50"
              disabled={!input.trim()}
              // Optional: prevent button from stealing focus on click
              onMouseDown={(e) => e.preventDefault()}
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
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm",
          isUser
            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "bg-white/90 text-slate-900 dark:bg-slate-800/90 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}
