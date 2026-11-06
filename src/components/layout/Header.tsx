"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { content } from "@/data/content";

/**
 * Header: Dynamic sticky navbar with custom smooth scrolling,
 * active section tracking, and subtle frosted dark glass transitions.
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  // On subpages like /work/[slug], the page background is pitch black,
  // so the navbar must always use high-contrast dark-mode styling.
  const isDark = pathname !== "/" || scrolled;

  // Scroll detection for navbar background frosting and top/hero active tracking
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      if (pathname === "/" && window.scrollY < 120) {
        setActiveSection("hero");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // IntersectionObserver to highlight currently active section
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = content.navLinks
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-20% 0px -65% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  /**
   * Smooth scroll animation with professional offset calculation
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      const targetId = href.substring(1);

      if (pathname === "/") {
        e.preventDefault();

        // Scroll cleanly to very top if clicking Home / Hero
        if (targetId === "hero" || targetId === "top") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          window.history.pushState(null, "", "/");
          setActiveSection("hero");
          setMobileMenuOpen(false);
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
          setActiveSection(targetId);
        }
      } else {
        // From child page, navigate to homepage section
        e.preventDefault();
        router.push(targetId === "hero" ? "/" : `/${href}`);
      }

      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 sm:px-10 lg:px-16 ${
        isDark
          ? "py-3.5 sm:py-4 bg-black/85 backdrop-blur-md border-b border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
          : "py-5 sm:py-7 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] flex items-center justify-between">
        {/* Brand Name */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
            }
          }}
          className={`text-lg sm:text-[21px] font-medium tracking-tight transition-colors duration-300 ${
            isDark ? "text-white hover:text-neutral-300" : "text-black hover:opacity-75"
          }`}
        >
          {content.personal.name}
        </Link>

        {/* Desktop Nav Links + Pill CTA */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          <nav className="flex items-center gap-1 sm:gap-1.5 lg:gap-2" aria-label="Main Navigation">
            {content.navLinks.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative px-3 py-1.5 rounded-full text-sm tracking-normal transition-all duration-300 ease-out select-none ${
                    isDark
                      ? isActive
                        ? "text-white font-medium"
                        : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
                      : isActive
                        ? "text-black font-semibold"
                        : "text-neutral-700 hover:text-black hover:bg-black/[0.05]"
                  }`}
                >
                  <span className="relative z-10 inline-block transition-transform duration-200 group-hover:-translate-y-[0.5px]">
                    {item.label}
                  </span>

                  {/* Refined Underline: Permanent on active, smooth sweep on hover */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ease-out origin-left ${
                      isDark ? "bg-white" : "bg-black"
                    } ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Classy & Professional Interactive Pill CTA */}
          <a
            href={`mailto:${content.personal.email}`}
            className={`group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-medium tracking-tight overflow-hidden transition-all duration-300 ease-out active:scale-95 hover:-translate-y-0.5 hover:scale-[1.03] ${
              isDark
                ? "bg-white text-black border border-white/30 hover:bg-neutral-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.3)] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                : "bg-black text-white border border-black/15 hover:bg-[#141414] hover:shadow-[0_10px_25px_rgba(0,0,0,0.22)] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            }`}
          >
            {/* Subtle Glint Sheen Animation that sweeps across on hover */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)"
                  : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <span className="relative z-10 transition-colors duration-200">
              Let&apos;s talk
            </span>

            {/* Smooth Diagonal Arrow Lift */}
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Action & Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={`mailto:${content.personal.email}`}
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium overflow-hidden transition-all duration-300 ease-out active:scale-95 hover:scale-105 ${
              isDark
                ? "bg-white text-black border border-white/20 hover:bg-neutral-100 shadow-[0_0_16px_rgba(255,255,255,0.2)]"
                : "bg-black text-white border border-black/10 hover:bg-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            }`}
          >
            <span className="relative z-10">Talk</span>
            <ArrowUpRight className="relative z-10 w-3 h-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`p-1.5 transition-colors duration-300 ${
              isDark ? "text-white hover:opacity-70" : "text-black hover:opacity-70"
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-3 p-4 rounded-2xl backdrop-blur-xl border space-y-1.5 shadow-xl transition-all duration-300 ${
            isDark
              ? "bg-black/95 text-white border-white/10"
              : "bg-white/95 text-black border-black/5"
          }`}
        >
          {content.navLinks.map((item) => {
            const targetId = item.href.replace("#", "");
            const isActive = activeSection === targetId;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base transition-all duration-200 ${
                  isDark
                    ? isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                    : isActive
                      ? "bg-black/5 text-black font-semibold"
                      : "text-neutral-700 hover:text-black hover:bg-black/5"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDark ? "bg-white" : "bg-black"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
