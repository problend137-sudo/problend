import { describe, expect, it } from "vitest";
import { scoreOpportunity } from "@/features/forecasting/scoring";

describe("scoreOpportunity", () => {
  it("prioritizes high-footfall ready venues with direct access", () => {
    const result = scoreOpportunity({
      venueType: "gym",
      dailyFootfall: 900,
      locationType: "metro",
      accessQuality: "direct_owner",
      infrastructureReadiness: "ready",
      commercialIntent: "revenue_share",
      hasMultiCityAccess: false,
      venueCount: 1,
      strategicValue: "fitness_audience"
    });

    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.rating).toBe("priority");
    expect(result.reasoning.join(" ")).toContain("direct");
    expect(result.factorBreakdown.accessQuality).toBeGreaterThan(0);
  });

  it("keeps confidence lower when authority and infrastructure are weak", () => {
    const result = scoreOpportunity({
      venueType: "mall",
      dailyFootfall: 400,
      locationType: "tier_2",
      accessQuality: "cold_access",
      infrastructureReadiness: "unknown",
      commercialIntent: "open_discussion",
      hasMultiCityAccess: false,
      venueCount: 1,
      strategicValue: "general_visibility"
    });

    expect(result.score).toBeLessThan(60);
    expect(result.confidence).toBeLessThan(70);
    expect(result.reasoning.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps rating thresholds deterministic", () => {
    const low = scoreOpportunity({
      venueType: "other",
      dailyFootfall: 80,
      locationType: "tier_3",
      accessQuality: "cold_access",
      infrastructureReadiness: "not_available",
      commercialIntent: "open_discussion",
      hasMultiCityAccess: false,
      venueCount: 1,
      strategicValue: "general_visibility"
    });

    const strong = scoreOpportunity({
      venueType: "office",
      dailyFootfall: 650,
      locationType: "tier_1",
      accessQuality: "warm_introduction",
      infrastructureReadiness: "can_arrange",
      commercialIntent: "lease_commission",
      hasMultiCityAccess: false,
      venueCount: 2,
      strategicValue: "wellness_audience"
    });

    expect(low.rating).toBe("low");
    expect(strong.rating).toBe("strong");
  });
});
