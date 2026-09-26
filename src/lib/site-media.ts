// Registry of the photographs used on the public site. Every image is an
// owned asset in public/kindred/ with a pre-generated srcset (see
// scripts/build-images.mjs). All are generated illustrative imagery (the
// footer says so on every page): alt text describes the situation only and
// never names a role, employer or identity.
//
// campaign/ and photos/nurse-portrait: earlier accepted campaign set.
// library/: Apollo originals from TASK-20260923-05 that Mira approved
// unconditionally as illustrative candidates (SMWS-01, 02, 05, 06, 07, 08);
// masters are lossy WebP conversions of the checksummed PNGs in that task's
// manifest. The conditional SMWS-03/04 and the rejected candidate are not used.
//
// library/smws-nNN-*: TASK-20260924-03 adds sixteen of the twenty originals
// Mira marked `accepted_preview_candidate` in TASK-20260924-02 (her per-ID
// verdict; the conditional and rejected IDs are never used). Same WebP recipe
// as the SMWS masters; source and master SHA-256 are in
// scripts/library-provenance.json. Each photograph is placed once, so no
// route repeats another route's photograph. The 404 page has its own
// (`colleagues`), so it no longer shares the /privacy interior.
//
// Excluded on purpose: photos/candid-conversation, photos/badge-welcome and
// photos/clinic-reception each show a rendered copy of the brand mark (on an
// ID badge or a wall), so they are not used.
export type SiteImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Default focal point (CSS object-position) that keeps the faces in frame. */
  readonly focus: string;
};

const CAMPAIGN = "/kindred/campaign";
const PHOTOS = "/kindred/photos";
const LIBRARY = "/kindred/library";

