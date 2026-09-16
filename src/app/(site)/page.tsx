import Link from "next/link";
import Image from "next/image";
import { Circle } from "@/components/site/Circle";

export const metadata = {
  alternates: { canonical: "/" },
  title: "The right professional, on the right shift",
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-k-page">
        <Circle
          gradient="sky-violet"
          className="-top-52 left-[-180px] h-[460px] w-[460px] opacity-10"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <p className="k-eyebrow text-k-sky-ink">
              Contract · Per-diem · Direct placement
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-balance sm:text-5xl">
              The right professional, on the right shift.
            </h1>
            <p className="max-w-[520px] text-lg leading-relaxed text-k-muted">
              We connect reliable medical professionals with the facilities
              that need them — matched for fit, not just availability.
            </p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <Link href="/contact" className="k-btn-primary">
                Request staffing
              </Link>
              <Link href="/professionals" className="k-btn-outline">
                Find your next role
              </Link>
            </div>
          </div>
          <div className="relative">
            <Circle
              gradient="teal-sky"
              className="-right-4 -top-6 h-[140px] w-[140px] opacity-85"
            />
            <Image
              src="/kindred/photos/candid-conversation.webp"
              alt="Two nurses in conversation at a nurses' station"
              width={1024}
              height={768}
              priority
              className="relative min-h-[300px] w-full rounded-[18px] object-cover shadow-[0_12px_36px_rgba(30,58,110,0.14)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 sm:py-20 md:grid-cols-2">
          <div className="k-card flex flex-col items-start gap-3.5 p-9">
            <p className="k-eyebrow text-k-sky-ink">For facilities</p>
            <h2 className="font-display text-2xl font-extrabold">
              Coverage for your units.
            </h2>
            <p className="leading-relaxed text-k-muted">
              Contract, per-diem, and direct placement matched to your unit
              and your team.
            </p>
            <Link
              href="/solutions"
              className="k-arrow-link mt-auto text-k-sky-ink hover:text-k-navy"
            >
              Explore staffing solutions →
            </Link>
          </div>
          <div className="k-card flex flex-col items-start gap-3.5 p-9">
            <p className="k-eyebrow text-k-violet-ink">For professionals</p>
            <h2 className="font-display text-2xl font-extrabold">
              Your skills. Your schedule.
            </h2>
            <p className="leading-relaxed text-k-muted">
              Work with a coordinator who knows your name, your specialty,
              and what you want next.
            </p>
            <Link
              href="/professionals"
              className="k-arrow-link mt-auto text-k-violet-ink hover:text-k-navy"
            >
              See how it works →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-11 flex max-w-[640px] flex-col gap-3">
          <p className="k-eyebrow text-k-sky-ink">What we do</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Three ways to staff, one standard of care.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-k-line p-8">
            <Circle gradient="sky-violet" className="relative h-11 w-11" />
            <h3 className="font-display text-xl font-extrabold">Contract</h3>
            <p className="text-[15.5px] leading-relaxed text-k-muted">
              Longer-term placements that join your team and stay through the
              assignment.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-k-line p-8">
            <div
              aria-hidden
              className="h-11 w-11 rounded-xl"
              style={{ background: "linear-gradient(135deg, #8C5FD4, #3FA5E8)" }}
            />
            <h3 className="font-display text-xl font-extrabold">Per-diem</h3>
            <p className="text-[15.5px] leading-relaxed text-k-muted">
              Shift-by-shift coverage for call-outs and census spikes.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-k-line p-8">
            <Circle gradient="teal-sky" className="relative h-11 w-11" />
            <h3 className="font-display text-xl font-extrabold">
              Direct placement
            </h3>
            <p className="text-[15.5px] leading-relaxed text-k-muted">
              Permanent hires matched for fit, not just credentials.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2">
          <Image
            src="/kindred/photos/badge-welcome.webp"
            alt="A nurse clipping an ID badge onto a colleague's scrubs"
            width={1024}
            height={768}
            className="min-h-[300px] w-full rounded-[18px] object-cover"
          />
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow text-k-teal-ink">People, not paperwork</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
              Success through people isn&apos;t our tagline. It&apos;s the
              staffing model.
            </h2>
            <p className="text-[17px] leading-relaxed text-k-muted">
              Every placement affects a shift, a patient, and a career. So we
              match on fit — the unit, the team, the schedule — and work to be
              an extension of the facilities we serve.
            </p>
            <Link
              href="/about"
              className="k-arrow-link text-k-sky-ink hover:text-k-navy"
            >
              More about how we work →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-k-navy">
        <Circle
          gradient="sky-violet"
          className="-bottom-52 left-[-160px] h-[440px] w-[440px] opacity-35"
        />
        <Circle
          gradient="teal-sky"
          className="-bottom-20 left-[200px] h-[220px] w-[220px] opacity-25"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-16 text-center sm:py-24">
          <h2 className="font-display text-3xl font-extrabold leading-snug text-balance text-white sm:text-4xl">
            Stronger teams start with the right match.
          </h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/contact" className="k-btn-primary">
              Request staffing
            </Link>
            <Link href="/apply" className="k-btn-on-dark">
              Apply now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
