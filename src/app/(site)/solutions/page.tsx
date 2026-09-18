import Link from "next/link";
import Image from "next/image";
import { Circle } from "@/components/site/Circle";

export const metadata = {
  alternates: { canonical: "/solutions/" },
  title: "Staffing Solutions",
  description:
    "Contract, per-diem, and direct-placement staffing for healthcare facilities. Tell us the unit, the shift, and the team, and we'll look for the professional who fits.",
};

const SERVICES = [
  {
    title: "Contract staffing",
    body: "Longer-term placements for sustained coverage: professionals who join your team, learn your unit, and stay through the assignment.",
    bestFor: "Best for: seasonal census, leaves of absence, extended vacancies",
    circle: <Circle gradient="sky-violet" className="relative h-12 w-12" />,
  },
  {
    title: "Per-diem staffing",
    body: "Shift-by-shift coverage: you tell us the gap, we look for the match, you confirm it.",
    bestFor: "Best for: call-outs, census spikes, weekend and night gaps",
    circle: (
      <div
        aria-hidden
        className="h-12 w-12 rounded-[14px]"
        style={{ background: "linear-gradient(135deg, #8C5FD4, #3FA5E8)" }}
      />
    ),
  },
  {
    title: "Direct placement",
    body: "Permanent hires selected for fit with your team, not just a resume that matches the requisition.",
    bestFor: "Best for: permanent roles, hard-to-fill specialties, leadership",
    circle: <Circle gradient="teal-sky" className="relative h-12 w-12" />,
  },
];

const STEPS = [
  {
    n: "1",
    color: "text-k-sky-ink",
    title: "Tell us the need",
    body: "Unit, shift, specialty, start date. Send what you have and we'll ask about the rest.",
  },
  {
    n: "2",
    color: "text-k-violet-ink",
    title: "We match for fit",
    body: "We look for a professional whose experience and availability fit what you described.",
  },
  {
    n: "3",
    color: "text-k-teal-ink",
    title: "You confirm",
    body: "Review the match, ask whatever you want to ask, and approve when you're ready.",
  },
  {
    n: "4",
    color: "text-k-navy",
    title: "After the start date",
    body: "If something isn't working, tell us. We'd rather fix a placement than defend one.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-k-cloud">
        <Circle
          gradient="sky-violet"
          className="-top-40 right-[-140px] h-[400px] w-[400px] opacity-15"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4.5 px-6 py-14 sm:py-20">
          <p className="k-eyebrow text-k-sky-ink">
            Staffing Solutions · For facilities
          </p>
          <h1 className="max-w-[700px] font-display text-3xl font-extrabold leading-[1.15] text-balance sm:text-5xl">
            Staffing that fits how your facility runs.
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-k-muted">
            Tell us the unit, the shift, and the team, and we&apos;ll look
            for the professional who fits.
          </p>
          <Link href="/contact" className="k-btn-primary mt-2">
            Request Staffing
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-11 flex max-w-[640px] flex-col gap-3">
          <p className="k-eyebrow text-k-sky-ink">What we offer</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Flexible solutions built around your needs.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-3.5 rounded-2xl border border-k-line p-9"
            >
              {s.circle}
              <h3 className="font-display text-[22px] font-extrabold">
                {s.title}
              </h3>
              <p className="leading-relaxed text-k-muted">{s.body}</p>
              <p className="mt-auto text-[13px] font-semibold text-k-faint">
                {s.bestFor}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="mb-11 flex max-w-[640px] flex-col gap-3">
            <p className="k-eyebrow text-k-sky-ink">How it works</p>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              From request to first shift.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="k-card flex flex-col gap-2.5 p-7">
                <p
                  aria-hidden
                  className={`font-display text-[22px] font-extrabold ${step.color}`}
                >
                  {step.n}
                </p>
                <h3 className="font-display text-[17px] font-extrabold">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-k-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <p className="k-eyebrow text-k-teal-ink">The difference</p>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
            A partner, not a portal.
          </h2>
          <p className="text-[17px] leading-relaxed text-k-muted">
            Staffing shouldn&apos;t create more work for your leadership team.
            We provide responsive, hands-on support to help you maintain
            coverage, strengthen your workforce, and keep your focus where it
            belongs: on quality care.
          </p>
          <Link href="/contact" className="k-btn-primary">
            Get in Touch
          </Link>
        </div>
        <Image
          src="/kindred/photos/clinic-reception.webp"
          alt="A coordinator greeting a nurse at a clinic reception"
          width={1024}
          height={768}
          className="min-h-[300px] w-full rounded-[18px] object-cover"
        />
      </section>
    </>
  );
}
