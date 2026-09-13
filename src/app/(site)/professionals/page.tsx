import Link from "next/link";
import { Band } from "@/components/site/Band";
import { SITE_IMAGE_SLOTS } from "@/lib/site-media";
import { STAFF_ROLES } from "@/lib/forms";
export const metadata = {
  title: "For Professionals",
  alternates: { canonical: "/professionals/" },
};

const REASONS = [
  {
    title: "Talk to a person",
    body: "Your questions go to a person who can answer them, not a ticket queue. We think that's what staffing should feel like.",
  },
  {
    title: "Three ways to work",
    body: "Per-diem shifts, contract assignments, or a permanent role. If what you need changes, say so and we'll talk it through.",
  },
  {
    title: "Straight answers",
    body: "Before you accept an assignment, we share what we know about it. When we don't know something, we say that too.",
  },
];

export default function ProfessionalsPage() {
  return (
    <>
      <Band slot={SITE_IMAGE_SLOTS.professionalsHero} priority>
        <p className="ks-eyebrow ks-ink-professional">
          Healthcare professionals · Careers
        </p>
        <h1 className="ks-h1 text-balance">
          Your skills. Your schedule. Our job is the match.
        </h1>
        <p className="ks-lede ks-ink-on-navy max-w-[42ch]">
          Contract, per-diem, or permanent. Tell us what you&apos;re looking
          for, and a coordinator will work on the match with you.
        </p>
        <div className="ks-actions-stack mt-3 flex flex-wrap gap-3">
          <Link href="/apply" className="ks-btn ks-btn-primary ks-focus-on-navy">
            Apply now
          </Link>
          <Link href="/contact" className="ks-btn ks-btn-on-navy ks-focus-on-navy">
            Ask a question
          </Link>
        </div>
      </Band>

      <section className="ks-page ks-passage">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">Why work with us</p>
          <h2 className="ks-h2-passage mt-3 text-k-navy">
            Treated like a professional, not a placement.
          </h2>
          <div className="mt-11 grid gap-9 md:grid-cols-3">
            {REASONS.map((reason) => (
              <div key={reason.title} className="ks-col ks-col-professional">
                <h3 className="ks-h3 text-k-navy">{reason.title}</h3>
                <p className="ks-small mt-2.5 text-k-muted">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-cloud ks-passage">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">Disciplines we staff</p>
          <h2 className="ks-h2-passage mt-3 text-k-navy">
            Ten disciplines, one front door.
          </h2>
          <ul className="mt-9 grid gap-x-12 sm:grid-cols-2">
            {STAFF_ROLES.map((role) => (
              <li
                key={role.code}
                className="ks-rule ks-small py-3.5 font-semibold text-k-navy"
              >
                {role.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Band slot={SITE_IMAGE_SLOTS.professionalsFirstShift} flip>
        <p className="ks-eyebrow ks-ink-professional">Your first day</p>
        <h2 className="ks-h2-band text-balance">
          Your first shift shouldn&apos;t start cold.
        </h2>
        <p className="ks-body ks-ink-on-navy max-w-[42ch]">
          Your coordinator goes over the assignment with you before day one.
          And if a question comes up once you&apos;re working, you can reach us
          by phone or email.
        </p>
        <div className="ks-actions-stack mt-2 flex">
          <Link href="/apply" className="ks-btn ks-btn-primary ks-focus-on-navy">
            Start your application
          </Link>
        </div>
      </Band>

      <section className="ks-navy ks-passage-tight">
        <div className="ks-wrap flex flex-col items-start gap-6">
          <h2 className="ks-h2-passage text-balance text-white">
            Bring your skills. We&apos;ll bring the right place to use them.
          </h2>
          <div className="ks-actions-stack flex">
            <Link href="/apply" className="ks-btn ks-btn-primary ks-focus-on-navy">
              Apply now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
