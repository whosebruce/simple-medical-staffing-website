// Requirement matrix for the 2026-09-17 owner copy changes (TASK-20260917-04).
//
// Every entry is one requested change: the exact replacement copy that must be
// present in the generated page and the retired wording that must be absent.
// `scripts/verify-copy.mjs` evaluates this matrix against the GitHub Pages
// artifact in docs/ (rendered HTML plus the RSC payload), so a source-only
// change that never reached the build fails the gate.
//
// Strings are the owner's supplied copy as polished by the 2026-09-18
// editorial pass: meaning, facts and terminology are the owner's; em dashes
// were rewritten as commas, periods or colons.

export const APPLICATION_CONTACT = "info@simplemedicalstaffing.com";

/**
 * The live web app (src/lib/app-links.ts). Bruce, 2026-11-08: online
 * applications are on, Sign In sits in the header and footer, and every
 * "Apply Now" goes straight to the app's application. With the two social
 * profiles these are the only outside links (scripts/verify-site.mjs); they
 * open in the same tab.
 */
export const APP_LINKS = {
  signIn: "https://app.simplemedicalstaffing.com/account/sign-in",
  apply: "https://app.simplemedicalstaffing.com/apply",
};

// Every indexable canonical route (mirrors src/lib/site-routes.ts, which the
// site verifier cross-checks against sitemap.xml).
export const PUBLIC_ROUTES = [
  "/",
  "/solutions",
  "/solutions/contract-staffing",
  "/solutions/per-diem-staffing",
  "/solutions/direct-placement",
  "/solutions/staffing-request-checklist",
  "/professionals",
  "/professionals/faq",
  "/about",
  "/contact",
  "/apply",
  "/app",
  "/privacy",
  "/support",
];

