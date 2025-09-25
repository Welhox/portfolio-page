/**
 * Enhanced chat hook with better error handling, types, and architecture
 */

import { useCallback, useState, useRef, useEffect } from "react";
import { DONNA_CONFIG } from "../config/donna";
import type { ChatHookOptions, ChatHookResult, ChatRequest, ChatResponse, ChatMessage, ChatError } from "../types/chat";
import {
  createMessage,
  createChatError,
  getApiEndpoint,
  formatMessageForApi,
  updateLastAssistantMessage,
  getVisibleMessages
} from "../utils/chat";

export function useDonnaChat(options: ChatHookOptions = {}): ChatHookResult {
  const {
    apiBase = getApiEndpoint(),
    systemPrompt = DONNA_CONFIG.messages.systemPrompt,
    offlineMessage = DONNA_CONFIG.messages.offlineMessage,
    enableRetry = true,
    maxRetries = DONNA_CONFIG.api.retryAttempts
  } = options;

  // Initialize with system message if provided
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    systemPrompt ? [createMessage("system", systemPrompt)] : []
  );
  
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<string>("");

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages(systemPrompt ? [createMessage("system", systemPrompt)] : []);
    setInput("");
    clearError();
    setRetryCount(0);
  }, [systemPrompt]);

  const sendMessage = useCallback(async (messageText?: string) => {
    const content = (messageText ?? input).trim();
    if (!content || isStreaming) return;

    clearError();
    setInput("");
    lastUserMessageRef.current = content;

    // Add user message
    const userMessage = createMessage("user", content);
    setMessages(prev => [...prev, userMessage]);

    // Add empty assistant message for streaming
    const assistantMessage = createMessage("assistant", "");
    setMessages(prev => [...prev, assistantMessage]);

    // Prepare API request
    const visibleMessages = getVisibleMessages(messages);
    const payload: ChatRequest = {
      message: content,
      history: visibleMessages.map(formatMessageForApi)
    };

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsStreaming(true);
    setIsConnected(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      
      // Add API key if available
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      if (apiKey) {
        headers["X-API-Key"] = apiKey;
      }

      const response = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const reply = data.reply || "";
      setMessages(prev => updateLastAssistantMessage(prev, reply));
      setRetryCount(0); // Reset retry count on success
      
    } catch (err: any) {
      if (err?.name === "AbortError") {
        return; // User cancelled, don't show error
      }

      console.error("Chat error:", err);
      setIsConnected(false);

      let errorType: "network" | "api" | "timeout" | "unknown" = "unknown";
      let errorMessage: string = DONNA_CONFIG.messages.errorMessage;
      let retryable = enableRetry && retryCount < maxRetries;

      if (err.message?.includes("Failed to fetch") || err.message?.includes("NetworkError")) {
        errorType = "network";
        errorMessage = offlineMessage;
        retryable = true;
      } else if (err.message?.includes("timeout")) {
        errorType = "timeout";
        errorMessage = "Donna is taking longer than usual. Please try again! ⏰";
      } else if (err.message?.includes("HTTP")) {
        errorType = "api";
        errorMessage = "Donna encountered a server issue. Please try again! 🔧";
      }

      setError(createChatError(errorType, errorMessage, retryable));
      
      // Replace the empty assistant message with error message
      setMessages(prev => updateLastAssistantMessage(prev, errorMessage));
      
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [
    apiBase,
    input,
    isStreaming,
    messages,
    offlineMessage,
    enableRetry,
    retryCount,
    maxRetries,
    clearError
  ]);

  const retry = useCallback(async () => {
    if (!lastUserMessageRef.current || !enableRetry || retryCount >= maxRetries) {
      return;
    }
    
    setRetryCount(prev => prev + 1);
    await sendMessage(lastUserMessageRef.current);
  }, [sendMessage, enableRetry, retryCount, maxRetries]);

  return {
    // State
    messages,
    isStreaming,
    error,
    isConnected,
    
    // Input
    input,
    setInput,
    
    // Actions
    sendMessage,
    stop,
    retry,
    clearChat
  };
}