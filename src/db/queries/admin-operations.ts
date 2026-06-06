import { and, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";

import { db } from "@/db/client";
import {
  activityLogs,
  adminUsers,
  auditLogs,
  calculatorSubmissions,
  contactSubmissions,
  forecastConfigs,
  forecastConfigVersions,
  forecastRuns,
  opportunities,
  opportunityApplications,
  opportunityEvents,
  opportunityPosts,
  opportunityScores,
  waitlistEntries,
  type JsonObject,
  type NewForecastConfigVersion,
  type NewOpportunityPost
} from "@/db/schema";

export const adminExportDatasets = [
  "opportunities",
  "opportunity-applications",
  "contacts",
  "calculator",
  "waitlists",
  "forecast-runs"
] as const;

export type AdminExportDataset = (typeof adminExportDatasets)[number];

export type AdminOpportunityFilters = {
  search?: string;
  status?: string;
  city?: string;
  state?: string;
  commercialIntent?: string;
};

export function isAdminExportDataset(dataset: string): dataset is AdminExportDataset {
  return adminExportDatasets.includes(dataset as AdminExportDataset);
}

function asIsoDate(value: Date | null | undefined) {
  return value ? value.toISOString() : "";
}

function asJson(value: unknown) {
  return value == null ? "" : JSON.stringify(value);
}

export async function getAdminOverview() {
  const [
    newOpportunities,
    newOpportunityApplications,
    newContactSubmissions,
    calculatorSubmissionCount,
    activeForecastConfig,
    recentActivity
  ] = await Promise.all([
    db.select({ value: count() }).from(opportunities).where(eq(opportunities.status, "new")),
    db.select({ value: count() }).from(opportunityApplications).where(eq(opportunityApplications.status, "new")),
    db.select({ value: count() }).from(contactSubmissions).where(eq(contactSubmissions.status, "new")),
    db.select({ value: count() }).from(calculatorSubmissions),
    getActiveForecastConfig(),
    db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(8)
  ]);

  return {
    counts: {
      newOpportunities: newOpportunities[0]?.value ?? 0,
      newOpportunityApplications: newOpportunityApplications[0]?.value ?? 0,
      newContactSubmissions: newContactSubmissions[0]?.value ?? 0,
      calculatorSubmissions: calculatorSubmissionCount[0]?.value ?? 0
    },
    activeForecastConfig,
    recentActivity
  };
}

export async function listOpportunityRecords(filters: AdminOpportunityFilters = {}) {
  const conditions: SQL[] = [];

  if (filters.status) conditions.push(eq(opportunities.status, filters.status));
  if (filters.city) conditions.push(eq(opportunities.city, filters.city));
  if (filters.state) conditions.push(eq(opportunities.state, filters.state));
  if (filters.commercialIntent) conditions.push(eq(opportunities.commercialIntent, filters.commercialIntent));

  if (filters.search) {
    const searchTerm = `%${filters.search.trim()}%`;
    const searchCondition = or(
      ilike(opportunities.contactName, searchTerm),
      ilike(opportunities.email, searchTerm),
      ilike(opportunities.organizationName, searchTerm),
      ilike(opportunities.city, searchTerm),
      ilike(opportunities.state, searchTerm)
    );

    if (searchCondition) conditions.push(searchCondition);
  }

  let query = db.select().from(opportunities).$dynamic();

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  return query.orderBy(desc(opportunities.createdAt)).limit(100);
}

export async function getOpportunityRecordDetail(id: string) {
  const [opportunity] = await db.select().from(opportunities).where(eq(opportunities.id, id)).limit(1);

  if (!opportunity) {
    return null;
  }

  const [events, latestScores, runs] = await Promise.all([
    db.select().from(opportunityEvents).where(eq(opportunityEvents.opportunityId, id)).orderBy(desc(opportunityEvents.createdAt)),
    db
      .select()
      .from(opportunityScores)
      .where(eq(opportunityScores.opportunityId, id))
      .orderBy(desc(opportunityScores.createdAt))
      .limit(1),
    db.select().from(forecastRuns).where(eq(forecastRuns.opportunityId, id)).orderBy(desc(forecastRuns.createdAt))
  ]);

  return {
    opportunity,
    events,
    latestScore: latestScores[0],
    forecastRuns: runs
  };
}

export async function updateOpportunityRecordStatus(id: string, status: string, adminUserId: string) {
  return db.transaction(async (transaction) => {
    const [record] = await transaction
      .update(opportunities)
      .set({ status, updatedAt: new Date() })
      .where(eq(opportunities.id, id))
      .returning();

    if (record) {
      await transaction.insert(opportunityEvents).values({
        opportunityId: id,
        adminUserId,
        eventType: "status_updated",
        metadata: { status }
      });
    }

    return record;
  });
}

export async function listOpportunityPostsForAdmin() {
  return db.select().from(opportunityPosts).orderBy(desc(opportunityPosts.createdAt)).limit(100);
}

export async function createOpportunityPostForAdmin(input: NewOpportunityPost) {
  const [record] = await db.insert(opportunityPosts).values(input).returning();
  return record;
}

export async function listOpportunityApplicationsForAdmin() {
  return db
    .select({
      application: opportunityApplications,
      postTitle: opportunityPosts.title
    })
    .from(opportunityApplications)
    .leftJoin(opportunityPosts, eq(opportunityApplications.opportunityPostId, opportunityPosts.id))
    .orderBy(desc(opportunityApplications.createdAt))
    .limit(100);
}

export async function listContactSubmissionsForAdmin(status?: string) {
  if (status) {
    return db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, status))
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(100);
  }

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(100);
}

