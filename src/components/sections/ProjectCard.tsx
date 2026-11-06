"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import type { ProjectItem } from "@/data/types";

interface ProjectCardProps {
  project: ProjectItem;
}

/**
 * ProjectCard: Interactive spotlight card with cursor-follower radial lighting,
 * border shine, elevation dynamics, and status halo beacons.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-[26px] sm:rounded-[30px] border border-neutral-800/80 bg-[#090909] p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-neutral-700/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[26px] sm:rounded-[30px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Border Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[26px] sm:rounded-[30px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), transparent 60%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Top Row: Index & Category */}
      <div className="flex items-center justify-between text-xs sm:text-[13px] font-mono mb-8 sm:mb-10 relative z-10">
        <span className="text-neutral-500">{project.num}</span>
        <span className="text-neutral-400 tracking-wide">{project.category}</span>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 flex-1">
        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white mb-3 sm:mb-4 group-hover:text-neutral-100 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm sm:text-[15px] font-normal text-neutral-400 leading-[1.65] mb-8">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="relative z-10 pt-5 border-t border-white/[0.06] mb-6">
        <p className="text-xs sm:text-[13px] font-mono text-neutral-400 leading-relaxed">
          {project.stack}
        </p>
      </div>

      {/* Bottom Bar: Status Dot & Explore Action */}
      <div className="flex items-center justify-between pt-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              project.status === "Shipped" || project.status === "Production"
                ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
                : "bg-neutral-400"
            }`}
          />
          <span className="text-xs font-mono text-neutral-300 tracking-wide">
            {project.status}
          </span>
        </div>

        <Link
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 group-hover:text-white transition-colors"
        >
          <span>EXPLORE</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

