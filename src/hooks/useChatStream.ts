import { useCallback, useState, useRef } from "react";

export type Role = "system" | "user" | "assistant";
export interface Msg { role: Role; content: string; }

export interface UseChatOpts {
  apiBase?: string;
  systemPrompt?: string;
  offlineMessage?: string; // fixed reply if backend is unreachable
}

const OFFLINE_DEFAULT =
  "The chat service isn’t reachable right now. I’m live on the site, but the backend will be enabled soon. Please try again later.";

export function useChatStream(opts: UseChatOpts = {}) {
  const apiBase =
    opts.apiBase || 
    import.meta.env.VITE_API_BASE || 
    import.meta.env.VITE_AI_API_URL || 
    "http://localhost:8000";

  const [messages, setMessages] = useState<Msg[]>(
    opts.systemPrompt ? [{ role: "system", content: opts.systemPrompt }] : []
  );
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const appendMessage = useCallback((m: Msg) => {
    setMessages(prev => [...prev, m]);
  }, []);

  // Append delta to the last assistant message; if none, create one
  const pushAssistantDelta = useCallback((delta: string) => {
    setMessages(prev => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (!last || last.role !== "assistant") {
        next.push({ role: "assistant", content: delta });
      } else {
        last.content += delta;
      }
      return next;
    });
  }, []);

  const replaceAssistantWith = useCallback((text: string) => {
    setMessages(prev => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === "assistant" && last.content === "") {
        next[next.length - 1] = { role: "assistant", content: text };
      } else {
        next.push({ role: "assistant", content: text });
      }
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const send = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isStreaming) return;

      setError(null);
      setInput(""); // clear UI immediately

      // optimistic append: user + assistant placeholder
      appendMessage({ role: "user", content });
      appendMessage({ role: "assistant", content: "" });

      // Build payload the backend expects
      const payload = {
        message: content,
        history: messages.map(m => ({ role: m.role, content: m.content })),
      };

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setIsStreaming(true);

      // Helper: SSE stream read loop
      const readSSE = async (res: Response) => {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          for (const f of chunk.split("\n\n")) {
            const line = f.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data) continue;

            if (data === "[DONE]") {
              stop();
              return true; // streamed successfully
            }
            if (data.startsWith("[ERROR]")) {
              setError(data.slice(7).trim());
              replaceAssistantWith(opts.offlineMessage ?? OFFLINE_DEFAULT);
              stop();
              return true; // handled as error
            }

            // normal token delta
            pushAssistantDelta(data);
          }
        }
        return true;
      };

      try {
        // 1) Try streaming endpoint first (if your backend provides it)
        let res = await fetch(`${apiBase}/chat/stream`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });

        const ct = res.headers.get("content-type") || "";
        const isEventStream = res.ok && res.body && ct.includes("text/event-stream");

        if (isEventStream) {
          await readSSE(res);
          return;
        }

        // 2) Fallback to non-streaming JSON endpoint
        res = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const reply = String(data?.reply ?? "");
        replaceAssistantWith(reply);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError("offline");
          replaceAssistantWith(opts.offlineMessage ?? OFFLINE_DEFAULT);
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [
      apiBase,
      appendMessage,
      input,
      isStreaming,
      messages,
      opts.offlineMessage,
      pushAssistantDelta,
      replaceAssistantWith,
      stop,
    ]
  );

  return {
    messages,
    input, setInput,
    isStreaming,
    error,
    send, stop,
  };
}
