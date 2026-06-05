import type { ForecastAssumptions } from "./types";

// For tests and seed data only. Runtime forecast flows must supply active persisted assumptions.
export const testForecastAssumptions: ForecastAssumptions = {
  commercial: {
    drinkPrice: 220,
    revenuePerTransaction: 220,
    productMix: {
      belgian_chocolate: 0.34,
      vanilla: 0.24,
      mango: 0.24,
      cola_electrolyte: 0.18
    }
  },
  behavioral: {
    conversionRate: 0.035,
    repeatPurchaseRate: 0.18
  },
  venueMultipliers: {
    gym: 1.45,
    college: 1.2,
    office: 0.9,
    hospital: 0.75,
    mall: 1,
    residence: 0.65,
    other: 0.7
  },
  geographyMultipliers: {
    metro: 1.18,
    tier_1: 1,
    tier_2: 0.82,
    tier_3: 0.64
  },
  operational: {
    transactionsPerMachinePerDay: 75,
    maxRecommendedMachines: 5,
    operatingHourBaseline: 12
  },
  calculation: {
    daysPerMonth: 30,
    minimumOperatingHourMultiplier: 0.4,
    opportunityScoreDemandWeight: 55,
    opportunityScoreConfidenceWeight: 0.45,
    confidence: {
      base: 55,
      highFootfallThreshold: 500,
      highFootfallLift: 15,
      infrastructureReadyLift: 15,
      decisionAccessLift: 10,
      completeLocationLift: 5,
      maximum: 95
    }
  }
};
