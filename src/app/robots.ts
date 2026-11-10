import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// /how-to/ holds the videos the app plays by URL. They are public files, but they
// are made to be watched inside the app, so search engines are asked to stay out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/how-to/" },
    sitemap: "https://simplemedicalstaffing.com/sitemap.xml",
  };
}
