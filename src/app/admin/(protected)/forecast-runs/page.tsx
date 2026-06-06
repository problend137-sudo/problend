import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { listForecastRunsForAdmin } from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Forecast Runs"
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

function JsonSummary({ value }: { value: unknown }) {
  return (
    <pre className="max-h-28 max-w-96 overflow-auto text-xs leading-5 text-[var(--pb-muted)]">{JSON.stringify(value, null, 2)}</pre>
  );
}

export default async function AdminForecastRunsPage() {
  const runs = await listForecastRunsForAdmin();

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Forecast Runs</h1>
        <p className="text-sm text-[var(--pb-muted)]">Stored input, output, and assumption snapshots for every persisted forecast.</p>
      </section>
      <DataTable
        columns={[
          { key: "source", label: "Source", render: (row) => row.run.source.replaceAll("_", " ") },
          { key: "version", label: "Version", render: (row) => `v${row.versionNumber}` },
          { key: "input", label: "Input snapshot", render: (row) => <JsonSummary value={row.run.inputSnapshot} /> },
          { key: "output", label: "Output snapshot", render: (row) => <JsonSummary value={row.run.outputSnapshot} /> },
          { key: "created", label: "Created", render: (row) => formatDate(row.run.createdAt) }
        ]}
        emptyLabel="No forecast runs recorded."
        rows={runs}
      />
    </div>
  );
}
