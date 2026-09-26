import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { Photo } from "@/components/site/Photo";
import { RoleCloud } from "@/components/site/RoleCloud";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { BUSINESS_FACTS } from "@/lib/brand";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/professionals/faq/";
const TITLE = "Candidate FAQ for Healthcare Professionals";
const DESCRIPTION =
  "Answers for healthcare professionals considering Simple Medical Staffing: how to express interest, the kinds of work available, the roles we place, and what to expect from your coordinator.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

type Faq = { q: string; a: ReactNode };

const link = "k-link";

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
        <RoleCloud small className="mt-4 gap-2" />
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

function FaqGroup({ eyebrow, heading, items, tone }: { eyebrow: string; heading: string; items: Faq[]; tone: "violet" | "sky" | "teal" }) {
  const eyebrowClass =
    tone === "violet" ? "k-eyebrow-violet text-k-violet-ink" : tone === "teal" ? "k-eyebrow-teal text-k-teal-ink" : "text-k-sky-ink";
  return (
    <div className="k-wrap grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
      <div className="k-sticky flex flex-col items-start gap-4 lg:self-start">
        <p className={`k-eyebrow ${eyebrowClass}`}>{eyebrow}</p>
        <h2 className="k-h2 k-h2-sm">{heading}</h2>
      </div>
      <dl className="k-hairlist border-y border-k-line">
        {items.map((item) => (
          <div key={item.q} className="flex flex-col gap-3 py-7">
            <dt className="k-h3">{item.q}</dt>
            <dd className="k-body">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function CandidateFaqPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="k-aura -right-56 -top-72 h-[640px] w-[640px] bg-[radial-gradient(circle_at_35%_35%,rgba(140,95,212,0.18),rgba(63,165,232,0.12)_45%,transparent_70%)]"
        />
        <div className="k-wrap relative grid items-center gap-12 pb-14 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pb-20 lg:pt-14">
          <div className="flex flex-col items-start gap-6">
            <Breadcrumbs path={PATH} />
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Healthcare professionals · Questions</p>
            <h1 className="k-h1 k-h1-long">Questions healthcare professionals ask us.</h1>
            <p className="k-lede">
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
          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring -left-6 top-[8%] w-[26%]" />
            <Photo
              image="leaning"
              shape="arch"
              priority
              shadow
              className="aspect-[1/1.08] w-full"
              focus="50% 2%"
              sizes="(min-width: 1240px) 440px, (min-width: 1024px) 36vw, 92vw"
            />
          </div>
        </div>
      </section>

      <section className="k-section-tight pt-4">
        <FaqGroup eyebrow="Getting started" heading="Reaching us and what to send." items={GETTING_STARTED} tone="sky" />
      </section>
      <Wave top="var(--color-k-page)" bottom="var(--color-k-violet-tint)" />
      <section className="bg-k-violet-tint pb-[clamp(56px,7vw,96px)] pt-8">
        <FaqGroup eyebrow="The work" heading="Kinds of work, roles, and location." items={WORK} tone="violet" />
      </section>
      <Wave top="var(--color-k-violet-tint)" bottom="var(--color-k-page)" flip />
      <section className="k-section-tight">
        <FaqGroup eyebrow="Support" heading="Before, during, and after an assignment." items={SUPPORT} tone="teal" />
      </section>

      <ClosingPanel heading="Bring your skills. We'll bring the right place to use them.">
        <Link href="/apply" className="k-btn-primary">
          Apply Now
        </Link>
        <Link href="/professionals" className="k-btn-on-dark">
          For Professionals
        </Link>
      </ClosingPanel>
    </>
  );
}
