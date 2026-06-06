"use server";

import { writeActivityLog } from "@/db/queries/analytics";
import {
  createOpportunity,
  createOpportunityApplication,
  listPublishedOpportunityPosts
} from "@/db/queries/opportunities";
import { getRequestMetadata } from "@/lib/request";
import {
  opportunityApplicationSchema,
  opportunitySubmissionSchema
} from "./schemas";

type ActionResult =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string };

function formDataToObject(formData: FormData, arrayKeys: string[] = []) {
  const output: Record<string, FormDataEntryValue | FormDataEntryValue[]> = Object.fromEntries(formData.entries());

  for (const key of arrayKeys) {
    output[key] = formData.getAll(key);
  }

  return output;
}

function fieldErrorResult(fieldErrors: Record<string, string[]>): ActionResult {
  return {
    ok: false,
    fieldErrors,
    message: "Please check the highlighted fields."
  };
}

async function writePublicActivityLog(input: {
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const requestMetadata = await getRequestMetadata();

    await writeActivityLog({
      actorType: "public",
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: {
        ...input.metadata,
        ...requestMetadata
      }
    });
  } catch {
    // Primary public submissions should not be reported as failed after they have been saved.
  }
}

export async function submitOpportunityAction(_previousState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = opportunitySubmissionSchema.safeParse(formDataToObject(formData, ["locationTypes"]));

  if (!parsed.success) {
    return fieldErrorResult(parsed.error.flatten().fieldErrors);
  }

  const { honeypot: _honeypot, ...submission } = parsed.data;

  try {
    const record = await createOpportunity({
      ...submission,
      sourceType: "external_opportunity_source"
    });
    await writePublicActivityLog({
      action: "opportunity_submitted",
      entityType: "opportunity",
      entityId: record.id,
      metadata: {
        sourcePath: submission.sourcePath,
        opportunityKind: submission.opportunityKind
      }
    });

    return {
      ok: true,
      id: record.id,
      message: "Thanks. We've received it and will review it."
    };
  } catch {
    return {
      ok: false,
      message: "We could not submit the opportunity right now. Please try again."
    };
  }
}

export async function submitOpportunityApplicationAction(
  _previousState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = opportunityApplicationSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return fieldErrorResult(parsed.error.flatten().fieldErrors);
  }

  const { honeypot: _honeypot, ...submission } = parsed.data;

  try {
    const publishedPosts = await listPublishedOpportunityPosts();
    const isPublishedPost = publishedPosts.some((post) => post.id === submission.opportunityPostId);

    if (!isPublishedPost) {
      return fieldErrorResult({
        opportunityPostId: ["Choose a published opportunity."]
      });
    }

    const record = await createOpportunityApplication(submission);
    await writePublicActivityLog({
      action: "opportunity_application_submitted",
      entityType: "opportunity_application",
      entityId: record.id,
      metadata: {
        opportunityPostId: submission.opportunityPostId,
        sourcePath: submission.sourcePath
      }
    });

    return {
      ok: true,
      id: record.id,
      message: "Thanks. ProBlend has received your application."
    };
  } catch {
    return {
      ok: false,
      message: "We could not submit your application right now. Please try again."
    };
  }
}
