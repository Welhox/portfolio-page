// Lightweight streaming chat hook for POST SSE (FastAPI /chat)
// Works with your demo mode and real OpenAI later.

import { useCallback, useMemo, useRef, useState } from "react";

export type Role = "system" | "user" | "assistant";
export interface Msg {
  role: Role;
  content: string;
}

export interface UseChatOpts {
  apiBase?: string; // defaults to VITE_AI_API_URL or http://localhost:8000
  model?: string;   // default gpt-4o-mini (server has default too)
  temperature?: number;
  systemPrompt?: string;
}

export function useChatStream(opts: UseChatOpts = {}) {
  const apiBase =
    opts.apiBase ||
    import.meta.env.VITE_AI_API_URL ||
    "http://localhost:8000";

  const [messages, setMessages] = useState<Msg[]>(
    opts.systemPrompt ? [{ role: "system", content: opts.systemPrompt }] : []
  );
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // for aborting the in-flight request
  const abortRef = useRef<AbortController | null>(null);

  // Append helper
  const appendMessage = useCallback((m: Msg) => {
    setMessages((prev) => [...prev, m]);
  }, []);

  // Update the last assistant message content while streaming
  const pushAssistantDelta = useCallback((delta: string) => {
    setMessages((prev) => {
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

      // Add user message
      appendMessage({ role: "user", content });

      // Clear input
      setInput("");

      // Prepare payload
      const payload = {
        model: opts.model ?? "gpt-4o-mini",
        temperature: opts.temperature ?? 0.4,
        stream: true,
        messages: messages
          .concat({ role: "user", content } as Msg)
          .map((m) => ({ role: m.role, content: m.content })),
      };

      // Start assistant placeholder to stream into
      appendMessage({ role: "assistant", content: "" });

      // Fire request
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setIsStreaming(true);

      try {
        const res = await fetch(`${apiBase}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });

        if (!res.ok || !res.body) {
          const txt = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status}: ${txt}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          // Parse SSE frames; split on blank lines
          const frames = chunk.split("\n\n");
          for (const f of frames) {
            const line = f.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data) continue;
            if (data === "[DONE]") {
              stop();
              return;
            }
            if (data.startsWith("[ERROR]")) {
              setError(data.slice(7).trim());
              stop();
              return;
            }
            // normal text delta
            pushAssistantDelta(data);
          }
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err?.message || "Stream error");
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [apiBase, appendMessage, input, isStreaming, messages, opts.model, opts.temperature, pushAssistantDelta, stop]
  );

  return {
    messages,
    input,
    setInput,
    isStreaming,
    error,
    send,
    stop,
  };
}
