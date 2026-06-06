import { expect, test } from "@playwright/test";
import postgres from "postgres";

import { hashAdminPassword } from "../../features/admin-auth/passwords";

const databaseUrl = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
const adminEmail = "e2e.owner@example.com";
const adminPassword = "correct-horse-battery";
const e2eOpportunityEmail = "e2e.admin-export@example.com";

type DatabaseStatus = {
  available: boolean;
  reason: string;
};

let sql: ReturnType<typeof postgres> | null = null;
let databaseStatus: DatabaseStatus = {
  available: false,
  reason: "Local database check did not run."
};
let canCreateFirstOwner = false;
let firstOwnerSkipReason = "Admin setup precondition was not checked.";

test.describe("admin e2e", () => {
  test.skip(({ isMobile }) => isMobile, "Admin setup is stateful and is covered once in the desktop project.");
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    databaseStatus = await prepareLocalDatabase();
  });

  test.afterAll(async () => {
    if (sql && databaseStatus.available) {
      await sql`delete from public.opportunities where email = ${e2eOpportunityEmail}`;
      await sql`delete from public.admin_users where email = ${adminEmail}`;
      await sql.end();
    }
  });

  test("unauthenticated admin redirects to login", async ({ page }) => {
    await page.goto("/admin");

    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });

  test("setup creates the first owner in local dev", async ({ page }) => {
    test.skip(!databaseStatus.available, databaseStatus.reason);
    test.skip(!canCreateFirstOwner, firstOwnerSkipReason);

    await page.goto("/admin/setup");
    await page.getByLabel("Name").fill("E2E Owner");
    await page.getByLabel("Email").fill(adminEmail);
    await page.getByLabel("Password").fill(adminPassword);
    await page.getByLabel("Setup key").fill("local-dev-setup-key");
    await page.getByRole("button", { name: "Create owner" }).click();

    await expect(page.getByRole("status")).toContainText("Owner admin created.");
  });

  test("login succeeds with the e2e owner", async ({ page }) => {
    test.skip(!databaseStatus.available, databaseStatus.reason);

    await loginAsOwner(page);
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  });

  test("authenticated admin pages load", async ({ page }) => {
    test.skip(!databaseStatus.available, databaseStatus.reason);

    await loginAsOwner(page);

    await page.goto("/admin/opportunities");
    await expect(page.getByRole("heading", { name: "Opportunities" })).toBeVisible();
    await expect(page.getByText("Review submitted opportunities")).toBeVisible();

    await page.goto("/admin/forecast-configs");
    await expect(page.getByRole("heading", { name: "Forecast Configs" })).toBeVisible();
    await expect(page.getByText("Versioned commercial, behavioral")).toBeVisible();
  });

  test("export route returns CSV for authenticated admin", async ({ page }) => {
    test.skip(!databaseStatus.available, databaseStatus.reason);

    await loginAsOwner(page);

    const response = await page.request.get("/api/admin/export/opportunities");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("text/csv");
    expect(response.headers()["content-disposition"]).toContain("opportunities.csv");
    await expect(response.text()).resolves.toContain(e2eOpportunityEmail);
  });
});

function isLocalSupabaseDatabase(input: string) {
  try {
    const url = new URL(input);
    return ["127.0.0.1", "localhost", "::1"].includes(url.hostname) && url.port === "54322";
  } catch {
    return false;
  }
}

async function prepareLocalDatabase(): Promise<DatabaseStatus> {
  if (!isLocalSupabaseDatabase(databaseUrl)) {
    return {
      available: false,
      reason: "Admin e2e checks require the local Supabase database at 127.0.0.1:54322."
    };
  }

  try {
    sql = postgres(databaseUrl, { max: 1, prepare: false });
    await sql`select 1`;
    await sql`delete from public.admin_users where email = ${adminEmail}`;
    await seedExportOpportunity();

    const [adminCount] = await sql<{ value: number }[]>`select count(*)::int as value from public.admin_users`;
    canCreateFirstOwner = (adminCount?.value ?? 0) === 0;

    if (canCreateFirstOwner) {
      firstOwnerSkipReason = "Local database has no admin users; setup can create the first owner.";
    } else {
      firstOwnerSkipReason =
        "Local database already has admin users; run `npx supabase db reset` to exercise first-owner setup.";
      await seedE2eAdmin();
    }

    return {
      available: true,
      reason: "Local Supabase database is reachable."
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await sql?.end().catch(() => undefined);
    sql = null;
    return {
      available: false,
      reason: `Local Supabase database is unavailable: ${message}`
    };
  }
}

async function seedE2eAdmin() {
  if (!sql) {
    throw new Error("Database connection is not available.");
  }

  const passwordHash = await hashAdminPassword(adminPassword);

  await sql`
    insert into public.admin_users (email, name, role, password_hash, is_active)
    values (${adminEmail}, 'E2E Owner', 'owner', ${passwordHash}, true)
    on conflict (email) do update
    set
      name = excluded.name,
      role = excluded.role,
      password_hash = excluded.password_hash,
      is_active = true,
      updated_at = now()
  `;
}

async function seedExportOpportunity() {
  if (!sql) {
    throw new Error("Database connection is not available.");
  }

  await sql`delete from public.opportunities where email = ${e2eOpportunityEmail}`;
  await sql`
    insert into public.opportunities (
      opportunity_kind,
      source_path,
      identity_type,
      contact_name,
      email,
      phone,
      organization_name,
      city,
      state,
      location_types,
      access_method,
      relationship_strength,
      authority_level,
      venue_count,
      approximate_daily_footfall,
      expected_machine_count,
      electricity_readiness,
      internet_readiness,
      commercial_intent,
      details
    )
    values (
      'venue',
      '/e2e/admin',
      'venue_owner',
      'E2E Export Contact',
      ${e2eOpportunityEmail},
      '+917777777777',
      'E2E Export Studio',
      'Mumbai',
      'Maharashtra',
      array['gym'],
      'Direct owner access for admin export e2e coverage.',
      'direct_owner',
      'final_decision',
      1,
      650,
      2,
      'ready',
      'can_arrange',
      'revenue_share',
      '{"source":"playwright"}'::jsonb
    )
  `;
}

async function loginAsOwner(page: import("@playwright/test").Page) {
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(adminEmail);
  await page.getByLabel("Password").fill(adminPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("status")).toContainText("Signed in.");
  await page.getByRole("link", { name: "Open admin" }).click();
  await expect(page).toHaveURL(/\/admin$/);
}
