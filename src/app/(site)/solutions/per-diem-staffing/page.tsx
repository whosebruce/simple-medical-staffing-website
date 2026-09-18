import { ServicePage } from "@/components/site/ServicePage";
import { StructuredData } from "@/components/site/StructuredData";
import { SERVICE_IDS } from "@/lib/schema";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/solutions/per-diem-staffing/";
const TITLE = "Per-Diem Healthcare Staffing";
const DESCRIPTION =
  "Per-diem staffing from Simple Medical Staffing: shift-by-shift coverage for call-outs, census spikes, and weekend and night gaps. You tell us the gap, we look for the match, you confirm it.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function PerDiemStaffingPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} aboutServices={[SERVICE_IDS.perDiem]} />
      <ServicePage
        path={PATH}
        eyebrow="Staffing Solutions · Per-diem staffing"
        heading="Per-diem staffing, shift by shift."
        lede="Shift-by-shift coverage for call-outs, census spikes, and weekend and night gaps. You tell us the gap, we look for the match, you confirm it."
        sections={[
          {
            eyebrow: "What it is",
            heading: "Coverage for the shift in front of you.",
            body: (
              <>
                <p>
                  Per diem means by the day. A per-diem professional covers a specific shift, or a short run of shifts, rather
                  than a set assignment. Facilities use it when a gap opens with little warning: a call-out on a weekend, a
                  night shift nobody on staff can pick up, a stretch of higher census that does not justify a longer contract.
                </p>
                <p>
                  Because the need is short, it is tempting to take whoever is free. We think fit still matters. The person
                  covering the shift has to be right for the unit, not only available that day, because your patients and your
                  team do not get a lighter version of care on a per-diem shift.
                </p>
              </>
            ),
          },
          {
            eyebrow: "How we approach it",
            heading: "You confirm the match before the shift.",
            body: (
              <>
                <p>
                  Tell us the gap: the unit, the shift, the specialty, and the date. We look for a professional whose experience
                  and availability fit, and you confirm the match before the shift is filled. Nothing is placed on your schedule
                  without your approval.
                </p>
                <p>
                  Facilities that use per-diem coverage regularly often prefer to see the same professionals return. If a
                  particular match worked well, say so. If one did not, say that too, and we will use it to make the next
                  match better.
                </p>
              </>
            ),
          },
        ]}
        bestFor={{
          heading: "Best for",
          items: ["Call-outs", "Census spikes", "Weekend and night gaps"],
        }}
        steps={{
          heading: "From gap to covered shift.",
          intro: "The same four steps we use for every request, focused on the shift that needs covering.",
          items: [
            { title: "Tell us the gap", body: "Unit, shift, specialty, and the date. Send what you have and we'll ask about the rest." },
            { title: "We match for fit", body: "We look for a professional whose experience and availability fit the shift you described." },
            { title: "You confirm", body: "Review the match, ask whatever you want to ask, and approve before the shift." },
            { title: "After the shift", body: "Tell us how it went. Good matches are worth repeating, and problems are worth fixing." },
          ],
        }}
        related={{
          heading: "Is per-diem the right fit?",
          items: [
            {
              href: "/solutions/contract-staffing",
              title: "Is the gap going to last?",
              body: "Contract staffing places one professional with your unit for a defined period, an option that can give the team more continuity than shift-by-shift coverage.",
              label: "More About Contract Staffing →",
            },
            {
              href: "/solutions/direct-placement",
              title: "Ready to hire permanently?",
              body: "Direct placement finds permanent hires selected for fit with your team, not just a resume that matches the requisition.",
              label: "More About Direct Placement →",
            },
          ],
        }}
        closing="The right professional, on the right shift."
      />
    </>
  );
}
