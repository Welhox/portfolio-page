/**
 * Chat utility functions
 */

import type { ChatMessage, ChatError, MessageRole } from '../types/chat';

let messageIdCounter = 0;

export function generateMessageId(): string {
  return `msg_${Date.now()}_${++messageIdCounter}`;
}

export function createMessage(
  role: MessageRole,
  content: string,
  error = false
): ChatMessage {
  return {
    id: generateMessageId(),
    role,
    content,
    timestamp: new Date(),
    error
  };
}

export function createChatError(
  type: ChatError['type'],
  message: string,
  retryable = true
): ChatError {
  return { type, message, retryable };
}

export function getApiEndpoint(): string {
  return (
    import.meta.env.VITE_API_BASE ||
    import.meta.env.VITE_AI_API_URL ||
    "http://localhost:8000"
  );
}

export function isUserMessage(message: ChatMessage): boolean {
  return message.role === "user";
}

export function isAssistantMessage(message: ChatMessage): boolean {
  return message.role === "assistant";
}

export function isSystemMessage(message: ChatMessage): boolean {
  return message.role === "system";
}

export function getVisibleMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter(msg => !isSystemMessage(msg));
}

export function formatMessageForApi(message: ChatMessage) {
  return {
    role: message.role,
    content: message.content
  };
}

export function getLastAssistantMessage(messages: ChatMessage[]): ChatMessage | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (isAssistantMessage(messages[i])) {
      return messages[i];
    }
  }
  return null;
}

export function updateLastAssistantMessage(
  messages: ChatMessage[],
  content: string
): ChatMessage[] {
  const lastAssistant = getLastAssistantMessage(messages);
  
  if (!lastAssistant) {
    return [...messages, createMessage("assistant", content)];
  }
  
  return messages.map(msg => 
    msg.id === lastAssistant.id 
      ? { ...msg, content }
      : msg
  );
}

export function appendToLastAssistantMessage(
  messages: ChatMessage[],
  delta: string
): ChatMessage[] {
  const lastAssistant = getLastAssistantMessage(messages);
  
  if (!lastAssistant) {
    return [...messages, createMessage("assistant", delta)];
  }
  
  return messages.map(msg => 
    msg.id === lastAssistant.id 
      ? { ...msg, content: msg.content + delta }
      : msg
  );
}