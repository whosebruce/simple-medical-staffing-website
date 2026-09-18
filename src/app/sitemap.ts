import type { MetadataRoute } from "next";
import { SITE_ORIGIN, SITEMAP_ROUTES } from "@/lib/site-routes";

export const dynamic = "force-static";

// Every <loc> is the exact canonical URL the page serves (trailing slash, as
// configured by `trailingSlash: true`), so no sitemap entry redirects.
// changefreq/priority are hints Google documents as ignored; they are kept
// out rather than published as noise. lastmod is omitted because there is no
// truthful per-page modification date in a static export.
export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map((path) => ({ url: `${SITE_ORIGIN}${path}` }));
}
