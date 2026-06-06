import { z } from "zod";

const identityTypes = [
  "individual",
  "institution",
  "company",
  "operator",
  "distributor",
  "venue_owner",
  "strategic_introducer"
] as const;

const relationshipStrengths = [
  "direct_owner",
  "decision_maker",
  "strong_relationship",
  "warm_introduction",
  "cold_access",
  "unknown"
] as const;

const authorityLevels = ["final_decision", "influencer", "introducer", "unknown"] as const;
const readinessStates = ["ready", "can_arrange", "not_available", "unknown"] as const;
const opportunityKinds = ["venue", "city_network", "introduction"] as const;

const commercialIntents = [
  "purchase",
  "revenue_share",
  "lease_commission",
  "distribution",
  "co_investment",
  "open_discussion"
] as const;

const locationTypeValues = [
  "gym",
  "office_campus",
  "college_university",
  "hospital",
  "mall_retail",
  "residential_community",
  "distributor_network",
  "strategic_introduction"
] as const;

const optionalText = (maxLength = 600) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(maxLength).optional()
  );

const optionalInteger = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === "") {
      return undefined;
    }

    if (typeof value === "number") {
      return value;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  },
  z.number().int().min(0).optional()
);

const booleanFromForm = z.preprocess((value) => value === true || value === "true" || value === "on" || value === "1", z.boolean());

const stringArray = z.preprocess(
  (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === "string") {
      return value.trim() === "" ? [] : [value];
    }

    return [];
  },
  z
    .array(z.enum(locationTypeValues))
    .min(1, "Select at least one location type.")
    .max(locationTypeValues.length, "Select fewer location types.")
);

const sourcePath = (fallback: string) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().min(1).max(220).default(fallback)
  );

const honeypot = z.union([z.literal(""), z.undefined()]).optional();

export const opportunitySubmissionSchema = z
  .object({
    opportunityKind: z.enum(opportunityKinds).default("venue"),
    identityType: z.enum(identityTypes),
    contactName: z.string().trim().min(1, "Contact name is required.").max(180),
    designation: optionalText(180),
    email: z.string().trim().email("Enter a valid email address.").max(220),
    phone: z.string().trim().min(1, "Phone is required.").max(80),
    organizationName: optionalText(220),
    city: optionalText(140),
    state: optionalText(140),
    region: optionalText(160),
    hasMultiCityAccess: booleanFromForm.default(false),
    locationTypes: stringArray,
    accessMethod: z.string().trim().min(1, "Access details are required.").max(1200),
    relationshipStrength: z.enum(relationshipStrengths).default("unknown"),
    authorityLevel: z.enum(authorityLevels).default("unknown"),
    venueCount: optionalInteger,
    approximateDailyFootfall: optionalInteger,
    reachDescription: optionalText(1200),
    expectedMachineCount: optionalInteger,
    availableSpace: optionalText(800),
    electricityReadiness: z.enum(readinessStates).default("unknown"),
    internetReadiness: z.enum(readinessStates).default("unknown"),
    siteAccessConstraints: optionalText(1200),
    commercialIntent: z.enum(commercialIntents).default("open_discussion"),
    notes: optionalText(3000),
    details: z.record(z.string(), z.unknown()).optional(),
    sourcePath: sourcePath("/business-solutions"),
    honeypot
  })
  .superRefine((data, context) => {
    if (data.opportunityKind === "venue" && !data.city) {
      context.addIssue({
        code: "custom",
        message: "City is required for a venue.",
        path: ["city"]
      });
    }

    if (data.opportunityKind === "venue" && !data.state) {
      context.addIssue({
        code: "custom",
        message: "State is required for a venue.",
        path: ["state"]
      });
    }

    if (data.opportunityKind === "city_network" && !data.city && !data.region) {
      context.addIssue({
        code: "custom",
        message: "Share a city, region, or area for the network.",
        path: ["city"]
      });
    }
  })
  .transform((data) => ({
    ...data,
    details: {
      ...(data.details ?? {}),
      branch: data.opportunityKind
    }
  }));

export const opportunityApplicationSchema = z.object({
  opportunityPostId: z.string().trim().uuid("Choose a valid opportunity."),
  contactName: z.string().trim().min(1, "Contact name is required.").max(180),
  email: z.string().trim().email("Enter a valid email address.").max(220),
  phone: z.string().trim().min(1, "Phone is required.").max(80),
  organizationName: optionalText(220),
  city: z.string().trim().min(1, "City is required.").max(140),
  state: z.string().trim().min(1, "State is required.").max(140),
  intent: z.string().trim().min(1, "Intent is required.").max(1200),
  message: z.string().trim().min(1, "Message is required.").max(3000),
  sourcePath: sourcePath("/business-solutions"),
  honeypot
});

export type OpportunitySubmissionInput = z.infer<typeof opportunitySubmissionSchema>;
export type OpportunityApplicationInput = z.infer<typeof opportunityApplicationSchema>;
