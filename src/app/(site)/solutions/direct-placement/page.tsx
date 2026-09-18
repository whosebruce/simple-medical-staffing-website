import { ServicePage } from "@/components/site/ServicePage";
import { StructuredData } from "@/components/site/StructuredData";
import { SERVICE_IDS } from "@/lib/schema";
import { documentTitle, pageMetadata } from "@/lib/seo";

const PATH = "/solutions/direct-placement/";
const TITLE = "Direct Placement for Healthcare Facilities";
const DESCRIPTION =
  "Direct placement from Simple Medical Staffing: permanent healthcare hires selected for fit with your team, for permanent roles, hard-to-fill specialties, and leadership.";

export const metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION });

export default function DirectPlacementPage() {
  return (
    <>
      <StructuredData path={PATH} title={documentTitle(TITLE)} description={DESCRIPTION} aboutServices={[SERVICE_IDS.directPlacement]} />
      <ServicePage
        path={PATH}
        eyebrow="Staffing Solutions · Direct placement"
        heading="Direct placement, matched for fit."
        lede="Permanent hires selected for fit with your team, not just a resume that matches the requisition."
        sections={[
          {
            eyebrow: "What it is",
            heading: "A permanent hire, found the careful way.",
            body: (
              <>
                <p>
                  Direct placement is permanent hiring. Instead of an assignment with an end date, the professional joins your
                  facility as a member of your staff. We handle the search and the matching. You make the hire.
                </p>
                <p>
                  Facilities use direct placement for permanent roles, for hard-to-fill specialties, and for leadership
                  positions, where the pool of the right people is small and the cost of a wrong hire is high. A resume can
                  match a requisition line for line and still be the wrong person for the unit. Fit with the team is what
                  makes a permanent hire last.
                </p>
              </>
            ),
          },
          {
            eyebrow: "How we approach it",
            heading: "We look past the requisition.",
            body: (
              <>
                <p>
                  Tell us about the role and about the team it joins: the unit, the specialty, the schedule, and what the
                  people already there need from the person you hire. We look for candidates whose experience and goals fit
                  that picture, not only the job description.
                </p>
                <p>
                  You review each match, ask whatever you want to ask, and approve when you are ready. After the start date,
                  tell us how it is going. We would rather hear early than late.
                </p>
              </>
            ),
          },
        ]}
        bestFor={{
          heading: "Best for",
          items: ["Permanent roles", "Hard-to-fill specialties", "Leadership"],
        }}
        steps={{
          heading: "From role to hire.",
          intro: "The same four steps we use for every request, with the hire itself as the last word.",
          items: [
            { title: "Tell us the role", body: "Unit, specialty, schedule, start date, and what the team needs from the person. Send what you have and we'll ask about the rest." },
            { title: "We match for fit", body: "We look for candidates whose experience and goals fit the role and the team." },
            { title: "You confirm", body: "Review the match, ask whatever you want to ask, and make the hire when you're ready." },
            { title: "After the start date", body: "Tell us how the placement is going. We'd rather fix a placement than defend one." },
          ],
        }}
        related={{
          heading: "Is direct placement the right fit?",
          items: [
            {
              href: "/solutions/contract-staffing",
              title: "Need coverage while you hire?",
              body: "Contract staffing keeps the unit covered for a defined period, for leaves of absence, seasonal census, and extended vacancies.",
              label: "More About Contract Staffing →",
            },
            {
              href: "/solutions/per-diem-staffing",
              title: "Just need the shift covered?",
              body: "Per-diem staffing covers call-outs, census spikes, and weekend and night gaps one shift at a time.",
              label: "More About Per-Diem Staffing →",
            },
          ],
        }}
        closing="Stronger teams start with the right hire."
      />
    </>
  );
}
