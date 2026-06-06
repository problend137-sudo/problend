import { beforeEach, describe, expect, it, vi } from "vitest";

import { trackAnalyticsEvent } from "@/db/queries/analytics";
import { trackEventAction } from "@/features/analytics/actions";
import { analyticsEvents } from "@/features/analytics/events";

vi.mock("@/db/queries/analytics", () => ({
  trackAnalyticsEvent: vi.fn()
}));

describe("trackEventAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(trackAnalyticsEvent).mockResolvedValue({ id: "analytics-event-id" } as never);
  });

  it("validates and stores bounded JSON-safe analytics metadata", async () => {
    const result = await trackEventAction({
      eventName: analyticsEvents.ctaClick,
      sourcePath: "/contact",
      sessionId: " session-123 ",
      metadata: {
        cta: "contact",
        nested: {
          ok: true,
          value: 42
        },
        longText: "x".repeat(900),
        unsafe: undefined,
        unsupported: () => "skip"
      }
    });

    expect(result).toEqual({
      ok: true,
      id: "analytics-event-id"
    });
    expect(trackAnalyticsEvent).toHaveBeenCalledWith({
      eventName: analyticsEvents.ctaClick,
      sourcePath: "/contact",
      sessionId: "session-123",
      metadata: {
        cta: "contact",
        nested: {
          ok: true,
          value: 42
        },
        longText: "x".repeat(500)
      }
    });
  });

  it("rejects unknown event names and invalid source paths without writing analytics", async () => {
    const result = await trackEventAction({
      eventName: "not_a_real_event",
      sourcePath: "https://example.com/contact",
      metadata: {
        cta: "contact"
      }
    });

    expect(result).toEqual({
      ok: false,
      message: "Analytics event could not be recorded."
    });
    expect(trackAnalyticsEvent).not.toHaveBeenCalled();
  });
});
