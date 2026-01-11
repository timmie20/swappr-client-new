import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, QueryProvider } from "@/providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/Switzer-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://swappr.com",
  ),
  title: {
    template: "%s | Swappr",
    default: "Swappr | Nigeria's First Phone Valuation System",
  },
  description:
    "Trade, buy and sell phones with instant valuations. Get the best prices for your devices in Nigeria.",
  keywords: [
    "phone trade-in Nigeria",
    "sell phone Lagos",
    "buy used phones",
    "phone valuation",
    "iphone worth",
    "device trade-in",
    "phone exchange Nigeria",
    "smartphone marketplace",
  ],
  authors: [{ name: "Swappr Team", url: "https://swappr.com" }],
  creator: "Swappr",
  publisher: "Swappr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://swappr.com",
    siteName: "Swappr",
    title: "Swappr | Nigeria's First Phone Valuation System",
    description:
      "Trade, buy and sell phones with instant valuations. Get the best prices for your devices.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swappr - Phone Trade-in Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swappr | Nigeria's First Phone Valuation System",
    description: "Trade, buy and sell phones with instant valuations",
    creator: "@swappr",
    images: ["/twitter-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Swappr",
    url: "https://swappr.com",
    logo: "https://swappr.com/logo.png",
    description:
      "Nigeria's first phone valuation system for trading, buying, and selling devices",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
      addressLocality: "Lagos",
    },
    sameAs: [
      "https://twitter.com/swappr",
      "https://facebook.com/swappr",
      "https://instagram.com/swappr",
    ],
  };

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body
          className={`${switzer.variable} ${inter.variable} font-sans antialiased`}
        >
          {/* Animated background positioned at top right */}
          <div className="animated-mesh-gradient-background pointer-events-none fixed top-0 right-0 z-50 size-75 rounded-full opacity-30 blur-3xl md:size-125" />

          {/* Animated background positioned at bottom left */}
          <div className="animated-mesh-gradient-background-reverse pointer-events-none fixed bottom-0 left-0 z-50 hidden size-125 rounded-full opacity-30 blur-3xl md:block" />

          <QueryProvider>
            <main className="relative z-10">{children}</main>
            <Toaster position="top-center" />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
