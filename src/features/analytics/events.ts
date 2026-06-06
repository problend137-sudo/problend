export const analyticsEvents = {
  ctaClick: "cta_click",
  contactSubmitted: "contact_submitted",
  opportunitySubmitted: "opportunity_submitted",
  calculatorStarted: "calculator_started",
  calculatorCompleted: "calculator_completed",
  adminStatusChanged: "admin_status_changed",
  forecastConfigVersionCreated: "forecast_config_version_created",
  exportCreated: "export_created"
} as const;

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents];

export const analyticsEventNames = Object.values(analyticsEvents) as AnalyticsEventName[];

const analyticsEventNameSet = new Set<string>(analyticsEventNames);

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return analyticsEventNameSet.has(value);
}
