import { desc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { waitlistEntries, type NewWaitlistEntry } from "@/db/schema";

export async function createWaitlistEntry(input: NewWaitlistEntry) {
  const [record] = await db.insert(waitlistEntries).values(input).returning();
  return record;
}

export async function listWaitlistEntries(status?: string) {
  if (status) {
    return db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.status, status))
      .orderBy(desc(waitlistEntries.createdAt));
  }

  return db.select().from(waitlistEntries).orderBy(desc(waitlistEntries.createdAt));
}
