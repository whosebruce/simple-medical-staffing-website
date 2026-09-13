import Link from "next/link";
import { Band } from "@/components/site/Band";
import { Doorway } from "@/components/site/Doorway";
import { SITE_IMAGE_SLOTS } from "@/lib/site-media";
import { STAFF_ROLES } from "@/lib/forms";
export const metadata = {
  title: "The Right Professional, on the Right Shift",
  alternates: { canonical: "/" },
};

const SERVICES = [
  {
    title: "Contract",
    body: "Longer-term placements that join your team and stay through the assignment.",
  },
  {
    title: "Per-diem",
    body: "Shift-by-shift coverage for call-outs and census spikes.",
  },
  {
    title: "Direct placement",
    body: "Permanent hires matched for fit, not just credentials.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — the opening band. The headline is on navy, the photograph is
          whole, and one seam divides them (§2.3). */}
      <Band slot={SITE_IMAGE_SLOTS.homeHero} priority>
        <p className="ks-eyebrow ks-ink-facility">
          Contract · Per-diem · Direct placement
        </p>
        <h1 className="ks-h1 text-balance">
          The right professional, on the right shift.
        </h1>
        <p className="ks-lede ks-ink-on-navy max-w-[42ch]">
          We connect reliable medical professionals with the facilities that
          need them — matched for fit, not just availability.
        </p>
        <div className="ks-actions-stack mt-3 flex flex-wrap gap-3">
          <Link href="/contact" className="ks-btn ks-btn-primary ks-focus-on-navy">
            Request staffing
          </Link>
          <Link
            href="/professionals"
            className="ks-btn ks-btn-on-navy ks-focus-on-navy"
          >
            Find your next role
          </Link>
        </div>
      </Band>

      {/* 2 — the doorway pair. The two audiences resolve here, once
          (principle C4, audit F8). */}
      <section aria-label="Choose your path" className="ks-doors">
        <Doorway
          slot={SITE_IMAGE_SLOTS.facilityDoor}
          lane="facility"
          eyebrow="For facilities"
          heading="Coverage for your units."
          body="Contract, per-diem, and direct placement matched to your unit and your team."
          href="/solutions"
          linkLabel="Explore staffing solutions"
        />
        <Doorway
          slot={SITE_IMAGE_SLOTS.professionalDoor}
          lane="professional"
          eyebrow="For professionals"
          heading="Your skills. Your schedule."
          body="Work with a coordinator who knows your name, your specialty, and what you want next."
          href="/professionals"
          linkLabel="See how it works"
        />
      </section>

      {/* 3 — a flat reading passage. Ruled columns, no cards (audit F4). */}
      <section className="ks-page ks-passage">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">What we do</p>
          <h2 className="ks-h2-passage mt-3 text-k-navy">
            Three ways to staff, one standard of care.
          </h2>
          <div className="mt-11 grid gap-9 md:grid-cols-3">
            {SERVICES.map((service) => (
              <div key={service.title} className="ks-col">
                <h3 className="ks-h3 text-k-navy">{service.title}</h3>
                <p className="ks-small mt-2.5 text-k-muted">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — the band flips, so the page has direction (§2.3). */}
      <Band slot={SITE_IMAGE_SLOTS.homeTeam} flip>
        <p className="ks-eyebrow ks-ink-facility">People, not paperwork</p>
        <h2 className="ks-h2-band text-balance">
          Success through people isn&apos;t our tagline. It&apos;s the staffing
          model.
        </h2>
        <p className="ks-body ks-ink-on-navy max-w-[42ch]">
          Every placement affects a shift, a patient, and a career. So we match
          on fit — the unit, the team, the schedule — and work to be an
          extension of the facilities we serve.
        </p>
        <Link href="/about" className="ks-link ks-focus-on-navy ks-ink-facility mt-1">
          More about how we work
        </Link>
      </Band>

      {/* 5 — the disciplines, as a ruled list rather than fourteen cards. */}
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

      {/* 6 — the close band. */}
      <section className="ks-navy ks-passage-tight">
        <div className="ks-wrap flex flex-col items-start gap-6">
          <h2 className="ks-h2-passage text-balance text-white">
            Stronger teams start with the right match.
          </h2>
          <div className="ks-actions-stack flex flex-wrap gap-3">
            <Link href="/contact" className="ks-btn ks-btn-primary ks-focus-on-navy">
              Request staffing
            </Link>
            <Link href="/apply" className="ks-btn ks-btn-on-navy ks-focus-on-navy">
              Apply now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