export const REQUIREMENTS = [
  {
    id: "R01",
    title: "Professionals section heading",
    route: "/professionals",
    present: ["The right professionals for every level of care"],
    absent: ["Ten disciplines, one front door", "one front door"],
  },
  {
    id: "R02",
    title: "Professionals section eyebrow",
    route: "/professionals",
    present: ["Healthcare professionals we provide."],
    absent: ["Disciplines we staff"],
  },
  {
    id: "R04",
    title: "Solutions services heading",
    route: "/solutions",
    present: ["Flexible solutions built around your needs."],
    absent: ["Three services, one way of working", "one way of working"],
  },
  {
    id: "R05",
    title: "Solutions partner paragraph",
    route: "/solutions",
    present: [
      "A partner, not a portal.",
      "Staffing shouldn't create more work for your leadership team. We provide responsive, hands-on support to help you maintain coverage, strengthen your workforce, and keep your focus where it belongs: on quality care.",
    ],
    absent: [
      "Directors of nursing and administrators answer for coverage and quality",
    ],
  },
  {
    id: "R06",
    title: "Professionals hero heading",
    route: "/professionals",
    present: ["Your skills. Your schedule. The right opportunity."],
    absent: ["Our job is the match"],
  },
  {
    id: "R07",
    title: "Professionals intro paragraph",
    route: "/professionals",
    present: [
      "Whether you're looking for per-diem flexibility, a contract opportunity, or your next permanent role, we connect you with opportunities that fit your experience, availability, and goals.",
    ],
    absent: [
      "Contract, per-diem, or permanent. Tell us what you're looking for, and a coordinator will work on the match with you.",
    ],
  },
  {
    id: "R08",
    title: "Professionals hero secondary action",
    route: "/professionals",
    present: ["Talk to Our Team"],
    absent: ["Ask a question", "Talk to our team."],
  },
  {
    id: "R09",
    title: "Professionals card: real person",
    route: "/professionals",
    present: ["Talk to a real person."],
    absent: ["Talk to a person"],
  },
  {
    id: "R10",
    title: "Professionals card: flexibility",
    route: "/professionals",
    present: ["Flexibility that fits your lifestyle."],
    absent: ["Three ways to work"],
  },
  {
    id: "R11",
    title: "Professionals card: communication",
    route: "/professionals",
    present: ["Clear, honest communication."],
    absent: ["Straight answers"],
  },
  {
    id: "R12",
    title: "Professionals first-day heading",
    route: "/professionals",
    present: ["Start confident. Stay supported."],
    absent: ["start cold"],
  },
  {
    id: "R14",
    title: "About headline",
    route: "/about",
    present: [
      "We’re building stronger healthcare teams, one relationship at a time.",
    ],
    absent: ["not line items"],
  },
  {
    id: "R15",
    title: "About intro paragraph",
    route: "/about",
    present: [
      "Simple Medical Workforce Solutions was built on a simple belief: healthcare staffing should be personal. We connect qualified healthcare professionals with facilities that need dependable people, while building relationships with both sides of every placement. Because great staffing isn’t just about filling a shift. It’s about finding the right fit.",
    ],
    absent: ["Warm where the industry is transactional"],
  },
  {
    id: "R16",
    title: "Leadership heading",
    route: "/about",
    present: ["The people behind our purpose"],
    absent: ["The people behind the matches"],
  },
  {
    id: "R17",
    title: "Dina column: Experience",
    route: "/about",
    present: [
      "Experience",
      "With more than two decades of healthcare experience, Dina Casares brings firsthand knowledge of patient care, workforce development, and healthcare leadership. She began her career as a Certified Nursing Assistant and advanced to become a Licensed Vocational Nurse, serving in leadership roles across skilled nursing and other healthcare settings.",
    ],
    absent: [
      "Dina Casares is the Founder and Chief Executive Officer of Simple Medical Staffing, a healthcare workforce solutions company",
    ],
  },
  {
    id: "R18",
    title: "Dina column: The Why",
    route: "/about",
    present: [
      "The Why",
      "After seeing firsthand how staffing shortages affect healthcare professionals, leadership teams, and the quality of care, Dina knew staffing could be done differently. She founded Simple Medical to create more than another staffing agency. She wanted to build a workforce partner that understands the realities of healthcare and the people behind every shift.",
    ],
    absent: ["Dina brings together clinical practice and executive leadership"],
  },
  {
    id: "R19",
    title: "Dina column: The Vision",
    route: "/about",
    present: [
      "The Vision",
      "Today, Dina is building Simple Medical around relationships, reliability, and the right fit. Her vision is to help facilities build stronger, more stable teams while ensuring healthcare professionals feel valued, supported, and respected, not simply placed.",
    ],
    absent: ["Her leadership philosophy centers on integrity"],
  },
  {
    id: "T01",
    title: "Team cards: Brandon and Alexis, first names only (Dina, 2026-10-07)",
    route: "/about",
    present: ["Our Team", "Brandon", "Chief Operating Officer", "Alexis", "Staffing Coordinator"],
    absent: ["pending client confirmation"],
  },
  {
    id: "R13",
    title: "Application contact destination",
    route: "/apply",
    present: [APPLICATION_CONTACT, "Email · Applications", `href="mailto:${APPLICATION_CONTACT}"`],
    absent: [`mailto:${APPLICATION_CONTACT}?`],
  },
  // 2026-11-07 (App Store submission): /privacy is the privacy policy for the
  // website AND the SMWS app (the App Store listing and the app link here), and
  // /support is the app's help page. Still no Terms page (SITEWIDE_ABSENT L02).
  {
    id: "L01",
    title: "Privacy is the in-effect policy for the website and the SMWS app, not a review draft",
    route: "/privacy",
    present: [
      "Privacy Policy",
      "Covers this website and the SMWS app.",
      "operated by True Spirit, LLC",
      "We do not sell your personal information or share it for advertising.",
      "We delete your account within 30 days.",
      "The app does not collect your location, contacts or browsing activity",
    ],
    absent: ["Review draft", "Not Approved", "Not Binding", "For client and counsel review", "Website Privacy Notice", "It does not currently accept online applications"],
  },
  {
    id: "L04",
    title: "Help page: the app's sign-in code and in-app account deletion",
    route: "/support",
    present: ["Help With the SMWS App", "Email Me a Sign-In Code", "Delete My Account", "We delete your account within 30 days."],
    absent: ["Review draft"],
  },
  // BM-20260925-33 review: the home note under the hero gives the phone and
  // email to use now (tel link plus plain-text address, no second mailto).
  // 2026-11-08 (web app open, Bruce): it no longer says the platform is
  // "still being built"; it says professionals can apply and sign in online.
  {
    id: "H01",
    title: "Home note: professionals apply and sign in online; the phone and email for everything else",
    route: "/",
    present: [
      "Healthcare professionals can now apply and sign in online in",
      ">our web app</a>. For staffing requests and anything else, call",
    ],
    absent: ["still being built", "For now, our team handles every request directly", "every request directly by phone and email"],
  },
  // 2026-11-08 (Bruce): online applications are on. /apply stays for old
  // links: one button into the app's application, then the phone and email,
  // with the sensitive-documents caution. The app's /apply has no
  // save-and-finish-later, so the page doesn't promise one.
  {
    id: "A01",
    title: "Apply page: Start Your Application in the app, phone and email as the other way in",
    route: "/apply",
    present: [
      "Apply online in our app. Start with a short application: the basics and the role you want. If it looks like a fit, we'll email you a private link to complete your full application.",
      `href="${APP_LINKS.apply}"`,
      "Start Your Application",
      "Prefer to talk first? Call or email our team.",
      "Please do not email medical records, Social Security numbers, license images, patient information, or other sensitive documents.",
    ],
    absent: ["being rebuilt", "when the new application process is ready", "Call or email to express interest"],
  },
  {
    id: "A02",
    title: "App page: the web app is open now (Sign In on the Web); the iPhone app is coming to the App Store soon",
    route: "/app",
    present: [
      "Open now",
      "Our web app is open now for healthcare professionals and our office team.",
      "Sign In on the Web",
      `href="${APP_LINKS.signIn}"`,
      "What you can do in your web browser now",
      "The iPhone app is coming to the App Store soon.",
    ],
    absent: ["Coming soon", "almost ready", "When it opens", "What you'll be able to do", "You don't have to wait for the app", "apps.apple.com"],
  },
  {
    id: "A03",
    title: "Candidate FAQ: how to apply online",
    route: "/professionals/faq",
    present: ["Apply online. Start with a short", "If it looks like a fit, we'll email you a private link to complete your full application."],
    absent: ["being rebuilt", "for now the way in is a call or an email"],
  },
];

