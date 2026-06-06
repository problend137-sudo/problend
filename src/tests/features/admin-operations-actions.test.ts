import { beforeEach, describe, expect, it, vi } from "vitest";

import { writeActivityLog, writeAuditLog } from "@/db/queries/analytics";
import {
  createForecastConfigVersion,
  getActiveForecastConfig,
  updateContactSubmissionStatus,
  updateOpportunityRecordStatus
} from "@/db/queries/admin-operations";
import {
  createForecastConfigVersionAction,
  updateContactStatusAction,
  updateOpportunityStatusAction
} from "@/features/admin-operations/actions";
import { requireAdmin } from "@/features/admin-auth/guards";
import { testForecastAssumptions } from "@/features/forecasting/assumptions";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn()
}));

vi.mock("@/features/admin-auth/guards", () => ({
  requireAdmin: vi.fn()
}));

vi.mock("@/db/queries/admin-operations", () => ({
  createForecastConfigVersion: vi.fn(),
  getActiveForecastConfig: vi.fn(),
  normalizeForecastAssumptions: (input: unknown) => input,
  updateContactSubmissionStatus: vi.fn(),
  updateOpportunityRecordStatus: vi.fn()
}));

vi.mock("@/db/queries/analytics", () => ({
  writeActivityLog: vi.fn(),
  writeAuditLog: vi.fn()
}));

vi.mock("@/lib/request", () => ({
  getRequestMetadata: vi.fn(async () => ({
    ipAddress: "203.0.113.44",
    userAgent: "vitest-admin-actions"
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

const opportunityId = "11111111-1111-4111-8111-111111111111";
const contactId = "22222222-2222-4222-8222-222222222222";
const forecastConfigId = "33333333-3333-4333-8333-333333333333";
const activeVersionId = "44444444-4444-4444-8444-444444444444";
const newVersionId = "55555555-5555-4555-8555-555555555555";

function toFormData(input: Record<string, unknown>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  return formData;
}

describe("admin operation actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAdmin).mockResolvedValue(adminContext as never);
    vi.mocked(writeActivityLog).mockResolvedValue({ id: "activity-id" } as never);
    vi.mocked(writeAuditLog).mockResolvedValue({ id: "audit-id" } as never);
  });

  it("requires admin and writes activity/audit records for opportunity status updates", async () => {
    vi.mocked(updateOpportunityRecordStatus).mockResolvedValue({
      id: opportunityId,
      status: "qualified"
    } as never);

    const result = await updateOpportunityStatusAction(
      null,
      toFormData({
        id: opportunityId,
        status: "qualified"
      })
    );

    expect(result).toEqual({ ok: true, message: "Opportunity status updated." });
    expect(requireAdmin).toHaveBeenCalled();
    expect(updateOpportunityRecordStatus).toHaveBeenCalledWith(opportunityId, "qualified", "admin-user-id");
    expect(writeActivityLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actorType: "admin",
        actorId: "admin-user-id",
        action: "admin.opportunity.status_updated",
        entityType: "opportunity",
        entityId: opportunityId,
        metadata: { status: "qualified" }
      })
    );
    expect(writeAuditLog).toHaveBeenCalledWith(
      expect.objectContaining({
        adminUserId: "admin-user-id",
        action: "admin.opportunity.status_updated",
        entityType: "opportunity",
        entityId: opportunityId,
        ipAddress: "203.0.113.44",
        userAgent: "vitest-admin-actions"
      })
    );
  });

  it("requires admin and writes activity/audit records for contact status updates", async () => {
    vi.mocked(updateContactSubmissionStatus).mockResolvedValue({
      id: contactId,
      status: "replied"
    } as never);

    const result = await updateContactStatusAction(
      null,
      toFormData({
        id: contactId,
        status: "replied"
      })
    );

    expect(result).toEqual({ ok: true, message: "Contact status updated." });
    expect(requireAdmin).toHaveBeenCalled();
    expect(updateContactSubmissionStatus).toHaveBeenCalledWith(contactId, "replied");
    expect(writeActivityLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actorType: "admin",
        actorId: "admin-user-id",
        action: "admin.contact.status_updated",
        entityType: "contact_submission",
        entityId: contactId,
        metadata: { status: "replied" }
      })
    );
    expect(writeAuditLog).toHaveBeenCalledWith(
      expect.objectContaining({
        adminUserId: "admin-user-id",
        action: "admin.contact.status_updated",
        entityType: "contact_submission",
        entityId: contactId
      })
    );
  });

  it("creates a new forecast config version instead of mutating the active version", async () => {
    vi.mocked(getActiveForecastConfig).mockResolvedValue({
      config: {
        id: forecastConfigId,
        name: "Default forecast"
      },
      latestVersion: {
        id: activeVersionId,
        versionNumber: 2,
        assumptions: testForecastAssumptions
      }
    } as never);
    vi.mocked(createForecastConfigVersion).mockResolvedValue({
      id: newVersionId,
      versionNumber: 3
    } as never);

    const nextAssumptions = {
      ...testForecastAssumptions,
      commercial: {
        ...testForecastAssumptions.commercial,
        drinkPrice: 240
      }
    };

    const result = await createForecastConfigVersionAction(
      null,
      toFormData({
        assumptions: JSON.stringify(nextAssumptions),
        changeNote: "Increase blended drink price"
      })
    );

    expect(result).toEqual({ ok: true, message: "Forecast config version 3 created." });
    expect(requireAdmin).toHaveBeenCalled();
    expect(createForecastConfigVersion).toHaveBeenCalledWith({
      forecastConfigId,
      versionNumber: 3,
      assumptions: nextAssumptions,
      changeNote: "Increase blended drink price",
      createdBy: "admin-user-id"
    });
    expect(writeAuditLog).toHaveBeenCalledWith(
      expect.objectContaining({
        adminUserId: "admin-user-id",
        action: "admin.forecast_config.version_created",
        entityType: "forecast_config",
        entityId: forecastConfigId,
        metadata: expect.objectContaining({
          previousVersionId: activeVersionId,
          newVersionId,
          versionNumber: 3
        })
      })
    );
  });
});
