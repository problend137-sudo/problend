import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { OpportunityForm } from "@/components/public/OpportunityForm";

vi.mock("@/features/opportunities/actions", () => ({
  submitOpportunityAction: vi.fn()
}));

describe("OpportunityForm", () => {
  it("server-renders navigation disabled until the client form is hydrated", () => {
    const html = renderToString(<OpportunityForm sourcePath="/business-solutions" />);

    expect(html).toContain("What do you have?");
    expect(html).toMatch(/<button[^>]*disabled=""[^>]*>Next<\/button>/);
  });

  it("enables navigation after hydration and advances the guided flow", async () => {
    render(<OpportunityForm sourcePath="/business-solutions" />);

    const nextButton = screen.getByRole("button", { name: "Next" }) as HTMLButtonElement;
    await waitFor(() => expect(nextButton.disabled).toBe(false));

    fireEvent.click(nextButton);

    expect(screen.getByRole("heading", { name: "Tell us about the place." })).toBeTruthy();
  });
});
