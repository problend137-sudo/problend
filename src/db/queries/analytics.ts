import { db } from "@/db/client";
import {
  activityLogs,
  analyticsEvents,
  auditLogs,
  type NewActivityLog,
  type NewAnalyticsEvent,
  type NewAuditLog
} from "@/db/schema";

export async function trackAnalyticsEvent(input: NewAnalyticsEvent) {
  const [record] = await db.insert(analyticsEvents).values(input).returning();
  return record;
}

export async function writeActivityLog(input: NewActivityLog) {
  const [record] = await db.insert(activityLogs).values(input).returning();
  return record;
}

export async function writeAuditLog(input: NewAuditLog) {
  const [record] = await db.insert(auditLogs).values(input).returning();
  return record;
}
