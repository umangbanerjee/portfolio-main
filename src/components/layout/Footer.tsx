"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { content } from "@/data/content";

function XIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * Footer: Architectural, editorial design matching reference layout:
 * - CONTACT header with "Let's talk" display
 * - 2-column internal navigation
 * - Prominent "hello@umangbanerjee.tech" display mailto headline
 * - Current location and UTC timezone metadata
 * - "→ START A PROJECT" action with underline
 * - Social links (GitHub ↗, LinkedIn ↗, X ↗) and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);

      if (targetId === "hero" || targetId === "top") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        window.history.pushState(null, "", "/");
        return;
      }

      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navOffset = 88;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        window.history.pushState(null, "", href);
      } else {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <footer
      id="contact"
      className="w-full bg-black text-white px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-14 sm:pb-16 select-text relative border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Main Content Area: Responsive Layout (Email first on mobile, Nav on right on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 sm:gap-y-14 md:gap-y-20 lg:gap-y-28">
          {/* 1. Header: ■ CONTACT & Let's talk */}
          <div className="order-1 md:col-span-6 lg:col-span-7">
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium tracking-[0.2em] text-neutral-400 uppercase mb-4 sm:mb-6">
              <span className="inline-block w-2.5 h-2.5 bg-white" />
              <span>CONTACT</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-none">
              Let&apos;s talk
            </h2>
          </div>

          {/* 2. Navigation: Order 3 on mobile (after email), Order 2 on desktop (top right) */}
          <div className="order-3 md:order-2 md:col-span-6 lg:col-span-5 md:flex md:justify-end">
            <div className="grid grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-3 font-normal text-sm sm:text-base text-neutral-400 pt-2 md:pt-4">
              <div className="space-y-3">
                <Link
                  href="#hero"
                  onClick={(e) => handleNavClick(e, "#hero")}
                  className="block hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  onClick={(e) => handleNavClick(e, "#about")}
                  className="block hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#education"
                  onClick={(e) => handleNavClick(e, "#education")}
                  className="block hover:text-white transition-colors"
                >
                  Education
                </Link>
              </div>
              <div className="space-y-3">
                <Link
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "#projects")}
                  className="block hover:text-white transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="#experience"
                  onClick={(e) => handleNavClick(e, "#experience")}
                  className="block hover:text-white transition-colors"
                >
                  Experience
                </Link>
                <Link
                  href="#skills"
                  onClick={(e) => handleNavClick(e, "#skills")}
                  className="block hover:text-white transition-colors"
                >
                  Skills
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Email & Action: Order 2 on mobile (immediately after Let's talk), Order 3 on desktop */}
          <div className="order-2 md:order-3 md:col-span-12 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 md:pb-8">
            <div>
              {/* Display Email Link */}
              <a
                href={`mailto:${content.personal.email}`}
                className="text-2xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold tracking-[-0.04em] text-white hover:text-neutral-300 transition-colors inline-block leading-tight"
              >
                {content.personal.email}
              </a>

              {/* Location & Timezone info */}
              <div className="text-xs sm:text-sm font-mono text-neutral-500 mt-4 sm:mt-5 flex items-center gap-2">
                <span>Currently Gurugram</span>
                <span>·</span>
                <span>UTC +05:30</span>
              </div>
            </div>

            {/* Right Action: START A PROJECT */}
            <div className="shrink-0 pt-2 md:pt-0">
              <a
                href={`mailto:${content.personal.email}?subject=Project%20Inquiry`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-colors border-b border-neutral-700 hover:border-white pb-1 group"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                <span>START A PROJECT</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Rule Divider */}
        <div className="w-14 h-px bg-neutral-800 mb-8" />

        {/* Bottom Bar: Social Links & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs sm:text-sm font-mono">
          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-neutral-400">
            <a
              href={content.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-[#0e0e0e] hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
            >
              <Github className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={content.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-[#0e0e0e] hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
            >
              <Linkedin className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {content.personal.x && (
              <a
                href={content.personal.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-[#0e0e0e] hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <XIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
                <span>X</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>

          {/* Copyright */}
          <div className="text-neutral-500">
            © {currentYear} {content.personal.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
