"use server";

import { writeActivityLog } from "@/db/queries/analytics";
import { createContactSubmission } from "@/db/queries/contacts";
import { getRequestMetadata } from "@/lib/request";
import { contactSubmissionSchema } from "./schemas";

type ActionResult =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string };

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
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
  sourcePath: string;
}) {
  try {
    const metadata = await getRequestMetadata();

    await writeActivityLog({
      actorType: "public",
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: {
        sourcePath: input.sourcePath,
        ...metadata
      }
    });
  } catch {
    // Primary public submissions should not be reported as failed after they have been saved.
  }
}

export async function submitContactAction(_previousState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = contactSubmissionSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return fieldErrorResult(parsed.error.flatten().fieldErrors);
  }

  const { honeypot: _honeypot, ...submission } = parsed.data;

  try {
    const record = await createContactSubmission(submission);
    await writePublicActivityLog({
      action: "contact_submitted",
      entityType: "contact_submission",
      entityId: record.id,
      sourcePath: submission.sourcePath
    });

    return {
      ok: true,
      id: record.id,
      message: "Thanks for submitting!"
    };
  } catch {
    return {
      ok: false,
      message: "We could not submit your message right now. Please try again."
    };
  }
}
