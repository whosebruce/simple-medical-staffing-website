import type { Metadata } from "next";
import { routeFor } from "./site-routes";

// Default share card: 1200x630 PNG rendered from the approved mark, colours
// and fonts by scripts/build-share-image.mjs.
export const SHARE_IMAGE = {
  url: "/kindred/share/og-default.png",
  width: 1200,
  height: 630,
  alt: "Simple Medical Staffing. Bringing You Success Through People. Contract, per-diem, direct placement.",
} as const;

export const SITE_TITLE_SUFFIX = " | Simple Medical Staffing";

/** Full document title as rendered in <title> (root layout template). */
export function documentTitle(title: string): string {
  return `${title}${SITE_TITLE_SUFFIX}`;
}

/**
 * Per-page metadata: canonical, title, description, and Open Graph / Twitter
 * fields that describe THIS page (og:url and og:title previously inherited the
 * home page values on every route).
 */
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  const route = routeFor(path);
  const fullTitle = documentTitle(title);
  return {
    title,
    description,
    alternates: { canonical: route.path },
    openGraph: {
      type: "website",
      siteName: "Simple Medical Staffing",
      locale: "en_US",
      url: route.path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