export async function updateContactSubmissionStatus(id: string, status: string) {
  const [record] = await db
    .update(contactSubmissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(contactSubmissions.id, id))
    .returning();

  return record;
}

export async function listCalculatorSubmissionsForAdmin() {
  return db
    .select({
      submission: calculatorSubmissions,
      forecastRun: forecastRuns
    })
    .from(calculatorSubmissions)
    .leftJoin(forecastRuns, eq(calculatorSubmissions.id, forecastRuns.calculatorSubmissionId))
    .orderBy(desc(calculatorSubmissions.createdAt))
    .limit(100);
}

export async function getActiveForecastConfig() {
  const [record] = await db
    .select({
      config: forecastConfigs,
      latestVersion: forecastConfigVersions
    })
    .from(forecastConfigs)
    .leftJoin(forecastConfigVersions, eq(forecastConfigs.id, forecastConfigVersions.forecastConfigId))
    .where(eq(forecastConfigs.isActive, true))
    .orderBy(desc(forecastConfigVersions.versionNumber))
    .limit(1);

  return record ?? null;
}

export async function listForecastConfigVersions() {
  return db
    .select({
      version: forecastConfigVersions,
      configName: forecastConfigs.name,
      isActiveConfig: forecastConfigs.isActive
    })
    .from(forecastConfigVersions)
    .innerJoin(forecastConfigs, eq(forecastConfigVersions.forecastConfigId, forecastConfigs.id))
    .orderBy(desc(forecastConfigVersions.createdAt))
    .limit(100);
}

export async function createForecastConfigVersion(input: NewForecastConfigVersion) {
  const [record] = await db.insert(forecastConfigVersions).values(input).returning();
  return record;
}

export async function listForecastRunsForAdmin() {
  return db
    .select({
      run: forecastRuns,
      versionNumber: forecastConfigVersions.versionNumber
    })
    .from(forecastRuns)
    .innerJoin(forecastConfigVersions, eq(forecastRuns.forecastConfigVersionId, forecastConfigVersions.id))
    .orderBy(desc(forecastRuns.createdAt))
    .limit(100);
}

export async function listWaitlistEntriesForAdmin(status?: string) {
  if (status) {
    return db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.status, status))
      .orderBy(desc(waitlistEntries.createdAt))
      .limit(100);
  }

  return db.select().from(waitlistEntries).orderBy(desc(waitlistEntries.createdAt)).limit(100);
}

