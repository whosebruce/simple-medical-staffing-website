import Link from "next/link";
import { Circle } from "@/components/site/Circle";
import { BUSINESS_FACTS } from "@/lib/brand";

export const metadata = {
  alternates: { canonical: "/contact/" },
  title: "Contact",
  description:
    "Call 949-317-2470 or email info@simplemedicalstaffing.com to request staffing or talk about your next role with Simple Medical Staffing in Irvine, CA.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-k-cloud">
        <Circle
          gradient="sky-violet"
          className="-top-36 right-[-120px] h-[340px] w-[340px] opacity-15"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-3.5 px-6 py-12 sm:py-16">
          <p className="k-eyebrow text-k-sky-ink">Contact</p>
          <h1 className="font-display text-3xl font-extrabold leading-[1.15] sm:text-[44px]">
            Tell us what you need.
          </h1>
          <p className="max-w-[560px] text-lg leading-relaxed text-k-muted">
            Whether you&apos;re a facility or a professional, call or email
            directly. Short and plain is perfect.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="k-card flex flex-col items-start gap-3 p-8">
            <p className="k-eyebrow text-k-sky-ink">I&apos;m a facility</p>
            <h2 className="font-display text-xl font-extrabold">
              Requesting staffing?
            </h2>
            <p className="leading-relaxed text-k-muted">
              Call or email with the unit, the shift, the specialty, and the
              start date. That&apos;s everything we need to get started on a
              match.
            </p>
          </div>
          <div className="k-card flex flex-col items-start gap-3 p-8">
            <p className="k-eyebrow text-k-violet-ink">I&apos;m a professional</p>
            <h2 className="font-display text-xl font-extrabold">
              Looking for your next role?
            </h2>
            <p className="leading-relaxed text-k-muted">
              Tell us the role you want, where you&apos;re located, and the type
              of schedule you&apos;re looking for. We&apos;ll talk through the next step.
            </p>
            <Link
              href="/apply"
              className="k-arrow-link text-k-violet-ink hover:text-k-navy"
            >
              See Application Options →
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-k-line p-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-k-sky-ink">
              Call or email
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_FACTS.phone}`}
                className="font-display text-xl font-extrabold text-k-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
              >
                {BUSINESS_FACTS.phone}
              </a>
              <p className="break-all text-[17px] font-semibold text-k-navy">
                {BUSINESS_FACTS.email}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-k-line p-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-k-violet-ink">
              Visit
            </h2>
            <p className="mt-3 leading-relaxed text-k-muted">
              {BUSINESS_FACTS.address}
            </p>
          </div>

          <div className="rounded-2xl border border-k-line p-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-k-teal-ink">
              Online
            </h2>
            <p className="mt-3 leading-relaxed text-k-muted">
              {BUSINESS_FACTS.website} · Instagram @{BUSINESS_FACTS.instagram}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-k-navy p-7">
            <Circle
              gradient="sky-violet"
              className="-right-16 -top-[70px] h-[170px] w-[170px] opacity-40"
            />
            <div className="relative flex flex-col items-start gap-2.5">
              <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-k-mist">
                Ready to apply instead?
              </p>
              <p className="font-display text-lg font-bold text-white">
                Ready to talk about your next role?
              </p>
              <Link href="/apply" className="k-btn-primary mt-1">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
