import { expect, test } from "@playwright/test";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

type DatabaseStatus = {
  available: boolean;
  reason: string;
};

let sql: ReturnType<typeof postgres> | null = null;
let databaseStatus: DatabaseStatus = {
  available: false,
  reason: "Local database check did not run."
};

function isLocalSupabaseDatabase(input: string) {
  try {
    const url = new URL(input);
    return ["127.0.0.1", "localhost", "::1"].includes(url.hostname) && url.port === "54322";
  } catch {
    return false;
  }
}

async function checkLocalDatabase(): Promise<DatabaseStatus> {
  if (!isLocalSupabaseDatabase(databaseUrl)) {
    return {
      available: false,
      reason: "Database-backed e2e checks require the local Supabase database at 127.0.0.1:54322."
    };
  }

  try {
    sql = postgres(databaseUrl, { max: 1, prepare: false });
    await sql`select 1`;
    return {
      available: true,
      reason: "Local Supabase database is reachable."
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      available: false,
      reason: `Local Supabase database is unavailable: ${message}`
    };
  }
}

test.beforeAll(async () => {
  databaseStatus = await checkLocalDatabase();
});

test.afterAll(async () => {
  await sql?.end();
});

test("home page loads with the preserved ProBlend hero copy", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Fuel your fitness, one shake at a time." })).toBeVisible();
});

test("product offerings contain four ProBlend products and exclude Wix demo products", async ({ page }) => {
  await page.goto("/product-offerings");

  for (const productName of [
    "Belgian Chocolate Protein Shake",
    "Vanilla Protein Shake",
    "Mango Protein Shake",
    "Cola Electrolyte Shake"
  ]) {
    await expect(page.getByText(productName).first()).toBeVisible();
  }

  const pageText = await page.locator("body").innerText();
  expect(pageText).not.toMatch(
    /golf sweater|baseball cap|ceramic vase|tote bag|eyeglasses|face serum|diffuser|lounge chair|t-shirt/i
  );
});

test("contact form submits valid test data", async ({ page }) => {
  test.skip(!databaseStatus.available, databaseStatus.reason);

  await page.goto("/contact");

  const form = page.locator("form").filter({ has: page.getByRole("button", { name: "Send" }) });
  await form.getByLabel("First Name").fill("E2E");
  await form.getByLabel("Last Name").fill("Contact");
  await form.getByLabel("Email").fill("e2e.contact@example.com");
  await form.getByLabel("Message").fill("Playwright contact smoke test for the ProBlend launch hardening pass.");
  await form.getByRole("button", { name: "Send" }).click();

  await expect(form.getByText("Thanks for submitting!")).toBeVisible();
});

test("submit opportunity route reaches the intake form and submits valid opportunity data", async ({ page }) => {
  test.skip(!databaseStatus.available, databaseStatus.reason);

  await page.goto("/submit-opportunity");

  await expect(page).toHaveURL(/\/business-solutions/);
  const form = page.locator("#opportunity-intake");
  await expect(form.getByRole("heading", { name: "What do you have?" })).toBeVisible();

  await form.getByRole("button", { name: "Next" }).click();
  await form.getByLabel("City").fill("Mumbai");
  await form.getByLabel("State").fill("Maharashtra");
  await form.getByLabel("Who do you know there?").fill("Direct access to the facility manager for an e2e test venue.");
  await form.getByLabel("Venues").fill("1");
  await form.getByLabel("Daily footfall").fill("650");
  await form.getByLabel("Machines").fill("2");
  await form.getByLabel("Space or site notes").fill("Visible lobby placement with power nearby.");
  await form.getByRole("button", { name: "Next" }).click();
  await form.getByLabel("Name").fill("E2E Opportunity");
  await form.getByLabel("Role").fill("Operations Lead");
  await form.getByLabel("Email").fill("e2e.opportunity@example.com");
  await form.getByLabel("Phone").fill("+919999999999");
  await form.getByLabel("Organization").fill("E2E Fitness Studio");
  await form.getByLabel("Notes").fill("Submitted by Playwright during Task 11 launch hardening.");
  await form.getByRole("button", { name: "Submit" }).click();

  await expect(form.getByText("Thanks. We've received it and will review it.")).toBeVisible();
});

test("placement estimate returns a public forecast output", async ({ page }) => {
  test.skip(!databaseStatus.available, databaseStatus.reason);

  await page.goto("/placement-estimate");

  const form = page.locator("#placement-estimate-form");
  await form.getByLabel("Daily footfall").fill("700");
  await form.getByLabel("Operating hours").fill("14");
  await form.getByLabel("City").fill("Mumbai");
  await form.getByLabel("State").fill("Maharashtra");
  await form.getByLabel("Name").fill("E2E Calculator");
  await form.getByLabel("Email").fill("e2e.calculator@example.com");
  await form.getByLabel("Phone").fill("+918888888888");
  await form.getByRole("button", { name: "Run Estimate" }).click();

  await expect(page.getByRole("heading", { name: "Estimate ready" })).toBeVisible();
  await expect(page.getByText("Monthly revenue")).toBeVisible();
  await expect(page.getByText("Fit reasoning")).toBeVisible();
});

test("footer links reach all four legal pages", async ({ page }) => {
  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy", heading: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions", heading: "Terms & Conditions" },
    { href: "/cancellation-and-refunds", label: "Refund Policy", heading: "Refund Policy" },
    { href: "/shipping-policy", label: "Shipping Policy", heading: "Shipping & Delivery Policy" }
  ];

  for (const link of legalLinks) {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: link.label }).click();

    await expect(page).toHaveURL(new RegExp(`${link.href}$`));
    await expect(page.getByRole("heading", { name: link.heading })).toBeVisible();
  }
});
