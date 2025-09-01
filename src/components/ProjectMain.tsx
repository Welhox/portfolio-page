// =============================
// File: src/components/ProjectsGrid.tsx (simple version)
// Description: Minimal cards — image with a solid header bar (white in light, black in dark).
// Entire card is a link to the GitHub repo.
// =============================
import React from "react";
import type { Project } from "../types/project";

export function ProjectsGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid gap-6 px-6 md:px-20 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
      {items.map((p) => (
        <a
          key={p.id}
          href={p.repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative block aspect-square overflow-hidden rounded-xl ..."

          aria-label={`${p.name} – open GitHub repository`}
        >
          {/* Image fills tile without changing tile size */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Solid header bar, always visible */}
          <div className="absolute inset-x-0 top-0 z-10 
          h-[30%] bg-white/80 text-slate-900 dark:bg-black/80 dark:text-slate-100">
            <div className="px-3 py-2">
              <h2 className="text-2xl font-semibold leading-tight text-center truncate">{p.name}</h2>
              <p className="text-md text-slate-600 dark:text-slate-300 line-clamp-3">{p.info}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
