import { redirect } from "next/navigation";
import type { Route } from "next";

import { getActiveAdminSessionByHash } from "@/db/queries/admin";
import type { AdminSession, AdminUser } from "@/db/schema";
import { hashSessionToken, readAdminSessionCookie } from "@/features/admin-auth/session";

export type AdminContext = {
  session: AdminSession;
  user: AdminUser;
};

export async function getCurrentAdmin(): Promise<AdminContext | null> {
  const token = await readAdminSessionCookie();

  if (!token) {
    return null;
  }

  const record = await getActiveAdminSessionByHash(hashSessionToken(token));

  if (!record) {
    return null;
  }

  return {
    session: record.session,
    user: record.user
  };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login" as Route);
  }

  return admin;
}
