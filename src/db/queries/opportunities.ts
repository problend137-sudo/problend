import { and, desc, eq, type SQL } from "drizzle-orm";

import { db } from "@/db/client";
import {
  opportunities,
  opportunityApplications,
  opportunityEvents,
  opportunityPosts,
  type NewOpportunity,
  type NewOpportunityApplication,
  type NewOpportunityPost
} from "@/db/schema";

export type OpportunityFilters = {
  city?: string;
  state?: string;
  status?: string;
};

export async function createOpportunity(input: NewOpportunity) {
  const [record] = await db.insert(opportunities).values(input).returning();
  return record;
}

export async function listOpportunities(filters: OpportunityFilters = {}) {
  const conditions: SQL[] = [];

  if (filters.status) {
    conditions.push(eq(opportunities.status, filters.status));
  }

  if (filters.city) {
    conditions.push(eq(opportunities.city, filters.city));
  }

  if (filters.state) {
    conditions.push(eq(opportunities.state, filters.state));
  }

  let query = db.select().from(opportunities).$dynamic();

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  return query.orderBy(desc(opportunities.createdAt));
}

export async function getOpportunityById(id: string) {
  const [record] = await db.select().from(opportunities).where(eq(opportunities.id, id)).limit(1);
  return record;
}

export async function updateOpportunityStatus(id: string, status: string, adminUserId: string) {
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

export async function createOpportunityPost(input: NewOpportunityPost) {
  const [record] = await db.insert(opportunityPosts).values(input).returning();
  return record;
}

export async function listPublishedOpportunityPosts() {
  return db
    .select()
    .from(opportunityPosts)
    .where(eq(opportunityPosts.isPublished, true))
    .orderBy(desc(opportunityPosts.publishedAt));
}

export async function listOpportunityPosts() {
  return db.select().from(opportunityPosts).orderBy(desc(opportunityPosts.createdAt));
}

export async function createOpportunityApplication(input: NewOpportunityApplication) {
  const [record] = await db.insert(opportunityApplications).values(input).returning();
  return record;
}

export async function listOpportunityApplications(postId: string) {
  return db
    .select()
    .from(opportunityApplications)
    .where(eq(opportunityApplications.opportunityPostId, postId))
    .orderBy(desc(opportunityApplications.createdAt));
}
