import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  customType,
  index,
  inet,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";

export type JsonObject = Record<string, unknown>;

const citext = customType<{ data: string; driverData: string }>({
  dataType() {
    return "extensions.citext";
  }
});

const emptyTextArray = sql`'{}'::text[]`;
const emptyJsonObject = sql`'{}'::jsonb`;

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: citext("email").notNull().unique(),
    name: text("name").notNull(),
    role: text("role").notNull().default("admin"),
    passwordHash: text("password_hash").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [check("admin_users_role_check", sql`${table.role} in ('owner', 'admin', 'analyst')`)]
);

export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    adminUserId: uuid("admin_user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    sessionTokenHash: text("session_token_hash").notNull().unique(),
    userAgent: text("user_agent"),
    ipAddress: inet("ip_address"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("admin_sessions_admin_user_idx").on(table.adminUserId),
    index("admin_sessions_expires_idx").on(table.expiresAt)
  ]
);

export const adminLoginAttempts = pgTable(
  "admin_login_attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: citext("email"),
    ipAddress: inet("ip_address"),
    wasSuccessful: boolean("was_successful").notNull(),
    failureReason: text("failure_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [index("admin_login_attempts_email_created_idx").on(table.email, table.createdAt.desc())]
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    adminUserId: uuid("admin_user_id").references(() => adminUsers.id, { onDelete: "set null" }),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata").$type<JsonObject>().notNull().default(emptyJsonObject),
    ipAddress: inet("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("audit_logs_admin_user_idx").on(table.adminUserId),
    check("audit_logs_metadata_object_check", sql`jsonb_typeof(${table.metadata}) = 'object'`)
  ]
);

export const activityLogs = pgTable(
  "activity_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorType: text("actor_type").notNull(),
    actorId: uuid("actor_id"),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: uuid("entity_id"),
    metadata: jsonb("metadata").$type<JsonObject>().notNull().default(emptyJsonObject),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("activity_logs_actor_idx").on(table.actorType, table.actorId),
    check("activity_logs_actor_type_check", sql`${table.actorType} in ('public', 'admin', 'system')`),
    check("activity_logs_metadata_object_check", sql`jsonb_typeof(${table.metadata}) = 'object'`)
  ]
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventName: text("event_name").notNull(),
    sourcePath: text("source_path").notNull(),
    sessionId: text("session_id"),
    metadata: jsonb("metadata").$type<JsonObject>().notNull().default(emptyJsonObject),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("analytics_events_name_created_idx").on(table.eventName, table.createdAt.desc()),
    check("analytics_events_metadata_object_check", sql`jsonb_typeof(${table.metadata}) = 'object'`)
  ]
);

export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: citext("email").notNull(),
    phone: text("phone"),
    message: text("message").notNull(),
    sourcePath: text("source_path").notNull().default("/contact"),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("contact_submissions_status_created_idx").on(table.status, table.createdAt.desc()),
    check("contact_submissions_status_check", sql`${table.status} in ('new', 'reviewed', 'replied', 'archived')`)
  ]
);

export const waitlistEntries = pgTable(
  "waitlist_entries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: citext("email").notNull(),
    phone: text("phone"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    interestType: text("interest_type").notNull(),
    notes: text("notes"),
    sourcePath: text("source_path").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("waitlist_entries_city_state_idx").on(table.city, table.state),
    check(
      "waitlist_entries_interest_type_check",
      sql`${table.interestType} in ('customer', 'venue', 'operator', 'distributor', 'other')`
    ),
    check("waitlist_entries_status_check", sql`${table.status} in ('new', 'reviewed', 'contacted', 'archived')`)
  ]
);

