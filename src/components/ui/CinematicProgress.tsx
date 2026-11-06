"use client";

import React, { useEffect, useState } from "react";

const SCENES = [
  { id: "overview", label: "01 Thesis" },
  { id: "blueprint", label: "02 Blueprint" },
  { id: "showcase", label: "03 Showcase" },
  { id: "friction", label: "04 Friction" },
  { id: "rejections", label: "05 Scope" },
  { id: "ownership", label: "06 PM Role" },
  { id: "deliverables", label: "07 Shipped" },
];

/**
 * CinematicProgress: Real-time top progress bar and floating chapter HUD
 * that turns reading the case study into an intuitive cinematic movie flow.
 */
export function CinematicProgress() {
  const [activeScene, setActiveScene] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      // Track active scene
      for (let i = SCENES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCENES[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveScene(SCENES[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 90;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <aside
      aria-label="Case Study Scenes"
      className="fixed bottom-6 right-6 z-40 hidden xl:flex items-center gap-2 p-2 rounded-full border border-white/10 bg-[#09090c]/90 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
    >
      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest pl-2 pr-1">
        SCENE
      </span>
      <div className="flex items-center gap-1.5">
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => scrollToScene(scene.id)}
              title={scene.label}
              aria-label={`Jump to ${scene.label}`}
              className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isActive
                  ? "px-3 py-1 rounded-full bg-white text-black font-semibold text-xs shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                  : "w-2.5 h-2.5 rounded-full bg-neutral-700 hover:bg-neutral-400"
              }`}
            >
              {isActive ? (
                <span className="font-mono text-[11px] whitespace-nowrap">
                  {scene.label}
                </span>
              ) : (
                <span className="sr-only">{scene.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

