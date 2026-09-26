import { ServicePage } from "@/components/site/ServicePage";
import { StructuredData } from "@/components/site/StructuredData";
import { SERVICE_IDS } from "@/lib/schema";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/solutions/contract-staffing/";
const TITLE = "Contract Healthcare Staffing";
const DESCRIPTION =
  "Contract staffing from Simple Medical Staffing: longer-term placements for sustained coverage, matched to your unit and your team. Call 949-317-2470 to request staffing.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function ContractStaffingPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} aboutServices={[SERVICE_IDS.contract]} />
      <ServicePage
        path={PATH}
        eyebrow="Staffing Solutions · Contract staffing"
        heading="Contract staffing for sustained coverage."
        lede="Longer-term placements for the gaps that last: professionals who join your team, learn your unit, and stay through the assignment."
        image="linens"
        imageFocus="40% 30%"
        sections={[
          {
            eyebrow: "What it is",
            heading: "One professional, one unit, for a defined assignment.",
            body: (
              <>
                <p>
                  A contract placement is a healthcare professional assigned to your facility for a defined period rather than
                  a single shift. Over that time they work as part of your team and get to know the unit, the routines, and
                  the people, which can give your permanent staff more continuity than shift-by-shift coverage.
                </p>
                <p>
                  Facilities usually turn to contract staffing when a need is real but not permanent. A leave of absence has
                  to be covered. A vacancy is taking longer to fill than planned. Census rises for a season and settles again.
                  In each case the work is steady enough that shift-by-shift coverage would mean a different face every day.
                </p>
              </>
            ),
          },
          {
            eyebrow: "How we approach it",
            heading: "Matched for fit, not just availability.",
            body: (
              <>
                <p>
                  Every contract placement affects a shift, a patient, and a career, so we match on fit, meaning the unit, the
                  team, and the schedule. When you tell us what you need, we look for a professional whose experience and
                  availability fit what you described. You review the match, ask whatever you want to ask, and approve when
                  you are ready.
                </p>
                <p>
                  The relationship does not end at the start date. If something is not working once the assignment is under
                  way, tell us. We would rather fix a placement than defend one.
                </p>
              </>
            ),
          },
        ]}
        bestFor={{
          heading: "Best for",
          items: ["Seasonal census", "Leaves of absence", "Extended vacancies"],
        }}
        steps={{
          heading: "From request to first shift.",
          intro: "The same four steps we use for every request, with the assignment length as part of the conversation.",
          items: [
            { title: "Tell us the need", body: "Unit, shift, specialty, start date, and how long you expect the need to last. Send what you have and we'll ask about the rest." },
            { title: "We match for fit", body: "We look for a professional whose experience and availability fit what you described." },
            { title: "You confirm", body: "Review the match, ask whatever you want to ask, and approve when you're ready." },
            { title: "After the start date", body: "If something isn't working, tell us. We'd rather fix a placement than defend one." },
          ],
        }}
        related={{
          heading: "Is contract the right fit?",
          items: [
            {
              href: "/solutions/per-diem-staffing",
              title: "Need a shift covered, not a season?",
              body: "Per-diem staffing covers call-outs, census spikes, and weekend and night gaps one shift at a time.",
              label: "More About Per-Diem Staffing\u00a0→",
            },
            {
              href: "/solutions/direct-placement",
              title: "Hiring for keeps?",
              body: "Direct placement finds permanent hires selected for fit with your team, including hard-to-fill specialties and leadership.",
              label: "More About Direct Placement\u00a0→",
            },
          ],
        }}
        closing="Steady coverage starts with the right match."
      />
    </>
  );
}
