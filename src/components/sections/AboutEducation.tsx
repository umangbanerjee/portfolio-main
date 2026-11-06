import React from "react";
import Image from "next/image";
import { content } from "@/data/content";

/**
 * AboutEducation: Unified two-column layout where "WHO I AM" and "EDUCATION"
 * scroll continuously in the left column, while a single framed portrait card
 * remains sticky on the right, smoothly transitioning from B&W to rich color on hover.
 */
export function AboutEducation() {
  const { whoIAm, education } = content;

  return (
    <section
      id="about"
      className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 mt-16 sm:mt-24 lg:mt-32 mb-24 sm:mb-36 select-text relative scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: WHO I AM followed immediately by EDUCATION */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
          {/* --- PART A: WHO I AM --- */}
          <div>
            {/* Tag: ■ WHO I AM */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.2em] text-neutral-400 uppercase mb-6 sm:mb-8">
              <span className="inline-block w-2.5 h-2.5 bg-white" />
              <span>{whoIAm.tag}</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-sans font-bold tracking-[-0.04em] text-white leading-[1.02] mb-8 sm:mb-10 whitespace-pre-line">
              {whoIAm.headline}
            </h2>

            {/* Body Copy */}
            <div className="space-y-6 max-w-2xl text-base sm:text-lg md:text-[17px] font-normal text-neutral-400 leading-[1.7]">
              {whoIAm.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* --- PART B: EDUCATION (Beneath WHO I AM in the same column) --- */}
          <div id="education" className="mt-20 sm:mt-28 pt-8 scroll-mt-24 sm:scroll-mt-28">
            {/* Tag: ■ EDUCATION */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.2em] text-neutral-400 uppercase mb-8 sm:mb-10">
              <span className="inline-block w-2.5 h-2.5 bg-white" />
              <span>EDUCATION</span>
            </div>

            {/* Education List */}
            <div className="w-full divide-y divide-neutral-800/80 border-t border-b border-neutral-800/80">
              {education.map((item) => (
                <div
                  key={item.num}
                  className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 group"
                >
                  <div className="flex items-start gap-3.5 sm:gap-6 min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-mono text-neutral-500 pt-1 w-5 sm:w-8 shrink-0">
                      {item.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-1.5 sm:mb-2 group-hover:text-neutral-200 transition-colors leading-tight">
                        {item.degree}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-400">
                        {item.institution}
                      </p>
                      {/* Mobile meta */}
                      <div className="sm:hidden text-xs font-mono text-neutral-400 mt-2 flex items-center gap-2">
                        <span>{item.period}</span>
                        <span className="text-neutral-600">·</span>
                        <span className="text-neutral-500">{item.location}</span>
                      </div>
                    </div>
                  </div>
                  {/* Desktop meta */}
                  <div className="hidden sm:block text-right shrink-0 font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                    <div>{item.period}</div>
                    <div className="text-neutral-500 text-[11px] sm:text-xs">{item.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Full height track with sticky portrait pinned during WHO I AM & EDUCATION */}
        <div className="lg:col-span-5 xl:col-span-5 relative w-full">
          <div className="sticky top-28 lg:top-32 z-20 flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] bg-neutral-900 group cursor-pointer"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Full color image with grayscale-by-default and hover-to-color transition */}
              <Image
                src={whoIAm.portrait.image}
                alt={whoIAm.portrait.alt}
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-75" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                <span className="text-lg sm:text-xl font-bold tracking-tight">
                  {whoIAm.portrait.badgeLeft}
                </span>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-neutral-400">
                  {whoIAm.portrait.badgeRight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

