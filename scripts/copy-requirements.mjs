// Requirement matrix for the 2026-09-17 owner copy changes (TASK-20260917-04).
//
// Every entry is one requested change: the exact replacement copy that must be
// present in the generated page and the retired wording that must be absent.
// `scripts/verify-copy.mjs` evaluates this matrix against the GitHub Pages
// artifact in docs/ (rendered HTML plus the RSC payload), so a source-only
// change that never reached the build fails the gate.
//
// Strings are the owner's supplied copy verbatim, including punctuation and
// the em dashes / curly apostrophes as supplied.

export const APPLICATION_CONTACT = "info@simplemedicalstaffing.com";

export const PUBLIC_ROUTES = [
  "/",
  "/solutions",
  "/professionals",
  "/about",
  "/contact",
  "/apply",
  "/privacy",
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
      "Staffing shouldn't create more work for your leadership team. We provide responsive, hands-on support to help you maintain coverage, strengthen your workforce, and keep your focus where it belongs—on quality care.",
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
    present: ["Talk to our team."],
    absent: ["Ask a question"],
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
      "We’re building stronger healthcare teams—one relationship at a time.",
    ],
    absent: ["not line items"],
  },
  {
    id: "R15",
    title: "About intro paragraph",
    route: "/about",
    present: [
      "Simple Medical Workforce Solutions was built on a simple belief: healthcare staffing should be personal. We connect qualified healthcare professionals with facilities that need dependable people, while building relationships with both sides of every placement. Because great staffing isn’t just about filling a shift—it’s about finding the right fit.",
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
      "After seeing firsthand how staffing shortages affect healthcare professionals, leadership teams, and the quality of care, Dina knew staffing could be done differently. She founded Simple Medical to create more than another staffing agency—she wanted to build a workforce partner that understands the realities of healthcare and the people behind every shift.",
    ],
    absent: ["Dina brings together clinical practice and executive leadership"],
  },
  {
    id: "R19",
    title: "Dina column: The Vision",
    route: "/about",
    present: [
      "The Vision",
      "Today, Dina is building Simple Medical around relationships, reliability, and the right fit. Her vision is to help facilities build stronger, more stable teams while ensuring healthcare professionals feel valued, supported, and respected—not simply placed.",
    ],
    absent: ["Her leadership philosophy centers on integrity"],
  },
  {
    id: "R13",
    title: "Application contact destination",
    route: "/apply",
    present: [APPLICATION_CONTACT, "Email · Applications", `href="mailto:${APPLICATION_CONTACT}"`],
    absent: [`mailto:${APPLICATION_CONTACT}?`],
  },
];

/** Terminology that must not appear anywhere in the generated public site. */
export const SITEWIDE_ABSENT = [
  { id: "R03", title: "No 'disciplines' wording sitewide", pattern: /disciplin/i },
];
