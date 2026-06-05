import { describe, expect, it } from "vitest";
import { testForecastAssumptions } from "@/features/forecasting/assumptions";
import { calculateForecast } from "@/features/forecasting/engine";

describe("calculateForecast", () => {
  it("uses supplied assumptions instead of module constants", () => {
    const input = {
      venueType: "gym",
      dailyFootfall: 500,
      operatingHours: 14,
      locationType: "metro",
      placementArea: "inside_venue",
      city: "Mumbai",
      state: "Maharashtra",
      accessQuality: "direct_owner",
      infrastructureReadiness: "ready",
      commercialIntent: "revenue_share"
    } as const;

    const first = calculateForecast(input, {
      ...testForecastAssumptions,
      commercial: { ...testForecastAssumptions.commercial, revenuePerTransaction: 180 }
    });

    const second = calculateForecast(input, {
      ...testForecastAssumptions,
      commercial: { ...testForecastAssumptions.commercial, revenuePerTransaction: 260 }
    });

    expect(second.revenueEstimate.monthly).toBeGreaterThan(first.revenueEstimate.monthly);
    expect(first.reasoning.join(" ")).toContain("gym");
    expect(first.recommendedMachineCount).toBeGreaterThanOrEqual(1);
  });

  it("caps demand by machine capacity and explains the cap", () => {
    const result = calculateForecast(
      {
        venueType: "college",
        dailyFootfall: 12_000,
        operatingHours: 16,
        locationType: "tier_1",
        placementArea: "cafeteria",
        city: "Pune",
        state: "Maharashtra",
        accessQuality: "decision_maker",
        infrastructureReadiness: "ready",
        commercialIntent: "purchase"
      },
      {
        ...testForecastAssumptions,
        operational: {
          transactionsPerMachinePerDay: 90,
          maxRecommendedMachines: 6,
          operatingHourBaseline: 12
        }
      }
    );

    expect(result.recommendedMachineCount).toBeLessThanOrEqual(6);
    expect(result.reasoning.some((line) => line.includes("capacity"))).toBe(true);
  });

  it("returns reproducible golden output from supplied inputs and assumptions", () => {
    const result = calculateForecast(
      {
        venueType: "gym",
        dailyFootfall: 500,
        operatingHours: 12,
        locationType: "metro",
        placementArea: "inside_venue",
        city: "Mumbai",
        state: "Maharashtra",
        accessQuality: "direct_owner",
        infrastructureReadiness: "ready",
        commercialIntent: "revenue_share"
      },
      testForecastAssumptions
    );

    expect(result).toMatchObject({
      demandEstimate: {
        dailyTransactions: 35,
        monthlyTransactions: 1050
      },
      revenueEstimate: {
        daily: 7700,
        monthly: 231_000
      },
      recommendedMachineCount: 1,
      opportunityScore: 68,
      confidence: 95
    });
    expect(result.reasoning.join(" ")).toContain("conversion rate 0.035");
    expect(result.reasoning.join(" ")).toContain("revenue per transaction 220");
  });
});
