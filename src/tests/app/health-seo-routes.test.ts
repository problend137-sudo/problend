import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { GET as healthGET } from "@/app/api/health/route";

describe("health route", () => {
  it("returns the public service health JSON shape", async () => {
    const response = await healthGET();
    const body = await response.json();

    expect(body).toEqual({
      ok: true,
      service: "problend-digital-os",
      timestamp: expect.any(String)
    });
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
  });
});

describe("sitemap", () => {
  it("contains only public and legal routes", () => {
    const entries = sitemap();
    const paths = entries.map((entry) => new URL(entry.url).pathname);

    expect(paths).toEqual([
      "/",
      "/about",
      "/how-it-works",
      "/product-offerings",
      "/business-solutions",
      "/contact",
      "/placement-estimate",
      "/partner-with-problend",
      "/submit-venue",
      "/city-waitlist",
      "/published-opportunities",
      "/submit-opportunity",
      "/privacy-policy",
      "/terms-and-conditions",
      "/cancellation-and-refunds",
      "/shipping-policy"
    ]);
    expect(paths.some((path) => path.startsWith("/admin"))).toBe(false);
    expect(paths.some((path) => path.startsWith("/api"))).toBe(false);
  });
});

describe("robots", () => {
  it("allows public routes and disallows admin and API routes", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"]
      },
      sitemap: "http://localhost:3000/sitemap.xml"
    });
  });
});
