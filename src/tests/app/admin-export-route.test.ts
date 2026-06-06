import { describe, expect, it, vi, beforeEach } from "vitest";

import { writeAuditLog } from "@/db/queries/analytics";
import { getAdminExportRows } from "@/db/queries/admin-operations";
import { requireAdmin } from "@/features/admin-auth/guards";
import { GET } from "@/app/api/admin/export/[dataset]/route";

vi.mock("@/features/admin-auth/guards", () => ({
  requireAdmin: vi.fn()
}));

vi.mock("@/db/queries/admin-operations", () => ({
  getAdminExportRows: vi.fn(),
  isAdminExportDataset: (dataset: string) =>
    ["opportunities", "opportunity-applications", "contacts", "calculator", "waitlists", "forecast-runs"].includes(dataset)
}));

vi.mock("@/db/queries/analytics", () => ({
  writeAuditLog: vi.fn()
}));

vi.mock("@/lib/request", () => ({
  getRequestMetadata: vi.fn(async () => ({
    ipAddress: "203.0.113.11",
    userAgent: "vitest-export"
  }))
}));

const adminContext = {
  user: {
    id: "admin-user-id",
    name: "Owner Admin",
    email: "owner@example.com"
  },
  session: {
    id: "session-id"
  }
};

function requestFor(dataset: string) {
  return new Request(`http://localhost:3000/api/admin/export/${dataset}`);
}

function contextFor(dataset: string) {
  return {
    params: Promise.resolve({ dataset })
  };
}

describe("admin export route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAdmin).mockResolvedValue(adminContext as never);
    vi.mocked(writeAuditLog).mockResolvedValue({ id: "audit-id" } as never);
  });

  it("rejects unsupported datasets after requiring admin", async () => {
    const response = await GET(requestFor("private-admin-users"), contextFor("private-admin-users"));

    expect(response.status).toBe(404);
    expect(await response.text()).toContain("Unsupported export dataset");
    expect(requireAdmin).toHaveBeenCalled();
    expect(getAdminExportRows).not.toHaveBeenCalled();
    expect(writeAuditLog).not.toHaveBeenCalled();
  });

  it("returns CSV for a supported dataset and writes an audit log", async () => {
    vi.mocked(getAdminExportRows).mockResolvedValue([
      {
        id: "opportunity-id",
        contactName: "Riya Kapoor",
        status: "new"
      }
    ] as never);

    const response = await GET(requestFor("opportunities"), contextFor("opportunities"));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(response.headers.get("content-disposition")).toContain("opportunities.csv");
    expect(await response.text()).toBe(['id,contactName,status', '"opportunity-id","Riya Kapoor","new"'].join("\n"));
    expect(getAdminExportRows).toHaveBeenCalledWith("opportunities");
    expect(writeAuditLog).toHaveBeenCalledWith(
      expect.objectContaining({
        adminUserId: "admin-user-id",
        action: "admin.export.created",
        entityType: "export",
        metadata: expect.objectContaining({
          dataset: "opportunities",
          rowCount: 1
        }),
        ipAddress: "203.0.113.11",
        userAgent: "vitest-export"
      })
    );
  });

  it("does not export data when admin authorization fails", async () => {
    vi.mocked(requireAdmin).mockRejectedValue(new Error("not authorized"));

    await expect(GET(requestFor("opportunities"), contextFor("opportunities"))).rejects.toThrow("not authorized");
    expect(getAdminExportRows).not.toHaveBeenCalled();
    expect(writeAuditLog).not.toHaveBeenCalled();
  });
});