export const SITE_IMAGES = {
  /** A1: two professionals talking at a unit workstation (faces at x 57% and 85%). */
  handoff: {
    src: `${CAMPAIGN}/home-hero-handoff.webp`,
    alt: "Two people in navy and teal scrubs talking beside a counter in a bright workspace.",
    width: 1536,
    height: 1024,
    focus: "78% 32%",
  },
  /** A2: two colleagues reviewing a clipboard at a nurses' station (faces top-left of centre). */
  station: {
    src: `${CAMPAIGN}/facility-partner-station.webp`,
    alt: "Two people, one in teal scrubs, looking at a clipboard together behind a wooden counter.",
    width: 1536,
    height: 1024,
    focus: "34% 22%",
  },
  /** A3: an experienced professional showing a colleague around a unit corridor. */
  welcome: {
    src: `${CAMPAIGN}/first-shift-welcome.webp`,
    alt: "Two people in scrubs walking down a bright hallway, one gesturing as they walk.",
    width: 1536,
    height: 1024,
    focus: "28% 24%",
  },
  /** A4: two professionals talking beside a unit desk (faces at x 39% and 67%). */
  colleagues: {
    src: `${CAMPAIGN}/about-two-colleagues-wide.webp`,
    alt: "Two people in navy and teal scrubs talking beside a wooden reception desk.",
    width: 1536,
    height: 1024,
    focus: "53% 28%",
  },
  /** P1: a healthcare professional in a clinic lobby (portrait; face near the top). */
  portrait: {
    src: `${PHOTOS}/nurse-portrait.webp`,
    alt: "A smiling person in navy scrubs standing in a bright lobby.",
    width: 1024,
    height: 1536,
    focus: "50% 12%",
  },
  /** SMWS-01: two professionals talking in a clinic corridor (faces at x 62% and 86%). */
  corridor: {
    src: `${LIBRARY}/smws-01-corridor-handoff.webp`,
    alt: "Two people in navy and teal scrubs in a bright hallway, both holding a folded navy garment.",
    width: 1672,
    height: 941,
    focus: "74% 30%",
  },
  /** SMWS-02: two people talking across a small round table (faces at x 29% and 73%). */
  partnership: {
    src: `${LIBRARY}/smws-02-facility-partnership.webp`,
    alt: "Two people in conversation at a small round table in a bright meeting room.",
    width: 1672,
    height: 941,
    focus: "50% 35%",
  },
  /** SMWS-05: a professional seated in a staff room (portrait; face near 24%, hands near 80%). */
  seated: {
    src: `${LIBRARY}/smws-05-professional-seated.webp`,
    alt: "A person in violet scrubs sitting on a bench beside a sunlit window.",
    width: 940,
    height: 1672,
    focus: "50% 48%",
  },
  /** SMWS-06: a person arriving through an entrance, greeted by two professionals. */
  arrival: {
    src: `${LIBRARY}/smws-06-entrance-welcome.webp`,
    alt: "A person carrying a bag walks through an open doorway, welcomed by two people in teal and violet scrubs.",
    width: 1672,
    height: 941,
    focus: "55% 30%",
  },
  /** SMWS-07: an empty care-facility corridor and seating area (no people). */
  interior: {
    src: `${LIBRARY}/smws-07-community-interior.webp`,
    alt: "An empty, sunlit corridor and seating area inside a care facility.",
    width: 1672,
    height: 941,
    focus: "55% 50%",
  },
  /** SMWS-08: two professionals arranging chairs in a community room (faces at x 30% and 60%). */
  chairs: {
    src: `${LIBRARY}/smws-08-arranging-chairs.webp`,
    alt: "Two people in teal and navy scrubs arranging wooden chairs in a sunlit room.",
    width: 1672,
    height: 941,
    focus: "45% 25%",
  },
  /** N01: a person with a mug by a tall window in an empty lobby (subject on the right third, face near x 76% y 14%). */
  lobby: {
    src: `${LIBRARY}/smws-n01-window-lobby.webp`,
    alt: "A person holding a mug beside a tall window in a bright, empty lobby.",
    width: 1672,
    height: 941,
    focus: "92% 50%",
  },
  /** N02: two people at a counter over an open notebook (heads near x 33% and 68%). */
  notebook: {
    src: `${LIBRARY}/smws-n02-notebook-counter.webp`,
    alt: "Two people at a counter looking at an open notebook together in a quiet workspace.",
    width: 1536,
    height: 1024,
    focus: "60% 30%",
  },
  /** N03: still life of folded workwear, a bottle and a canvas bag on a bench (square). */
  workwear: {
    src: `${LIBRARY}/smws-n03-workwear-bench.webp`,
    alt: "Folded scrubs, a water bottle and a canvas bag on a wooden bench.",
    width: 1254,
    height: 1254,
    focus: "45% 55%",
  },
  /** N06: two people walking away along a planted path, seen from behind (figures x 22% to 72%). */
  stroll: {
    src: `${LIBRARY}/smws-n06-garden-path-stroll.webp`,
    alt: "Two people walking together on a planted outdoor path.",
    width: 1536,
    height: 1024,
    focus: "50% 15%",
  },
  /** N07: a person in teal scrubs with a shoulder bag (portrait; face near x 55% y 15%). */
  shoulderbag: {
    src: `${LIBRARY}/smws-n07-teal-shoulder-bag.webp`,
    alt: "A smiling person in teal scrubs with a bag over one shoulder in a bright room.",
    width: 1024,
    height: 1536,
    focus: "55% 4%",
  },
  /** N09: an armchair and a timber handrail in sunlight (square; no people). */
  handrail: {
    src: `${LIBRARY}/smws-n09-chair-handrail.webp`,
    alt: "An armchair and a wooden handrail in a sunlit interior.",
    width: 1254,
    height: 1254,
    focus: "78% 45%",
  },
  /** N10: two people talking across a steel counter (faces near x 25% and 73%). */
  island: {
    src: `${LIBRARY}/smws-n10-steel-counter-talk.webp`,
    alt: "Two people talking across a steel counter in a bright room.",
    width: 1536,
    height: 1024,
    focus: "50% 30%",
  },
  /** N11: a person in navy scrubs seated on a low wall outdoors (portrait; face near y 15%). */
  ledge: {
    src: `${LIBRARY}/smws-n11-courtyard-ledge-seated.webp`,
    alt: "A person in navy scrubs sitting on a low stone wall in a planted courtyard.",
    width: 1024,
    height: 1536,
    focus: "50% 20%",
  },
  /** N13: two people talking beside a garden planter, one pointing at the flowers (heads near y 10% to 25%). */
  planter: {
    src: `${LIBRARY}/smws-n13-garden-planter-talk.webp`,
    alt: "Two people talking beside a garden planter, one pointing at the flowers.",
    width: 1536,
    height: 1024,
    focus: "30% 20%",
  },
  /** N16: a person in violet scrubs leaning on a wall by a window (full-length portrait; face near y 10%). */
  leaning: {
    src: `${LIBRARY}/smws-n16-window-wall-standing.webp`,
    alt: "A person in violet scrubs leaning against a wall beside a window.",
    width: 1024,
    height: 1536,
    focus: "50% 2%",
  },
  /** N17: a person setting a bag on a bench beside lockers (face near x 35% y 15%). */
  lockers: {
    src: `${LIBRARY}/smws-n17-locker-bench-bag.webp`,
    alt: "A person setting a bag down on a bench beside a row of lockers.",
    width: 1536,
    height: 1024,
    focus: "30% 20%",
  },
  /** N19: three people talking outdoors in front of a painted mural (faces near x 24%, 57% and 80%). */
  mural: {
    src: `${LIBRARY}/smws-n19-mural-conversation.webp`,
    alt: "Three people talking outdoors in front of a colorful painted wall.",
    width: 1536,
    height: 1024,
    focus: "52% 30%",
  },
  /** N23: two people's hands resting on a table, not touching (square). */
  hands: {
    src: `${LIBRARY}/smws-n23-hands-on-table.webp`,
    alt: "Two people's hands resting apart on a wooden table.",
    width: 1254,
    height: 1254,
    focus: "48% 60%",
  },
  /** N24: a person carrying a bag along a planted path toward a low building at sunset (figure near x 61%). */
  sunset: {
    src: `${LIBRARY}/smws-n24-sunset-path-walk.webp`,
    alt: "A person carrying a bag walks along a planted path toward a low building at sunset.",
    width: 1672,
    height: 941,
    focus: "65% 50%",
  },
  /** N27: a person stacking folded linens on metal shelves (face near x 38% y 20%). */
  linens: {
    src: `${LIBRARY}/smws-n27-linen-shelves.webp`,
    alt: "A person in navy scrubs stacking folded linens on metal shelves.",
    width: 1536,
    height: 1024,
    focus: "40% 30%",
  },
  /** N38: a planted courtyard with a covered bench at dusk (no people; pergola and bench on the left half). */
  courtyard: {
    src: `${LIBRARY}/smws-n38-courtyard-bench-dusk.webp`,
    alt: "A planted outdoor courtyard with a covered bench and wet paving at dusk.",
    width: 1536,
    height: 1024,
    focus: "25% 50%",
  },
} as const satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof SITE_IMAGES;
