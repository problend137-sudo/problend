import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { listCalculatorSubmissionsForAdmin } from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Calculator"
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

export default async function AdminCalculatorPage() {
  const submissions = await listCalculatorSubmissionsForAdmin();

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Calculator</h1>
        <p className="text-sm text-[var(--pb-muted)]">Placement calculator submissions and linked forecast runs.</p>
      </section>
      <DataTable
        columns={[
          {
            key: "contact",
            label: "Contact",
            render: (row) => (
              <div>
                <p className="font-semibold">{row.submission.contactName ?? "Anonymous"}</p>
                <p className="text-xs text-[var(--pb-muted)]">{row.submission.email ?? "No email"}</p>
              </div>
            )
          },
          { key: "venue", label: "Venue", render: (row) => row.submission.venueType },
          { key: "footfall", label: "Footfall", render: (row) => row.submission.dailyFootfall },
          { key: "location", label: "Location", render: (row) => `${row.submission.city}, ${row.submission.state}` },
          { key: "intent", label: "Intent", render: (row) => row.submission.commercialIntent.replaceAll("_", " ") },
          { key: "run", label: "Forecast run", render: (row) => row.forecastRun?.id ?? "Not linked" },
          { key: "created", label: "Created", render: (row) => formatDate(row.submission.createdAt) }
        ]}
        emptyLabel="No calculator submissions yet."
        rows={submissions}
      />
    </div>
  );
}
