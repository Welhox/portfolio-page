/**
 * Shared chat interface component
 * Reduces duplication between FloatingChat and Chat components
 */

import { useEffect, useRef, forwardRef } from "react";
import { DONNA_CONFIG } from "../config/donna";
import { useDonnaChat } from "../hooks/useDonnaChat";
import MessageBubble from "./MessageBubble";
import { getVisibleMessages } from "../utils/chat";
import type { ChatHookOptions } from "../types/chat";

interface ChatInterfaceProps extends ChatHookOptions {
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

const ChatInterface = forwardRef<HTMLDivElement, ChatInterfaceProps>(({
  className = "",
  showHeader = false,
  headerTitle = DONNA_CONFIG.ui.headerTitle,
  placeholder = DONNA_CONFIG.ui.placeholderText,
  autoFocus = false,
  ...chatOptions
}, ref) => {
  const chat = useDonnaChat(chatOptions);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.isStreaming]);

  // Auto-focus input when requested
  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => textareaRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    chat.sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      chat.sendMessage();
    }
  };

  const visibleMessages = getVisibleMessages(chat.messages);

  return (
    <div ref={ref} className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between p-3 border-b border-slate-200/70 dark:border-slate-700/60">
          <div className="font-semibold text-primary">{headerTitle}</div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {visibleMessages.length === 0 && (
          <div className="text-center text-slate-500 py-8">
            <div className="text-2xl mb-2">{DONNA_CONFIG.emoji}</div>
            <p>{DONNA_CONFIG.messages.welcomeMessage}</p>
          </div>
        )}
        
        {visibleMessages.map((message, index) => {
          const isLastAssistant = 
            message.role === "assistant" && 
            index === visibleMessages.length - 1;
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              isStreaming={chat.isStreaming && isLastAssistant}
            />
          );
        })}
        
        {/* Error Display */}
        {chat.error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-red-700 dark:text-red-400 text-sm">
                {chat.error.message}
              </span>
              {chat.error.retryable && (
                <button
                  onClick={chat.retry}
                  disabled={chat.isStreaming}
                  className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 rounded text-red-700 dark:text-red-300 disabled:opacity-50"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200/70 dark:border-slate-700/60">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={chat.input}
            onChange={(e) => chat.setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={chat.isStreaming}
            className="flex-1 resize-none rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            rows={1}
            style={{ minHeight: "40px", maxHeight: "120px" }}
          />
          
          <button
            type="submit"
            disabled={!chat.input.trim() || chat.isStreaming}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            {chat.isStreaming ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>
        
        {chat.isStreaming && (
          <button
            type="button"
            onClick={chat.stop}
            className="mt-2 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Stop generating
          </button>
        )}
      </form>
    </div>
  );
});

ChatInterface.displayName = "ChatInterface";

export default ChatInterface;