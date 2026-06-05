import { desc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import {
  forecastConfigs,
  forecastConfigVersions,
  forecastRuns,
  opportunityScores,
  type NewForecastRun,
  type NewOpportunityScore
} from "@/db/schema";

export async function getActiveForecastConfigVersion() {
  const [record] = await db
    .select({ version: forecastConfigVersions })
    .from(forecastConfigVersions)
    .innerJoin(forecastConfigs, eq(forecastConfigVersions.forecastConfigId, forecastConfigs.id))
    .where(eq(forecastConfigs.isActive, true))
    .orderBy(desc(forecastConfigVersions.versionNumber))
    .limit(1);

  return record?.version;
}

export async function createForecastRun(input: NewForecastRun) {
  const [record] = await db.insert(forecastRuns).values(input).returning();
  return record;
}

export async function listForecastRuns() {
  return db.select().from(forecastRuns).orderBy(desc(forecastRuns.createdAt));
}

export async function createOpportunityScore(input: NewOpportunityScore) {
  const [record] = await db.insert(opportunityScores).values(input).returning();
  return record;
}
