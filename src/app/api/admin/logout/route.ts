import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { revokeAdminSession } from "@/db/queries/admin";
import { getAdminSessionCookieOptions, hashSessionToken } from "@/features/admin-auth/session";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(env.SESSION_COOKIE_NAME)?.value;

  if (token) {
    await revokeAdminSession(hashSessionToken(token));
  }

  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(env.SESSION_COOKIE_NAME, "", {
    ...getAdminSessionCookieOptions(new Date(0)),
    maxAge: 0
  });

  return response;
}
