import Link from "next/link";
import { BUSINESS_FACTS } from "@/lib/brand";

export const metadata = {
  title: "Contact",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="ks-cloud ks-passage-tight">
        <div className="ks-wrap flex flex-col gap-4">
          <p className="ks-eyebrow text-k-muted">Contact</p>
          <h1 className="ks-h1 text-k-navy">Tell us what you need.</h1>
          <p className="ks-lede text-k-muted">
            Facility or professional—call or email directly. Short and plain is perfect.
          </p>
        </div>
      </section>

      <section className="ks-page ks-passage">
        <div className="ks-wrap grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div className="ks-col ks-col-facility">
              <p className="ks-eyebrow text-k-muted">I&apos;m a facility</p>
              <h2 className="ks-h2-band mt-3 text-k-navy">Requesting staffing?</h2>
              <p className="ks-body mt-3 max-w-[46ch] text-k-muted">
                Call or email with the unit, shift, specialty, and start date.
                We&apos;ll ask about anything else needed to begin the match.
              </p>
            </div>
            <div className="ks-col ks-col-professional">
              <p className="ks-eyebrow text-k-muted">I&apos;m a professional</p>
              <h2 className="ks-h2-band mt-3 text-k-navy">Looking for your next role?</h2>
              <p className="ks-body mt-3 max-w-[46ch] text-k-muted">
                Tell us the role you want, where you&apos;re located, and the type
                of schedule you&apos;re looking for. We&apos;ll talk through the next step.
              </p>
              <Link href="/apply" className="ks-link ks-focus mt-4 inline-block text-k-violet-ink">
                See application options
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="ks-rule flex flex-col gap-2 py-6">
              <h2 className="ks-eyebrow text-k-muted">Call</h2>
              <a
                href={`tel:${BUSINESS_FACTS.phone}`}
                className="ks-focus font-display text-[26px] font-extrabold text-k-navy underline-offset-4 hover:underline"
              >
                {BUSINESS_FACTS.phone}
              </a>
            </div>

            <div className="ks-rule flex flex-col gap-2 py-6">
              <h2 className="ks-eyebrow text-k-muted">Email</h2>
              <p className="ks-body break-all font-semibold text-k-navy">{BUSINESS_FACTS.email}</p>
            </div>

            <div className="ks-rule flex flex-col gap-2 py-6">
              <h2 className="ks-eyebrow text-k-muted">Visit</h2>
              <p className="ks-body text-k-navy">{BUSINESS_FACTS.address}</p>
            </div>

            <div className="ks-rule flex flex-col gap-2 py-6">
              <h2 className="ks-eyebrow text-k-muted">Online</h2>
              <p className="ks-body text-k-navy">
                {BUSINESS_FACTS.website} · Instagram @{BUSINESS_FACTS.instagram}
              </p>
            </div>

            <div className="ks-navy mt-8 flex flex-col items-start gap-4 p-9">
              <p className="ks-eyebrow ks-ink-facility">Healthcare professionals</p>
              <p className="ks-h2-door text-white">Ready to talk about your next role?</p>
              <Link href="/apply" className="ks-btn ks-btn-primary ks-focus-on-navy mt-1">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
