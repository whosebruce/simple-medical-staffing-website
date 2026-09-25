import Link from "next/link";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/";
// Title carries the verified category and office location (the previous
// site's titles did the same); the H1 keeps the approved tagline.
const TITLE = "Healthcare Staffing Agency in Irvine, California";
const DESCRIPTION =
  "Healthcare staffing for contract, per-diem, and direct-placement needs across Southern California.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const SERVICES = [
  {
    title: "Contract",
    body: "Longer-term placements that join your team and stay through the assignment.",
    href: "/solutions/contract-staffing",
    label: "More About Contract Staffing\u00a0→",
    ink: "text-k-sky-ink",
    glyph: { background: KINDRED_GRADIENTS["sky-violet"] },
    square: false,
  },
  {
    title: "Per-diem",
    body: "Shift-by-shift coverage for call-outs and census spikes.",
    href: "/solutions/per-diem-staffing",
    label: "More About Per-Diem Staffing\u00a0→",
    ink: "text-k-violet-ink",
    glyph: { background: KINDRED_GRADIENTS["violet-sky"] },
    square: true,
  },
  {
    title: "Direct placement",
    body: "Permanent hires matched for fit, not just credentials.",
    href: "/solutions/direct-placement",
    label: "More About Direct Placement\u00a0→",
    ink: "text-k-teal-ink",
    glyph: { background: KINDRED_GRADIENTS["teal-sky"] },
    square: false,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />

      <section className="relative overflow-hidden">
        <div aria-hidden className="k-aura -right-48 -top-64 h-[680px] w-[680px]" />
        <div className="k-wrap relative grid items-center gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-16 lg:pb-20 lg:pt-16">
          <div className="flex flex-col items-start gap-6">
            <p className="k-eyebrow text-k-sky-ink">Contract · Per-diem · Direct placement</p>
            <h1 className="k-h1">The right professional, on the right shift.</h1>
            <p className="k-lede">
              We connect reliable medical professionals with the facilities that need them. Every match is made for
              fit, not just availability.
            </p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <Link href="/contact" className="k-btn-primary">
                Request Staffing
              </Link>
              <Link href="/professionals" className="k-btn-outline">
                Find Your Next Role
              </Link>
            </div>
            <p className="k-small text-k-muted">
              Our online platform for facilities and professionals is still being built. For now, our team handles
              every request directly by phone and email.
            </p>
          </div>
          <div className="k-collage mx-auto max-w-[560px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring" />
            <Photo
              image="handoff"
              shape="arch"
              priority
              shadow
              className="k-collage-main"
              focus="88% 30%"
              sizes="(min-width: 1240px) 500px, (min-width: 1024px) 42vw, 86vw"
            />
            <Photo
              image="welcome"
              shape="circle"
              decorative
              className="k-collage-inset"
              focus="31% 17%"
              zoom={1.9}
              sizes="(min-width: 1024px) 400px, 64vw"
            />
          </div>
        </div>
      </section>

      <Wave top="var(--color-k-page)" bottom="var(--color-k-cloud)" />
      <section className="bg-k-cloud">
        <div className="k-wrap grid gap-6 pb-[clamp(64px,8vw,112px)] pt-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
          <article className="k-panel grid overflow-hidden bg-white shadow-[0_24px_60px_-40px_rgba(30,58,110,0.45)] sm:grid-cols-2">
            <Photo
              image="handrail"
              shape="none"
              className="min-h-[240px] sm:min-h-[360px]"
              focus="78% 45%"
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            />
            <div className="flex flex-col items-start justify-center gap-4 p-8 sm:p-10">
              <p className="k-eyebrow text-k-sky-ink">For facilities</p>
              <h2 className="k-h2 k-h2-sm">Coverage for your units.</h2>
              <p className="k-body">Contract, per-diem, and direct placement matched to your unit and your team.</p>
              <Link href="/solutions" className="k-arrow-link text-k-sky-ink">
                Explore Staffing Solutions&nbsp;→
              </Link>
            </div>
          </article>
          <article className="k-panel flex flex-col overflow-hidden bg-gradient-to-b from-k-violet-tint to-white shadow-[0_24px_60px_-40px_rgba(91,58,148,0.45)]">
            <Photo
              image="shoulderbag"
              shape="leaf"
              className="mx-4 mt-4 h-[230px] sm:h-[260px]"
              focus="55% 5%"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
            <div className="flex flex-1 flex-col items-start gap-4 p-8 sm:p-10">
              <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">For professionals</p>
              <h2 className="k-h2 k-h2-sm">Your skills. Your schedule.</h2>
              <p className="k-body">
                Work with a coordinator who knows your name, your specialty, and what you want next.
              </p>
              <Link href="/professionals" className="k-arrow-link mt-auto text-k-violet-ink">
                See How It Works&nbsp;→
              </Link>
            </div>
          </article>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" flip />

      <section className="k-section">
        <div className="k-wrap grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-10">
          <div className="flex flex-col items-start gap-5 lg:col-start-1 lg:row-start-1">
            <p className="k-eyebrow text-k-sky-ink">What we do</p>
            <h2 className="k-h2">Three ways to staff, one standard of care.</h2>
            <p className="k-body">
              Simple Medical Staffing is a healthcare staffing agency in Irvine, California. We provide contract,
              per-diem, and direct placement staffing to healthcare facilities, and we connect healthcare professionals
              with roles that fit their experience, availability, and goals.
            </p>
          </div>
          <ul className="k-hairlist border-y border-k-line lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            {SERVICES.map((s) => (
              <li key={s.title} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 py-8 sm:gap-7 sm:py-9">
                <span aria-hidden className={`k-glyph${s.square ? " k-glyph-sq" : ""}`} style={s.glyph} />
                <div className="flex flex-col items-start gap-2">
                  <h3 className="k-h3 text-[1.4rem]">{s.title}</h3>
                  <p className="k-body">{s.body}</p>
                  <Link href={s.href} className={`k-arrow-link ${s.ink}`}>
                    {s.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <Photo
            image="sunset"
            shape="arch"
            className="aspect-[4/3] w-full lg:col-start-1 lg:row-start-2 lg:aspect-[5/4]"
            focus="66% 50%"
            sizes="(min-width: 1024px) 44vw, 100vw"
          />
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,120px)]">
        <div className="k-bleed">
          <Photo
            image="mural"
            shape="bleed"
            className="k-bleed-media"
            focus="52% 30%"
            sizes="(min-width: 1024px) 54vw, 100vw"
          />
          <div className="k-bleed-copy flex flex-col items-start gap-5">
            <p className="k-eyebrow k-eyebrow-teal text-k-teal-ink">People, not paperwork</p>
            <h2 className="k-h2">Success through people isn&apos;t our tagline. It&apos;s the staffing model.</h2>
            <p className="k-body">
              Every placement affects a shift, a patient, and a career. So we match on fit, meaning the unit, the team,
              and the schedule, and we work to be an extension of the facilities we serve.
            </p>
            <Link href="/about" className="k-arrow-link text-k-teal-ink">
              More About How We Work&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      <ClosingPanel heading="Stronger teams start with the right match.">
        <Link href="/contact" className="k-btn-primary">
          Request Staffing
        </Link>
        <Link href="/apply" className="k-btn-on-dark">
          Apply Now
        </Link>
      </ClosingPanel>
    </>
  );
}
