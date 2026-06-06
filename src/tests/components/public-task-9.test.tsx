import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { ExpansionMap, expansionMapBase, expansionMarkets } from "@/components/public/ExpansionMap";
import { ProductExplorer } from "@/components/public/ProductExplorer";
import { CaseStudySection } from "@/components/public/CaseStudySection";
import { caseStudies, publishedCaseStudies } from "@/content/case-studies";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => createElement("img", { alt, src })
}));

describe("Task 9 public product and expansion components", () => {
  it("renders an interactive product explorer for the four ProBlend flavours", () => {
    render(<ProductExplorer />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      "Belgian Chocolate",
      "Vanilla",
      "Mango",
      "Cola Electrolyte"
    ]);

    expect(screen.getByText("Nutrition display framework")).toBeTruthy();
    expect(screen.getByText("Machine capability panel")).toBeTruthy();
    expect(screen.getByText("Cashless payments")).toBeTruthy();
    expect(screen.getByText("GPRS tracking")).toBeTruthy();
    expect(screen.getByText("Inventory monitoring")).toBeTruthy();
    expect(screen.getByText("Analytics")).toBeTruthy();
    expect(screen.getByText("Remote monitoring")).toBeTruthy();
    expect(screen.getByText("Predictive restocking")).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: "Mango" }));

    expect(screen.getByRole("tab", { name: "Mango" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Mango Protein Shake")).toBeTruthy();
    expect(screen.getByText(/protein content/i)).toBeTruthy();
    expect(screen.getByText(/flavour intensity/i)).toBeTruthy();
  });

  it("renders a public-safe India expansion map without internal opportunity records", () => {
    render(<ExpansionMap />);

    expect(expansionMapBase.city).toBe("New Delhi");
    expect(expansionMapBase.address).toContain("K-18 Green Park Extension");
    expect(expansionMarkets.map((market) => market.city)).toEqual([
      "Mumbai",
      "Pune",
      "Bengaluru",
      "Hyderabad",
      "Chennai",
      "Ahmedabad",
      "Kolkata",
      "Jaipur"
    ]);

    fireEvent.click(screen.getByRole("button", { name: /Mumbai/i }));

    expect(screen.getByRole("button", { name: /Mumbai/i }).getAttribute("aria-pressed")).toBe("true");

    const publicMapText = screen.getByTestId("expansion-map").textContent ?? "";
    expect(publicMapText).not.toMatch(/opportunity id|private|internal count|record|forecast config|audit/i);
  });

  it("renders only published case studies in the public section", () => {
    render(<CaseStudySection />);

    expect(publishedCaseStudies.every((study) => study.published)).toBe(true);
    expect(publishedCaseStudies.length).toBeGreaterThan(0);

    for (const study of publishedCaseStudies) {
      expect(screen.getByText(study.title)).toBeTruthy();
      expect(study.metrics.length).toBeGreaterThan(0);
      expect(study.body.length).toBeGreaterThan(0);
    }

    for (const draft of caseStudies.filter((study) => !study.published)) {
      expect(screen.queryByText(draft.title)).toBeNull();
    }
  });
});
