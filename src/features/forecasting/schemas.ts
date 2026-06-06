import { z } from "zod";

export const venueTypeSchema = z.enum(["gym", "college", "office", "hospital", "mall", "residence", "other"]);
export const locationTypeSchema = z.enum(["metro", "tier_1", "tier_2", "tier_3"]);
export const infrastructureReadinessSchema = z.enum(["ready", "can_arrange", "not_available", "unknown"]);
export const commercialIntentSchema = z.enum([
  "purchase",
  "revenue_share",
  "lease_commission",
  "distribution",
  "co_investment",
  "open_discussion"
]);
export const strategicValueSchema = z.enum([
  "fitness_audience",
  "wellness_audience",
  "general_visibility",
  "distribution_network"
]);
export const opportunityRatingSchema = z.enum(["low", "moderate", "strong", "priority"]);

const positiveFiniteNumberSchema = z.number().finite().positive();
const nonNegativeFiniteNumberSchema = z.number().finite().nonnegative();
const probabilitySchema = z.number().finite().min(0).max(1);
const boundedScoreSchema = z.number().finite().min(0).max(100);
const textSchema = z.string().trim().min(1);
const optionalTextSchema = (maxLength = 220) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(maxLength).optional()
  );
const honeypotSchema = z.union([z.literal(""), z.undefined()]).optional();

const numberFromForm = (schema: z.ZodNumber) =>
  z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();

    if (!trimmed) {
      return value;
    }

    const parsed = Number(trimmed);
    return Number.isNaN(parsed) ? value : parsed;
  }, schema);

const sourcePathSchema = (fallback: string) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().min(1).max(220).default(fallback)
  );

export const forecastInputSchema = z.object({
  venueType: venueTypeSchema,
  dailyFootfall: nonNegativeFiniteNumberSchema,
  operatingHours: positiveFiniteNumberSchema.max(24),
  locationType: locationTypeSchema,
  placementArea: textSchema,
  city: textSchema,
  state: textSchema,
  accessQuality: textSchema,
  infrastructureReadiness: infrastructureReadinessSchema,
  commercialIntent: commercialIntentSchema
});

export const forecastAssumptionsSchema = z.object({
  commercial: z.object({
    drinkPrice: positiveFiniteNumberSchema,
    revenuePerTransaction: positiveFiniteNumberSchema,
    productMix: z.record(z.string().min(1), probabilitySchema)
  }),
  behavioral: z.object({
    conversionRate: probabilitySchema,
    repeatPurchaseRate: probabilitySchema
  }),
  venueMultipliers: z.object({
    gym: positiveFiniteNumberSchema,
    college: positiveFiniteNumberSchema,
    office: positiveFiniteNumberSchema,
    hospital: positiveFiniteNumberSchema,
    mall: positiveFiniteNumberSchema,
    residence: positiveFiniteNumberSchema,
    other: positiveFiniteNumberSchema
  }),
  geographyMultipliers: z.object({
    metro: positiveFiniteNumberSchema,
    tier_1: positiveFiniteNumberSchema,
    tier_2: positiveFiniteNumberSchema,
    tier_3: positiveFiniteNumberSchema
  }),
  operational: z.object({
    transactionsPerMachinePerDay: positiveFiniteNumberSchema,
    maxRecommendedMachines: z.number().int().positive(),
    operatingHourBaseline: positiveFiniteNumberSchema.max(24)
  }),
  calculation: z.object({
    daysPerMonth: z.number().int().positive(),
    minimumOperatingHourMultiplier: positiveFiniteNumberSchema.max(1),
    opportunityScoreDemandWeight: positiveFiniteNumberSchema,
    opportunityScoreConfidenceWeight: positiveFiniteNumberSchema,
    confidence: z.object({
      base: boundedScoreSchema,
      highFootfallThreshold: nonNegativeFiniteNumberSchema,
      highFootfallLift: nonNegativeFiniteNumberSchema,
      infrastructureReadyLift: nonNegativeFiniteNumberSchema,
      decisionAccessLift: nonNegativeFiniteNumberSchema,
      completeLocationLift: nonNegativeFiniteNumberSchema,
      maximum: boundedScoreSchema
    })
  })
});

export const forecastOutputSchema = z.object({
  demandEstimate: z.object({
    dailyTransactions: nonNegativeFiniteNumberSchema,
    monthlyTransactions: nonNegativeFiniteNumberSchema
  }),
  revenueEstimate: z.object({
    daily: nonNegativeFiniteNumberSchema,
    monthly: nonNegativeFiniteNumberSchema
  }),
  recommendedMachineCount: z.number().int().positive(),
  opportunityScore: boundedScoreSchema,
  confidence: boundedScoreSchema,
  reasoning: z.array(textSchema).min(1)
});

export const placementEstimateInputSchema = z.object({
  venueType: venueTypeSchema,
  dailyFootfall: numberFromForm(nonNegativeFiniteNumberSchema.int()),
  operatingHours: numberFromForm(positiveFiniteNumberSchema.max(24)),
  locationType: locationTypeSchema,
  placementArea: textSchema.max(180),
  city: textSchema.max(140),
  state: textSchema.max(140),
  accessQuality: textSchema.max(120),
  infrastructureReadiness: infrastructureReadinessSchema,
  commercialIntent: commercialIntentSchema,
  contactName: optionalTextSchema(180),
  email: optionalTextSchema(220).pipe(z.string().email("Enter a valid email address.").max(220).optional()),
  phone: optionalTextSchema(80),
  sourcePath: sourcePathSchema("/placement-estimate"),
  honeypot: honeypotSchema
});

export const opportunityScoreInputSchema = z.object({
  venueType: venueTypeSchema,
  dailyFootfall: nonNegativeFiniteNumberSchema,
  locationType: locationTypeSchema,
  accessQuality: textSchema,
  infrastructureReadiness: infrastructureReadinessSchema,
  commercialIntent: commercialIntentSchema,
  hasMultiCityAccess: z.boolean(),
  venueCount: z.number().int().positive(),
  strategicValue: strategicValueSchema
});

export const opportunityScoreOutputSchema = z.object({
  score: boundedScoreSchema,
  rating: opportunityRatingSchema,
  confidence: boundedScoreSchema,
  factorBreakdown: z.record(textSchema, nonNegativeFiniteNumberSchema),
  reasoning: z.array(textSchema).min(1)
});

export type PlacementEstimateInput = z.infer<typeof placementEstimateInputSchema>;
