import type { ForecastAssumptions, ForecastInput, ForecastOutput } from "./types";

export function calculateForecast(input: ForecastInput, assumptions: ForecastAssumptions): ForecastOutput {
  const venueMultiplier = assumptions.venueMultipliers[input.venueType] ?? assumptions.venueMultipliers.other;
  const geographyMultiplier = assumptions.geographyMultipliers[input.locationType];
  const operatingHourMultiplier = Math.max(
    input.operatingHours / assumptions.operational.operatingHourBaseline,
    assumptions.calculation.minimumOperatingHourMultiplier
  );
  const repeatMultiplier = 1 + assumptions.behavioral.repeatPurchaseRate;
  const rawDailyTransactions =
    input.dailyFootfall *
    assumptions.behavioral.conversionRate *
    venueMultiplier *
    geographyMultiplier *
    operatingHourMultiplier *
    repeatMultiplier;

  const capacityPerMachine = assumptions.operational.transactionsPerMachinePerDay;
  const uncappedMachineCount = Math.max(1, Math.ceil(rawDailyTransactions / capacityPerMachine));
  const recommendedMachineCount = Math.min(uncappedMachineCount, assumptions.operational.maxRecommendedMachines);
  const cappedDailyTransactions = Math.min(rawDailyTransactions, recommendedMachineCount * capacityPerMachine);
  const dailyTransactions = Math.round(cappedDailyTransactions);
  const dailyRevenue = Math.round(dailyTransactions * assumptions.commercial.revenuePerTransaction);
  const monthlyTransactions = dailyTransactions * assumptions.calculation.daysPerMonth;
  const monthlyRevenue = dailyRevenue * assumptions.calculation.daysPerMonth;
  const confidence = calculateConfidence(input, assumptions);
  const opportunityScore = Math.min(
    100,
    Math.round(
      (dailyTransactions / capacityPerMachine) * assumptions.calculation.opportunityScoreDemandWeight +
        confidence * assumptions.calculation.opportunityScoreConfidenceWeight
    )
  );

  const reasoning = [
    `${input.venueType} venue multiplier applied at ${venueMultiplier}.`,
    `${input.locationType} geography multiplier applied at ${geographyMultiplier}.`,
    `Demand used conversion rate ${assumptions.behavioral.conversionRate} and repeat purchase rate ${assumptions.behavioral.repeatPurchaseRate}.`,
    `Operating hours multiplier was ${roundForReasoning(operatingHourMultiplier)} against a ${assumptions.operational.operatingHourBaseline}-hour baseline.`,
    `Raw demand was ${roundForReasoning(rawDailyTransactions)} transactions per day before capacity limits.`,
    `Recommended machine count is ${recommendedMachineCount} based on ${capacityPerMachine} transactions per machine per day.`,
    `Revenue used revenue per transaction ${assumptions.commercial.revenuePerTransaction} across ${assumptions.calculation.daysPerMonth} days.`
  ];

  if (uncappedMachineCount > recommendedMachineCount) {
    reasoning.push(`Demand was capped by the configured maximum capacity of ${recommendedMachineCount} machines.`);
  }

  return {
    demandEstimate: {
      dailyTransactions,
      monthlyTransactions
    },
    revenueEstimate: {
      daily: dailyRevenue,
      monthly: monthlyRevenue
    },
    recommendedMachineCount,
    opportunityScore,
    confidence,
    reasoning
  };
}

function calculateConfidence(input: ForecastInput, assumptions: ForecastAssumptions) {
  const confidenceAssumptions = assumptions.calculation.confidence;
  let confidence = confidenceAssumptions.base;

  if (input.dailyFootfall >= confidenceAssumptions.highFootfallThreshold) {
    confidence += confidenceAssumptions.highFootfallLift;
  }

  if (input.infrastructureReadiness === "ready") {
    confidence += confidenceAssumptions.infrastructureReadyLift;
  }

  if (input.accessQuality === "direct_owner" || input.accessQuality === "decision_maker") {
    confidence += confidenceAssumptions.decisionAccessLift;
  }

  if (input.city && input.state) {
    confidence += confidenceAssumptions.completeLocationLift;
  }

  return Math.min(confidence, confidenceAssumptions.maximum);
}

function roundForReasoning(value: number) {
  return Math.round(value * 100) / 100;
}
