export type VenueType = "gym" | "college" | "office" | "hospital" | "mall" | "residence" | "other";
export type LocationType = "metro" | "tier_1" | "tier_2" | "tier_3";
export type InfrastructureReadiness = "ready" | "can_arrange" | "not_available" | "unknown";
export type CommercialIntent =
  | "purchase"
  | "revenue_share"
  | "lease_commission"
  | "distribution"
  | "co_investment"
  | "open_discussion";

export type ForecastInput = {
  venueType: VenueType;
  dailyFootfall: number;
  operatingHours: number;
  locationType: LocationType;
  placementArea: string;
  city: string;
  state: string;
  accessQuality: string;
  infrastructureReadiness: InfrastructureReadiness;
  commercialIntent: CommercialIntent;
};

export type ForecastAssumptions = {
  commercial: {
    drinkPrice: number;
    revenuePerTransaction: number;
    productMix: Record<string, number>;
  };
  behavioral: {
    conversionRate: number;
    repeatPurchaseRate: number;
  };
  venueMultipliers: Record<VenueType, number>;
  geographyMultipliers: Record<LocationType, number>;
  operational: {
    transactionsPerMachinePerDay: number;
    maxRecommendedMachines: number;
    operatingHourBaseline: number;
  };
  calculation: {
    daysPerMonth: number;
    minimumOperatingHourMultiplier: number;
    opportunityScoreDemandWeight: number;
    opportunityScoreConfidenceWeight: number;
    confidence: {
      base: number;
      highFootfallThreshold: number;
      highFootfallLift: number;
      infrastructureReadyLift: number;
      decisionAccessLift: number;
      completeLocationLift: number;
      maximum: number;
    };
  };
};

export type ForecastOutput = {
  demandEstimate: {
    dailyTransactions: number;
    monthlyTransactions: number;
  };
  revenueEstimate: {
    daily: number;
    monthly: number;
  };
  recommendedMachineCount: number;
  opportunityScore: number;
  confidence: number;
  reasoning: string[];
};

export type OpportunityScoreInput = {
  venueType: VenueType;
  dailyFootfall: number;
  locationType: LocationType;
  accessQuality: string;
  infrastructureReadiness: InfrastructureReadiness;
  commercialIntent: CommercialIntent;
  hasMultiCityAccess: boolean;
  venueCount: number;
  strategicValue: "fitness_audience" | "wellness_audience" | "general_visibility" | "distribution_network";
};

export type OpportunityScoreOutput = {
  score: number;
  rating: "low" | "moderate" | "strong" | "priority";
  confidence: number;
  factorBreakdown: Record<string, number>;
  reasoning: string[];
};
