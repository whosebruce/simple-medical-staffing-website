// Single registry of the public routes. The sitemap, breadcrumbs, JSON-LD and
// the verifiers all read from here so a page cannot be added to one surface
// and forgotten on another.
export const SITE_ORIGIN = "https://simplemedicalstaffing.com";

export type PublicRoute = {
  /** Canonical path with trailing slash. */
  readonly path: string;
  /** Short label used for breadcrumbs and BreadcrumbList names. */
  readonly label: string;
  /** Parent path for breadcrumbs (null for the home page). */
  readonly parent: string | null;
};

export const PUBLIC_ROUTES: readonly PublicRoute[] = [
  { path: "/", label: "Home", parent: null },
  { path: "/solutions/", label: "Staffing Solutions", parent: "/" },
  { path: "/solutions/contract-staffing/", label: "Contract Staffing", parent: "/solutions/" },
  { path: "/solutions/per-diem-staffing/", label: "Per-Diem Staffing", parent: "/solutions/" },
  { path: "/solutions/direct-placement/", label: "Direct Placement", parent: "/solutions/" },
  { path: "/solutions/staffing-request-checklist/", label: "Staffing Request Checklist", parent: "/solutions/" },
  { path: "/professionals/", label: "For Professionals", parent: "/" },
  { path: "/professionals/faq/", label: "Candidate FAQ", parent: "/professionals/" },
  { path: "/about/", label: "About", parent: "/" },
  { path: "/contact/", label: "Contact", parent: "/" },
  { path: "/apply/", label: "Apply Now", parent: "/" },
  { path: "/privacy/", label: "Privacy", parent: "/" },
] as const;

/** Paths listed in sitemap.xml: every indexable canonical page, in this order. */
export const SITEMAP_ROUTES: readonly string[] = PUBLIC_ROUTES.map((r) => r.path);

export function routeFor(path: string): PublicRoute {
  const route = PUBLIC_ROUTES.find((r) => r.path === path);
  if (!route) throw new Error(`Unknown public route: ${path}`);
  return route;
}

/** Breadcrumb trail from Home to `path`, inclusive. */
export function breadcrumbTrail(path: string): PublicRoute[] {
  const trail: PublicRoute[] = [];
  let current: PublicRoute | null = routeFor(path);
  while (current) {
    trail.unshift(current);
    current = current.parent ? routeFor(current.parent) : null;
  }
  return trail;
}

export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}
