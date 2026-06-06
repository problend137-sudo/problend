import { countRecentFailedLoginAttempts } from "@/db/queries/admin";

export const ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const ADMIN_LOGIN_RATE_LIMIT_MAX_FAILURES = 5;

export async function isAdminLoginRateLimited(input: { email: string; ipAddress: string; now?: Date }) {
  const now = input.now ?? new Date();
  const since = new Date(now.getTime() - ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS);
  const failedAttemptCount = await countRecentFailedLoginAttempts({
    email: input.email,
    ipAddress: input.ipAddress,
    since
  });

  return failedAttemptCount >= ADMIN_LOGIN_RATE_LIMIT_MAX_FAILURES;
}
