import React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { AboutEducation } from "@/components/sections/AboutEducation";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WorkHistory } from "@/components/sections/WorkHistory";
import { Skillset } from "@/components/sections/Skillset";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white select-text p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col items-center justify-start overflow-x-clip relative">
      <Header />
      <Hero />
      <Marquee />
      <AboutEducation />
      <SelectedWork />
      <WorkHistory />
      <Skillset />
      <Footer />
    </div>
  );
}
