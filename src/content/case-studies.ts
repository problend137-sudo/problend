export type CaseStudyMetric = {
  label: string;
  value: string;
  detail?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  venueType: string;
  city: string;
  summary: string;
  metrics: CaseStudyMetric[];
  body: string[];
  published: boolean;
};

export const caseStudies = [
  {
    slug: "fitness-venue-placement-framework",
    title: "Fitness venue placement framework",
    venueType: "Gym and fitness center",
    city: "New Delhi",
    summary:
      "A public-safe case study format for approved ProBlend placements, focused on venue fit, operating model, and machine support responsibilities.",
    metrics: [
      { label: "Venue type", value: "Fitness venue" },
      { label: "Base city", value: "New Delhi" },
      { label: "Public status", value: "Framework ready" }
    ],
    body: [
      "Published ProBlend case studies will explain the venue context, product fit, machine capability requirements, and partner responsibilities without exposing private opportunity records.",
      "The framework keeps operational proof public-safe while leaving detailed scoring, forecast assumptions, audit history, and admin workflows inside the private operating system."
    ],
    published: true
  },
  {
    slug: "office-campus-wellness-draft",
    title: "Office campus wellness draft",
    venueType: "Office campus",
    city: "Bengaluru",
    summary: "Draft story structure for a future workplace wellness placement.",
    metrics: [
      { label: "Venue type", value: "Office campus" },
      { label: "Target city", value: "Bengaluru" }
    ],
    body: ["Draft content remains unpublished until the ProBlend team approves the story for public release."],
    published: false
  }
] as const satisfies ReadonlyArray<CaseStudy>;

export const publishedCaseStudies = caseStudies.filter((caseStudy) => caseStudy.published);
