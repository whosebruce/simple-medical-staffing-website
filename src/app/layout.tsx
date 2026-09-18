import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import { BUSINESS_FACTS } from "@/lib/brand";
import { SITE_ORIGIN } from "@/lib/site-routes";
import { SHARE_IMAGE } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const description =
  "Healthcare staffing for contract, per-diem, and direct-placement needs across Southern California.";

// Every page overrides title/description/canonical/og:url through
// src/lib/seo.ts pageMetadata(); the share image (1200x630 PNG rendered by
// scripts/build-share-image.mjs) is shared.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Simple Medical Staffing | Healthcare Staffing",
    template: "%s | Simple Medical Staffing",
  },
  description,
  icons: {
    icon: [
      { url: "/kindred/logos/kindred-mark.svg", type: "image/svg+xml" },
      { url: "/kindred/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/kindred/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/kindred/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/kindred/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: BUSINESS_FACTS.name,
    title: "Simple Medical Staffing | Healthcare Staffing",
    description,
    locale: "en_US",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Medical Staffing | Healthcare Staffing",
    description,
    images: [SHARE_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a6e",
  colorScheme: "light",
};

// Structured data is emitted per page (src/components/site/StructuredData.tsx)
// so the WebPage node always matches that page's title, description and
// breadcrumb; the organization, founder, website and service nodes are part of
// every page's graph.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunitoSans.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
