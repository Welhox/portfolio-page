/**
 * Type definitions for the chat system
 */

export type MessageRole = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  error?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: ChatError | null;
  isConnected: boolean;
}

export interface ChatError {
  type: "network" | "api" | "timeout" | "unknown";
  message: string;
  retryable: boolean;
}

export interface ChatHookOptions {
  apiBase?: string;
  systemPrompt?: string;
  offlineMessage?: string;
  enableRetry?: boolean;
  maxRetries?: number;
}

export interface ChatHookResult extends ChatState {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message?: string) => Promise<void>;
  stop: () => void;
  retry: () => void;
  clearChat: () => void;
}

// API Types
export interface ChatRequest {
  message: string;
  history: Array<{ role: MessageRole; content: string }>;
}

export interface ChatResponse {
  reply: string;
  error?: string;
}

// Component Props
export interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}