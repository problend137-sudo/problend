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

  it("keeps branch detail fields in form data after moving to the contact step", async () => {
    const { container } = render(<OpportunityForm sourcePath="/business-solutions" />);
    const form = container.querySelector("#opportunity-intake") as HTMLFormElement;
    const nextButton = screen.getByRole("button", { name: "Next" }) as HTMLButtonElement;

    await waitFor(() => expect(nextButton.disabled).toBe(false));
    fireEvent.click(nextButton);

    fireEvent.change(form.querySelector('input[name="city"]') as HTMLInputElement, { target: { value: "Mumbai" } });
    fireEvent.change(form.querySelector('input[name="state"]') as HTMLInputElement, { target: { value: "Maharashtra" } });
    fireEvent.change(form.querySelector('textarea[name="accessMethod"]') as HTMLTextAreaElement, {
      target: { value: "Direct access to the facility manager." }
    });

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByRole("heading", { name: "How should we reach you?" })).toBeTruthy();

    const formData = new FormData(form);
    expect(formData.get("city")).toBe("Mumbai");
    expect(formData.get("state")).toBe("Maharashtra");
    expect(formData.getAll("locationTypes")).toEqual(["gym"]);
    expect(formData.get("accessMethod")).toBe("Direct access to the facility manager.");
  });
});
