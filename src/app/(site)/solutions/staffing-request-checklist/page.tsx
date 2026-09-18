import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Circle } from "@/components/site/Circle";
import { StructuredData } from "@/components/site/StructuredData";
import { BUSINESS_FACTS } from "@/lib/brand";
import { SERVICE_IDS } from "@/lib/schema";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/solutions/staffing-request-checklist/";
const TITLE = "Staffing Request Checklist for Facilities";
const DESCRIPTION =
  "What to include when you request staffing from Simple Medical Staffing: the unit, the shift, the specialty, the start date, and the details that help us find the right match.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const ESSENTIALS = [
  {
    title: "The unit",
    body: "Where the professional will work. The unit tells us about the patient population, the pace, and the kind of experience that fits.",
  },
  {
    title: "The shift",
    body: "Days, nights, weekends, or a rotation, and the hours. Availability is one half of a match; the schedule you actually need is the other.",
  },
  {
    title: "The specialty",
    body: "The role and the specialty, for example a Registered Nurse for a skilled nursing unit or a Physical Therapist for rehab. If more than one type of professional could fill the role, say so.",
  },
  {
    title: "The start date",
    body: "When coverage needs to begin. If the date is flexible, a range is fine. If it is fixed, tell us and we will work back from it.",
  },
];

const HELPFUL = [
  {
    title: "Which kind of staffing",
    body: (
      <>
        Whether you are looking for a{" "}
        <Link href="/solutions/per-diem-staffing" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
          per-diem shift
        </Link>
        , a{" "}
        <Link href="/solutions/contract-staffing" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
          contract placement
        </Link>{" "}
        for a defined period, or a{" "}
        <Link href="/solutions/direct-placement" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
          permanent hire
        </Link>
        . If you are not sure, describe the need and we will talk it through.
      </>
    ),
  },
  {
    title: "How long you expect the need to last",
    body: "A single shift, a few weeks, a season, or open ended. This shapes who we look for.",
  },
  {
    title: "Who we should talk to",
    body: "The best person to reach about this request, and the best way to reach them. Requests move faster when the questions go to the right desk.",
  },
  {
    title: "Anything about the team",
    body: "What has worked well with staff in the past, what has not, and what the people already on the unit need from the person joining them. This is the part a requisition never captures, and it is the part we match on.",
  },
];

const NEXT = [
  { title: "We match for fit", body: "We look for a professional whose experience and availability fit what you described." },
  { title: "You confirm", body: "Review the match, ask whatever you want to ask, and approve when you're ready." },
  { title: "After the start date", body: "If something isn't working, tell us. We'd rather fix a placement than defend one." },
];

export default function StaffingRequestChecklistPage() {
  return (
    <>
      <StructuredData
        path={PATH}
        title={documentTitle(TITLE)}
        description={DESCRIPTION}
        aboutServices={[SERVICE_IDS.contract, SERVICE_IDS.perDiem, SERVICE_IDS.directPlacement]}
      />
      <section className="relative overflow-hidden bg-k-cloud">
        <Circle gradient="teal-sky" className="-top-40 right-[-140px] h-[400px] w-[400px] opacity-15" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-4.5 px-6 py-12 sm:py-20">
          <Breadcrumbs path={PATH} />
          <p className="k-eyebrow text-k-sky-ink">Staffing Solutions · For facilities</p>
          <h1 className="max-w-[720px] font-display text-3xl font-extrabold leading-[1.15] text-balance sm:text-5xl">
            What to include in a staffing request.
          </h1>
          <p className="max-w-[620px] text-lg leading-relaxed text-k-muted">
            Unit, shift, specialty, start date. Send what you have and we&apos;ll ask about the rest. This page lists what
            helps us start on a match right away.
          </p>
          <Link href="/contact" className="k-btn-primary mt-2">
            Request Staffing
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-9 flex max-w-[640px] flex-col gap-3">
          <p className="k-eyebrow text-k-sky-ink">The essentials</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Four things every request needs.</h2>
          <p className="text-[17px] leading-relaxed text-k-muted">
            These four details are what we ask for on every request. With them, we can start looking for the professional who
            fits.
          </p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2">
          {ESSENTIALS.map((item, i) => (
            <li key={item.title} className="k-card flex flex-col gap-2.5 p-7">
              <p aria-hidden className="font-display text-[22px] font-extrabold text-k-sky-ink">
                {i + 1}
              </p>
              <h3 className="font-display text-[19px] font-extrabold">{item.title}</h3>
              <p className="text-[15.5px] leading-relaxed text-k-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="mb-9 flex max-w-[640px] flex-col gap-3">
            <p className="k-eyebrow text-k-violet-ink">Helpful if you have it</p>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Details that make the match better.</h2>
            <p className="text-[17px] leading-relaxed text-k-muted">
              None of these are required. Each one helps us look for the right person instead of an available one.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {HELPFUL.map((item) => (
              <li key={item.title} className="flex flex-col gap-2.5 rounded-2xl border border-k-line bg-white p-7">
                <h3 className="font-display text-[19px] font-extrabold">{item.title}</h3>
                <p className="text-[15.5px] leading-relaxed text-k-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="k-eyebrow text-k-teal-ink">How to send it</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Call or email. Short and plain is perfect.</h2>
          <p className="text-[17px] leading-relaxed text-k-muted">
            There is no form to fill out. Call or email with the details above, in whatever order you have them, and a
            person will pick it up from there.
          </p>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_FACTS.phone}`}
              className="font-display text-xl font-extrabold text-k-navy underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-k-navy"
            >
              {BUSINESS_FACTS.phone}
            </a>
            <p className="break-all text-[17px] font-semibold text-k-navy">{BUSINESS_FACTS.email}</p>
          </div>
          <p className="text-[15px] leading-relaxed text-k-muted">
            Please do not include patient information, medical records, or other sensitive documents in an email.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="k-eyebrow text-k-sky-ink">What happens next</p>
          {NEXT.map((step, i) => (
            <div key={step.title} className="flex gap-4 rounded-2xl border border-k-line p-6">
              <p aria-hidden className="font-display text-[22px] font-extrabold text-k-sky-ink">
                {i + 2}
              </p>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[17px] font-extrabold">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-k-muted">{step.body}</p>
              </div>
            </div>
          ))}
          <Link href="/solutions" className="k-arrow-link text-k-sky-ink hover:text-k-navy">
            Explore Staffing Solutions →
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-k-navy">
        <Circle gradient="sky-violet" className="-bottom-52 left-[-160px] h-[440px] w-[440px] opacity-35" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-16 text-center sm:py-24">
          <h2 className="font-display text-3xl font-extrabold leading-snug text-balance text-white sm:text-4xl">
            Tell us the need. We&apos;ll take it from there.
          </h2>
          <Link href="/contact" className="k-btn-primary">
            Request Staffing
          </Link>
        </div>
      </section>
    </>
  );
}
