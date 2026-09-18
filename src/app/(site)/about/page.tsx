import Link from "next/link";
import { Circle } from "@/components/site/Circle";
import { StructuredData } from "@/components/site/StructuredData";
import { BUSINESS_FACTS, LEADERSHIP_ROLES } from "@/lib/brand";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/about/";
const TITLE = "About";
const DESCRIPTION =
  "Simple Medical Staffing connects qualified healthcare professionals with facilities that need dependable people. Meet founder and CEO Dina Casares.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function AboutPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} pageType="AboutPage" />
      <section className="relative overflow-hidden bg-k-cloud">
        <Circle
          gradient="teal-sky"
          className="-bottom-44 right-[-140px] h-[400px] w-[400px] opacity-15"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col gap-4.5 px-6 py-14 sm:py-20">
          <p className="k-eyebrow text-k-sky-ink">About Simple Medical Staffing</p>
          <h1 className="font-display text-3xl font-extrabold leading-[1.2] text-balance sm:text-[44px]">
            We’re building stronger healthcare teams, one relationship at a
            time.
          </h1>
          <p className="text-lg leading-relaxed text-k-muted">
            Simple Medical Workforce Solutions was built on a simple belief:
            healthcare staffing should be personal. We connect qualified
            healthcare professionals with facilities that need dependable
            people, while building relationships with both sides of every
            placement. Because great staffing isn’t just about filling a
            shift. It’s about finding the right fit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="k-eyebrow text-k-violet-ink">Our mission</p>
        <blockquote className="mt-4 border-l-4 border-k-sky pl-5 text-lg leading-relaxed text-k-muted">
          {BUSINESS_FACTS.mission}
        </blockquote>
      </section>

      <section className="bg-k-cloud">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="mb-11 flex max-w-[640px] flex-col gap-3">
            <p className="k-eyebrow text-k-sky-ink">What we stand for</p>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Warm on the surface, rigorous underneath.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="k-card flex flex-col gap-3 p-7">
              <Circle gradient="sky-violet" className="relative h-10 w-10" />
              <h3 className="font-display text-lg font-extrabold text-k-sky-ink">
                Compassionate
              </h3>
              <p className="text-[15px] leading-relaxed text-k-muted">
                Every match affects a shift, a patient, and a career. We never
                forget there are people on both ends of a placement.
              </p>
            </div>
            <div className="k-card flex flex-col gap-3 p-7">
              <div
                aria-hidden
                className="h-10 w-10 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #8C5FD4, #3FA5E8)",
                }}
              />
              <h3 className="font-display text-lg font-extrabold text-k-violet-ink">
                Vibrant
              </h3>
              <p className="text-[15px] leading-relaxed text-k-muted">
                Color and energy where the industry is clinical gray, in how
                we show up and how we celebrate the people we place.
              </p>
            </div>
            <div className="k-card flex flex-col gap-3 p-7">
              <Circle gradient="teal-sky" className="relative h-10 w-10" />
              <h3 className="font-display text-lg font-extrabold text-k-teal-ink">
                Inclusive
              </h3>
              <p className="text-[15px] leading-relaxed text-k-muted">
                Good matches come from listening to people. We try to do that
                for everyone who comes to us, whatever their role or
                background.
              </p>
            </div>
            <div className="k-card flex flex-col gap-3 p-7">
              <div aria-hidden className="h-10 w-10 rounded-xl bg-k-navy" />
              <h3 className="font-display text-lg font-extrabold">Reliable</h3>
              <p className="text-[15px] leading-relaxed text-k-muted">
                Warmth doesn&apos;t count for much if the shift falls through.
                Dependability, in schedules, credentials, and paperwork, is
                the standard we hold ourselves to.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="leadership-heading"
        className="mx-auto max-w-6xl px-6 py-14 sm:py-20"
      >
        <div className="mb-11 flex max-w-[640px] flex-col gap-3">
          <p className="k-eyebrow text-k-violet-ink">Leadership</p>
          <h2
            id="leadership-heading"
            className="font-display text-3xl font-extrabold sm:text-4xl"
          >
            The people behind our purpose
          </h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP_ROLES.map((role) => (
            <li
              key={role.title}
              className={`k-card flex flex-col gap-3 p-8 ${
                role.biography ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
            >
              {role.name ? (
                <h3 className="font-display text-2xl font-extrabold">
                  {role.name}
                </h3>
              ) : (
                <h3 className="font-display text-lg font-extrabold">
                  {role.title}
                </h3>
              )}
              {role.name ? (
                <p className="font-body text-[15px] font-bold text-k-sky-ink">
                  {role.title}
                </p>
              ) : null}
              {role.biography ? (
                <div className="mt-2 grid gap-6 md:grid-cols-3">
                  {role.biography.map((column) => (
                    <div key={column.heading} className="flex flex-col gap-2">
                      <h4 className="font-display text-[17px] font-extrabold text-k-navy">
                        {column.heading}
                      </h4>
                      <p className="text-[15px] leading-relaxed text-k-muted">
                        {column.body}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-k-muted">
          Additional leadership information will be added as the team grows.
        </p>
        <p className="mt-8 max-w-[680px] text-[17px] leading-relaxed text-k-muted">
          Facilities can see how we work on the{" "}
          <Link href="/solutions" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
            Staffing Solutions
          </Link>{" "}
          page. Healthcare professionals can see the roles we place and how to
          get started on the{" "}
          <Link href="/professionals" className="font-bold text-k-sky-ink underline underline-offset-4 hover:text-k-navy">
            For Professionals
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="relative overflow-hidden bg-k-navy">
        <Circle
          gradient="sky-violet"
          className="-bottom-52 left-[-160px] h-[440px] w-[440px] opacity-35"
        />
        <Circle
          gradient="teal-sky"
          className="-bottom-16 left-[210px] h-[200px] w-[200px] opacity-25"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-16 text-center sm:py-[90px]">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-white sm:text-4xl">
            &ldquo;{BUSINESS_FACTS.tagline}.&rdquo;
          </h2>
          <Link href="/contact" className="k-btn-primary">
            Work With Us
          </Link>
        </div>
      </section>
    </>
  );
}
