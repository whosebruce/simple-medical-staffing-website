import Link from "next/link";
import Image from "next/image";
import { Circle } from "@/components/site/Circle";
import { StructuredData } from "@/components/site/StructuredData";
import { STAFF_ROLES } from "@/lib/forms";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/professionals/";
const TITLE = "For Professionals";
const DESCRIPTION =
  "Per-diem, contract, and permanent opportunities for healthcare professionals. Tell us your skills and schedule, and we'll look for the right fit.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function ProfessionalsPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <section className="relative overflow-hidden bg-k-page">
        <Circle
          gradient="violet-sky"
          className="-bottom-52 left-[-160px] h-[420px] w-[420px] opacity-10"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <p className="k-eyebrow text-k-violet-ink">
              Healthcare professionals · Careers
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-balance sm:text-5xl">
              Your skills. Your schedule. The right opportunity.
            </h1>
            <p className="max-w-[520px] text-lg leading-relaxed text-k-muted">
              Whether you&apos;re looking for per-diem flexibility, a contract
              opportunity, or your next permanent role, we connect you with
              opportunities that fit your experience, availability, and goals.
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
          <div className="relative">
            <Circle
              gradient="sky-violet"
              className="-bottom-6 -left-6 h-[120px] w-[120px] opacity-85"
            />
            <Image
              src="/kindred/photos/nurse-portrait.webp"
              alt="A nurse in a bright clinic hallway"
              width={1024}
              height={768}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              fetchPriority="high"
              className="relative min-h-[300px] w-full rounded-[18px] object-cover object-[50%_12%] shadow-[0_12px_36px_rgba(30,58,110,0.14)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="mb-11 flex max-w-[640px] flex-col gap-3">
            <p className="k-eyebrow text-k-violet-ink">Why work with us</p>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Treated like a professional, not a placement.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="k-card flex flex-col gap-3 p-8">
              <Circle gradient="sky-violet" className="relative h-11 w-11" />
              <h3 className="font-display text-[19px] font-extrabold">
                Talk to a real person.
              </h3>
              <p className="text-[15.5px] leading-relaxed text-k-muted">
                Your questions go to a person who can answer them, not a
                ticket queue. We think that&apos;s what staffing should feel
                like.
              </p>
            </div>
            <div className="k-card flex flex-col gap-3 p-8">
              <div
                aria-hidden
                className="h-11 w-11 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #8C5FD4, #3FA5E8)",
                }}
              />
              <h3 className="font-display text-[19px] font-extrabold">
                Flexibility that fits your lifestyle.
              </h3>
              <p className="text-[15.5px] leading-relaxed text-k-muted">
                Per-diem shifts, contract assignments, or a permanent role.
                If what you need changes, say so and we&apos;ll talk it
                through.
              </p>
            </div>
            <div className="k-card flex flex-col gap-3 p-8">
              <Circle gradient="teal-sky" className="relative h-11 w-11" />
              <h3 className="font-display text-[19px] font-extrabold">
                Clear, honest communication.
              </h3>
              <p className="text-[15.5px] leading-relaxed text-k-muted">
                Before you accept an assignment, we share what we know about
                it. When we don&apos;t know something, we say that too.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="mb-9 flex max-w-[640px] flex-col gap-3">
          <p className="k-eyebrow text-k-sky-ink">
            Healthcare professionals we provide.
          </p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            The right professionals for every level of care
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STAFF_ROLES.map((role) => (
            <li
              key={role.code}
              className="k-card px-4 py-3 text-[15px] font-semibold"
            >
              {role.label}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[680px] text-[17px] leading-relaxed text-k-muted">
          Wondering how to get started, what to send, or what happens before
          your first day? The{" "}
          <Link href="/professionals/faq" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
            candidate FAQ
          </Link>{" "}
          answers the questions we hear most, and our{" "}
          <Link href="/about" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
            About page
          </Link>{" "}
          explains who we are and why we work this way.
        </p>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 sm:py-20 lg:grid-cols-2">
          <Image
            src="/kindred/photos/badge-welcome.webp"
            alt="A welcoming badge moment on a first day"
            width={1024}
            height={768}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="min-h-[300px] w-full rounded-[18px] object-cover"
          />
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow text-k-teal-ink">Your first day</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
              Start confident. Stay supported.
            </h2>
            <p className="text-[17px] leading-relaxed text-k-muted">
              Your coordinator goes over the assignment with you before day
              one. And if a question comes up once you&apos;re working, you
              can reach us by phone or email.
            </p>
            <Link href="/apply" className="k-btn-primary">
              See Application Options
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-k-navy">
        <Circle
          gradient="sky-violet"
          className="-top-40 right-[-140px] h-[400px] w-[400px] opacity-35"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-16 text-center sm:py-[90px]">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-balance text-white sm:text-4xl">
            Bring your skills. We&apos;ll bring the right place to use them.
          </h2>
          <Link href="/apply" className="k-btn-primary">
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