/** Legal review drafts held for owner approval: nothing is generated at these routes. */
export const HELD_LEGAL_ROUTES = ["/terms"];

/**
 * The two public social profiles (src/lib/social-profiles.ts). A public
 * profile match is not proof of ownership; Dina confirms before release.
 */
export const SOCIAL_LINKS = [
  "https://www.instagram.com/simplemedicalstaffing/",
  "https://www.facebook.com/p/Simple-Medical-Staffing-61552041984507/",
];

/**
 * Strings every public route must carry (TASK-20260923-03 redesign): the
 * truthful imagery disclosure (all site photographs are generated
 * illustrations) and the multi-column footer's headings.
 */
export const SITEWIDE_PRESENT = [
  {
    id: "F01",
    title: "Approved main line and Southern California coverage/facility wording",
    present: ["+1 (760) 536-2178", "Serving all of Southern California", "San Diego, Orange County, Los Angeles County, and the Inland Empire", "Our primary focus is San Diego", "For SNF, rehab centers, and hospitals", 'href="tel:+17605362178"'],
  },
  {
    id: "R20",
    title: "Imagery disclosure in the footer",
    present: [
      "Images on this site are illustrative and do not show actual Simple Medical Workforce Solutions staff, healthcare professionals, or client facilities.",
    ],
  },
  {
    id: "R21",
    title: "Footer columns",
    present: ["For Facilities", "For Professionals", "Company", "Get in Touch", "Staffing Request Checklist"],
  },
  {
    id: "S01",
    title: "Footer social icon links (TASK-20260923-14) and the privacy link",
    present: [
      'href="https://www.instagram.com/simplemedicalstaffing/" target="_blank" rel="noopener noreferrer" aria-label="Simple Medical Workforce Solutions on Instagram (opens in a new tab)"',
      'href="https://www.facebook.com/p/Simple-Medical-Staffing-61552041984507/" target="_blank" rel="noopener noreferrer" aria-label="Simple Medical Workforce Solutions on Facebook (opens in a new tab)"',
      'href="/privacy/"',
      ">Privacy</a>",
    ],
  },
  {
    id: "N02",
    title: "Sign In to the web app in the header (utility row, bar, menu) and footer (2026-11-08)",
    present: [
      `href="${APP_LINKS.signIn}" data-site-sign-in="utility"`,
      `href="${APP_LINKS.signIn}" data-site-sign-in="inline"`,
      `href="${APP_LINKS.signIn}" data-site-sign-in="menu"`,
      "Staff and Professionals",
    ],
  },
  {
    id: "N01",
    title: "Header disclosure buttons for the two audience parents (TASK-20260923-14)",
    present: [
      'aria-label="Staffing Solutions Pages"',
      'aria-controls="nav-staffing"',
      'aria-label="For Professionals Pages"',
      'aria-controls="nav-professionals"',
    ],
  },
];

