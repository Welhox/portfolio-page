import React from "react";
import type { Project } from "../types/project";

export function ProjectsGrid({ items }: { items: Project[] }) {
  return (
    <section>
      <div className="pb-10 pt-10">
        <h2 className="flex items-center gap-4 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          <span className="flex-1 h-px bg-slate-300"></span>
          <span className="px-4">Projects</span>
          <span className="flex-1 h-px bg-slate-300"></span>
        </h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
          {items.map((p) => (
            <a
              key={p.id}
              href={p.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${p.name} – open GitHub repository`}
              className="group block aspect-square overflow-hidden rounded-xl flex flex-col"
            >
              {/* Header fills the remaining space */}
              <div className="flex-1 bg-slate-400 text-slate-900 px-3 py-2 overflow-hidden flex flex-col justify-center">
                <h3 className="text-l text-center mb-1 font-semibold leading-tight truncate">{p.name}</h3>
                <p className="text-s text-slate-800 line-clamp-2">{p.info}</p>
              </div>

              {/* Fixed 16:9 image area at the bottom (won’t shrink) */}
              <div className="flex-none w-full aspect-video">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

