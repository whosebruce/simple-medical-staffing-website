import { BUSINESS_FACTS, LEADERSHIP_ROLES } from "./brand";
import { SITE_ORIGIN, absoluteUrl, breadcrumbTrail, routeFor } from "./site-routes";

// Schema.org JSON-LD for the public site. Every value here is a fact that is
// visible on the site (name, phone, email, address, founder name and title,
// the three services and their on-page descriptions). Nothing is asserted that
// the pages do not state: no ratings, hours, service area, prices, awards,
// social profiles or job postings.

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const LOGO_ID = `${SITE_ORIGIN}/#logo`;
const FOUNDER_ID = `${SITE_ORIGIN}/#founder`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const SERVICE_IDS = {
  contract: `${SITE_ORIGIN}/solutions/contract-staffing/#service`,
  perDiem: `${SITE_ORIGIN}/solutions/per-diem-staffing/#service`,
  directPlacement: `${SITE_ORIGIN}/solutions/direct-placement/#service`,
} as const;

export const SERVICES = [
  {
    id: SERVICE_IDS.contract,
    path: "/solutions/contract-staffing/",
    name: "Contract staffing",
    serviceType: "Contract healthcare staffing",
    description:
      "Longer-term placements for sustained coverage: professionals who join your team, learn your unit, and stay through the assignment.",
  },
  {
    id: SERVICE_IDS.perDiem,
    path: "/solutions/per-diem-staffing/",
    name: "Per-diem staffing",
    serviceType: "Per-diem healthcare staffing",
    description: "Shift-by-shift coverage: you tell us the gap, we look for the match, you confirm it.",
  },
  {
    id: SERVICE_IDS.directPlacement,
    path: "/solutions/direct-placement/",
    name: "Direct placement",
    serviceType: "Direct placement healthcare staffing",
    description: "Permanent hires selected for fit with your team, not just a resume that matches the requisition.",
  },
] as const;

const founder = LEADERSHIP_ROLES[0];

function organizationNodes() {
  return [
    {
      "@type": "EmploymentAgency",
      "@id": ORG_ID,
      name: BUSINESS_FACTS.name,
      url: `${SITE_ORIGIN}/`,
      telephone: `+1-${BUSINESS_FACTS.phone}`,
      email: BUSINESS_FACTS.email,
      logo: { "@id": LOGO_ID },
      image: { "@id": LOGO_ID },
      address: {
        "@type": "PostalAddress",
        streetAddress: "3333 Michelson Drive, Suite 300",
        addressLocality: "Irvine",
        addressRegion: "CA",
        postalCode: "92612",
        addressCountry: "US",
      },
      founder: { "@id": FOUNDER_ID },
      makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@id": s.id } })),
    },
    {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${SITE_ORIGIN}/kindred/icons/logo-512.png`,
      contentUrl: `${SITE_ORIGIN}/kindred/icons/logo-512.png`,
      width: 512,
      height: 512,
      caption: BUSINESS_FACTS.name,
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: founder.name,
      jobTitle: founder.title,
      worksFor: { "@id": ORG_ID },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: BUSINESS_FACTS.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    ...SERVICES.map((s) => ({
      "@type": "Service",
      "@id": s.id,
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      provider: { "@id": ORG_ID },
      url: absoluteUrl(s.path),
    })),
  ];
}

export type PageSchemaOptions = {
  /** Canonical path with trailing slash (must exist in PUBLIC_ROUTES). */
  path: string;
  /** Full document title as rendered in <title>. */
  title: string;
  description: string;
  /** WebPage subtype where one applies. */
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage";
  /** @ids of Service nodes this page is primarily about. */
  aboutServices?: readonly string[];
  /** Extra nodes appended to the graph (already fully formed). */
  extraNodes?: readonly Record<string, unknown>[];
};

/** Complete @graph for one page: organization, founder, website, services, this page and its breadcrumb. */
export function pageGraph(options: PageSchemaOptions) {
  const route = routeFor(options.path);
  const url = absoluteUrl(route.path);
  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;
  const trail = breadcrumbTrail(route.path);

  const webPage: Record<string, unknown> = {
    "@type": options.pageType ?? "WebPage",
    "@id": pageId,
    url,
    name: options.title,
    description: options.description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
  if (options.aboutServices?.length) {
    webPage.about = options.aboutServices.map((id) => ({ "@id": id }));
  } else {
    webPage.about = { "@id": ORG_ID };
  }
  if (route.path === "/about/") webPage.mentions = { "@id": FOUNDER_ID };

  const nodes: Record<string, unknown>[] = [...organizationNodes(), webPage];

  if (trail.length > 1) {
    webPage.breadcrumb = { "@id": breadcrumbId };
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: trail.map((r, i) =>
        i === trail.length - 1
          ? { "@type": "ListItem", position: i + 1, name: r.label }
          : { "@type": "ListItem", position: i + 1, name: r.label, item: absoluteUrl(r.path) },
      ),
    });
  }

  if (options.extraNodes) nodes.push(...options.extraNodes);

  return { "@context": "https://schema.org", "@graph": nodes };
}
