import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Circle } from "./Circle";
import { STAFF_ROLES } from "@/lib/forms";
import { BUSINESS_FACTS } from "@/lib/brand";

// Shared composition for the facility-facing service pages under /solutions/.
// Same rounded cards, eyebrows, navy close band and Title Case actions as the
// rest of the site; each page supplies its own prose.

export type ServiceSection = {
  eyebrow: string;
  heading: string;
  body: ReactNode;
};

export type ServiceStep = { title: string; body: string };

const STEP_COLORS = ["text-k-sky-ink", "text-k-violet-ink", "text-k-teal-ink", "text-k-navy"];

export function ServicePage({
  path,
  eyebrow,
  heading,
  lede,
  sections,
  bestFor,
  steps,
  related,
  closing,
}: {
  path: string;
  eyebrow: string;
  heading: string;
  lede: string;
  sections: ServiceSection[];
  bestFor: { heading: string; items: string[] };
  steps: { heading: string; intro: string; items: ServiceStep[] };
  related: { heading: string; items: { href: string; title: string; body: string; label: string }[] };
  closing: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-k-cloud">
        <Circle gradient="sky-violet" className="-top-40 right-[-140px] h-[400px] w-[400px] opacity-15" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4.5 px-6 py-12 sm:py-20">
          <Breadcrumbs path={path} />
          <p className="k-eyebrow text-k-sky-ink">{eyebrow}</p>
          <h1 className="max-w-[720px] font-display text-3xl font-extrabold leading-[1.15] text-balance sm:text-5xl">
            {heading}
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-k-muted">{lede}</p>
          <Link href="/contact" className="k-btn-primary mt-2">
            Request Staffing
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.heading} className="flex max-w-[680px] flex-col gap-3">
                <p className="k-eyebrow text-k-sky-ink">{s.eyebrow}</p>
                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{s.heading}</h2>
                <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-k-muted">{s.body}</div>
              </div>
            ))}
          </div>
          <aside className="flex flex-col gap-6 lg:pt-2">
            <div className="k-card flex flex-col gap-3 p-7">
              <h2 className="font-display text-lg font-extrabold">{bestFor.heading}</h2>
              <ul className="flex flex-col gap-2 text-[15.5px] leading-relaxed text-k-muted">
                {bestFor.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[9px] h-2 w-2 flex-none rounded-full bg-k-sky" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="k-card flex flex-col gap-3 p-7">
              <h2 className="font-display text-lg font-extrabold">Healthcare professionals we provide</h2>
              <ul className="flex flex-wrap gap-2">
                {STAFF_ROLES.map((role) => (
                  <li key={role.code} className="rounded-full border border-k-line bg-k-cloud px-3 py-1 text-[14px] font-semibold text-k-navy">
                    {role.label}
                  </li>
                ))}
              </ul>
              <Link href="/professionals" className="k-arrow-link mt-1 text-k-violet-ink hover:text-k-navy">
                See How It Works →
              </Link>
            </div>
            <div className="k-card flex flex-col gap-2 p-7">
              <h2 className="font-display text-lg font-extrabold">Call or email</h2>
              <a
                href={`tel:${BUSINESS_FACTS.phone}`}
                className="font-display text-xl font-extrabold text-k-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
              >
                {BUSINESS_FACTS.phone}
              </a>
              <p className="break-all text-[15.5px] font-semibold text-k-navy">{BUSINESS_FACTS.email}</p>
              <p className="text-[15px] leading-relaxed text-k-muted">{BUSINESS_FACTS.address}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="mb-11 flex max-w-[640px] flex-col gap-3">
            <p className="k-eyebrow text-k-sky-ink">How it works</p>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{steps.heading}</h2>
            <p className="text-[17px] leading-relaxed text-k-muted">{steps.intro}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.items.map((step, i) => (
              <div key={step.title} className="k-card flex flex-col gap-2.5 p-7">
                <p aria-hidden className={`font-display text-[22px] font-extrabold ${STEP_COLORS[i % STEP_COLORS.length]}`}>
                  {i + 1}
                </p>
                <h3 className="font-display text-[17px] font-extrabold">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-k-muted">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15.5px] leading-relaxed text-k-muted">
            Not sure what to include?{" "}
            <Link href="/solutions/staffing-request-checklist" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
              Read the staffing request checklist
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-9 flex max-w-[640px] flex-col gap-3">
          <p className="k-eyebrow text-k-teal-ink">Other ways to staff</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{related.heading}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {related.items.map((item) => (
            <div key={item.href} className="flex flex-col gap-3 rounded-2xl border border-k-line p-8">
              <h3 className="font-display text-[20px] font-extrabold">{item.title}</h3>
              <p className="leading-relaxed text-k-muted">{item.body}</p>
              <Link href={item.href} className="k-arrow-link mt-auto text-k-sky-ink hover:text-k-navy">
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-k-navy">
        <Circle gradient="sky-violet" className="-bottom-52 left-[-160px] h-[440px] w-[440px] opacity-35" />
        <Circle gradient="teal-sky" className="-bottom-20 left-[200px] h-[220px] w-[220px] opacity-25" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-16 text-center sm:py-24">
          <h2 className="font-display text-3xl font-extrabold leading-snug text-balance text-white sm:text-4xl">{closing}</h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/contact" className="k-btn-primary">
              Request Staffing
            </Link>
            <Link href="/solutions" className="k-btn-on-dark">
              All Staffing Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