export const opportunities = pgTable(
  "opportunities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sourceType: text("source_type").notNull().default("external_opportunity_source"),
    opportunityKind: text("opportunity_kind").notNull().default("venue"),
    sourcePath: text("source_path").notNull().default("/business-solutions"),
    identityType: text("identity_type").notNull(),
    contactName: text("contact_name").notNull(),
    designation: text("designation"),
    email: citext("email").notNull(),
    phone: text("phone").notNull(),
    organizationName: text("organization_name"),
    city: text("city"),
    state: text("state"),
    region: text("region"),
    hasMultiCityAccess: boolean("has_multi_city_access").notNull().default(false),
    locationTypes: text("location_types").array().notNull().default(emptyTextArray),
    accessMethod: text("access_method").notNull(),
    relationshipStrength: text("relationship_strength"),
    authorityLevel: text("authority_level"),
    venueCount: integer("venue_count"),
    approximateDailyFootfall: integer("approximate_daily_footfall"),
    reachDescription: text("reach_description"),
    expectedMachineCount: integer("expected_machine_count"),
    availableSpace: text("available_space"),
    electricityReadiness: text("electricity_readiness"),
    internetReadiness: text("internet_readiness"),
    siteAccessConstraints: text("site_access_constraints"),
    commercialIntent: text("commercial_intent"),
    details: jsonb("details").$type<JsonObject>().notNull().default(emptyJsonObject),
    notes: text("notes"),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("opportunities_status_created_idx").on(table.status, table.createdAt.desc()),
    index("opportunities_city_state_idx").on(table.city, table.state),
    index("opportunities_kind_status_created_idx").on(table.opportunityKind, table.status, table.createdAt.desc()),
    check("opportunities_opportunity_kind_check", sql`${table.opportunityKind} in ('venue', 'city_network', 'introduction')`),
    check(
      "opportunities_identity_type_check",
      sql`${table.identityType} in ('individual', 'institution', 'company', 'operator', 'distributor', 'venue_owner', 'strategic_introducer')`
    ),
    check(
      "opportunities_relationship_strength_check",
      sql`${table.relationshipStrength} in ('direct_owner', 'decision_maker', 'strong_relationship', 'warm_introduction', 'cold_access', 'unknown')`
    ),
    check(
      "opportunities_authority_level_check",
      sql`${table.authorityLevel} in ('final_decision', 'influencer', 'introducer', 'unknown')`
    ),
    check(
      "opportunities_electricity_readiness_check",
      sql`${table.electricityReadiness} in ('ready', 'can_arrange', 'not_available', 'unknown')`
    ),
    check(
      "opportunities_internet_readiness_check",
      sql`${table.internetReadiness} in ('ready', 'can_arrange', 'not_available', 'unknown')`
    ),
    check(
      "opportunities_commercial_intent_check",
      sql`${table.commercialIntent} in ('purchase', 'revenue_share', 'lease_commission', 'distribution', 'co_investment', 'open_discussion')`
    ),
    check(
      "opportunities_status_check",
      sql`${table.status} in ('new', 'reviewing', 'qualified', 'forecasted', 'contacted', 'won', 'lost', 'archived')`
    ),
    check("opportunities_details_object_check", sql`jsonb_typeof(${table.details}) = 'object'`),
    check("opportunities_venue_count_check", sql`${table.venueCount} is null or ${table.venueCount} >= 0`),
    check(
      "opportunities_approximate_daily_footfall_check",
      sql`${table.approximateDailyFootfall} is null or ${table.approximateDailyFootfall} >= 0`
    ),
    check(
      "opportunities_expected_machine_count_check",
      sql`${table.expectedMachineCount} is null or ${table.expectedMachineCount} >= 0`
    )
  ]
);

export const opportunityPosts = pgTable(
  "opportunity_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    category: text("category").notNull(),
    summary: text("summary").notNull(),
    locationScope: text("location_scope").notNull(),
    commercialModel: text("commercial_model").notNull(),
    requirements: text("requirements").array().notNull().default(emptyTextArray),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    status: text("status").notNull().default("draft"),
    displayOrder: integer("display_order").notNull().default(0),
    closesAt: timestamp("closes_at", { withTimezone: true }),
    createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("opportunity_posts_created_by_idx").on(table.createdBy),
    index("opportunity_posts_published_idx").on(table.isPublished, table.publishedAt.desc()),
    index("opportunity_posts_public_board_idx").on(
      table.isPublished,
      table.status,
      table.displayOrder,
      table.publishedAt.desc()
    ),
    check(
      "opportunity_posts_category_check",
      sql`${table.category} in ('operator', 'venue_access', 'distributor', 'strategic_introduction')`
    ),
    check(
      "opportunity_posts_commercial_model_check",
      sql`${table.commercialModel} in ('purchase', 'revenue_share', 'lease_commission', 'distribution', 'co_investment', 'open_discussion')`
    ),
    check("opportunity_posts_status_check", sql`${table.status} in ('draft', 'open', 'closed', 'archived')`),
    check("opportunity_posts_display_order_check", sql`${table.displayOrder} >= 0`)
  ]
);

