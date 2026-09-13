import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito_Sans } from "next/font/google";
import { BUSINESS_FACTS } from "@/lib/brand";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://simplemedicalstaffing.com"),
  title: {
    default: "Simple Medical Staffing | Healthcare Staffing",
    template: "%s | Simple Medical Staffing",
  },
  description,
  icons: {
    icon: "/kindred/logos/kindred-mark.svg",
    apple: "/kindred/logos/kindred-mark.svg",
  },
  openGraph: {
    type: "website",
    url: "https://simplemedicalstaffing.com",
    siteName: BUSINESS_FACTS.name,
    title: "Simple Medical Staffing | Healthcare Staffing",
    description,
    images: [
      {
        url: "/kindred/campaign/home-hero-handoff.webp",
        width: 1536,
        height: 1024,
        alt: "Healthcare professionals in conversation at a unit workstation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Medical Staffing | Healthcare Staffing",
    description,
    images: ["/kindred/campaign/home-hero-handoff.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a6e",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: BUSINESS_FACTS.name,
    url: "https://simplemedicalstaffing.com",
    telephone: BUSINESS_FACTS.phone,
    email: BUSINESS_FACTS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3333 Michelson Drive, Suite 300",
      addressLocality: "Irvine",
      addressRegion: "CA",
      postalCode: "92612",
      addressCountry: "US",
    },
  };

  return (
    <html lang="en" className={`${montserrat.variable} ${nunitoSans.variable}`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
