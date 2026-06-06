import crypto from "node:crypto";
import { cookies } from "next/headers";

import { env } from "@/lib/env";

export const ADMIN_SESSION_TTL_DAYS = 7;
export const ADMIN_SESSION_TTL_MS = ADMIN_SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

export function createSessionToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getAdminSessionExpiresAt(now = new Date()) {
  return new Date(now.getTime() + ADMIN_SESSION_TTL_MS);
}

export function getAdminSessionCookieOptions(expires: Date) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    expires
  };
}

export async function readAdminSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(env.SESSION_COOKIE_NAME)?.value;
}

export async function setAdminSessionCookie(token: string, expires: Date) {
  const cookieStore = await cookies();
  cookieStore.set(env.SESSION_COOKIE_NAME, token, getAdminSessionCookieOptions(expires));
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(env.SESSION_COOKIE_NAME, "", {
    ...getAdminSessionCookieOptions(new Date(0)),
    maxAge: 0
  });
}
