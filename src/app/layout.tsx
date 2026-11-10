import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { content } from "@/data/content";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://umangbanerjee.com"),
  title: {
    default: `${content.personal.name} — Product Thinker & Technology Builder`,
    template: `%s | ${content.personal.name}`,
  },
  description: content.personal.bio,
  authors: [{ name: content.personal.name, url: "https://umangbanerjee.com" }],
  creator: content.personal.name,
  keywords: [
    "Umang Banerjee",
    "Product Manager",
    "Software Engineer",
    "Full-Stack Developer",
    "LifeTrack Pro",
    "OneTrack",
    "RailKhoj",
    "GateWise",
    "Unniverse",
    "MarketFlow",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umangbanerjee.com",
    title: `${content.personal.name} — Product Thinker & Technology Builder`,
    description: content.personal.bio,
    siteName: `${content.personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.personal.name} — Product Thinker & Technology Builder`,
    description: content.personal.bio,
    creator: "@umangb_70",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
