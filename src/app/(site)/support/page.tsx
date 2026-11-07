import Link from "next/link";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { BUSINESS_FACTS } from "@/lib/brand";
import { documentTitle, pageMetadata } from "@/lib/seo";

// 2026-11-07 (App Store submission): the support page the App Store listing and the app's own "Help" link point to.
// Every step matches the app as built: the 6-digit sign-in code (10 minutes, works once), Me -> Delete My Account,
// the office's 30 days.

const PATH = "/support/";
const TITLE = "Help";
const DESCRIPTION =
  "Help with the SMWS app from Simple Medical Workforce Solutions: signing in with your email code, applying, your shifts, and deleting your account.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

const link = "font-semibold text-k-navy underline underline-offset-4 hover:text-k-violet-ink";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="k-marker">
      <h2 className="k-h3 text-[1.35rem]">{title}</h2>
      <div className="k-body mt-3 flex flex-col gap-3">{children}</div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <section className="relative overflow-hidden bg-k-cloud">
        <div aria-hidden className="k-aura -right-48 -top-64 h-[560px] w-[560px]" />
        <div className="k-wrap relative flex flex-col items-start gap-4 pb-10 pt-12 sm:pt-16">
          <p className="k-eyebrow text-k-sky-ink">Help</p>
          <h1 className="k-h1 k-h1-long">Help With the SMWS App</h1>
          <p className="k-body max-w-[46rem]">
            Call us at{" "}
            <a href={`tel:${BUSINESS_FACTS.phoneTel}`} className={link}>
              {BUSINESS_FACTS.phoneDisplay}
            </a>{" "}
            or email{" "}
            <span className="break-words font-semibold">{BUSINESS_FACTS.email}</span>
            .
          </p>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" />

      <section className="pb-[clamp(64px,8vw,120px)] pt-6">
        <div className="k-wrap-narrow flex flex-col gap-10">
          <Section title="Signing in">
            <p>
              The app signs you in with your email, no password. Tap <strong>I Already Have an Account</strong>, enter your email
              and tap <strong>Email Me a Sign-In Code</strong>. Type the 6-digit code from the email into the app. A code works
              once and stops working after 10 minutes; tap <strong>Send a New Code</strong> for another.
            </p>
            <p>No email? Check your spam folder, make sure it&apos;s the address you applied with, or call us.</p>
          </Section>

          <Section title="New here">
            <p>
              Tap <strong>I&apos;m New Here</strong> to apply. It takes about 3 minutes, and your answers are saved so you can finish
              on any device. Our team reviews every application and contacts you about next steps.
            </p>
          </Section>

          <Section title="Shifts, hours and pay">
            <p>
              Once you&apos;re set up to work, <strong>Shifts</strong> shows open shifts and their pay, <strong>Schedule</strong>{" "}
              shows what you&apos;re booked for, and <strong>To Do</strong> shows anything you still need before you can work. If
              something looks wrong with a shift, your hours or your pay, call or email us.
            </p>
          </Section>

          <Section title="Deleting your account">
            <p>
              Sign in, open <strong>Me</strong>, then tap <strong>Delete My Account</strong> and <strong>Ask to Delete My Account</strong>.
              We delete your account within 30 days. You can take the request back in the same place until then. If you can&apos;t
              sign in, email {BUSINESS_FACTS.email} from the address on your account and we&apos;ll do it for you.
            </p>
            <p>
              Some records, such as shifts worked, hours and pay, are kept as long as the law requires. Our{" "}
              <Link href="/privacy" className={link}>
                Privacy Policy
              </Link>{" "}
              explains what is kept and why.
            </p>
          </Section>

          <Section title="Your information">
            <p>
              Read our{" "}
              <Link href="/privacy" className={link}>
                Privacy Policy
              </Link>
              . Please don&apos;t send patient information, Social Security numbers or license images by ordinary email; upload
              documents in the app.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
