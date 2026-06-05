import type { OpportunityScoreInput, OpportunityScoreOutput } from "./types";

export function scoreOpportunity(input: OpportunityScoreInput): OpportunityScoreOutput {
  const factorBreakdown = {
    venueQuality: scoreVenue(input.venueType),
    footfall: scoreFootfall(input.dailyFootfall),
    geography: scoreGeography(input.locationType),
    accessQuality: scoreAccess(input.accessQuality),
    operationalReadiness: scoreReadiness(input.infrastructureReadiness),
    capitalReadiness: scoreCommercial(input.commercialIntent),
    expansionPotential: input.hasMultiCityAccess ? 12 : Math.min(input.venueCount * 2, 8),
    strategicValue: scoreStrategicValue(input.strategicValue)
  };

  const score = Math.max(0, Math.min(100, Math.round(Object.values(factorBreakdown).reduce((sum, value) => sum + value, 0))));
  const confidence = Math.max(
    35,
    Math.min(95, 50 + factorBreakdown.accessQuality + factorBreakdown.operationalReadiness + Math.min(factorBreakdown.footfall, 15))
  );
  const rating = score >= 75 ? "priority" : score >= 60 ? "strong" : score >= 40 ? "moderate" : "low";
  const reasoning = [
    `Venue quality contributed ${factorBreakdown.venueQuality} points.`,
    `Footfall contributed ${factorBreakdown.footfall} points.`,
    `Access quality contributed ${factorBreakdown.accessQuality} points from ${input.accessQuality}.`,
    `Operational readiness contributed ${factorBreakdown.operationalReadiness} points.`
  ];

  return { score, rating, confidence, factorBreakdown, reasoning };
}

function scoreVenue(venueType: OpportunityScoreInput["venueType"]) {
  return { gym: 18, college: 16, office: 12, hospital: 10, mall: 12, residence: 8, other: 6 }[venueType];
}

function scoreFootfall(dailyFootfall: number) {
  if (dailyFootfall >= 1000) return 18;
  if (dailyFootfall >= 600) return 15;
  if (dailyFootfall >= 300) return 10;
  return 5;
}

function scoreGeography(locationType: OpportunityScoreInput["locationType"]) {
  return { metro: 12, tier_1: 10, tier_2: 7, tier_3: 4 }[locationType];
}

function scoreAccess(accessQuality: string) {
  return { direct_owner: 16, decision_maker: 15, strong_relationship: 12, warm_introduction: 8, cold_access: 3 }[accessQuality] ?? 4;
}

function scoreReadiness(readiness: OpportunityScoreInput["infrastructureReadiness"]) {
  return { ready: 12, can_arrange: 8, unknown: 3, not_available: 0 }[readiness];
}

function scoreCommercial(intent: OpportunityScoreInput["commercialIntent"]) {
  return { purchase: 9, revenue_share: 8, distribution: 8, co_investment: 7, lease_commission: 6, open_discussion: 4 }[intent];
}

function scoreStrategicValue(value: OpportunityScoreInput["strategicValue"]) {
  return { fitness_audience: 13, wellness_audience: 10, distribution_network: 12, general_visibility: 7 }[value];
}
