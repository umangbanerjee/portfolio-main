"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { content } from "@/data/content";

/**
 * Skillset: Editorial Accordion with intuitive micro-interactions
 * - All dropdowns collapsed by default (opens ONLY when user clicks)
 * - Zero "expand all" buttons
 * - No skill counts displayed
 * - Animated accent line and micro-interactions on hover
 * - Pill-shaped skill badges organized cleanly by subgroup
 */
export function Skillset() {
  const { skillset } = content;
  const categories = skillset.categories;

  // Dropdown only appears when user clicks it, collapsed by default
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="skills"
      className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mt-6 sm:mt-10 mb-20 sm:mb-28 select-text relative scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-8 border-b border-white/[0.08]">
        <div>
          {/* Eyebrow: ■ SKILLS & EXPERTISE */}
          <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.2em] text-neutral-400 uppercase mb-4 sm:mb-5">
            <span className="inline-block w-2.5 h-2.5 bg-white" />
            <span>SKILLS &amp; EXPERTISE</span>
          </div>

          {/* Section Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-none">
            Skills
          </h2>
        </div>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base text-neutral-400 max-w-md md:text-right leading-relaxed">
          A multidisciplinary toolkit across product strategy, engineering, data analytics, and design.
        </p>
      </div>

      {/* Accordion Categories */}
      <div className="w-full border-t border-white/10 divide-y divide-white/10">
        {categories.map((cat, idx) => {
          const isOpen = openCategory === cat.id;
          const indexNum = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={cat.id}
              className={`group relative transition-colors duration-300 ${
                isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.015]"
              }`}
            >
              {/* Category Row Trigger Button */}
              <button
                type="button"
                onClick={() => toggleCategory(cat.id)}
                aria-expanded={isOpen}
                className="w-full py-6 sm:py-9 flex items-center justify-between text-left cursor-pointer transition-all duration-300 relative select-none"
              >
                {/* Left: Number + Title */}
                <div className="flex items-baseline gap-3.5 sm:gap-8 pr-3 min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 shrink-0">
                    {indexNum}
                  </span>
                  <h3
                    className={`text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-sans font-bold tracking-[-0.03em] leading-tight transition-all duration-300 ${
                      isOpen
                        ? "text-white"
                        : "text-neutral-300 group-hover:text-white group-hover:translate-x-1.5"
                    }`}
                  >
                    {cat.name}
                  </h3>
                </div>

                {/* Right: Sleek Chevron Toggle */}
                <div className="shrink-0 flex items-center">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border transition-all duration-300 flex items-center justify-center ${
                      isOpen
                        ? "border-white/40 bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                        : "border-white/10 group-hover:border-white/30 bg-[#0e0e0e] group-hover:bg-neutral-800 text-neutral-400 group-hover:text-white"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Interactive Accent Underline: Sweeps across dynamically on hover */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out origin-left pointer-events-none ${
                    isOpen
                      ? "w-full bg-white opacity-80"
                      : "w-0 group-hover:w-full bg-gradient-to-r from-white via-white/80 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>

              {/* Collapsible Dropdown Content: Appears ONLY on click */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-8 sm:pb-10"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  {/* Category Narrative / Domain Subtitle */}
                  {cat.description && (
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 sm:mb-8 pl-4 sm:pl-14 max-w-2xl">
                      {cat.description}
                    </p>
                  )}

                  {/* Subgroups & Pill Badges */}
                  <div className="space-y-6 sm:space-y-7 pl-4 sm:pl-14">
                    {cat.subgroups.map((subgroup) => (
                      <div key={subgroup.title}>
                        {/* Subgroup Heading */}
                        <div className="text-[11px] sm:text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                          <span>{subgroup.title}</span>
                        </div>

                        {/* Pill-shaped skill badges */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5">
                          {subgroup.skills.map((skill) => (
                            <div
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] hover:border-white/35 hover:bg-white/[0.08] text-xs sm:text-[13px] font-mono text-neutral-300 hover:text-white hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-default shadow-sm select-text"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white transition-colors duration-150 shrink-0" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
