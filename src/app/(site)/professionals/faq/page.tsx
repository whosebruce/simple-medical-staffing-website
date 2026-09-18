import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Circle } from "@/components/site/Circle";
import { StructuredData } from "@/components/site/StructuredData";
import { BUSINESS_FACTS } from "@/lib/brand";
import { STAFF_ROLES } from "@/lib/forms";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/professionals/faq/";
const TITLE = "Candidate FAQ for Healthcare Professionals";
const DESCRIPTION =
  "Answers for healthcare professionals considering Simple Medical Staffing: how to express interest, the kinds of work available, the roles we place, and what to expect from your coordinator.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

type Faq = { q: string; a: ReactNode };

const link = "font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy";

const GETTING_STARTED: Faq[] = [
  {
    q: "How do I apply?",
    a: (
      <>
        Our online application is being rebuilt, so for now the way in is a call or an email. Call {BUSINESS_FACTS.phone} or
        email {BUSINESS_FACTS.email} to express interest, and a coordinator will explain the secure next steps. The{" "}
        <Link href="/apply" className={link}>
          application options
        </Link>{" "}
        page has both contact details in one place.
      </>
    ),
  },
  {
    q: "What should I include when I reach out?",
    a: (
      <>
        A good starting point is the role you want, where you are located, and the type of schedule you are looking for.
        Short and plain is perfect. A coordinator will let you know if anything else is needed for the next step.
      </>
    ),
  },
  {
    q: "What should I not send by email?",
    a: (
      <>
        Please do not email medical records, Social Security numbers, license images, patient information, or other
        sensitive documents. Ordinary email is not the right place for them. When the time comes to share credentials, your
        coordinator will explain the secure way to do it.
      </>
    ),
  },
  {
    q: "Can I see a list of current openings?",
    a: (
      <>
        We do not publish a list of openings on this website. Tell us what you are looking for and we will talk through what
        fits your experience, availability, and goals.
      </>
    ),
  },
];

const WORK: Faq[] = [
  {
    q: "What kinds of work are available?",
    a: (
      <>
        Three kinds. Per-diem shifts, if you want flexibility and control over your schedule. Contract assignments, if you
        want a defined period with one facility. Permanent roles, if you are ready for your next long-term position. If what
        you need changes, say so and we will talk it through.
      </>
    ),
  },
  {
    q: "Which roles do you place?",
    a: (
      <>
        <span>We place healthcare professionals at every level of care, including:</span>
        <ul className="mt-3 flex flex-wrap gap-2">
          {STAFF_ROLES.map((role) => (
            <li key={role.code} className="rounded-full border border-k-line bg-k-cloud px-3 py-1 text-[14px] font-semibold text-k-navy">
              {role.label}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: "Where is Simple Medical Staffing located?",
    a: (
      <>
        Our address is {BUSINESS_FACTS.address}. A call or an email is how most conversations begin.
      </>
    ),
  },
];

const SUPPORT: Faq[] = [
  {
    q: "Who will I actually talk to?",
    a: (
      <>
        A coordinator who knows your name, your specialty, and what you want next. Your questions go to a person who can
        answer them, not a ticket queue.
      </>
    ),
  },
  {
    q: "What happens before my first day?",
    a: (
      <>
        Before you accept an assignment, we share what we know about it, and when we do not know something we say that too.
        Your coordinator goes over the assignment with you before day one.
      </>
    ),
  },
  {
    q: "What if a question comes up once I am working?",
    a: <>You can reach us by phone or email. Start confident, stay supported: that is the standard we hold ourselves to.</>,
  },
  {
    q: "What if my availability or goals change?",
    a: (
      <>
        Tell us. Per-diem, contract, or permanent, the right fit for you now may not be the right fit next year, and the
        match should follow you, not the other way around.
      </>
    ),
  },
];

function FaqGroup({ eyebrow, heading, items }: { eyebrow: string; heading: string; items: Faq[] }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-3">
        <p className="k-eyebrow text-k-violet-ink">{eyebrow}</p>
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{heading}</h2>
      </div>
      <dl className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.q} className="k-card flex flex-col gap-2.5 p-7">
            <dt className="font-display text-[19px] font-extrabold">{item.q}</dt>
            <dd className="text-[16px] leading-relaxed text-k-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function CandidateFaqPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <section className="relative overflow-hidden bg-k-page">
        <Circle gradient="violet-sky" className="-bottom-52 left-[-160px] h-[420px] w-[420px] opacity-10" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-4.5 px-6 py-12 sm:py-20">
          <Breadcrumbs path={PATH} />
          <p className="k-eyebrow text-k-violet-ink">Healthcare professionals · Questions</p>
          <h1 className="font-display text-3xl font-extrabold leading-[1.15] text-balance sm:text-5xl">
            Questions healthcare professionals ask us.
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-k-muted">
            Plain answers about getting started, the work we place, and what to expect from your coordinator. If your
            question is not here, call or email and ask a real person.
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
      </section>

      <div className="bg-k-cloud">
        <FaqGroup eyebrow="Getting started" heading="Reaching us and what to send." items={GETTING_STARTED} />
      </div>
      <FaqGroup eyebrow="The work" heading="Kinds of work, roles, and location." items={WORK} />
      <div className="bg-k-cloud">
        <FaqGroup eyebrow="Support" heading="Before, during, and after an assignment." items={SUPPORT} />
      </div>

      <section className="relative overflow-hidden bg-k-navy">
        <Circle gradient="sky-violet" className="-top-40 right-[-140px] h-[400px] w-[400px] opacity-35" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-16 text-center sm:py-[90px]">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-balance text-white sm:text-4xl">
            Bring your skills. We&apos;ll bring the right place to use them.
          </h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Link href="/apply" className="k-btn-primary">
              Apply Now
            </Link>
            <Link href="/professionals" className="k-btn-on-dark">
              For Professionals
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