/** Terminology that must not appear anywhere in the generated public site. */
export const SITEWIDE_ABSENT = [
  { id: "F02", title: "Retired main line absent sitewide", pattern: /949[\s().-]*317[\s.-]*2470/ },
  { id: "F03", title: "Retired county-only service claim absent sitewide", pattern: /San Diego County/i },
  { id: "R03", title: "No 'disciplines' wording sitewide", pattern: /disciplin/i },
  // TASK-20260923-14: the social handle is an icon link, not plain text.
  { id: "S02", title: "No plain-text 'Instagram @handle' line sitewide", pattern: /Instagram @/ },
  // BM-20260925-33: the legal review drafts are held for owner approval.
  { id: "L02", title: "No Terms page link or legal review-draft wording sitewide", pattern: /\/terms\/|Terms and Conditions|review draft/i },
  // 2026-11-08: the web app and online applications are open.
  {
    id: "A04",
    title: "No 'being rebuilt' / 'coming soon' / 'almost ready' / 'still being built' wording sitewide",
    pattern: /being rebuilt|new application process is ready|almost ready|coming soon|still being built/i,
  },
];

// ---------------------------------------------------------------------------
// Editorial contract (2026-09-18 owner brief): no em dashes anywhere in the
// generated site (visible copy, metadata, accessibility text, RSC payload),
// one canonical Title Case label per repeated action, no period-ending
// buttons. Mirrored in the preview application's requirement module.
// ---------------------------------------------------------------------------
export const CANONICAL_ACTION_LABELS = [
  "Apply Now",
  "Request Staffing",
  "Find Your Next Role",
  "Explore Staffing Solutions",
  "See How It Works",
  "More About How We Work",
  "Get in Touch",
  "Work With Us",
  "Talk to Our Team",
  "See Application Options",
  "Skip to Content",
  "Open Navigation",
  "Close Navigation",
  // 2026-11-08: the web app (Sign In, Start Your Application, Sign In on the Web).
  "Sign In",
  "Start Your Application",
  "Sign In on the Web",
  // TASK-20260917-07 service pages, checklist and FAQ.
  "More About Contract Staffing",
  "More About Per-Diem Staffing",
  "More About Direct Placement",
  "See the Staffing Request Checklist",
  "All Staffing Solutions",
];

