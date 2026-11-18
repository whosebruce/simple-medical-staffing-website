// The public address is a P.O. Box (Dina, 2026-11-16, "New address is P.O. Box 606 Carlsbad, Ca 92008").
// It is not an office anyone can visit. Since Dina's email of 2026-11-17 it is shown with no "Mailing Address"
// label in front of it, and the JSON-LD carries a PO box, not a street. It replaced 3333 Michelson Drive,
// Suite 300, Irvine, CA 92612.
export const MAILING_ADDRESS = {
  poBox: "606",
  locality: "Carlsbad",
  region: "CA",
  postalCode: "92008",
  country: "US",
} as const;

export const BUSINESS_FACTS = {
  name: "Simple Medical Workforce Solutions",
  phone: "760-536-2178",
  phoneDisplay: "+1 (760) 536-2178",
  phoneTel: "+17605362178",
  serviceArea: "Serving all of Southern California",
  serviceRegions: "San Diego, Orange County, Los Angeles County, and the Inland Empire",
  // No "Our primary focus is San Diego" (Dina, 2026-11-17): that was an internal discussion, and facilities in the
  // other counties shouldn't think they can't reach out. Nothing replaces it.
  facilities: "For SNF, rehab centers, and hospitals",
  email: "info@simplemedicalstaffing.com",
  website: "simplemedicalstaffing.com",
  address: `P.O. Box ${MAILING_ADDRESS.poBox}, ${MAILING_ADDRESS.locality}, ${MAILING_ADDRESS.region} ${MAILING_ADDRESS.postalCode}`,
  instagram: "simplemedicalstaffing",
  // Renamed from Simple Medical Staffing on 2026-10-22 (Bruce: "lets go with workforce solutions cause
  // they like that better"); the name and tagline are the approved facility flyer's. The domain, email
  // address and Instagram handle keep the old name.
  tagline: "Building Stronger Healthcare Teams",
  mission:
    "Our mission is to become an extension of every facility we serve by providing reliable healthcare professionals, innovative staffing strategies, and clinical leadership that strengthen teams, elevate quality of care, and reduce the reliance on traditional agency staffing.",
} as const;

export const LEADERSHIP_ROLES = [
  {
    // Dina's updated bio, supplied by her on 2026-11-16 ("please see my updated bio below. I would like this
    // updated on the website."): her exact words, including her header lines (eyebrow, title, organization).
    // It replaced the three named columns she supplied on 2026-09-17.
    title: "Founder & Chief Executive Officer",
    name: "Dina Casares",
    biography: {
      eyebrow: "Meet Our Founder",
      organization: "Simple Medical Workforce Solutions",
      paragraphs: [
        "With over 20 years of experience in the healthcare industry, Dina Casares is an accomplished healthcare professional, operational leader, and entrepreneur with a strong background in healthcare management, workforce development, and software technology.",
        "Beginning her career as a Certified Nursing Assistant at a young age, Dina developed a strong foundation in patient care before advancing into leadership positions, including Director of Operations, Director of Staff Development, and roles overseeing human resources, staffing, and organizational operations.",
        "Her professional experience spans clinical nursing, executive leadership, business operations, and software development, implementation, and training. This diverse background has equipped her with a unique perspective on the operational challenges healthcare organizations face and the role technology can play in creating more efficient, sustainable workforce solutions.",
        "As the Founder and CEO of Simple Medical Workforce Solutions, Dina combines her extensive healthcare experience with a forward-thinking, technology-driven approach to staffing and workforce management.",
        "Her vision extends beyond traditional staffing services. She is dedicated to building a company that connects healthcare professionals with meaningful opportunities while providing healthcare organizations with reliable staffing, innovative technology, and long-term workforce solutions.",
        "With a leadership philosophy rooted in integrity, innovation, collaboration, and compassion, Dina is committed to creating an organization where healthcare professionals feel valued, facilities feel supported, and partnerships are built to last.",
      ],
      closing: "Her mission is simple: Building Stronger Healthcare Teams.",
    },
  },
  // Names and titles from Dina on 2026-11-16 ("add Brandon and Alexis last name ... Brandon title, it should be
  // President/ Co-Founder and for Alexis her title should be Director of Talent and Workforce Operations"). Her
  // title wording is kept exactly. No headshots yet (the monogram stands in) and no biography until each person
  // supplies one.
  {
    title: "President/ Co-Founder",
    name: "Brandon Lee Rodriguez-Washington",
    biography: null,
  },
  {
    title: "Director of Talent and Workforce Operations",
    name: "Alexis Amicay",
    biography: null,
  },
] as const;