export const opportunityApplications = pgTable(
  "opportunity_applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    opportunityPostId: uuid("opportunity_post_id")
      .notNull()
      .references(() => opportunityPosts.id, { onDelete: "cascade" }),
    contactName: text("contact_name").notNull(),
    email: citext("email").notNull(),
    phone: text("phone").notNull(),
    organizationName: text("organization_name"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    intent: text("intent").notNull(),
    message: text("message").notNull(),
    sourcePath: text("source_path").notNull().default("/business-solutions"),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("opportunity_applications_post_idx").on(table.opportunityPostId, table.status, table.createdAt.desc()),
    check(
      "opportunity_applications_status_check",
      sql`${table.status} in ('new', 'reviewing', 'contacted', 'qualified', 'archived')`
    )
  ]
);

export const opportunityEvents = pgTable(
  "opportunity_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    opportunityId: uuid("opportunity_id")
      .notNull()
      .references(() => opportunities.id, { onDelete: "cascade" }),
    adminUserId: uuid("admin_user_id").references(() => adminUsers.id, { onDelete: "set null" }),
    eventType: text("event_type").notNull(),
    note: text("note"),
    metadata: jsonb("metadata").$type<JsonObject>().notNull().default(emptyJsonObject),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("opportunity_events_opportunity_idx").on(table.opportunityId),
    index("opportunity_events_admin_user_idx").on(table.adminUserId),
    check("opportunity_events_metadata_object_check", sql`jsonb_typeof(${table.metadata}) = 'object'`)
  ]
);

export const forecastConfigs = pgTable(
  "forecast_configs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    isActive: boolean("is_active").notNull().default(false),
    createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("forecast_configs_created_by_idx").on(table.createdBy),
    uniqueIndex("forecast_configs_single_active_idx").on(table.isActive).where(sql`${table.isActive}`)
  ]
);

export const forecastConfigVersions = pgTable(
  "forecast_config_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    forecastConfigId: uuid("forecast_config_id")
      .notNull()
      .references(() => forecastConfigs.id, { onDelete: "cascade" }),
    versionNumber: integer("version_number").notNull(),
    assumptions: jsonb("assumptions").$type<JsonObject>().notNull(),
    changeNote: text("change_note").notNull(),
    createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    uniqueIndex("forecast_config_versions_config_version_key").on(table.forecastConfigId, table.versionNumber),
    index("forecast_config_versions_config_idx").on(table.forecastConfigId, table.versionNumber.desc()),
    index("forecast_config_versions_created_by_idx").on(table.createdBy),
    check("forecast_config_versions_version_number_check", sql`${table.versionNumber} > 0`),
    check("forecast_config_versions_assumptions_object_check", sql`jsonb_typeof(${table.assumptions}) = 'object'`)
  ]
);

export const calculatorSubmissions = pgTable(
  "calculator_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    opportunityId: uuid("opportunity_id").references(() => opportunities.id, { onDelete: "set null" }),
    contactName: text("contact_name"),
    email: citext("email"),
    phone: text("phone"),
    venueType: text("venue_type").notNull(),
    dailyFootfall: integer("daily_footfall").notNull(),
    operatingHours: numeric("operating_hours", { precision: 4, scale: 1, mode: "number" }).notNull(),
    locationType: text("location_type").notNull(),
    placementArea: text("placement_area").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    accessQuality: text("access_quality").notNull(),
    infrastructureReadiness: text("infrastructure_readiness").notNull(),
    commercialIntent: text("commercial_intent").notNull(),
    sourcePath: text("source_path").notNull().default("/placement-estimate"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("calculator_submissions_opportunity_idx").on(table.opportunityId),
    check("calculator_submissions_daily_footfall_check", sql`${table.dailyFootfall} >= 0`),
    check(
      "calculator_submissions_operating_hours_check",
      sql`${table.operatingHours} > 0 and ${table.operatingHours} <= 24`
    )
  ]
);

