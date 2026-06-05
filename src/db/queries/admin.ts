import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { adminSessions, adminUsers, type NewAdminSession, type NewAdminUser } from "@/db/schema";

export async function getAdminByEmail(email: string) {
  const [record] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return record;
}

export async function getAdminById(id: string) {
  const [record] = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  return record;
}

export async function createAdminUser(input: NewAdminUser) {
  const [record] = await db.insert(adminUsers).values(input).returning();
  return record;
}

export async function createAdminSession(input: NewAdminSession) {
  const [record] = await db.insert(adminSessions).values(input).returning();
  return record;
}

export async function revokeAdminSession(sessionTokenHash: string) {
  const [record] = await db
    .update(adminSessions)
    .set({ revokedAt: new Date() })
    .where(eq(adminSessions.sessionTokenHash, sessionTokenHash))
    .returning();

  return record;
}
