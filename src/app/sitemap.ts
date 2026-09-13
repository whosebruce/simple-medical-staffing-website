import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://simplemedicalstaffing.com";
  return ["", "/solutions", "/professionals", "/about", "/contact", "/apply", "/privacy"].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "/contact" || path === "/apply" ? 0.9 : 0.8,
    }),
  );
}
