import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ClosingPanel } from "@/components/site/ClosingPanel";
import { EmailText } from "@/components/site/EmailText";
import { Photo } from "@/components/site/Photo";
import { StepPath } from "@/components/site/StepPath";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { APP_LINKS } from "@/lib/app-links";
import { BUSINESS_FACTS } from "@/lib/brand";
import { SERVICE_IDS } from "@/lib/schema";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/solutions/staffing-request-checklist/";
const TITLE = "Staffing Request Checklist for Facilities";
const DESCRIPTION =
  "What to include when you request staffing from Simple Medical Workforce Solutions: the unit, the shift, the specialty, the start date, and the details that help us find the right match.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const ESSENTIALS = [
  {
    title: "The Unit",
    body: "Where the professional will work. The unit tells us about the patient population, the pace, and the kind of experience that fits.",
  },
  {
    title: "The Shift",
    body: "Days, nights, weekends, or a rotation, and the hours. Availability is one half of a match; the schedule you actually need is the other.",
  },
  {
    title: "The Specialty",
    body: "The role and the specialty, for example a Registered Nurse for a skilled nursing unit or a Physical Therapist for rehab. If more than one type of professional could fill the role, say so.",
  },
  {
    title: "The Start Date",
    body: "When coverage needs to begin. If the date is flexible, a range is fine. If it is fixed, tell us and we will work back from it.",
  },
];

const HELPFUL = [
  {
    title: "Which Kind of Staffing",
    body: (
      <>
        Whether you are looking for a{" "}
        <Link href="/solutions/per-diem-staffing" className="k-link">
          per-diem shift
        </Link>
        , a{" "}
        <Link href="/solutions/contract-staffing" className="k-link">
          contract placement
        </Link>{" "}
        for a defined period, or a{" "}
        <Link href="/solutions/direct-placement" className="k-link">
          permanent hire
        </Link>
        . If you are not sure, describe the need and we will talk it through.
      </>
    ),
  },
  {
    title: "How Long You Expect the Need to Last",
    body: "A single shift, a few weeks, a season, or open ended. This shapes who we look for.",
  },
  {
    title: "Who We Should Talk To",
    body: "The best person to reach about this request, and the best way to reach them. Requests move faster when the questions go to the right desk.",
  },
  {
    title: "Anything About the Team",
    body: "What has worked well with staff in the past, what has not, and what the people already on the unit need from the person joining them. This is the part a requisition never captures, and it is the part we match on.",
  },
];

const NEXT = [
  { title: "We Match for Fit", body: "We look for a professional whose experience and availability fit what you described." },
  { title: "You Confirm", body: "Review the match, ask whatever you want to ask, and approve when you're ready." },
  { title: "After the Start Date", body: "If something isn't working, tell us. We'd rather fix a placement than defend one." },
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

      <section className="relative overflow-hidden">
        <div aria-hidden className="k-aura -left-56 -top-72 h-[620px] w-[620px]" />
        <div className="k-wrap relative grid items-center gap-12 pb-14 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16 lg:pb-20 lg:pt-14">
          <div className="flex flex-col items-start gap-6">
            <Breadcrumbs path={PATH} />
            <p className="k-eyebrow text-k-sky-ink">Staffing Solutions&nbsp;· For Facilities</p>
            <h1 className="k-h1 k-h1-long">What to Include in a Staffing Request.</h1>
            <p className="k-lede">
              Unit, shift, specialty, start date. Send what you have and we&apos;ll ask about the rest. This page lists what
              helps us start on a match right away.
            </p>
            <a href={APP_LINKS.requestStaff} className="k-btn-primary mt-2">
              Request Staff
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
            <div aria-hidden className="k-collage-ring -bottom-6 -left-3 top-auto w-[24%] sm:-left-6" />
            <Photo
              image="notebook"
              shape="leaf"
              priority
              shadow
              className="aspect-[1/0.9] w-full"
              focus="60% 30%"
              sizes="(min-width: 1240px) 520px, (min-width: 1024px) 42vw, 92vw"
            />
          </div>
        </div>
      </section>

      <section className="k-section pt-6">
        <div className="k-wrap">
          <div className="mb-10 flex max-w-[660px] flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">The Essentials</p>
            <h2 className="k-h2">Four Things Every Request Needs.</h2>
            <p className="k-body">
              These four details give us what we need to get started on a match. Send what you have and we&apos;ll ask about
              the rest.
            </p>
          </div>
          <ol className="grid gap-x-12 border-t border-k-line sm:grid-cols-2">
            {ESSENTIALS.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[52px_minmax(0,1fr)] gap-5 border-b border-k-line py-8">
                <span aria-hidden className="k-step-num text-k-sky-ink">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="k-h3">{item.title}</h3>
                  <p className="k-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Wave top="var(--color-k-page)" bottom="var(--color-k-violet-tint)" />
      <section className="bg-k-violet-tint pb-[clamp(64px,8vw,112px)] pt-8">
        <div className="k-wrap">
          <div className="mb-10 flex max-w-[660px] flex-col items-start gap-4">
            <p className="k-eyebrow k-eyebrow-violet text-k-violet-ink">Helpful If You Have It</p>
            <h2 className="k-h2">Details That Make the Match Better.</h2>
            <p className="k-body">
              These are suggestions, not requirements. Each one helps us look for the right person instead of an
              available one, and the team will tell you if anything specific is needed for your request.
            </p>
          </div>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {HELPFUL.map((item) => (
              <li key={item.title} className="flex gap-4 border-t border-k-violet/20 py-7">
                <span aria-hidden className="mt-2 h-3 w-3 flex-none rounded-full bg-gradient-to-br from-k-violet to-k-sky" />
                <div className="flex flex-col gap-2">
                  <h3 className="k-h3">{item.title}</h3>
                  <p className="k-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Wave top="var(--color-k-violet-tint)" bottom="var(--color-k-page)" flip />

      <section className="k-section">
        <div className="k-wrap grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start gap-5">
            <p className="k-eyebrow k-eyebrow-teal text-k-teal-ink">How to Send It</p>
            <h2 className="k-h2">Call or Email. Short and Plain Is Perfect.</h2>
            <p className="k-body">
              You can{" "}
              <a href={APP_LINKS.requestStaff} className="k-link">
                start a request online
              </a>
              . Or call or email with the details above, in whatever order you have them, and a person will pick it up
              from there.
            </p>
            <div className="mt-1 flex w-full flex-col gap-1 rounded-[32px] bg-k-teal-tint p-7">
              <a
                href={`tel:${BUSINESS_FACTS.phoneTel}`}
                className="k-focus inline-flex min-h-11 items-center self-start font-display text-2xl font-extrabold text-k-navy underline decoration-k-teal decoration-2 underline-offset-[6px]"
              >
                {BUSINESS_FACTS.phoneDisplay}
              </a>
              <p className="text-[17px] font-semibold text-k-navy">
                <EmailText />
              </p>
            </div>
            <p className="k-small">
              Please do not include patient information, medical records, or other sensitive documents in an email.
            </p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="k-eyebrow text-k-sky-ink">What Happens Next</p>
            <StepPath steps={NEXT} start={2} vertical />
            <Link href="/solutions" className="k-arrow-link text-k-sky-ink">
              Explore Staffing Solutions&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      <ClosingPanel heading="Tell Us the Need. We'll Take It From There.">
        <a href={APP_LINKS.requestStaff} className="k-btn-primary">
          Request Staff
        </a>
      </ClosingPanel>
    </>
  );
}