export const forecastRuns = pgTable(
  "forecast_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    calculatorSubmissionId: uuid("calculator_submission_id").references(() => calculatorSubmissions.id, {
      onDelete: "set null"
    }),
    opportunityId: uuid("opportunity_id").references(() => opportunities.id, { onDelete: "set null" }),
    forecastConfigVersionId: uuid("forecast_config_version_id")
      .notNull()
      .references(() => forecastConfigVersions.id, { onDelete: "restrict" }),
    inputSnapshot: jsonb("input_snapshot").$type<JsonObject>().notNull(),
    assumptionsSnapshot: jsonb("assumptions_snapshot").$type<JsonObject>().notNull(),
    outputSnapshot: jsonb("output_snapshot").$type<JsonObject>().notNull(),
    reasoning: text("reasoning").array().notNull().default(emptyTextArray),
    source: text("source").notNull(),
    createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("forecast_runs_calculator_submission_idx").on(table.calculatorSubmissionId),
    index("forecast_runs_opportunity_idx").on(table.opportunityId),
    index("forecast_runs_config_version_idx").on(table.forecastConfigVersionId),
    index("forecast_runs_created_by_idx").on(table.createdBy),
    index("forecast_runs_created_idx").on(table.createdAt.desc()),
    check("forecast_runs_input_snapshot_object_check", sql`jsonb_typeof(${table.inputSnapshot}) = 'object'`),
    check("forecast_runs_assumptions_snapshot_object_check", sql`jsonb_typeof(${table.assumptionsSnapshot}) = 'object'`),
    check("forecast_runs_output_snapshot_object_check", sql`jsonb_typeof(${table.outputSnapshot}) = 'object'`),
    check("forecast_runs_source_check", sql`${table.source} in ('placement_estimate', 'admin_manual', 'opportunity_submission')`)
  ]
);

export const opportunityScores = pgTable(
  "opportunity_scores",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    opportunityId: uuid("opportunity_id")
      .notNull()
      .references(() => opportunities.id, { onDelete: "cascade" }),
    forecastRunId: uuid("forecast_run_id").references(() => forecastRuns.id, { onDelete: "set null" }),
    score: integer("score").notNull(),
    rating: text("rating").notNull(),
    confidence: integer("confidence").notNull(),
    factorBreakdown: jsonb("factor_breakdown").$type<JsonObject>().notNull(),
    reasoning: text("reasoning").array().notNull().default(emptyTextArray),
    createdBy: uuid("created_by").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index("opportunity_scores_opportunity_idx").on(table.opportunityId, table.createdAt.desc()),
    index("opportunity_scores_forecast_run_idx").on(table.forecastRunId),
    index("opportunity_scores_created_by_idx").on(table.createdBy),
    check("opportunity_scores_score_check", sql`${table.score} between 0 and 100`),
    check("opportunity_scores_rating_check", sql`${table.rating} in ('low', 'moderate', 'strong', 'priority')`),
    check("opportunity_scores_confidence_check", sql`${table.confidence} between 0 and 100`),
    check("opportunity_scores_factor_breakdown_object_check", sql`jsonb_typeof(${table.factorBreakdown}) = 'object'`)
  ]
);

export const caseStudies = pgTable(
  "case_studies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    venueType: text("venue_type").notNull(),
    city: text("city").notNull(),
    summary: text("summary").notNull(),
    metrics: jsonb("metrics").$type<JsonObject>().notNull().default(emptyJsonObject),
    body: text("body").notNull(),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [check("case_studies_metrics_object_check", sql`jsonb_typeof(${table.metrics}) = 'object'`)]
);

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type AdminSession = typeof adminSessions.$inferSelect;
export type NewAdminSession = typeof adminSessions.$inferInsert;
export type AdminLoginAttempt = typeof adminLoginAttempts.$inferSelect;
export type NewAdminLoginAttempt = typeof adminLoginAttempts.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
export type NewWaitlistEntry = typeof waitlistEntries.$inferInsert;
export type Opportunity = typeof opportunities.$inferSelect;
export type NewOpportunity = typeof opportunities.$inferInsert;
export type OpportunityPost = typeof opportunityPosts.$inferSelect;
export type NewOpportunityPost = typeof opportunityPosts.$inferInsert;
export type OpportunityApplication = typeof opportunityApplications.$inferSelect;
export type NewOpportunityApplication = typeof opportunityApplications.$inferInsert;
export type OpportunityEvent = typeof opportunityEvents.$inferSelect;
export type NewOpportunityEvent = typeof opportunityEvents.$inferInsert;
export type ForecastConfig = typeof forecastConfigs.$inferSelect;
export type NewForecastConfig = typeof forecastConfigs.$inferInsert;
export type ForecastConfigVersion = typeof forecastConfigVersions.$inferSelect;
export type NewForecastConfigVersion = typeof forecastConfigVersions.$inferInsert;
export type CalculatorSubmission = typeof calculatorSubmissions.$inferSelect;
export type NewCalculatorSubmission = typeof calculatorSubmissions.$inferInsert;
export type ForecastRun = typeof forecastRuns.$inferSelect;
export type NewForecastRun = typeof forecastRuns.$inferInsert;
export type OpportunityScore = typeof opportunityScores.$inferSelect;
export type NewOpportunityScore = typeof opportunityScores.$inferInsert;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;
