import { and, count, eq, gte, isNull, or } from "drizzle-orm";

import { db } from "@/db/client";
import {
  adminLoginAttempts,
  adminSessions,
  adminUsers,
  type NewAdminLoginAttempt,
  type NewAdminSession,
  type NewAdminUser
} from "@/db/schema";

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

export async function countAdminUsers() {
  const [record] = await db.select({ value: count() }).from(adminUsers);
  return record?.value ?? 0;
}

export async function createAdminSession(input: NewAdminSession) {
  const [record] = await db.insert(adminSessions).values(input).returning();
  return record;
}

export async function getActiveAdminSessionByHash(sessionTokenHash: string, now = new Date()) {
  const [record] = await db
    .select({
      session: adminSessions,
      user: adminUsers
    })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.adminUserId, adminUsers.id))
    .where(
      and(
        eq(adminSessions.sessionTokenHash, sessionTokenHash),
        isNull(adminSessions.revokedAt),
        gte(adminSessions.expiresAt, now),
        eq(adminUsers.isActive, true)
      )
    )
    .limit(1);

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

export async function updateAdminLastLogin(adminUserId: string) {
  const [record] = await db
    .update(adminUsers)
    .set({ lastLoginAt: new Date(), updatedAt: new Date() })
    .where(eq(adminUsers.id, adminUserId))
    .returning();

  return record;
}

export async function recordAdminLoginAttempt(input: NewAdminLoginAttempt) {
  const [record] = await db.insert(adminLoginAttempts).values(input).returning();
  return record;
}

export async function countRecentFailedLoginAttempts(input: { email: string; ipAddress: string; since: Date }) {
  const normalizedEmail = input.email.trim().toLowerCase();

  const [record] = await db
    .select({ value: count() })
    .from(adminLoginAttempts)
    .where(
      and(
        eq(adminLoginAttempts.wasSuccessful, false),
        gte(adminLoginAttempts.createdAt, input.since),
        or(eq(adminLoginAttempts.email, normalizedEmail), eq(adminLoginAttempts.ipAddress, input.ipAddress))
      )
    );

  return record?.value ?? 0;
}
