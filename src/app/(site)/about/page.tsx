import Link from "next/link";
import { WideBand } from "@/components/site/WideBand";
import { BUSINESS_FACTS, LEADERSHIP_ROLES } from "@/lib/brand";
import { SITE_IMAGE_SLOTS } from "@/lib/site-media";
export const metadata = {
  title: "About",
  alternates: { canonical: "/about/" },
};

const VALUES = [
  {
    title: "Compassionate",
    body: "Every match affects a shift, a patient, and a career. We never forget there are people on both ends of a placement.",
  },
  {
    title: "Vibrant",
    body: "Color and energy where the industry is clinical gray — in how we show up, and how we celebrate the people we place.",
  },
  {
    title: "Inclusive",
    body: "Good matches come from listening to people. We try to do that for everyone who comes to us, whatever their role or background.",
  },
  {
    title: "Reliable",
    body: "Warmth doesn't count for much if the shift falls through. Dependability, in schedules, credentials, and paperwork, is the standard we hold ourselves to.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/*
        Cloud masthead, typographic, no photograph (§2.8). The statement and
        the standfirst sit in two columns from lg up: this h1 is a
        130-character sentence, and setting it full-measure at display scale
        left the right half of the band empty — which is audit F3, the defect
        this redesign exists to remove, coming back in a new costume.
      */}
      <section className="ks-cloud ks-passage">
        <div className="ks-wrap grid gap-x-16 gap-y-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <div className="flex flex-col gap-5">
            <p className="ks-eyebrow text-k-muted">
              About Simple Medical Staffing
            </p>
            <h1 className="ks-h1 text-balance text-k-navy">
              We connect reliable medical professionals with the facilities
              that need them — and treat both like people, not line items.
            </h1>
          </div>
          <p className="ks-lede text-k-muted">
            Warm where the industry is transactional. Vibrant where it is
            beige. Personal where it hides behind portals. Everything we do —
            contract, per-diem, and direct placement — starts with knowing the
            people on both ends of the match.
          </p>
        </div>
      </section>

      <section className="ks-page ks-passage-tight">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">Our mission</p>
          <blockquote className="mt-4 max-w-[62ch] border-l-4 border-k-sky pl-6 text-[19px] leading-[1.6] text-k-navy">
            {BUSINESS_FACTS.mission}
          </blockquote>
        </div>
      </section>

      <section className="ks-cloud ks-passage">
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">What we stand for</p>
          <h2 className="ks-h2-passage mt-3 text-k-navy">
            Warm on the surface, rigorous underneath.
          </h2>
          <div className="mt-11 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="ks-col">
                <h3 className="ks-h3 text-k-navy">{value.title}</h3>
                <p className="ks-small mt-2.5 text-k-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="leadership-heading"
        className="ks-page ks-passage"
      >
        <div className="ks-wrap">
          <p className="ks-eyebrow text-k-muted">Leadership</p>
          <h2 id="leadership-heading" className="ks-h2-passage mt-3 text-k-navy">
            The people behind the matches.
          </h2>
        </div>

        {LEADERSHIP_ROLES.filter((role) => role.biography).map((role) => (
          <div key={role.title} className="ks-navy mt-11">
            <div className="ks-wrap py-14">
              <h3 className="ks-h2-band text-white">{role.name}</h3>
              <p className="ks-eyebrow ks-ink-facility mt-3">{role.title}</p>
              <div className="ks-body ks-ink-on-navy mt-7 grid gap-6 md:grid-cols-3">
                {role.biography?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="ks-wrap">
          <p className="ks-small mt-6 text-k-muted">
            Additional leadership information will be added as the team grows.
          </p>
        </div>
      </section>

      <WideBand slot={SITE_IMAGE_SLOTS.aboutColleagues} />

      <section className="ks-navy ks-passage-tight">
        <div className="ks-wrap flex flex-col items-start gap-6">
          <h2 className="ks-h2-passage text-balance text-white">
            &ldquo;{BUSINESS_FACTS.tagline}.&rdquo;
          </h2>
          <div className="ks-actions-stack flex">
            <Link href="/contact" className="ks-btn ks-btn-primary ks-focus-on-navy">
              Work with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
