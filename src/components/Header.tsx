import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";

export function Header() {
  const [open, setOpen] = useState(false);

  // Close the menu on route change or ESC (optional but nice)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="bg-primary px-6 py-4 text-primary">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-secondary font-artdeco tracking-wider">
          &lt;〈CASIMIR LUNDBERG〉&gt;
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 items-center">
          <Navigation />
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded p-2
                     hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus:ring
                     text-secondary"
        >
          {/* icon switches between hamburger and X */}
          <svg className={`h-6 w-6 ${open ? "hidden" : "block"}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg className={`h-6 w-6 ${open ? "block" : "hidden"}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
     <div
        id="mobile-menu"
        className={`md:hidden absolute right-3 mt-2 w-15 rounded-lg bg-primary shadow-lg
                    overflow-hidden transition-[max-height] duration-300
                    ${open ? "max-h-64" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-3 px-4 py-3">
          <Navigation mobile />
        </nav>
      </div>

    </header>
  );
}