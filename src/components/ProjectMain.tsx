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
          <div className="absolute inset-x-0 top-0 z-10 bg-white/95 text-slate-900 dark:bg-black/95 dark:text-slate-100">
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold leading-tight truncate">{p.name}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 truncate">{p.info}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

// =============================
// File: src/data/projects.ts (simple data)
// =============================



// // =============================
// // File: src/components/ProjectsGrid.tsx (simple version)
// // Description: Minimal cards — image with a solid header bar (white in light, black in dark).
// // Entire card is a link to the GitHub repo.
// // =============================
// import React from "react";
// import projects from "../data/projects.ts"

// export function ProjectsGrid({ items }: { items: Project[] }) {
//   return (
//     <div
//       className="grid gap-6 px-6 md:px-20 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
//     >
//       {items.map((p) => (
//         <a
//           key={p.id}
//           href={p.repoUrl}
//           target="_blank"
//           rel="noreferrer noopener"
//           className="group relative block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
//           aria-label={`${p.name} – open GitHub repository`}
//           style={{ height: 280 }}
//         >
//           {/* Image area stays uniform via fixed tile height + aspect handling */}
//           <div className="absolute inset-0">
//             <img
//               src={p.image}
//               alt={p.name}
//               loading="lazy"
//               className="h-full w-full object-cover"
//             />
//           </div>

//           {/* Fixed header bar on top of the image */}
//           <div className="absolute inset-x-0 top-0 z-10 bg-white text-slate-900 dark:bg-black dark:text-slate-100/95 bg-opacity-95">
//             <div className="px-3 py-2">
//               <h3 className="text-sm font-semibold leading-tight truncate">{p.name}</h3>
//               <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{p.info}</p>
//             </div>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// }
