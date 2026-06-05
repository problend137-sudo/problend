import { describe, expect, it } from "vitest";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

describe("foundation smoke test", () => {
  it("runs the initial suite", () => {
    expect("problend").toBe("problend");
  });

  it("loads local development environment defaults", () => {
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
    expect(env.SESSION_COOKIE_NAME).toBe("problend_admin_session");
  });

  it("merges conditional class names predictably", () => {
    expect(cn("px-2", "px-4", false && "hidden", "text-sm")).toBe("px-4 text-sm");
  });
});
