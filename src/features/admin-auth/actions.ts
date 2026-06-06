"use server";

import {
  countAdminUsers,
  createAdminSession,
  createAdminUser,
  getAdminByEmail,
  recordAdminLoginAttempt,
  updateAdminLastLogin
} from "@/db/queries/admin";
import { writeAuditLog } from "@/db/queries/analytics";
import { hashAdminPassword, verifyAdminPassword } from "@/features/admin-auth/passwords";
import { isAdminLoginRateLimited } from "@/features/admin-auth/rate-limit";
import { adminLoginSchema, adminSetupSchema } from "@/features/admin-auth/schemas";
import {
  createSessionToken,
  getAdminSessionExpiresAt,
  hashSessionToken,
  setAdminSessionCookie
} from "@/features/admin-auth/session";
import { env } from "@/lib/env";
import { getRequestMetadata } from "@/lib/request";

export type AdminAuthActionState =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

const GENERIC_LOGIN_ERROR = "Invalid email or password.";

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

async function createSessionForAdmin(adminUserId: string) {
  const { ipAddress, userAgent } = await getRequestMetadata();
  const token = createSessionToken();
  const expiresAt = getAdminSessionExpiresAt();
  const sessionTokenHash = hashSessionToken(token);

  await createAdminSession({
    adminUserId,
    sessionTokenHash,
    ipAddress,
    userAgent,
    expiresAt
  });
  await setAdminSessionCookie(token, expiresAt);

  return {
    expiresAt,
    ipAddress,
    sessionTokenHash,
    userAgent
  };
}

export async function setupAdminAction(_state: AdminAuthActionState | null, formData: FormData): Promise<AdminAuthActionState> {
  const parsed = adminSetupSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the setup details.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  if (parsed.data.setupKey !== env.ADMIN_SETUP_KEY) {
    return {
      ok: false,
      message: "Invalid setup key."
    };
  }

  const existingAdminCount = await countAdminUsers();

  if (existingAdminCount > 0) {
    return {
      ok: false,
      message: "Admin setup is already complete."
    };
  }

  const passwordHash = await hashAdminPassword(parsed.data.password);
  const admin = await createAdminUser({
    email: parsed.data.email,
    name: parsed.data.name,
    role: "owner",
    passwordHash,
    isActive: true
  });
  const session = await createSessionForAdmin(admin.id);

  await writeAuditLog({
    adminUserId: admin.id,
    action: "admin.setup.created_owner",
    entityType: "admin_user",
    entityId: admin.id,
    metadata: {},
    ipAddress: session.ipAddress,
    userAgent: session.userAgent
  });

  return {
    ok: true,
    message: "Owner admin created."
  };
}

export async function loginAdminAction(_state: AdminAuthActionState | null, formData: FormData): Promise<AdminAuthActionState> {
  const parsed = adminLoginSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: GENERIC_LOGIN_ERROR,
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const { ipAddress, userAgent } = await getRequestMetadata();
  const isLimited = await isAdminLoginRateLimited({
    email: parsed.data.email,
    ipAddress
  });

  if (isLimited) {
    return {
      ok: false,
      message: GENERIC_LOGIN_ERROR
    };
  }

  const admin = await getAdminByEmail(parsed.data.email);
  const isValidPassword = admin ? await verifyAdminPassword(admin.passwordHash, parsed.data.password) : false;

  if (!admin || !admin.isActive || !isValidPassword) {
    await recordAdminLoginAttempt({
      email: parsed.data.email,
      ipAddress,
      wasSuccessful: false,
      failureReason: "invalid_credentials"
    });

    return {
      ok: false,
      message: GENERIC_LOGIN_ERROR
    };
  }

  await recordAdminLoginAttempt({
    email: parsed.data.email,
    ipAddress,
    wasSuccessful: true,
    failureReason: null
  });
  await createSessionForAdmin(admin.id);
  await updateAdminLastLogin(admin.id);
  await writeAuditLog({
    adminUserId: admin.id,
    action: "admin.auth.login",
    entityType: "admin_user",
    entityId: admin.id,
    metadata: {},
    ipAddress,
    userAgent
  });

  return {
    ok: true,
    message: "Signed in."
  };
}
