"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface HandDrawnOvalProps {
  className?: string;
  strokeColor?: string;
  delay?: number;
  duration?: number;
}

/**
 * HandDrawnOval: An organic, human-drawn red marker loop around "thinker".
 * Scribbles live on page load with sophisticated, fluid pen motion.
 */
export function HandDrawnOval({
  className = "",
  strokeColor = "#E11D48",
  delay = 0.75,
  duration = 1.35,
}: HandDrawnOvalProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Exact mathematical arc length (~750px)
      const length = path.getTotalLength ? path.getTotalLength() : 755;

      // Start completely un-drawn
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.opacity = "0";

      if (prefersReducedMotion) {
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
        return;
      }

      // Sophisticated live pen scribble animation
      const tl = gsap.timeline({ delay });

      tl.to(path, {
        opacity: 1,
        duration: 0.15,
        ease: "power1.in",
      })
      .to(
        path,
        {
          strokeDashoffset: 0,
          duration,
          ease: "power2.inOut",
        },
        "<"
      );
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -left-3 sm:-left-4 -right-3 sm:-right-4 -top-2.5 sm:-top-3.5 -bottom-2 sm:-bottom-3 w-[calc(100%+1.5rem)] sm:w-[calc(100%+2rem)] h-[calc(100%+1.25rem)] sm:h-[calc(100%+1.75rem)] pointer-events-none z-0 overflow-visible ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M 18 34 C 14 22, 28 14, 56 12 C 110 8, 178 10, 208 20 C 224 26, 232 44, 220 64 C 204 84, 150 92, 88 91 C 38 90, 10 78, 6 54 C 3 34, 16 18, 44 14 C 84 8, 158 11, 196 23 C 214 29, 222 42, 216 56"
        stroke={strokeColor}
        strokeWidth="2.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="drop-shadow-[0_2px_8px_rgba(225,29,72,0.32)]"
      />
    </svg>
  );
}
