/**
 * Reusable message bubble component for chat interfaces
 */


import { DONNA_CONFIG } from '../config/donna';
import MarkdownMessage from './MarkdownMessage';
import type { MessageBubbleProps } from '../types/chat';
import { isUserMessage, isAssistantMessage } from '../utils/chat';

export default function MessageBubble({ message, isStreaming = false }: MessageBubbleProps) {
  const isUser = isUserMessage(message);
  const isAssistant = isAssistantMessage(message);
  
  if (!isUser && !isAssistant) {
    return null; // Don't render system messages
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={[
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-blue-500 text-white rounded-br-md" 
            : "bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
        ].join(" ")}
      >
        {isAssistant && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{DONNA_CONFIG.name}</span>
            <span className="text-xs">{DONNA_CONFIG.emoji}</span>
          </div>
        )}
        
        <div className={isUser ? "text-white" : ""}>
          {isUser ? (
            <p className="m-0 leading-snug break-words">{message.content}</p>
          ) : (
            <MarkdownMessage content={message.content} />
          )}
        </div>
        
        {message.error && (
          <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <span>😿</span>
            <span>Message failed to send</span>
          </div>
        )}
        
        {isStreaming && isAssistant && !message.content && (
          <div className="flex items-center gap-1 text-gray-500">
            <span className="animate-pulse">{DONNA_CONFIG.messages.typingIndicator}</span>
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" />
              <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce delay-100" />
              <span className="w-1 h-1 rounded-full bg-gray-400 animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}