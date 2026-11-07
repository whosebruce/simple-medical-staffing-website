import Link from "next/link";
import { Photo } from "@/components/site/Photo";
import { StructuredData } from "@/components/site/StructuredData";
import { Wave } from "@/components/site/Wave";
import { BUSINESS_FACTS } from "@/lib/brand";
import { documentTitle, pageMetadata } from "@/lib/seo";

// 2026-11-07 (App Store submission): the privacy policy for the website AND the SMWS app (the iPhone app and the web
// app at app.simplemedicalstaffing.com). The App Store listing and the app's own "Privacy Policy" link point here.
// Every practice statement matches the app as built (private repository): what the forms and screens collect, the
// providers it runs on, the in-app deletion request, no ads or tracking, no location, email only. Change it together
// with the app.

const PATH = "/privacy/";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Simple Medical Workforce Solutions collects, uses, shares and protects information on this website and in the SMWS app, and how to ask us to see or delete it.";

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

export default function PrivacyPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} />
      <section className="relative overflow-hidden bg-k-cloud">
        <div aria-hidden className="k-aura -right-48 -top-64 h-[560px] w-[560px]" />
        <div className="k-wrap relative grid items-center gap-10 pb-10 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <p className="k-eyebrow text-k-sky-ink">Privacy</p>
            <h1 className="k-h1 k-h1-long">Privacy Policy</h1>
            <p className="k-small">Effective November 2026. Covers this website and the SMWS app.</p>
          </div>
          <div className="relative">
            <div aria-hidden className="k-collage-ring -right-4 -top-6 left-auto z-10 w-[110px] sm:w-[140px]" />
            <Photo
              image="interior"
              shape="leaf"
              priority
              className="aspect-[16/9] w-full"
              focus="58% 50%"
              sizes="(min-width: 1240px) 520px, (min-width: 1024px) 42vw, 92vw"
            />
          </div>
        </div>
      </section>
      <Wave top="var(--color-k-cloud)" bottom="var(--color-k-page)" />

      <section className="pb-[clamp(64px,8vw,120px)] pt-6">
        <div className="k-wrap-narrow flex flex-col gap-10">
          <Section title="Who we are">
            <p>
              Simple Medical Workforce Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a healthcare staffing agency in Southern
              California, operated by True Spirit, LLC. This policy covers this website and the SMWS app: the iPhone app and the
              web app at app.simplemedicalstaffing.com, where healthcare professionals apply, sign in, pick up shifts and keep
              their records, and where our office staff run scheduling and hiring.
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              <strong>On this website:</strong> nothing you type. The website has no forms, accounts or advertising trackers. Our
              website host may process basic technical information, such as an IP address, browser information and request
              logs, to deliver and protect the site.
            </p>
            <p>
              <strong>In the SMWS app</strong>, only what you give us or what your work with us creates:
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Account details: your name, email address and phone number, and an optional profile photo.</li>
              <li>
                Your application: the role you want, city and state, work authorization and age answers, experience, shift
                preferences, license or certification type, number and expiration, and a professional reference.
              </li>
              <li>
                Credential documents you upload, such as a license, certification or ID. Each file is checked for viruses before
                it is stored.
              </li>
              <li>
                Your work with us: availability, shifts offered, booked and worked, clock-in and clock-out times, time cards,
                pay rates and earnings, training, HR requests, messages from the office, and notes and ratings about shifts.
              </li>
              <li>
                Sign-in and device information: sign-in sessions, the devices you sign in on, passkeys or authenticator apps you
                set up, and, if you turn on notifications, your device&apos;s notification token.
              </li>
              <li>Your choices, such as whether we may text you about open shifts and your notification settings.</li>
            </ul>
            <p>
              The app does not collect your location, contacts or browsing activity, shows no ads, and contains no advertising or
              analytics trackers. &ldquo;Get Directions&rdquo; opens your maps app; it doesn&apos;t send your location to us.
            </p>
          </Section>

          <Section title="How we use it">
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>To review your application and check your credentials.</li>
              <li>To offer, book and schedule shifts, record your time and pay you.</li>
              <li>To send you sign-in codes and email about your application, shifts and account.</li>
              <li>To keep accounts secure, prevent fraud and fix problems.</li>
              <li>To meet our legal, tax and healthcare staffing obligations.</li>
            </ul>
            <p>We do not sell your personal information or share it for advertising.</p>
          </Section>

          <Section title="Who we share it with">
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                Healthcare facilities where you are offered or booked for a shift: your name, role, credential status and the
                shift details they need.
              </li>
              <li>
                Service providers that run the app for us, under contracts that limit what they may do with it: DigitalOcean
                (hosting, database and backups, in the United States), Resend (sending our email) and Microsoft 365 (our company
                email). If we pay you through the app, Stripe handles payment and tax details directly.
              </li>
              <li>Government agencies or others when the law requires it, or to protect people&apos;s safety.</li>
            </ul>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep your account while you use it. Records of your application, credentials, shifts, hours and pay are kept as
              long as employment, tax and healthcare staffing rules require, then deleted. Backups are kept for up to a few weeks.
            </p>
          </Section>

          <Section title="Deleting your account and your other choices">
            <p>
              <strong>Delete your account in the app:</strong> sign in, open <strong>Me</strong>, then <strong>Delete My Account</strong>.
              We delete your account within 30 days. We delete your sign-in, photo, settings and the messages we sent you, and
              remove your name and contact details from the account. We keep your work record (application, credentials, shifts,
              hours and pay) only as long as the rules above require.
            </p>
            <p>
              You can also ask us to show you, correct or delete your information, or change your choices, by calling{" "}
              <a href={`tel:${BUSINESS_FACTS.phoneTel}`} className={link}>
                {BUSINESS_FACTS.phoneDisplay}
              </a>{" "}
              or emailing{" "}
              <span className="break-words font-semibold">{BUSINESS_FACTS.email}</span>
              . We confirm it&apos;s you before we act, and we answer within 45 days. California residents have these rights under
              California law, and we won&apos;t treat you differently for using them.
            </p>
          </Section>

          <Section title="How we protect it">
            <p>
              Information travels over encrypted connections. Sign-in codes expire after 10 minutes and work once, office staff
              confirm sign-in with a second step, and only staff whose job needs your information can see it. Please don&apos;t
              send patient information, medical records, Social Security numbers or license images by ordinary email; upload
              documents in the app instead.
            </p>
          </Section>

          <Section title="Children">
            <p>The app is for adults applying for and doing healthcare work. We don&apos;t knowingly collect information from anyone under 18.</p>
          </Section>

          <Section title="Changes and questions">
            <p>
              If we change this policy, we&apos;ll post the new version here with its date, and tell app users in the app or by email
              when the change matters. Questions: call {BUSINESS_FACTS.phoneDisplay}, email {BUSINESS_FACTS.email}, or write to
              us at {BUSINESS_FACTS.address}. Help with the app is on the{" "}
              <Link href="/support" className={link}>
                Help
              </Link>{" "}
              page.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
