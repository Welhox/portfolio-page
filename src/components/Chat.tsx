import { useEffect, useRef } from "react";
import { useChatStream } from "../hooks/useChatStream";
import type { Msg } from "../hooks/useChatStream";

// Narrow "system" out so MessageBubble only sees user/assistant
function isChatMessage(m: Msg): m is Msg & { role: "user" | "assistant" } {
  return m.role !== "system";
}

export default function Chat() {
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

  // Auto-scroll on new messages/streaming
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send();
  };

  return (
    <div className="mx-auto max-w-2xl w-full p-4 sm:p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Chat with my AI Agent
        </h2>
        <p className="text-sm text-slate-500">
          Streaming replies; demo mode works even without API key.
        </p>
      </div>

      <div
        ref={listRef}
        className="h-[55vh] overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-white/70 dark:bg-slate-900/50 shadow-sm"
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
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
          {error}
        </div>
      )}

      {/* ---- The input/send form (restored) ---- */}
      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          aria-label="Type your message"
          className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 bg-white dark:bg-slate-900"
          placeholder="Ask me about my projects, stack, or experience…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isStreaming}
        />
        {isStreaming ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-xl px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-xl px-4 py-2 bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
            disabled={!input.trim()}
          >
            Send
          </button>
        )}
      </form>
    </div>
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
            : "bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}
