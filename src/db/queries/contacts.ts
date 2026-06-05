import { desc, eq } from "drizzle-orm";

import { db } from "@/db/client";
import { contactSubmissions, type NewContactSubmission } from "@/db/schema";

export async function createContactSubmission(input: NewContactSubmission) {
  const [record] = await db.insert(contactSubmissions).values(input).returning();
  return record;
}

export async function listContactSubmissions(status?: string) {
  if (status) {
    return db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.status, status))
      .orderBy(desc(contactSubmissions.createdAt));
  }

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactStatus(id: string, status: string) {
  const [record] = await db
    .update(contactSubmissions)
    .set({ status, updatedAt: new Date() })
    .where(eq(contactSubmissions.id, id))
    .returning();

  return record;
}
