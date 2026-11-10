"use client";

import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const GREETINGS = [
  { word: "Hello", lang: "ENGLISH", index: "01 / 03" },
  { word: "नमस्ते", lang: "HINDI", index: "02 / 03" },
  { word: "নমস্কার", lang: "BENGALI", index: "03 / 03" },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [percent, setPercent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Lock scroll during initialization
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const totalDuration = 1350; // Optimized snappy 1.35s cadence for fast, premium loading
    const intervalTime = totalDuration / 100;

    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + 1;

        // Transition 1: English -> Hindi at 35%
        if (next === 35) {
          setCurrentIndex(1);
        }

        // Transition 2: Hindi -> Bengali at 70%
        if (next === 70) {
          setCurrentIndex(2);
        }

        if (next >= 100) {
          clearInterval(interval);
          // Crisp pause at 100% before smooth curtain reveal
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsFinished(true);
              document.body.style.overflow = originalOverflow;
              onComplete?.();
            }, 600); // 600ms cubic-bezier slide-up exit
          }, 120);
          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!isMounted || isFinished) return null;

  return (
    <aside
      aria-label="Loading Screen"
      className={`fixed inset-0 z-[9999] flex flex-col justify-between bg-black text-white px-6 sm:px-12 py-8 sm:py-10 select-none transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      style={{
        fontFamily:
          "var(--font-geist-sans), 'Kohinoor Devanagari', 'Noto Sans Devanagari', 'Kohinoor Bangla', 'Noto Sans Bengali', system-ui, sans-serif",
      }}
    >
      {/* Top Bar: Name & Branding */}
      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span>UMANG BANERJEE</span>
        </div>
        <span>PORTFOLIO © 2026</span>
      </div>

      {/* Center Stage: Word Transition */}
      <div className="flex flex-col items-center justify-center">
        <div className="h-28 sm:h-36 flex items-center justify-center">
          <h1
            key={currentIndex}
            className="text-5xl sm:text-7xl md:text-8xl font-sans font-bold tracking-tight text-white flex items-center gap-3 sm:gap-4 animate-greeting"
          >
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white inline-block shrink-0" />
            <span>{GREETINGS[currentIndex].word}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-4 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
          <span>{GREETINGS[currentIndex].lang}</span>
          <span>·</span>
          <span>{GREETINGS[currentIndex].index}</span>
        </div>
      </div>

      {/* Bottom Bar: Location metadata on left, Tabular percentage on right */}
      <div className="flex items-end justify-between">
        <div className="text-[11px] font-mono text-neutral-400 tracking-wider space-y-1">
          <div>GURUGRAM, INDIA</div>
          <div>UTC +05:30</div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-5xl sm:text-7xl md:text-8xl font-mono font-bold tracking-tight text-white tabular-nums leading-none">
            {percent}%
          </span>
          <span className="text-[11px] font-mono text-neutral-400 tracking-[0.2em] uppercase mt-2">
            INITIALIZING
          </span>
        </div>
      </div>

      {/* Minimal 2px Progress Rail */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
        <div
          className="h-full bg-white transition-all duration-75 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
    </aside>
  );
}

