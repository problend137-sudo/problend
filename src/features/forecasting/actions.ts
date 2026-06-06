"use server";

import {
  createCalculatorSubmission,
  createForecastRun,
  getActiveForecastConfigVersion
} from "@/db/queries/forecasts";
import type { JsonObject } from "@/db/schema";
import { analyticsEvents } from "@/features/analytics/events";
import { trackEventAction } from "@/features/analytics/actions";
import { calculateForecast } from "./engine";
import {
  forecastAssumptionsSchema,
  placementEstimateInputSchema
} from "./schemas";
import type { CommercialIntent, ForecastInput, ForecastOutput, InfrastructureReadiness, VenueType } from "./types";

type FieldErrors = Record<string, string[] | undefined>;

export type PlacementEstimatePublicResult = {
  demandEstimate: ForecastOutput["demandEstimate"];
  revenueEstimate: ForecastOutput["revenueEstimate"];
  recommendedMachineCount: number;
  opportunityScore: number;
  confidence: number;
  reasoning: string[];
};

export type PlacementEstimateActionResult =
  | { ok: true; message: string; result: PlacementEstimatePublicResult }
  | { ok: false; fieldErrors?: FieldErrors; message: string };

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

function fieldErrorResult(fieldErrors: FieldErrors): PlacementEstimateActionResult {
  return {
    ok: false,
    fieldErrors,
    message: "Please check the highlighted fields."
  };
}

function toJsonObject<T extends object>(value: T): JsonObject {
  return value as unknown as JsonObject;
}

export async function runPlacementEstimateAction(
  _previousState: PlacementEstimateActionResult | null,
  formData: FormData
): Promise<PlacementEstimateActionResult> {
  const parsed = placementEstimateInputSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return fieldErrorResult(parsed.error.flatten().fieldErrors);
  }

  const { contactName, email, phone, sourcePath, honeypot: _honeypot, ...forecastInput } = parsed.data;

  try {
    await trackEventAction({
      eventName: analyticsEvents.calculatorStarted,
      sourcePath,
      metadata: {
        venueType: forecastInput.venueType,
        city: forecastInput.city,
        state: forecastInput.state
      }
    });

    const activeVersion = await getActiveForecastConfigVersion();

    if (!activeVersion) {
      return {
        ok: false,
        message: "Placement estimates are unavailable right now. Please contact ProBlend directly."
      };
    }

    const assumptions = forecastAssumptionsSchema.safeParse(activeVersion.assumptions);

    if (!assumptions.success) {
      return {
        ok: false,
        message: "Placement estimates are unavailable right now. Please contact ProBlend directly."
      };
    }

    const output = calculateForecast(forecastInput, assumptions.data);
    const calculatorSubmission = await createCalculatorSubmission({
      contactName,
      email,
      phone,
      ...forecastInput,
      sourcePath
    });

    const forecastRun = await createForecastRun({
      calculatorSubmissionId: calculatorSubmission.id,
      forecastConfigVersionId: activeVersion.id,
      inputSnapshot: toJsonObject(forecastInput),
      assumptionsSnapshot: toJsonObject(assumptions.data),
      outputSnapshot: toJsonObject(output),
      reasoning: output.reasoning,
      source: "placement_estimate"
    });
    await trackEventAction({
      eventName: analyticsEvents.calculatorCompleted,
      sourcePath,
      metadata: {
        calculatorSubmissionId: calculatorSubmission.id,
        forecastRunId: forecastRun.id,
        venueType: forecastInput.venueType,
        city: forecastInput.city,
        state: forecastInput.state,
        recommendedMachineCount: output.recommendedMachineCount
      }
    });

    return {
      ok: true,
      message: "Placement estimate ready.",
      result: toPublicResult(forecastInput, output)
    };
  } catch {
    return {
      ok: false,
      message: "We could not run the estimate right now. Please try again."
    };
  }
}

function toPublicResult(input: ForecastInput, output: ForecastOutput): PlacementEstimatePublicResult {
  return {
    demandEstimate: output.demandEstimate,
    revenueEstimate: output.revenueEstimate,
    recommendedMachineCount: output.recommendedMachineCount,
    opportunityScore: output.opportunityScore,
    confidence: output.confidence,
    reasoning: buildPublicReasoning(input, output)
  };
}

function buildPublicReasoning(input: ForecastInput, output: ForecastOutput) {
  return [
    `A ${venueTypeLabels[input.venueType]} placement in ${input.city}, ${input.state} was estimated from ${formatNumber(input.dailyFootfall)} daily visitors and ${formatNumber(input.operatingHours)} operating hours.`,
    `Expected demand is ${formatNumber(output.demandEstimate.dailyTransactions)} shakes per day, with ${formatNumber(output.recommendedMachineCount)} machine${output.recommendedMachineCount === 1 ? "" : "s"} recommended for service coverage.`,
    `${readinessLabels[input.infrastructureReadiness]} infrastructure and ${accessQualityLabel(input.accessQuality)} support a confidence level of ${formatNumber(output.confidence)} out of 100.`,
    `The selected commercial model is ${commercialIntentLabels[input.commercialIntent]}.`
  ];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 1
  }).format(value);
}

const venueTypeLabels: Record<VenueType, string> = {
  gym: "gym",
  college: "college",
  office: "office",
  hospital: "hospital",
  mall: "mall or retail",
  residence: "residential",
  other: "venue"
};

const readinessLabels: Record<InfrastructureReadiness, string> = {
  ready: "Ready",
  can_arrange: "Arrangeable",
  not_available: "Limited",
  unknown: "Unconfirmed"
};

const commercialIntentLabels: Record<CommercialIntent, string> = {
  purchase: "purchase",
  revenue_share: "revenue share",
  lease_commission: "lease or commission",
  distribution: "distribution",
  co_investment: "co-investment",
  open_discussion: "open discussion"
};

function accessQualityLabel(value: string) {
  const labels: Record<string, string> = {
    direct_owner: "direct owner access",
    decision_maker: "decision-maker access",
    strong_relationship: "a strong relationship",
    warm_introduction: "a warm introduction",
    cold_access: "early access",
    unknown: "unconfirmed access"
  };

  return labels[value] ?? "the shared access details";
}
