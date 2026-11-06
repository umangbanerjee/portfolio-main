import React from "react";
import { content } from "@/data/content";
import { ProjectCard } from "./ProjectCard";

/**
 * SelectedWork: 3-column responsive grid showcasing shipped developer tools,
 * AI infrastructure, and full-stack systems with custom micro-interactions.
 */
export function SelectedWork() {
  const { selectedWork } = content;

  return (
    <section
      id="projects"
      className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mt-8 sm:mt-16 mb-28 sm:mb-40 select-text relative scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Backward-compatible anchor for legacy links */}
      <span id="work" className="absolute -top-28" aria-hidden="true" />
      {/* Section Header */}
      <div className="flex flex-col mb-12 sm:mb-16">
        <div>
          {/* Tag: ■ SELECTED WORK */}
          <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.2em] text-neutral-400 uppercase mb-5 sm:mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-white" />
            <span>{selectedWork.tag}</span>
          </div>

          {/* Display Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-[1.04] mb-4 sm:mb-5">
            {selectedWork.title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-[17px] font-normal text-neutral-400 max-w-2xl leading-[1.65]">
            {selectedWork.subtitle}
          </p>
        </div>
      </div>

      {/* Cards Grid: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {selectedWork.projects.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  );
}

