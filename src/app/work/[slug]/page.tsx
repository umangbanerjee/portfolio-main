import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { content } from "@/data/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LaptopMockup } from "@/components/ui/LaptopMockup";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CinematicProgress } from "@/components/ui/CinematicProgress";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  CheckCircle2,
  Target,
  Compass,
  Users,
  Layers,
  Clock,
  Flame,
  ShieldCheck,
  Sparkles,
  Briefcase,
  AlertCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return content.projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = content.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  const title = `${project.title} — Case Study | Umang Banerjee`;
  const description = project.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://umangbanerjee.com/work/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@umangb_70",
    },
  };
}

function getShowcaseMeta(slug: string, type: "product" | "secondary") {
  if (slug === "railkhoj") {
    return {
      route: type === "product" ? "railkhoj.vercel.app/search" : "railkhoj.vercel.app/train/12301/live-status",
      caption:
        type === "product"
          ? "Real-Time Train Search · Live GPS Telemetry, Coach Layouts & 3D Terrain for 12,840+ Trains"
          : "Live Train Running Telemetry · GPS Speed, Route Timeline, Delay Analytics & Next Station Weather",
    };
  }
  if (slug === "marketflow") {
    return {
      route:
        type === "product"
          ? "marketflow-ub.vercel.app/overview"
          : "marketflow-ub.vercel.app/intelligence/investigate",
      caption:
        type === "product"
          ? "Marketplace Health Overview · Core Decision Metrics & Operations Dashboard"
          : "AI Decision Investigation · Gemini Causal Database Queries & Root-Cause Analysis",
    };
  }
  if (slug === "lifetrack-pro") {
    return {
      route:
        type === "product"
          ? "lifetrackpro.in/app/study-rooms"
          : "lifetrackpro.in/analytics",
      caption:
        type === "product"
          ? "Mobile Application · Daily Focus, Routines & Aspirant Benchmarking"
          : "Secondary Platform Interface",
    };
  }
  if (slug === "onetrack") {
    return {
      route:
        type === "product"
          ? "onetrack-ub.vercel.app/dashboard"
          : "onetrack-ub.vercel.app/settings",
      caption:
        type === "product"
          ? "Search Command Center & Live Dashboard · Real-Time Salary Benchmarks, Application Streaks, KPI Funnel & Dark/Light Theme Support"
          : "Config & Environment Settings · Clerk Auth, 100% Private Supabase RLS Isolation & Weekly Target Velocity",
    };
  }
  if (slug === "gatewise") {
    return {
      route: "",
      caption:
        type === "product"
          ? "Student Exit Pass Management · Real-Time Curfew Schedule, Movement Status & Active Passes"
          : "Gatepass Movement History & Security Audit Ledger · Time-Stamped In/Out Logs & Verification Status",
    };
  }
  return {
    route: type === "product" ? "platform.production/overview" : "platform.production/details",
    caption: type === "product" ? "Production Application Interface" : "Secondary Platform Interface",
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = content.projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = content.projects[projectIndex];
  const nextProject =
    content.projects[(projectIndex + 1) % content.projects.length];

  return (
    <div className="min-h-screen bg-black text-white select-text flex flex-col justify-between relative selection:bg-white selection:text-black">
      <Header />
      <CinematicProgress />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16 w-full max-w-[1280px] mx-auto space-y-16 sm:space-y-24">
        {/* Navigation & Header */}
        <div id="overview">
          {/* Back Action */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to selected work</span>
            </Link>
          </div>

          <header className="space-y-6 pb-12 sm:pb-16 border-b border-white/10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-400 uppercase tracking-[0.2em]">
              <span className="w-2.5 h-2.5 bg-white" />
              <span>{project.category.toUpperCase()} CASE STUDY</span>
            </div>

            {/* Title with Serif Pairing */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-[-0.04em] text-white leading-[1.02]">
              {project.title.split(" ")[0]}{" "}
              {project.title.split(" ").length > 1 ? (
                <span className="font-serif italic font-normal text-neutral-200">
                  {project.title.split(" ").slice(1).join(" ")}
                </span>
              ) : (
                <span className="font-serif italic font-normal text-neutral-200">
                  Platform
                </span>
              )}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-normal leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Recruiter Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
              {/* Role */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08080a] border border-white/10 flex flex-col justify-between min-h-[110px] sm:min-h-[118px]">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Role</span>
                </span>
                <div>
                  <span className="font-sans font-semibold text-sm sm:text-base text-white leading-snug break-words block">
                    {project.role}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                    Direct Ownership
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08080a] border border-white/10 flex flex-col justify-between min-h-[110px] sm:min-h-[118px]">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Timeline</span>
                </span>
                <div>
                  <span className="font-sans font-semibold text-sm sm:text-base text-white block">
                    {project.timeline}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                    Active Lifecycle
                  </span>
                </div>
              </div>

              {/* Stack / Revenue & Users */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08080a] border border-white/10 flex flex-col justify-between min-h-[110px] sm:min-h-[118px]">
                {project.slug === "unniverse" ? (
                  <>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Revenue & Users</span>
                    </span>
                    <div>
                      <span className="font-sans font-semibold text-sm sm:text-base text-white block">
                        ₹3.5L · 1,500+ Students
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                        ₹99 Subscription Model
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Layers className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Stack</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5 items-center">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 6 && (
                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-white/[0.02] text-[10px] font-mono text-neutral-400">
                          +{project.stack.length - 6}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Status */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08080a] border border-white/10 flex flex-col justify-between min-h-[110px] sm:min-h-[118px]">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Status</span>
                </span>
                <div>
                  <span className="font-sans font-semibold text-sm sm:text-base text-white flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.status === "Concluded"
                          ? "bg-neutral-400"
                          : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                      } shrink-0`}
                    />
                    <span>{project.status || "Deployed"}</span>
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 block mt-1">
                    {project.slug === "unniverse"
                      ? "Concluded · MVP Stage"
                      : "Production Verified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-tight transition-all duration-300 ease-out hover:bg-neutral-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-95 overflow-hidden"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                  <span className="relative z-10 font-medium">Live Demo</span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 hover:border-white/30 bg-[#0e0e0e] hover:bg-white/[0.06] text-neutral-300 hover:text-white text-xs sm:text-sm font-mono transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                >
                  <Github className="w-4 h-4 text-neutral-400 group-hover:text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  <span>Source Code</span>
                </a>
              )}

              {!project.liveUrl && !project.githubUrl && (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>
                    {project.slug === "unniverse"
                      ? "Concluded Venture · 1,500+ Students · ₹3.5L Revenue"
                      : "Internal University Infrastructure · Restricted Access"}
                  </span>
                </div>
              )}
            </div>
          </header>
        </div>

        {/* 1. From Problem to Product (Operating Model Window) */}
        <ScrollReveal>
          <div
            id="blueprint"
            className="relative rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#08080a] p-6 sm:p-10 md:p-12 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Window Top Controls */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
                  From Problem to{" "}
                  <span className="font-serif italic font-normal text-neutral-200">
                    Product
                  </span>
                </span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-neutral-400 tracking-widest uppercase">
                FROM NEED TO PRODUCTION
              </div>
            </div>

            {/* 3-Column Structured Flow */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-11 gap-4 items-stretch mb-8">
              {/* Inputs */}
              <div className="lg:col-span-3 rounded-2xl border border-white/[0.08] bg-[#0c0c10]/90 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-blue-400/90 tracking-widest uppercase block mb-4">
                    INPUTS
                  </span>
                  <div className="space-y-2.5">
                    {(project.blueprint?.inputs || [
                      "Routine & focus decay",
                      "Fragmented tools & apps",
                      "Isolated friction points",
                    ]).map((input, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs sm:text-[13px] font-mono text-neutral-200"
                      >
                        {input}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector Arrow 1 */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-white/25">
                <span className="h-px w-full bg-gradient-to-r from-white/20 to-white/40" />
              </div>

              {/* Core Engine */}
              <div className="lg:col-span-3 rounded-2xl border border-white/[0.08] bg-[#0c0c10]/90 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 tracking-widest uppercase block mb-4">
                    CORE SYSTEM
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(project.blueprint?.coreEngine || project.stack.slice(0, 4)).map((engine, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-xs font-mono text-neutral-200 flex items-center justify-center text-center"
                      >
                        {engine}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector Arrow 2 */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-white/25">
                <span className="h-px w-full bg-gradient-to-r from-white/20 to-white/40" />
              </div>

              {/* Outputs */}
              <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-neutral-400 tracking-widest uppercase block mb-4">
                    OUTPUTS
                  </span>
                  <div className="space-y-2.5">
                    {(project.blueprint?.outputs || [
                      "Production Intelligence Layer",
                      "Operational Workflow Automation",
                      "Actionable Real-Time Insights",
                    ]).map((output, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-white/10 bg-white/[0.03] text-xs sm:text-[13px] font-mono text-neutral-200"
                      >
                        {output}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Phase Track */}
            <div className="relative z-10 grid grid-cols-3 gap-3 text-center pt-2">
              {(project.blueprint?.phases || ["1. INGEST", "2. PROCESS", "3. SHIP"]).map((phase, idx, arr) => (
                <div
                  key={idx}
                  className={`py-2.5 px-3 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-widest ${
                    idx === arr.length - 1
                      ? "border border-white/20 bg-white/[0.06] text-white font-semibold"
                      : "border border-white/[0.06] bg-white/[0.02] text-neutral-400"
                  }`}
                >
                  {phase}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 2. Visual Product Showcase: Laptop Mockup & Mobile Interface */}
        {project.screenshots && (
          <ScrollReveal>
            <div id="showcase" className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                    02 / PRODUCT SHOWCASE
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    Web Platform &amp;{" "}
                    <span className="font-serif italic font-normal text-neutral-200">
                      Mobile Interface
                    </span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span>Production Builds</span>
                </div>
              </div>

              {/* Laptop Mockup */}
              {project.screenshots.laptopMockup && (
                <div className="space-y-4">
                  <LaptopMockup
                    src={project.screenshots.laptopMockup}
                    alt={`${project.title} Web Platform`}
                  />
                  {project.slug !== "unniverse" && (
                    <div className="text-center">
                      <span className="text-xs font-mono text-neutral-400">
                        {project.liveUrl
                          ? `Live Platform · ${project.liveUrl.replace("https://", "").replace(/\/$/, "")}`
                          : project.slug === "gatewise"
                          ? "Enterprise Internal System · Starex University Security Portal"
                          : `${project.title} Platform Showcase`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Product Showcase */}
              {project.screenshots.productShowcase && (() => {
                const meta = getShowcaseMeta(project.slug, "product");
                return (
                  <div className="space-y-4 pt-4">
                    <div className="relative w-full rounded-[22px] sm:rounded-[30px] overflow-hidden border border-white/10 bg-[#08080a] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                      {/* Browser Window Header */}
                      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/[0.08] bg-[#0d0d12]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        </div>
                        {meta.route ? (
                          <div className="px-3 sm:px-4 py-1 rounded-full border border-white/[0.08] bg-black/40 text-[11px] sm:text-xs font-mono text-neutral-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                            <span className="truncate max-w-[200px] sm:max-w-xs">{meta.route}</span>
                          </div>
                        ) : (
                          <div className="px-3 sm:px-4 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] sm:text-xs font-mono text-neutral-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                            <span>Internal Access Only</span>
                          </div>
                        )}
                        <div className="w-10 sm:w-14" />
                      </div>

                      {/* Display 100% uncropped image */}
                      <div className="relative w-full bg-[#0d0d10]">
                        <Image
                          src={project.screenshots.productShowcase}
                          alt={`${project.title} Product Interface`}
                          width={1024}
                          height={488}
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className="w-full h-auto block object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-mono text-neutral-400">
                        {meta.caption}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Secondary Showcase (e.g. AI Investigation / Live Tracking) */}
              {project.screenshots.secondaryShowcase && (() => {
                const meta = getShowcaseMeta(project.slug, "secondary");
                return (
                  <div className="space-y-4 pt-4">
                    <div className="relative w-full rounded-[22px] sm:rounded-[30px] overflow-hidden border border-white/10 bg-[#08080a] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                      {/* Browser Window Header */}
                      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b border-white/[0.08] bg-[#0d0d12]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                        </div>
                        {meta.route ? (
                          <div className="px-3 sm:px-4 py-1 rounded-full border border-white/[0.08] bg-black/40 text-[11px] sm:text-xs font-mono text-neutral-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                            <span className="truncate max-w-[200px] sm:max-w-xs">{meta.route}</span>
                          </div>
                        ) : (
                          <div className="px-3 sm:px-4 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] sm:text-xs font-mono text-neutral-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                            <span>Internal Access Only</span>
                          </div>
                        )}
                        <div className="w-10 sm:w-14" />
                      </div>

                      {/* Display 100% uncropped image */}
                      <div className="relative w-full bg-[#0d0d10]">
                        <Image
                          src={project.screenshots.secondaryShowcase}
                          alt={`${project.title} Interface Details`}
                          width={1024}
                          height={488}
                          sizes="(max-width: 1200px) 100vw, 1200px"
                          className="w-full h-auto block object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-mono text-neutral-400">
                        {meta.caption}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </ScrollReveal>
        )}

        {/* 3. The Problem & Friction Matrix */}
        <ScrollReveal>
          <div
            id="friction"
            className="relative rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#08080a] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl"
          >
            {/* Window Top Bar */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                  Problem vs.{" "}
                  <span className="font-serif italic font-normal text-neutral-200">
                    Resolution Matrix
                  </span>
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-neutral-400 tracking-widest uppercase">
                FRICTION ANALYSIS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {(project.frictions || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c0c10] space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider mb-2">
                      <XCircle className="w-4 h-4" />
                      <span>{item.tag}</span>
                    </div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item.problem}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Resolution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200">
                      {item.resolution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 4. What We Deliberately Rejected (Scope Discipline Window) */}
        {project.rejectedFeatures && project.rejectedFeatures.length > 0 && (
          <ScrollReveal>
            <div
              id="rejections"
              className="relative rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#08080a] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                    Scope Discipline:{" "}
                    <span className="font-serif italic font-normal text-rose-300">
                      Features Killed
                    </span>
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/[0.04] text-[11px] font-mono text-rose-400 tracking-widest uppercase">
                  WHAT WE SAID NO TO
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c10]">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      <th className="py-4 px-6 w-[28%]">Considered Feature</th>
                      <th className="py-4 px-6 w-[42%]">Why We Rejected It (Ifs &amp; Buts)</th>
                      <th className="py-4 px-6 w-[30%]">What We Shipped Instead</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {project.rejectedFeatures.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.015] transition-colors">
                        <td className="py-5 px-6 align-top">
                          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
                            <span className="line-through decoration-rose-400/60 font-medium text-neutral-200">
                              {item.feature}
                            </span>
                          </div>
                        </td>
                        <td className="py-5 px-6 align-top text-neutral-300 leading-relaxed text-[13px] sm:text-sm">
                          {item.whyRejected}
                        </td>
                        <td className="py-5 px-6 align-top">
                          <div className="flex items-start gap-2 text-neutral-300 text-xs sm:text-[13px] font-mono leading-relaxed bg-white/[0.03] border border-white/10 p-2.5 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                            <span className="text-neutral-200 font-sans">
                              {item.shippedAlternative}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card-Based Breakdown */}
              <div className="md:hidden space-y-4">
                {project.rejectedFeatures.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0c0c10] border border-white/10 space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="line-through decoration-rose-400/60 font-medium text-neutral-200">
                        {item.feature}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                        Why Rejected
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {item.whyRejected}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06]">
                      <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Shipped Instead</span>
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                        {item.shippedAlternative}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* 5. PM Leadership & Direct Ownership */}
        <ScrollReveal>
          <div
            id="ownership"
            className="relative rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#08080a] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl"
          >
            {/* Window Top Controls */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                  {project.role.includes("Developer") || project.role.includes("Architect")
                    ? "Engineering & Architecture"
                    : "Product Manager"}{" "}
                  <span className="font-serif italic font-normal text-neutral-200">
                    Ownership
                  </span>
                </span>
              </div>
              <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono text-neutral-400 tracking-widest uppercase">
                LEADERSHIP &amp; EXECUTION
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.myRole.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0c0c10] border border-white/[0.08] flex items-start gap-3.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 6. Architectural Trade-offs & Production Deliverables */}
        <ScrollReveal>
          <div id="deliverables" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Architectural Trade-offs */}
            <div className="rounded-[28px] border border-white/10 bg-[#08080a] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <h3 className="font-sans font-bold text-xl text-white">
                  Architectural{" "}
                  <span className="font-serif italic font-normal text-neutral-200">
                    Trade-offs
                  </span>
                </h3>
              </div>

              <div className="space-y-4">
                {project.keyDecisions?.map((kd, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0c0c10] border border-white/[0.08] space-y-2"
                  >
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {kd.decision}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300">
                      <strong className="text-white">Why: </strong>
                      {kd.rationale}
                    </p>
                    <p className="text-xs text-neutral-400">
                      <strong className="text-neutral-300">Trade-off: </strong>
                      {kd.tradeoff}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipped Deliverables */}
            <div className="rounded-[28px] border border-white/10 bg-[#08080a] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <h3 className="font-sans font-bold text-xl text-white">
                  Shipped{" "}
                  <span className="font-serif italic font-normal text-neutral-300">
                    Deliverables
                  </span>
                </h3>
              </div>

              <div className="space-y-3">
                {project.whatIShipped.map((ship, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0c0c10] border border-white/[0.08] text-xs sm:text-sm font-mono text-neutral-200 flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-400 shrink-0" />
                    <span>{ship}</span>
                  </div>
                ))}
              </div>

              {project.results?.summary && (
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-mono text-neutral-300">
                  ● {project.results.summary}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Next Project Action (Hidden for Unniverse as the final project) */}
        {project.slug !== "unniverse" && (
          <ScrollReveal className="pt-8">
            <Link
              href={`/work/${nextProject.slug}`}
              className="group block p-7 sm:p-9 rounded-[28px] bg-[#08080a] border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-neutral-400 uppercase block mb-1">
                    Next Case Study
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                    {nextProject.title}
                  </h4>
                  <p className="mt-1 text-sm text-neutral-400 line-clamp-1">
                    {nextProject.tagline}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}
      </main>

      <Footer />
    </div>
  );
}
