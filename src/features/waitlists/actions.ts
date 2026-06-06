"use server";

import { writeActivityLog } from "@/db/queries/analytics";
import { createWaitlistEntry } from "@/db/queries/waitlists";
import { getRequestMetadata } from "@/lib/request";
import { waitlistSubmissionSchema } from "./schemas";

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
  interestType: string;
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
        interestType: input.interestType,
        ...metadata
      }
    });
  } catch {
    // Primary public submissions should not be reported as failed after they have been saved.
  }
}

export async function submitWaitlistAction(_previousState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = waitlistSubmissionSchema.safeParse(formDataToObject(formData));

  if (!parsed.success) {
    return fieldErrorResult(parsed.error.flatten().fieldErrors);
  }

  const { honeypot: _honeypot, ...submission } = parsed.data;

  try {
    const record = await createWaitlistEntry(submission);
    await writePublicActivityLog({
      action: "waitlist_joined",
      entityType: "waitlist_entry",
      entityId: record.id,
      sourcePath: submission.sourcePath,
      interestType: submission.interestType
    });

    return {
      ok: true,
      id: record.id,
      message: "Thanks. ProBlend has recorded your city interest."
    };
  } catch {
    return {
      ok: false,
      message: "We could not record your city interest right now. Please try again."
    };
  }
}
