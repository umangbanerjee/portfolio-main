import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#EBEAE8",
          card: "#F4F3F1",
          ink: "#111111",
          muted: "#666666",
          faint: "#999999",
          border: "rgba(0, 0, 0, 0.08)",
        },
        violet: {
          deep: "#3D1F6B",
          soft: "#6B4A9E",
          tint: "#EFE9F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["'Instrument Serif'", "Georgia", "Cambria", "'Times New Roman'", "serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;