export async function listActivityLogsForAdmin(limit = 100) {
  const [activity, audit] = await Promise.all([
    db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(limit),
    db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit)
  ]);

  return { activity, audit };
}

export async function getAdminSettingsOverview() {
  const [adminCount, admins] = await Promise.all([
    db.select({ value: count() }).from(adminUsers),
    db
      .select({
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
        lastLoginAt: adminUsers.lastLoginAt,
        createdAt: adminUsers.createdAt
      })
      .from(adminUsers)
      .orderBy(desc(adminUsers.createdAt))
  ]);

  return {
    setupComplete: (adminCount[0]?.value ?? 0) > 0,
    adminCount: adminCount[0]?.value ?? 0,
    admins
  };
}

export async function getAdminExportRows(dataset: AdminExportDataset): Promise<Array<Record<string, unknown>>> {
  if (dataset === "opportunities") {
    const rows = await db.select().from(opportunities).orderBy(desc(opportunities.createdAt));
    return rows.map((row) => ({
      id: row.id,
      status: row.status,
      contactName: row.contactName,
      email: row.email,
      phone: row.phone,
      organizationName: row.organizationName,
      city: row.city,
      state: row.state,
      commercialIntent: row.commercialIntent,
      createdAt: asIsoDate(row.createdAt)
    }));
  }

  if (dataset === "opportunity-applications") {
    const rows = await db.select().from(opportunityApplications).orderBy(desc(opportunityApplications.createdAt));
    return rows.map((row) => ({
      id: row.id,
      opportunityPostId: row.opportunityPostId,
      status: row.status,
      contactName: row.contactName,
      email: row.email,
      phone: row.phone,
      organizationName: row.organizationName,
      city: row.city,
      state: row.state,
      intent: row.intent,
      createdAt: asIsoDate(row.createdAt)
    }));
  }

  if (dataset === "contacts") {
    const rows = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
    return rows.map((row) => ({
      id: row.id,
      status: row.status,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      sourcePath: row.sourcePath,
      createdAt: asIsoDate(row.createdAt)
    }));
  }

  if (dataset === "calculator") {
    const rows = await db.select().from(calculatorSubmissions).orderBy(desc(calculatorSubmissions.createdAt));
    return rows.map((row) => ({
      id: row.id,
      opportunityId: row.opportunityId,
      contactName: row.contactName,
      email: row.email,
      phone: row.phone,
      venueType: row.venueType,
      dailyFootfall: row.dailyFootfall,
      operatingHours: row.operatingHours,
      locationType: row.locationType,
      city: row.city,
      state: row.state,
      commercialIntent: row.commercialIntent,
      createdAt: asIsoDate(row.createdAt)
    }));
  }

  if (dataset === "waitlists") {
    const rows = await db.select().from(waitlistEntries).orderBy(desc(waitlistEntries.createdAt));
    return rows.map((row) => ({
      id: row.id,
      status: row.status,
      name: row.name,
      email: row.email,
      phone: row.phone,
      city: row.city,
      state: row.state,
      interestType: row.interestType,
      sourcePath: row.sourcePath,
      createdAt: asIsoDate(row.createdAt)
    }));
  }

  const rows = await db.select().from(forecastRuns).orderBy(desc(forecastRuns.createdAt));
  return rows.map((row) => ({
    id: row.id,
    calculatorSubmissionId: row.calculatorSubmissionId,
    opportunityId: row.opportunityId,
    forecastConfigVersionId: row.forecastConfigVersionId,
    source: row.source,
    inputSnapshot: asJson(row.inputSnapshot),
    outputSnapshot: asJson(row.outputSnapshot),
    assumptionsSnapshot: asJson(row.assumptionsSnapshot),
    createdAt: asIsoDate(row.createdAt)
  }));
}

export function normalizeForecastAssumptions(input: unknown): JsonObject {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Forecast assumptions must be an object.");
  }

  return input as JsonObject;
}
