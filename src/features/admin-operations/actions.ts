"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { writeActivityLog, writeAuditLog } from "@/db/queries/analytics";
import {
  createForecastConfigVersion,
  createOpportunityPostForAdmin,
  getActiveForecastConfig,
  normalizeForecastAssumptions,
  updateContactSubmissionStatus,
  updateOpportunityRecordStatus
} from "@/db/queries/admin-operations";
import { requireAdmin } from "@/features/admin-auth/guards";
import { getRequestMetadata } from "@/lib/request";

export type AdminOperationActionState =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

const opportunityStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "reviewing", "qualified", "forecasted", "contacted", "won", "lost", "archived"])
});

const contactStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "reviewed", "replied", "archived"])
});

const forecastConfigVersionSchema = z.object({
  assumptions: z.string().min(2),
  changeNote: z.string().trim().min(3).max(240)
});

const opportunityPostSchema = z.object({
  title: z.string().trim().min(3).max(140),
  slug: z.string().trim().min(3).max(160),
  category: z.enum(["operator", "venue_access", "distributor", "strategic_introduction"]),
  summary: z.string().trim().min(10).max(360),
  locationScope: z.string().trim().min(2).max(120),
  commercialModel: z.enum(["purchase", "revenue_share", "lease_commission", "distribution", "co_investment", "open_discussion"]),
  requirements: z.string().trim().optional(),
  isPublished: z.enum(["on"]).optional()
});

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

async function writeAdminMutationLogs(input: {
  adminUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
}) {
  const { ipAddress, userAgent } = await getRequestMetadata();

  await Promise.all([
    writeActivityLog({
      actorType: "admin",
      actorId: input.adminUserId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata
    }),
    writeAuditLog({
      adminUserId: input.adminUserId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata,
      ipAddress,
      userAgent
    })
  ]);
}

export async function updateOpportunityStatusAction(
  _state: AdminOperationActionState | null,
  formData: FormData
): Promise<AdminOperationActionState> {
  const admin = await requireAdmin();
  const parsed = opportunityStatusSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the opportunity status.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const record = await updateOpportunityRecordStatus(parsed.data.id, parsed.data.status, admin.user.id);

  if (!record) {
    return {
      ok: false,
      message: "Opportunity not found."
    };
  }

  await writeAdminMutationLogs({
    adminUserId: admin.user.id,
    action: "admin.opportunity.status_updated",
    entityType: "opportunity",
    entityId: parsed.data.id,
    metadata: { status: parsed.data.status }
  });
  revalidatePath("/admin/opportunities");
  revalidatePath(`/admin/opportunities/${parsed.data.id}`);

  return {
    ok: true,
    message: "Opportunity status updated."
  };
}

export async function updateContactStatusAction(
  _state: AdminOperationActionState | null,
  formData: FormData
): Promise<AdminOperationActionState> {
  const admin = await requireAdmin();
  const parsed = contactStatusSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the contact status.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const record = await updateContactSubmissionStatus(parsed.data.id, parsed.data.status);

  if (!record) {
    return {
      ok: false,
      message: "Contact submission not found."
    };
  }

  await writeAdminMutationLogs({
    adminUserId: admin.user.id,
    action: "admin.contact.status_updated",
    entityType: "contact_submission",
    entityId: parsed.data.id,
    metadata: { status: parsed.data.status }
  });
  revalidatePath("/admin/contacts");

  return {
    ok: true,
    message: "Contact status updated."
  };
}

export async function createForecastConfigVersionAction(
  _state: AdminOperationActionState | null,
  formData: FormData
): Promise<AdminOperationActionState> {
  const admin = await requireAdmin();
  const parsed = forecastConfigVersionSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the forecast config details.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  let assumptions: Record<string, unknown>;

  try {
    assumptions = normalizeForecastAssumptions(JSON.parse(parsed.data.assumptions));
  } catch {
    return {
      ok: false,
      message: "Forecast assumptions must be valid JSON."
    };
  }

  const activeConfig = await getActiveForecastConfig();

  if (!activeConfig?.config || !activeConfig.latestVersion) {
    return {
      ok: false,
      message: "No active forecast config is available."
    };
  }

  const nextVersionNumber = activeConfig.latestVersion.versionNumber + 1;
  const version = await createForecastConfigVersion({
    forecastConfigId: activeConfig.config.id,
    versionNumber: nextVersionNumber,
    assumptions,
    changeNote: parsed.data.changeNote,
    createdBy: admin.user.id
  });

  await writeAdminMutationLogs({
    adminUserId: admin.user.id,
    action: "admin.forecast_config.version_created",
    entityType: "forecast_config",
    entityId: activeConfig.config.id,
    metadata: {
      previousVersionId: activeConfig.latestVersion.id,
      newVersionId: version.id,
      versionNumber: nextVersionNumber
    }
  });
  revalidatePath("/admin/forecast-configs");

  return {
    ok: true,
    message: `Forecast config version ${nextVersionNumber} created.`
  };
}

export async function createOpportunityPostAction(
  _state: AdminOperationActionState | null,
  formData: FormData
): Promise<AdminOperationActionState> {
  const admin = await requireAdmin();
  const parsed = opportunityPostSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the published need details.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const requirements = parsed.data.requirements
    ? parsed.data.requirements
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];
  const isPublished = parsed.data.isPublished === "on";
  const record = await createOpportunityPostForAdmin({
    title: parsed.data.title,
    slug: parsed.data.slug,
    category: parsed.data.category,
    summary: parsed.data.summary,
    locationScope: parsed.data.locationScope,
    commercialModel: parsed.data.commercialModel,
    requirements,
    isPublished,
    publishedAt: isPublished ? new Date() : null,
    status: isPublished ? "open" : "draft",
    displayOrder: 0,
    createdBy: admin.user.id
  });

  await writeAdminMutationLogs({
    adminUserId: admin.user.id,
    action: "admin.opportunity_post.created",
    entityType: "opportunity_post",
    entityId: record.id,
    metadata: {
      isPublished,
      status: record.status
    }
  });
  revalidatePath("/admin/opportunities");
  revalidatePath("/business-solutions");

  return {
    ok: true,
    message: "Published need created."
  };
}