export const RETIRED_LABEL_VARIANTS = [
  /\bApply now\b/,
  /\bRequest staffing\b/,
  /\bFind your next role\b/,
  /\bExplore staffing solutions\b/,
  /\bSee how it works\b/,
  /\bMore about how we work\b/,
  /\bGet in touch\b/,
  /\bWork with us\b/,
  /\bTalk to our team\b/,
  /\bSee application options\b/,
  /\bSkip to content\b/,
  /\bOpen navigation\b/,
  /\bClose navigation\b/,
  /\bMore about contract staffing\b/,
  /\bMore about per-diem staffing\b/,
  /\bMore about direct placement\b/,
  /\bSee the staffing request checklist\b/,
  /\bAll staffing solutions\b/,
  /\bStart your application\b/,
  /\bSign in on the web\b/,
];

const SERVICE_PAGE_LABELS = ["Apply Now", "Request Staffing", "See How It Works", "All Staffing Solutions"];

export const ROUTE_LABELS = {
  "/": ["Apply Now", "Request Staffing", "Find Your Next Role", "Explore Staffing Solutions", "See How It Works", "More About How We Work", "More About Contract Staffing", "More About Per-Diem Staffing", "More About Direct Placement"],
  "/solutions": ["Apply Now", "Request Staffing", "Get in Touch", "More About Contract Staffing", "More About Per-Diem Staffing", "More About Direct Placement", "See the Staffing Request Checklist"],
  "/solutions/contract-staffing": [...SERVICE_PAGE_LABELS, "More About Per-Diem Staffing", "More About Direct Placement"],
  "/solutions/per-diem-staffing": [...SERVICE_PAGE_LABELS, "More About Contract Staffing", "More About Direct Placement"],
  "/solutions/direct-placement": [...SERVICE_PAGE_LABELS, "More About Contract Staffing", "More About Per-Diem Staffing"],
  "/solutions/staffing-request-checklist": ["Apply Now", "Request Staffing", "Explore Staffing Solutions"],
  "/professionals": ["Apply Now", "Talk to Our Team", "See Application Options"],
  "/professionals/faq": ["Apply Now", "Talk to Our Team"],
  "/about": ["Apply Now", "Work With Us"],
  "/contact": ["Apply Now", "See Application Options", "See the Staffing Request Checklist"],
  "/apply": ["Apply Now", "Start Your Application"],
  "/app": ["Sign In on the Web", "Apply Now", "Talk to Our Team"],
  "/privacy": ["Apply Now"],
  "/support": ["Apply Now"],
};

/** Per-page meta descriptions (unique per page; substring that must be present). */
export const PAGE_DESCRIPTIONS = {
  "/solutions": "Contract, per-diem, and direct-placement staffing for healthcare facilities.",
  "/solutions/contract-staffing": "Contract staffing from Simple Medical Workforce Solutions: longer-term placements for sustained coverage",
  "/solutions/per-diem-staffing": "Per-diem staffing from Simple Medical Workforce Solutions: shift-by-shift coverage",
  "/solutions/direct-placement": "Direct placement from Simple Medical Workforce Solutions: permanent healthcare hires selected for fit",
  "/solutions/staffing-request-checklist": "What to include when you request staffing from Simple Medical Workforce Solutions",
  "/professionals": "Per-diem, contract, and permanent opportunities for healthcare professionals.",
  "/professionals/faq": "Answers for healthcare professionals considering Simple Medical Workforce Solutions",
  "/about": "Meet founder and CEO Dina Casares.",
  "/contact": "Call +1 (760) 536-2178 or email info@simplemedicalstaffing.com",
  "/app": "The Simple Medical Workforce Solutions web app is open now for healthcare professionals and our office team",
  "/apply": "Apply online for per-diem, contract, or permanent healthcare roles with Simple Medical Workforce Solutions, or reach our team by phone or email.",
};
