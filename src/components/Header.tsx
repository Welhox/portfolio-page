import { useState, useEffect } from "react";
import { Navigation } from "./Navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Close the menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Handle show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShow(true); // always show at top
      } else if (currentScrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 
                  bg-primary px-6 py-4 text-primary 
                  transition-transform duration-300
                  ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer"
        >
          <h1 className="text-xl font-bold text-secondary font-engagement tracking-wider">
            &lt;<span className="text-slate-300 dark:text-slate-800">CASI</span>
            MIR LUNDBERG&gt;
          </h1>
        </button>

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
          <svg
            className={`h-6 w-6 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className={`h-6 w-6 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M6 6l12 12M18 6l-12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
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
