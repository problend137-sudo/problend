"use server";

import { z } from "zod";

import { trackAnalyticsEvent } from "@/db/queries/analytics";
import type { JsonObject, NewAnalyticsEvent } from "@/db/schema";
import { isAnalyticsEventName, type AnalyticsEventName } from "./events";

const MAX_METADATA_DEPTH = 4;
const MAX_METADATA_KEYS = 30;
const MAX_METADATA_ARRAY_ITEMS = 20;
const MAX_METADATA_STRING_LENGTH = 500;
const MAX_METADATA_BYTES = 4096;

type JsonValue = JsonObject | JsonValue[] | string | number | boolean | null;

export type TrackEventActionInput = {
  eventName: string;
  sourcePath: string;
  sessionId?: string | null;
  metadata?: unknown;
};

export type TrackEventActionResult =
  | {
      ok: true;
      id: string;
    }
  | {
      ok: false;
      message: string;
    };

const trackEventInputSchema = z.object({
  eventName: z.string().refine(isAnalyticsEventName),
  sourcePath: z.string().trim().min(1).max(220).regex(/^\/(?!\/)/),
  sessionId: z
    .preprocess(
      (value) => {
        if (typeof value !== "string") {
          return undefined;
        }

        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : undefined;
      },
      z.string().max(128).optional()
    )
    .optional(),
  metadata: z.unknown().optional()
});

export async function trackEventAction(input: TrackEventActionInput): Promise<TrackEventActionResult> {
  const parsed = trackEventInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Analytics event could not be recorded."
    };
  }

  try {
    const event: NewAnalyticsEvent = {
      eventName: parsed.data.eventName as AnalyticsEventName,
      sourcePath: parsed.data.sourcePath,
      metadata: sanitizeAnalyticsMetadata(parsed.data.metadata)
    };

    if (parsed.data.sessionId) {
      event.sessionId = parsed.data.sessionId;
    }

    const record = await trackAnalyticsEvent(event);

    return {
      ok: true,
      id: record.id
    };
  } catch {
    return {
      ok: false,
      message: "Analytics event could not be recorded."
    };
  }
}

function sanitizeAnalyticsMetadata(metadata: unknown): JsonObject {
  const sanitized = sanitizeJsonValue(metadata, 0);
  const object = isJsonObject(sanitized) ? sanitized : {};

  return boundMetadataSize(object);
}

function sanitizeJsonValue(value: unknown, depth: number): JsonValue | undefined {
  if (depth > MAX_METADATA_DEPTH) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (typeof value === "string") {
    return value.slice(0, MAX_METADATA_STRING_LENGTH);
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value
      .slice(0, MAX_METADATA_ARRAY_ITEMS)
      .map((item) => sanitizeJsonValue(item, depth + 1))
      .filter((item): item is JsonValue => item !== undefined);
  }

  if (!isPlainObject(value)) {
    return undefined;
  }

  const output: JsonObject = {};

  for (const [key, childValue] of Object.entries(value).slice(0, MAX_METADATA_KEYS)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }

    const sanitizedChild = sanitizeJsonValue(childValue, depth + 1);

    if (sanitizedChild !== undefined) {
      output[key] = sanitizedChild;
    }
  }

  return output;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function boundMetadataSize(metadata: JsonObject): JsonObject {
  let entries = Object.entries(metadata);
  let bounded = Object.fromEntries(entries);

  while (JSON.stringify(bounded).length > MAX_METADATA_BYTES && entries.length > 0) {
    entries = entries.slice(0, -1);
    bounded = Object.fromEntries(entries);
  }

  return bounded;
}
