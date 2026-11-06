"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { content } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { HandDrawnOval } from "@/components/ui/HandDrawnOval";

/**
 * Hero: High-contrast rounded cream canvas featuring dark graphite typography,
 * cursive "thinker" with the hand-drawn crossing loop, and an interactive cutout portrait.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (tagRef.current) {
        tl.fromTo(tagRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 });
      }

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current.children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 },
          "-=0.3"
        );
      }

      if (bioRef.current) {
        tl.fromTo(
          bioRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.4"
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.6"
        );
      }

      // Smooth interactive mouse parallax float
      const container = containerRef.current;
      const imgElem = imageRef.current;
      if (!container || !imgElem) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(imgElem, {
          x: x * 18,
          y: y * 14,
          rotationY: x * 5,
          duration: 0.6,
          ease: "power1.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(imgElem, {
          x: 0,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      id="hero"
      ref={containerRef}
      className="w-full relative hero-canvas rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden min-h-[calc(100dvh-1rem)] sm:min-h-[calc(100dvh-1.5rem)] md:min-h-[calc(100dvh-2.5rem)] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >
      <main className="flex-1 w-full mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 flex flex-col justify-center py-6 sm:py-8 lg:py-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
          {/* Left Column: Tag + Headline + Bio */}
          <div className="lg:col-span-6 xl:col-span-6 z-20 flex flex-col justify-center">
            {/* Tag */}
            <div
              ref={tagRef}
              className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.16em] text-neutral-800 uppercase mb-5 sm:mb-8"
            >
              <span className="inline-block w-2.5 h-2.5 bg-black" />
              <span>{content.personal.heroRoleTag}</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.4rem] font-sans font-bold tracking-[-0.04em] leading-[1.02]"
            >
              <span className="block text-headline-gradient">
                {content.personal.headlinePrefix}{" "}
                <span className="relative inline-block px-2 sm:px-3.5 mx-0.5">
                  <span className="relative z-10 font-cursive italic font-semibold lowercase tracking-normal text-headline-gradient text-[1.12em]">
                    {content.personal.headlineCursive}
                  </span>
                  <HandDrawnOval />
                </span>
                .
              </span>
              <span className="block text-headline-gradient mt-1 sm:mt-2">
                {content.personal.headlineLine2}
              </span>
            </h1>

            {/* Bio Text */}
            <div ref={bioRef} className="mt-8 sm:mt-10 max-w-xl">
              <p className="text-base sm:text-lg md:text-[18px] font-normal text-neutral-800 leading-[1.6]">
                {content.personal.bio}
              </p>
            </div>
          </div>

          {/* Right Column: Hero Cutout Portrait */}
          <div className="lg:col-span-6 xl:col-span-6 z-10 flex justify-center lg:justify-end items-center">
            <div
              ref={imageRef}
              className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[580px] xl:max-w-[660px] aspect-[1261/1024] flex items-center justify-center transition-transform"
            >
              <Image
                src={content.personal.cutoutImage}
                alt={`${content.personal.name} Hero Cutout`}
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 660px"
                className="object-contain object-bottom drop-shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              />
            </div>
          </div>
        </div>
      </main>

      <div className="w-full h-4 sm:h-8" />
    </div>
  );
}
