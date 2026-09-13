export type SiteImageSlot = {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly sizes: string;
  readonly objectPosition: string;
};

const BAND_SIZES = "(min-width: 1080px) calc(100vw - 560px), 100vw";
const DOOR_SIZES = "(min-width: 1080px) 50vw, 100vw";
const WIDE_SIZES = "100vw";
const CAMPAIGN = "/kindred/campaign";
const PHOTOS = "/kindred/photos";

export const SITE_IMAGE_SLOTS = {
  homeHero: {
    id: "S1",
    src: `${CAMPAIGN}/home-hero-handoff.webp`,
    alt: "Two healthcare professionals in conversation at a unit workstation.",
    width: 1536,
    height: 1024,
    sizes: BAND_SIZES,
    objectPosition: "50% 50%",
  },
  facilityDoor: {
    id: "S2",
    src: `${CAMPAIGN}/facility-partner-station.webp`,
    alt: "Two colleagues reviewing a clipboard together at a nurses' station.",
    width: 1536,
    height: 1024,
    sizes: DOOR_SIZES,
    objectPosition: "50% 50%",
  },
  professionalDoor: {
    id: "S3",
    src: `${PHOTOS}/nurse-portrait.webp`,
    alt: "A healthcare professional standing in a bright clinic lobby.",
    width: 1024,
    height: 1536,
    sizes: DOOR_SIZES,
    objectPosition: "50% 8%",
  },
  homeTeam: {
    id: "S4",
    src: `${CAMPAIGN}/first-shift-welcome.webp`,
    alt: "A healthcare professional welcoming a colleague at the start of a shift.",
    width: 1536,
    height: 1024,
    sizes: BAND_SIZES,
    objectPosition: "50% 50%",
  },
  solutionsHero: {
    id: "S5",
    src: `${CAMPAIGN}/facility-partner-station.webp`,
    alt: "Two colleagues reviewing a clipboard together at a nurses' station.",
    width: 1536,
    height: 1024,
    sizes: BAND_SIZES,
    objectPosition: "50% 50%",
  },
  professionalsHero: {
    id: "S6",
    src: `${PHOTOS}/nurse-portrait.webp`,
    alt: "A healthcare professional standing in a bright clinic lobby.",
    width: 1024,
    height: 1536,
    sizes: BAND_SIZES,
    objectPosition: "50% 10%",
  },
  professionalsFirstShift: {
    id: "S7",
    src: `${CAMPAIGN}/first-shift-welcome.webp`,
    alt: "A healthcare professional welcoming a colleague at the start of a shift.",
    width: 1536,
    height: 1024,
    sizes: BAND_SIZES,
    objectPosition: "50% 45%",
  },
  aboutColleagues: {
    id: "S8",
    src: `${CAMPAIGN}/about-two-colleagues-wide.webp`,
    alt: "Two healthcare professionals talking at a unit workstation.",
    width: 1536,
    height: 1024,
    sizes: WIDE_SIZES,
    objectPosition: "50% 28%",
  },
} as const satisfies Record<string, SiteImageSlot>;
