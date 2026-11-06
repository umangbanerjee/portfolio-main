import React from "react";
import Image from "next/image";
import { content } from "@/data/content";

/**
 * Marquee: Infinite scrolling client & venture logos banner with edge-fading blur masks.
 */
export function Marquee() {
  const logos = content.clientLogos;

  return (
    <section className="w-full max-w-[1400px] mt-6 sm:mt-8 md:mt-12 mb-8 sm:mb-12 py-4 sm:py-5 overflow-hidden relative z-30 select-text">
      <div className="w-full flex items-center">
        {/* Fixed Left Label */}
        <div className="relative flex items-center gap-3 shrink-0 pl-2 sm:pl-6 lg:pl-8 pr-6 sm:pr-8 bg-black z-20">
          <span className="text-neutral-400 text-xs sm:text-sm font-serif" aria-hidden="true">
            ※
          </span>
          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 leading-[1.35] whitespace-nowrap">
            <div>WHERE I&apos;VE</div>
            <div className="text-neutral-200">BUILT &amp; WORKED</div>
          </div>
        </div>

        {/* Scrolling Logos Track with Polished Optical Edge Dissolution */}
        <div className="relative flex-1 overflow-hidden marquee-fade-mask">
          {/* Marquee Track (seamless continuous glide that never stops on hover) */}
          <div className="animate-marquee flex items-center gap-14 sm:gap-20 md:gap-28 py-2">
            {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} w-auto object-contain select-none`}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

