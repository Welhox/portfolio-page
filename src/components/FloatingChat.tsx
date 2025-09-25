import { useState } from "react";
import { DONNA_CONFIG } from "../config/donna";
import ChatInterface from "./ChatInterface";

/* Inline icons */
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

  return (
    <>
      {/* Floating toggle button */}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={[
          "fixed bottom-8 right-4 z-[9999]",
          "rounded-full shadow-lg ring-1 ring-black/10",
          "bg-primary text-secondary",
          "hover:scale-105 active:scale-95 transition-transform",
          "w-14 h-14 flex items-center justify-center",
        ].join(" ")}
      >
        {open ? <CloseIcon className="w-6 h-6" /> : <ChatIcon className="w-7 h-7" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className={[
            "fixed right-4 bottom-20 sm:bottom-24 z-[9999]",
            "w-[min(420px,95vw)] h-[min(70vh,640px)]",
            "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm",
            "border border-slate-200/70 dark:border-slate-700/60 shadow-2xl rounded-2xl",
            "transition-all duration-300",
            "opacity-100 translate-y-0 pointer-events-auto"
          ].join(" ")}
          role="dialog"
          aria-modal="false"
        >
          <div className="relative h-full">
            <ChatInterface
              showHeader={true}
              headerTitle={DONNA_CONFIG.ui.headerTitle}
              placeholder="Ask Donna about Casimir... 🐾"
              autoFocus={open}
              systemPrompt={DONNA_CONFIG.messages.systemPrompt}
              offlineMessage={DONNA_CONFIG.messages.offlineMessage}
              className="h-full"
            />
            
            {/* Close button overlay */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 z-10"
              aria-label="Close chat"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}