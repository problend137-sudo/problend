import { beforeEach, describe, expect, it, vi } from "vitest";

import { writeAuditLog } from "@/db/queries/analytics";
import {
  countAdminUsers,
  countRecentFailedLoginAttempts,
  createAdminSession,
  createAdminUser,
  getAdminByEmail,
  recordAdminLoginAttempt
} from "@/db/queries/admin";
import { loginAdminAction, setupAdminAction } from "@/features/admin-auth/actions";
import { hashAdminPassword, verifyAdminPassword } from "@/features/admin-auth/passwords";
import { adminLoginSchema, adminSetupSchema } from "@/features/admin-auth/schemas";
import { createSessionToken, hashSessionToken } from "@/features/admin-auth/session";

const cookieStore = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn()
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => cookieStore)
}));

vi.mock("@/db/queries/admin", () => ({
  countAdminUsers: vi.fn(),
  countRecentFailedLoginAttempts: vi.fn(),
  createAdminSession: vi.fn(),
  createAdminUser: vi.fn(),
  getAdminByEmail: vi.fn(),
  recordAdminLoginAttempt: vi.fn()
}));

vi.mock("@/db/queries/analytics", () => ({
  writeAuditLog: vi.fn()
}));

vi.mock("@/lib/request", () => ({
  getRequestMetadata: vi.fn(async () => ({
    ipAddress: "203.0.113.22",
    userAgent: "vitest-admin"
  }))
}));

function toFormData(input: Record<string, unknown>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  return formData;
}

const validSetupInput = {
  name: "Owner Admin",
  email: "Owner@Example.com",
  password: "correct-horse-battery",
  setupKey: "local-dev-setup-key"
};

const validLoginInput = {
  email: "owner@example.com",
  password: "correct-horse-battery"
};

describe("admin password helpers", () => {
  it("hashes with Argon2id and verifies only the original password", async () => {
    const hash = await hashAdminPassword("correct-horse-battery");

    expect(hash).toContain("$argon2id$");
    await expect(verifyAdminPassword(hash, "correct-horse-battery")).resolves.toBe(true);
    await expect(verifyAdminPassword(hash, "wrong-password")).resolves.toBe(false);
  });
});

describe("admin session helpers", () => {
  it("creates opaque tokens and hashes them deterministically without storing the plain token", () => {
    const token = createSessionToken();
    const firstHash = hashSessionToken(token);
    const secondHash = hashSessionToken(token);

    expect(token).toHaveLength(43);
    expect(firstHash).toBe(secondHash);
    expect(firstHash).not.toBe(token);
    expect(firstHash).toMatch(/^[a-f0-9]{64}$/);
  });
});

describe("admin auth schemas", () => {
  it("rejects invalid login email and short password", () => {
    expect(adminLoginSchema.safeParse(validLoginInput).success).toBe(true);
    expect(adminLoginSchema.safeParse({ ...validLoginInput, email: "bad" }).success).toBe(false);
    expect(adminLoginSchema.safeParse({ ...validLoginInput, password: "short" }).success).toBe(false);
  });

  it("requires the setup key for owner setup", () => {
    expect(adminSetupSchema.safeParse(validSetupInput).success).toBe(true);
    expect(adminSetupSchema.safeParse({ ...validSetupInput, setupKey: "" }).success).toBe(false);
    expect(adminSetupSchema.safeParse({ ...validSetupInput, setupKey: undefined }).success).toBe(false);
  });
});

describe("admin auth actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(countRecentFailedLoginAttempts).mockResolvedValue(0);
    vi.mocked(recordAdminLoginAttempt).mockResolvedValue({ id: "attempt-id" } as never);
    vi.mocked(writeAuditLog).mockResolvedValue({ id: "audit-id" } as never);
  });

  it("records failed login attempts and returns the generic login error", async () => {
    vi.mocked(getAdminByEmail).mockResolvedValue(undefined as never);

    const result = await loginAdminAction(null, toFormData(validLoginInput));

    expect(result).toEqual({
      ok: false,
      message: "Invalid email or password."
    });
    expect(recordAdminLoginAttempt).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "owner@example.com",
        ipAddress: "203.0.113.22",
        wasSuccessful: false,
        failureReason: "invalid_credentials"
      })
    );
    expect(createAdminSession).not.toHaveBeenCalled();
  });

  it("blocks login when the recent failed-attempt limit is reached", async () => {
    vi.mocked(countRecentFailedLoginAttempts).mockResolvedValue(5);

    const result = await loginAdminAction(null, toFormData(validLoginInput));

    expect(result).toEqual({
      ok: false,
      message: "Invalid email or password."
    });
    expect(getAdminByEmail).not.toHaveBeenCalled();
    expect(createAdminSession).not.toHaveBeenCalled();
  });

  it("rejects setup when the setup key is invalid", async () => {
    const result = await setupAdminAction(null, toFormData({ ...validSetupInput, setupKey: "wrong-key" }));

    expect(result).toEqual({
      ok: false,
      message: "Invalid setup key."
    });
    expect(countAdminUsers).not.toHaveBeenCalled();
    expect(createAdminUser).not.toHaveBeenCalled();
  });

  it("creates an owner, session, cookie, and audit log when no admin exists", async () => {
    vi.mocked(countAdminUsers).mockResolvedValue(0);
    vi.mocked(createAdminUser).mockResolvedValue({
      id: "admin-user-id",
      email: "owner@example.com",
      name: "Owner Admin",
      role: "owner",
      passwordHash: "$argon2id$hash",
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    } as never);
    vi.mocked(createAdminSession).mockResolvedValue({ id: "session-id" } as never);

    const result = await setupAdminAction(null, toFormData(validSetupInput));

    expect(result).toEqual({
      ok: true,
      message: "Owner admin created."
    });
    expect(createAdminUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "owner@example.com",
        name: "Owner Admin",
        role: "owner",
        isActive: true,
        passwordHash: expect.stringContaining("$argon2id$")
      })
    );
    expect(createAdminSession).toHaveBeenCalledWith(
      expect.objectContaining({
        adminUserId: "admin-user-id",
        sessionTokenHash: expect.stringMatching(/^[a-f0-9]{64}$/),
        ipAddress: "203.0.113.22",
        userAgent: "vitest-admin",
        expiresAt: expect.any(Date)
      })
    );
    expect(cookieStore.set).toHaveBeenCalledWith(
      "problend_admin_session",
      expect.any(String),
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
        expires: expect.any(Date)
      })
    );
    expect(writeAuditLog).toHaveBeenCalledWith(
      expect.objectContaining({
        adminUserId: "admin-user-id",
        action: "admin.setup.created_owner",
        entityType: "admin_user",
        entityId: "admin-user-id",
        ipAddress: "203.0.113.22",
        userAgent: "vitest-admin"
      })
    );
  });
});
