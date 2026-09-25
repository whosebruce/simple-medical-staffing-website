import Link from "next/link";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Photo } from "@/components/site/Photo";
import { RoleCloud } from "@/components/site/RoleCloud";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { KINDRED_GRADIENTS } from "@/lib/kindred-gradients";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/professionals/";
const TITLE = "For Professionals";
const DESCRIPTION =
  "Per-diem, contract, and permanent opportunities for healthcare professionals. Tell us your skills and schedule, and we'll look for the right fit.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const REASONS = [
  {
    heading: "Talk to a real person.",
    body: "Your questions go to a person who can answer them, not a ticket queue. We think that's what staffing should feel like.",
    glyph: KINDRED_GRADIENTS["sky-violet"],
    square: false,
  },
  {
    heading: "Flexibility that fits your lifestyle.",
    body: "Per-diem shifts, contract assignments, or a permanent role. If what you need changes, say so and we'll talk it through.",
    glyph: KINDRED_GRADIENTS["violet-sky"],
    square: true,
  },
  {
    heading: "Clear, honest communication.",
    body: "Before you accept an assignment, we share what we know about it. When we don't know something, we say that too.",
    glyph: KINDRED_GRADIENTS["teal-sky"],
    square: false,
  },
];

export default function ProfessionalsPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="k-aura -left-56 -top-72 h-[660px] w-[660px] bg-[radial-gradient(circle_at_35%_35%,rgba(140,95,212,0.2),rgba(63,165,232,0.12)_45%,transparent_70%)]"
        />
        <div className="k-wrap relative grid items-center gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-16 lg:pb-20 lg:pt-16">
          <div className="flex flex-col items-start gap-6">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Healthcare professionals · Careers</p>
            <h1 className="k-h1">Your skills. Your schedule. The right opportunity.</h1>
            <p className="k-lede">
              Whether you&apos;re looking for per-diem flexibility, a contract opportunity, or your next permanent role, we
              connect you with opportunities that fit your experience, availability, and goals.
            </p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <Link href="/apply" className="k-btn-primary">
                Apply Now
              </Link>
              <Link href="/contact" className="k-btn-outline">
                Talk to Our Team
              </Link>
            </div>
          </div>
          <div className="k-collage mx-auto max-w-[540px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring left-auto right-0 top-auto bottom-[6%] w-[28%]" />
            <Photo
              image="portrait"
              shape="arch"
              priority
              shadow
              className="k-collage-main left-[8%] right-auto w-[70%]"
              focus="50% 18%"
              sizes="(min-width: 1240px) 420px, (min-width: 1024px) 36vw, 70vw"
            />
            <Photo
              image="workwear"
              shape="circle"
              decorative
              className="k-collage-inset bottom-auto left-auto right-0 top-[10%] w-[34%]"
              focus="45% 55%"
              zoom={1.15}
              sizes="(min-width: 1024px) 380px, 60vw"
            />
          </div>
        </div>
      </section>

      <Wave top="var(--color-k-page)" bottom="var(--color-k-violet-tint)" />
      <section className="bg-k-violet-tint pb-[clamp(64px,8vw,112px)] pt-8">
        <div className="k-wrap grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-10">
          <div className="flex flex-col items-start gap-4 lg:col-start-1 lg:row-start-1">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Why work with us</p>
            <h2 className="k-h2">Treated like a professional, not a placement.</h2>
          </div>
          <ul className="k-hairlist border-y border-k-violet/20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center [&>*+*]:border-k-violet/20">
            {REASONS.map((r) => (
              <li key={r.heading} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 py-8 sm:gap-7">
                <span aria-hidden className={`k-glyph${r.square ? " k-glyph-sq" : ""}`} style={{ background: r.glyph }} />
                <div className="flex flex-col gap-2">
                  <h3 className="k-h3 text-[1.35rem]">{r.heading}</h3>
                  <p className="k-body">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Photo
            image="island"
            shape="leaf"
            className="aspect-[4/3] w-full lg:col-start-1 lg:row-start-2"
            focus="50% 30%"
            sizes="(min-width: 1024px) 44vw, 100vw"
          />
        </div>
      </section>
      <Wave top="var(--color-k-violet-tint)" bottom="var(--color-k-page)" flip />

      <section className="k-section">
        <div className="k-wrap">
          <div className="relative overflow-hidden rounded-[clamp(32px,4vw,52px)] border border-k-line bg-gradient-to-br from-white via-k-cloud to-k-sky-tint px-6 py-12 sm:px-12 sm:py-16">
            <div aria-hidden className="k-collage-ring -right-10 -top-10 left-auto w-[180px] opacity-60" />
            <div className="relative flex max-w-[860px] flex-col items-start gap-4">
              <p className="k-eyebrow text-k-sky-ink">Healthcare professionals we provide.</p>
              <h2 className="k-h2">The right professionals for every level of care</h2>
              <RoleCloud className="mt-4" />
            </div>
          </div>
          <p className="k-body mt-10 max-w-[720px]">
            Wondering how to get started, what to send, or what happens before your first day? The{" "}
            <Link href="/professionals/faq" className="k-link">
              candidate FAQ
            </Link>{" "}
            answers the questions we hear most, and our{" "}
            <Link href="/about" className="k-link">
              About page
            </Link>{" "}
            explains who we are and why we work this way.
          </p>
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,120px)]">
        <div className="k-bleed k-bleed--flip">
          <Photo image="arrival" shape="bleed" className="k-bleed-media" focus="56% 30%" sizes="(min-width: 1024px) 54vw, 100vw" />
          <div className="k-bleed-copy flex flex-col items-start gap-5">
            <p className="k-eyebrow k-eyebrow-teal text-k-teal-ink">Your first day</p>
            <h2 className="k-h2">Start confident. Stay supported.</h2>
            <p className="k-body">
              Your coordinator goes over the assignment with you before day one. And if a question comes up once
              you&apos;re working, you can reach us by phone or email.
            </p>
            <Link href="/apply" className="k-btn-primary mt-2">
              See Application Options
            </Link>
          </div>
        </div>
      </section>

      <ClosingPanel heading="Bring your skills. We'll bring the right place to use them.">
        <Link href="/apply" className="k-btn-primary">
          Apply Now
        </Link>
      </ClosingPanel>
    </>
  );
}
