import { DONNA_CONFIG } from "../config/donna";
import ChatInterface from "./ChatInterface";

export default function Chat() {
  return (
    <div className="mx-auto max-w-2xl w-full p-4 sm:p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {DONNA_CONFIG.ui.chatTitle}
        </h2>
        <p className="text-sm text-slate-500">
          {DONNA_CONFIG.ui.description}
        </p>
      </div>

      <div className="h-[55vh] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 shadow-sm overflow-hidden">
        <ChatInterface
          systemPrompt={DONNA_CONFIG.messages.systemPrompt}
          offlineMessage={DONNA_CONFIG.messages.offlineMessage}
          placeholder={DONNA_CONFIG.ui.placeholderText}
          className="h-full"
        />
      </div>
    </div>
  );
}