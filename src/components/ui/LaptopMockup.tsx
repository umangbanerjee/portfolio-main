import React from "react";
import Image from "next/image";

interface LaptopMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * LaptopMockup: High-fidelity MacBook-style laptop frame for showcasing
 * live web applications and dashboards with realistic titanium bevel,
 * webcam notch, thumb recess, and ambient display reflection.
 */
export function LaptopMockup({
  src,
  alt,
  className = "",
  priority = false,
}: LaptopMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-4xl select-none ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-b from-white/[0.05] via-white/[0.01] to-transparent rounded-[32px] blur-2xl pointer-events-none" />

      {/* Screen Frame (Laptop Display) */}
      <div className="relative rounded-t-[18px] sm:rounded-t-[24px] border-[8px] sm:border-[12px] border-[#18181b] bg-[#09090b] shadow-[0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Top Bezel with Webcam Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#27272a] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#050505] ring-1 ring-white/10" />
          </div>
        </div>

        {/* Display Screen with Image */}
        <div className="relative w-full overflow-hidden bg-[#0d0d10]">
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={488}
            sizes="(max-width: 1024px) 100vw, 900px"
            className="w-full h-auto block object-contain transition-transform duration-500"
            priority={priority}
            unoptimized
          />
          {/* Subtle Screen Sheen Reflection */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04]" />
        </div>
      </div>

      {/* Laptop Base (Chassis) */}
      <div className="relative mx-auto h-3 sm:h-4 w-[105%] -left-[2.5%] rounded-b-xl bg-gradient-to-b from-[#27272a] via-[#1c1c1f] to-[#0d0d0f] shadow-[0_15px_30px_rgba(0,0,0,0.8)] border-t border-white/15">
        {/* Thumb Opening Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1.5 sm:h-2 bg-[#3f3f46] rounded-b-md shadow-inner" />
      </div>

      {/* Base Shadow & Reflection */}
      <div className="mx-auto w-[85%] h-5 bg-black/80 blur-lg -mt-1" />
    </div>
  );
}

