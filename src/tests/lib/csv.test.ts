import { describe, expect, it } from "vitest";

import { toCsv } from "@/lib/csv";

describe("toCsv", () => {
  it("returns an empty string for empty rows", () => {
    expect(toCsv([])).toBe("");
  });

  it("preserves first-row headers and quotes every value", () => {
    const csv = toCsv([
      {
        name: "Riya Kapoor",
        status: "new",
        notes: "Gym owner, Mumbai"
      },
      {
        name: "Arjun Shah",
        status: "qualified",
        notes: "Needs follow-up"
      }
    ]);

    expect(csv).toBe(
      ['name,status,notes', '"Riya Kapoor","new","Gym owner, Mumbai"', '"Arjun Shah","qualified","Needs follow-up"'].join("\n")
    );
  });

  it("escapes quotes and serializes nullish values as empty strings", () => {
    const csv = toCsv([
      {
        contact: 'Asha "Ops" Rao',
        phone: null,
        count: 4
      }
    ]);

    expect(csv).toBe(['contact,phone,count', '"Asha ""Ops"" Rao","","4"'].join("\n"));
  });
});
