import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createCalculatorSubmission,
  createForecastRun,
  getActiveForecastConfigVersion
} from "@/db/queries/forecasts";
import { testForecastAssumptions } from "@/features/forecasting/assumptions";
import { calculateForecast } from "@/features/forecasting/engine";
import { runPlacementEstimateAction } from "@/features/forecasting/actions";
import { placementEstimateInputSchema } from "@/features/forecasting/schemas";

vi.mock("@/db/queries/forecasts", () => ({
  createCalculatorSubmission: vi.fn(),
  createForecastRun: vi.fn(),
  getActiveForecastConfigVersion: vi.fn()
}));

const activeAssumptions = {
  ...testForecastAssumptions,
  commercial: {
    ...testForecastAssumptions.commercial,
    revenuePerTransaction: 99
  }
};

const activeVersion = {
  id: "forecast-version-id",
  forecastConfigId: "forecast-config-id",
  versionNumber: 2,
  assumptions: activeAssumptions,
  changeNote: "Test active version",
  createdBy: null,
  createdAt: new Date("2026-06-06T08:00:00.000Z")
};

const validEstimate = {
  venueType: "gym",
  dailyFootfall: "500",
  operatingHours: "14",
  locationType: "metro",
  placementArea: "reception wall",
  city: "Mumbai",
  state: "Maharashtra",
  accessQuality: "direct_owner",
  infrastructureReadiness: "ready",
  commercialIntent: "revenue_share",
  contactName: "Riya Kapoor",
  email: "riya@example.com",
  phone: "+919888888888",
  sourcePath: "/placement-estimate",
  honeypot: ""
};

const validForecastInput = {
  venueType: "gym",
  dailyFootfall: 500,
  operatingHours: 14,
  locationType: "metro",
  placementArea: "reception wall",
  city: "Mumbai",
  state: "Maharashtra",
  accessQuality: "direct_owner",
  infrastructureReadiness: "ready",
  commercialIntent: "revenue_share"
} as const;

function toFormData(input: Record<string, unknown>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  return formData;
}

describe("placement estimate input schema", () => {
  it("accepts a valid gym placement estimate", () => {
    const parsed = placementEstimateInputSchema.safeParse(validEstimate);

    expect(parsed.success).toBe(true);
    if (!parsed.success) {
      throw new Error("Expected valid placement estimate input to parse");
    }
    expect(parsed.data.dailyFootfall).toBe(500);
    expect(parsed.data.operatingHours).toBe(14);
  });

  it("rejects invalid footfall and operating hours", () => {
    expect(placementEstimateInputSchema.safeParse({ ...validEstimate, dailyFootfall: "-1" }).success).toBe(false);
    expect(placementEstimateInputSchema.safeParse({ ...validEstimate, operatingHours: "0" }).success).toBe(false);
    expect(placementEstimateInputSchema.safeParse({ ...validEstimate, operatingHours: "25" }).success).toBe(false);
  });
});

describe("runPlacementEstimateAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getActiveForecastConfigVersion).mockResolvedValue(activeVersion as never);
    vi.mocked(createCalculatorSubmission).mockResolvedValue({ id: "calculator-submission-id" } as never);
    vi.mocked(createForecastRun).mockResolvedValue({ id: "forecast-run-id" } as never);
  });

  it("returns field errors and skips persistence for invalid input", async () => {
    const result = await runPlacementEstimateAction(null, toFormData({ ...validEstimate, dailyFootfall: "-1" }));

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected placement estimate action to fail");
    }
    expect(result.fieldErrors?.dailyFootfall).toBeDefined();
    expect(getActiveForecastConfigVersion).not.toHaveBeenCalled();
    expect(createCalculatorSubmission).not.toHaveBeenCalled();
    expect(createForecastRun).not.toHaveBeenCalled();
  });

  it("uses active stored forecast assumptions, persists snapshots, and returns public output", async () => {
    const expected = calculateForecast(validForecastInput, activeAssumptions);

    const result = await runPlacementEstimateAction(null, toFormData(validEstimate));

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected placement estimate action to succeed");
    }
    expect(result.result.revenueEstimate.monthly).toBe(expected.revenueEstimate.monthly);
    expect(result.result.revenueEstimate.monthly).not.toBe(
      calculateForecast(validForecastInput, testForecastAssumptions).revenueEstimate.monthly
    );
    expect(result.result.demandEstimate.dailyTransactions).toBe(expected.demandEstimate.dailyTransactions);
    expect(result.result.recommendedMachineCount).toBe(expected.recommendedMachineCount);
    expect(result.result.opportunityScore).toBe(expected.opportunityScore);
    expect(result.result.confidence).toBe(expected.confidence);

    expect(createCalculatorSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        contactName: "Riya Kapoor",
        email: "riya@example.com",
        phone: "+919888888888",
        venueType: "gym",
        dailyFootfall: 500,
        operatingHours: 14,
        locationType: "metro",
        placementArea: "reception wall",
        city: "Mumbai",
        state: "Maharashtra",
        accessQuality: "direct_owner",
        infrastructureReadiness: "ready",
        commercialIntent: "revenue_share",
        sourcePath: "/placement-estimate"
      })
    );
    expect(createForecastRun).toHaveBeenCalledWith(
      expect.objectContaining({
        calculatorSubmissionId: "calculator-submission-id",
        forecastConfigVersionId: "forecast-version-id",
        inputSnapshot: validForecastInput,
        assumptionsSnapshot: activeAssumptions,
        outputSnapshot: expected,
        reasoning: expected.reasoning,
        source: "placement_estimate"
      })
    );
  });

  it("excludes forecast config ids, raw assumptions, and internal reasoning from the public result", async () => {
    const result = await runPlacementEstimateAction(null, toFormData(validEstimate));

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error("Expected placement estimate action to succeed");
    }

    const serialized = JSON.stringify(result);

    expect(serialized).not.toContain("forecastConfigVersionId");
    expect(serialized).not.toContain("forecast-version-id");
    expect(serialized).not.toContain("assumptions");
    expect(serialized).not.toContain("inputSnapshot");
    expect(serialized).not.toContain("outputSnapshot");
    expect(serialized).not.toContain("multiplier");
    expect(serialized).not.toContain("conversion rate");
    expect(serialized).not.toContain("revenue per transaction");
  });
});
