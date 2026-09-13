import Link from "next/link";
import { Band } from "@/components/site/Band";
import { SITE_IMAGE_SLOTS } from "@/lib/site-media";
export const metadata = {
  title: "Staffing Solutions",
  alternates: { canonical: "/solutions/" },
};

const SERVICES = [
  {
    title: "Contract staffing",
    body: "Longer-term placements for sustained coverage — professionals who join your team, learn your unit, and stay through the assignment.",
    bestFor: "Best for: seasonal census, leaves of absence, extended vacancies",
  },
  {
    title: "Per-diem staffing",
    body: "Shift-by-shift coverage: you tell us the gap, we look for the match, you confirm it.",
    bestFor: "Best for: call-outs, census spikes, weekend and night gaps",
  },
  {
    title: "Direct placement",
    body: "Permanent hires selected for fit with your team — not just a resume that matches the requisition.",
    bestFor: "Best for: permanent roles, hard-to-fill specialties, leadership",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Tell us the need",
    body: "Unit, shift, specialty, start date. Send what you have and we'll ask about the rest.",
  },
  {
    n: "2",
    title: "We match for fit",
    body: "We look for a professional whose experience and availability fit what you described.",
  },
  {
    n: "3",
    title: "You confirm",
    body: "Review the match, ask whatever you want to ask, and approve when you're ready.",
  },
  {
    n: "4",
    title: "After the start date",
    body: "If something isn't working, tell us. We'd rather fix a placement than defend one.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Band slot={SITE_IMAGE_SLOTS.solutionsHero} priority>
        <p className="ks-eyebrow ks-ink-facility">
          Staffing Solutions · For facilities
        </p>
        <h1 className="ks-h1 text-balance">
          Staffing that fits how your facility runs.
        </h1>
        <p className="ks-lede ks-ink-on-navy max-w-[42ch]">
          Tell us the unit, the shift, and the team, and we&apos;ll look for
          the professional who fits.
        </p>
        <div className="ks-actions-stack mt-3 flex flex-wrap gap-3">
          <Link href="/contact" className="ks-btn ks-btn-primary ks-focus-on-navy">
            Request staffing
          </Link>
        </div>
      </Band>

      <section className="ks-page ks-passage">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">What we offer</p>
          <h2 className="ks-h2-passage mt-3 text-k-navy">
            Three services, one way of working.
          </h2>
          <div className="mt-11 grid gap-9 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="ks-col ks-col-facility flex flex-col"
              >
                <h3 className="ks-h3 text-k-navy">{service.title}</h3>
                <p className="ks-small mt-2.5 text-k-muted">{service.body}</p>
                <p className="ks-small mt-auto pt-4 font-semibold text-k-muted">
                  {service.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-cloud ks-passage">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">How it works</p>
          <h2 className="ks-h2-passage mt-3 text-k-navy">
            From request to first shift.
          </h2>
          <ol className="mt-11 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.n} className="ks-col">
                <p
                  aria-hidden
                  className="font-display text-[22px] font-extrabold text-k-sky-deep"
                >
                  {step.n}
                </p>
                <h3 className="ks-h3 mt-1 text-k-navy">{step.title}</h3>
                <p className="ks-small mt-2.5 text-k-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing statement is a navy type band by design — no second
          photograph is requested for this route (06 §not requested). */}
      <section className="ks-navy ks-passage">
        <div className="ks-wrap grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
          <div className="flex flex-col items-start gap-5">
            <p className="ks-eyebrow ks-ink-facility">The difference</p>
            <h2 className="ks-h2-passage text-balance text-white">
              A partner, not a portal.
            </h2>
            <p className="ks-lede ks-ink-on-navy">
              Directors of nursing and administrators answer for coverage and
              quality. We want working with us to make that job easier instead
              of adding to it.
            </p>
          </div>
          <div className="ks-actions-stack flex lg:justify-end">
            <Link href="/contact" className="ks-btn ks-btn-primary ks-focus-on-navy">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
