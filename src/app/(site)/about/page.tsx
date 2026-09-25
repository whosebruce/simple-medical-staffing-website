import Link from "next/link";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { BUSINESS_FACTS, LEADERSHIP_ROLES } from "@/lib/brand";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/about/";
const TITLE = "About";
const DESCRIPTION =
  "Simple Medical Staffing connects qualified healthcare professionals with facilities that need dependable people. Meet founder and CEO Dina Casares.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const VALUES = [
  {
    heading: "Compassionate",
    ink: "text-k-sky-ink",
    glyph: KINDRED_GRADIENTS["sky-violet"],
    square: false,
    body: "Every match affects a shift, a patient, and a career. We never forget there are people on both ends of a placement.",
  },
  {
    heading: "Vibrant",
    ink: "text-k-violet-ink",
    glyph: KINDRED_GRADIENTS["violet-sky"],
    square: true,
    body: "Color and energy where the industry is clinical gray, in how we show up and how we celebrate the people we place.",
  },
  {
    heading: "Inclusive",
    ink: "text-k-teal-ink",
    glyph: KINDRED_GRADIENTS["teal-sky"],
    square: false,
    body: "Good matches come from listening to people. We try to do that for everyone who comes to us, whatever their role or background.",
  },
  {
    heading: "Reliable",
    ink: "text-k-navy",
    glyph: "var(--color-k-navy)",
    square: true,
    body: "Warmth doesn't count for much if the shift falls through. Dependability, in schedules, credentials, and paperwork, is the standard we hold ourselves to.",
  },
];

const BIO_TONES = [
  { ink: "text-k-sky-ink", glyph: KINDRED_GRADIENTS["sky-violet"] },
  { ink: "text-k-violet-ink", glyph: KINDRED_GRADIENTS["violet-sky"] },
  { ink: "text-k-teal-ink", glyph: KINDRED_GRADIENTS["teal-sky"] },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} pageType="AboutPage" />

      <section className="relative overflow-hidden">
        <div aria-hidden className="k-aura -left-56 -top-80 h-[680px] w-[680px]" />
        <div className="k-wrap relative pb-10 pt-10 sm:pt-14 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <p className="k-eyebrow text-k-sky-ink">About Simple Medical Staffing</p>
              <h1 className="k-h1 k-h1-long">We’re building stronger healthcare teams, one relationship at a time.</h1>
            </div>
            <p className="k-lede lg:pb-2">
              Simple Medical Workforce Solutions was built on a simple belief: healthcare staffing should be personal. We
              connect qualified healthcare professionals with facilities that need dependable people, while building
              relationships with both sides of every placement. Because great staffing isn’t just about filling a shift.
              It’s about finding the right fit.
            </p>
          </div>
          <div className="relative mt-12 lg:mt-16">
            <div aria-hidden className="k-collage-ring -right-4 -top-10 left-auto z-10 w-[120px] sm:w-[170px]" />
            <Photo
              image="stroll"
              shape="soft"
              priority
              shadow
              className="aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[16/6.4]"
              focus="100% 15%"
              sizes="(min-width: 1240px) 1180px, 96vw"
            />
          </div>
        </div>
      </section>

      <section className="k-section-tight">
        <div className="k-wrap grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Our mission</p>
            <span aria-hidden className="k-quote-mark">
              &ldquo;
            </span>
          </div>
          <blockquote className="k-marker font-display text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] font-bold leading-[1.5] text-k-navy">
            {BUSINESS_FACTS.mission}
          </blockquote>
        </div>
      </section>

      <Wave top="var(--color-k-page)" bottom="var(--color-k-cloud)" />
      <section className="bg-k-cloud pb-[clamp(64px,8vw,112px)] pt-8">
        <div className="k-wrap">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div className="flex flex-col items-start gap-4">
              <p className="k-eyebrow text-k-sky-ink">What we stand for</p>
              <h2 className="k-h2">Warm on the surface, rigorous underneath.</h2>
            </div>
            <div className="grid grid-cols-[1.3fr_1fr] items-end gap-4">
              <Photo image="chairs" shape="leaf" className="aspect-[4/3]" focus="45% 25%" sizes="(min-width: 1024px) 26vw, 55vw" />
              <Photo image="courtyard" shape="arch" className="aspect-[3/4]" focus="25% 50%" sizes="(min-width: 1024px) 20vw, 40vw" />
            </div>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.heading} className="flex flex-col items-start gap-3 border-t-2 border-k-line pt-7">
                <span aria-hidden className={`k-glyph h-11 w-11${v.square ? " k-glyph-sq rounded-[14px]" : ""}`} style={{ background: v.glyph }} />
                <h3 className={`k-h3 ${v.ink}`}>{v.heading}</h3>
                <p className="k-small">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" flip />

      <section aria-labelledby="leadership-heading" className="k-section">
        <div className="k-wrap">
          <div className="mb-10 flex max-w-[640px] flex-col items-start gap-4">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Leadership</p>
            <h2 id="leadership-heading" className="k-h2">
              The people behind our purpose
            </h2>
          </div>
          <ul className="flex flex-col gap-6">
            {LEADERSHIP_ROLES.map((role) => (
              <li
                key={role.title}
                className="relative rounded-[clamp(32px,4vw,48px)] border border-k-line bg-white p-7 shadow-[0_30px_70px_-50px_rgba(30,58,110,0.55)] sm:p-10 lg:p-12"
              >
                {/* The aura is clipped by its own decorative layer, so the card
                    holding Dina's biography is not an overflow-clipping box
                    around text (as in the preview, SMWS 01ba36c). */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                  <div className="k-aura -right-40 -top-48 h-[420px] w-[420px]" />
                </div>
                <div className="relative flex flex-wrap items-center gap-5">
                  <span
                    aria-hidden
                    className="flex h-20 w-20 flex-none items-center justify-center rounded-full font-display text-2xl font-extrabold text-white ring-4 ring-k-sky-tint"
                    style={{ background: "linear-gradient(135deg, var(--color-k-navy), var(--color-k-violet-ink))" }}
                  >
                    {initials(role.name)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-extrabold tracking-[-0.02em]">{role.name}</h3>
                    <p className="font-body text-[16px] font-bold text-k-violet-ink">{role.title}</p>
                  </div>
                </div>
                <div className="relative mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
                  {role.biography.map((column, i) => (
                    <div key={column.heading} className="flex flex-col items-start gap-3 border-t border-k-line pt-6">
                      <span aria-hidden className="h-2 w-12 rounded-full" style={{ background: BIO_TONES[i % BIO_TONES.length].glyph }} />
                      <h4 className={`font-display text-[19px] font-extrabold ${BIO_TONES[i % BIO_TONES.length].ink}`}>{column.heading}</h4>
                      <p className="k-small text-[16px]">{column.body}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <p className="k-small mt-5">Additional leadership information will be added as the team grows.</p>
          <p className="k-body mt-8 max-w-[720px]">
            Facilities can see how we work on the{" "}
            <Link href="/solutions" className="k-link">
              Staffing Solutions
            </Link>{" "}
            page. Healthcare professionals can see the roles we place and how to get started on the{" "}
            <Link href="/professionals" className="k-link">
              For Professionals
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <ClosingPanel heading={<>&ldquo;{BUSINESS_FACTS.tagline}.&rdquo;</>}>
        <Link href="/contact" className="k-btn-primary">
          Work With Us
        </Link>
      </ClosingPanel>
    </>
  );
}
