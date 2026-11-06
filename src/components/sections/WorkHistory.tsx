import React from "react";
import Image from "next/image";
import { content } from "@/data/content";

/**
 * WorkHistory: Interactive chronological list of career leadership, engineering
 * fellowships, and venture operations with micro-interactive squircle logo boxes.
 */
export function WorkHistory() {
  const { workHistory } = content;

  return (
    <section
      id="experience"
      className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mt-16 sm:mt-24 mb-14 sm:mb-20 select-text relative scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        {/* Tag: ■ EXPERIENCE */}
        <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.2em] text-neutral-400 uppercase mb-5 sm:mb-6">
          <span className="inline-block w-2.5 h-2.5 bg-white" />
          <span>{workHistory.tag}</span>
        </div>

        {/* Display Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-[1.04]">
          {workHistory.title}
        </h2>
      </div>

      {/* Work History List with Intuitive Micro-Interactions */}
      <div className="w-full divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
        {workHistory.items.map((item) => (
          <div
            key={item.num}
            className="group relative py-6 sm:py-9 md:py-11 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-8 rounded-2xl px-3 sm:px-6 -mx-3 sm:-mx-6 transition-all duration-300 ease-out hover:bg-white/[0.035] cursor-default overflow-hidden"
          >
            {/* Subtle left accent bar that animates into view on hover */}
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-white rounded-r transition-all duration-300 ease-out group-hover:h-12 opacity-0 group-hover:opacity-100"
              aria-hidden="true"
            />

            {/* Left Column: Number + Logo Box + Role/Company */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-7 md:gap-9 min-w-0 flex-1">
              {/* Number */}
              <span className="text-xs sm:text-sm font-mono text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-all duration-300 pt-2 sm:pt-0 w-5 sm:w-8 shrink-0">
                {item.num}
              </span>

              {/* Logo Squircle with Intuitive Hover Micro-Interactions */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-[16px] sm:rounded-[22px] bg-[#0e0e0e] border border-white/10 flex items-center justify-center p-2.5 sm:p-3 shrink-0 overflow-hidden shadow-inner transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:border-white/30 group-hover:bg-[#151515] group-hover:shadow-[0_10px_28px_rgba(255,255,255,0.08)]">
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  width={80}
                  height={80}
                  className="max-h-7 sm:max-h-9 md:max-h-10 w-auto object-contain opacity-75 contrast-125 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-110"
                />
              </div>

              {/* Role & Company with ample breathing room */}
              <div className="min-w-0 flex-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold tracking-[-0.03em] text-white group-hover:text-neutral-100 transition-colors leading-[1.15]">
                  {item.role}
                </h3>
                <div className="mt-1 sm:mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="relative inline-block text-sm sm:text-base md:text-[17px] text-neutral-400 group-hover:text-neutral-200 font-normal tracking-normal transition-colors pb-0.5">
                    {item.company}
                    {/* Intuitive expanding underline that blooms on hover */}
                    <span
                      className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-white/70 rounded-full transition-all duration-300 ease-out group-hover:w-full"
                      aria-hidden="true"
                    />
                  </span>

                  {/* Mobile-only date & location meta tag */}
                  <span className="sm:hidden text-neutral-600 font-mono text-xs">·</span>
                  <span className="sm:hidden text-xs font-mono text-neutral-400">
                    {item.period}
                  </span>
                </div>
                <div className="sm:hidden text-[11px] font-mono text-neutral-500 mt-0.5">
                  {item.location}
                </div>
              </div>
            </div>

            {/* Desktop Right Column: Dates & Location (hidden on mobile, shown on sm+) */}
            <div className="hidden sm:block text-right shrink-0 font-mono">
              <div className="text-sm md:text-[15px] text-neutral-400 group-hover:text-white transition-colors duration-200">
                {item.period}
              </div>
              <div className="text-neutral-500 text-xs mt-1 sm:mt-1.5 group-hover:text-neutral-400 transition-colors duration-200">
                {item.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

