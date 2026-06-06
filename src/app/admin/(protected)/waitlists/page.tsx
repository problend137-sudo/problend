import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { listWaitlistEntriesForAdmin } from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Waitlists"
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const waitlistStatuses = ["new", "reviewed", "contacted", "archived"];

function valueOf(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

export default async function AdminWaitlistsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = valueOf(params.status);
  const entries = await listWaitlistEntriesForAdmin(status);

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Waitlists</h1>
        <p className="text-sm text-[var(--pb-muted)]">City, venue, and customer waitlist entries.</p>
      </section>
      <form className="flex flex-wrap gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4" method="get">
        <select
          className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
          defaultValue={status ?? ""}
          name="status"
        >
          <option value="">All statuses</option>
          {waitlistStatuses.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          className="min-h-11 border border-[var(--pb-line-strong)] bg-[var(--pb-green)] px-4 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
          type="submit"
        >
          Filter
        </button>
      </form>
      <DataTable
        columns={[
          {
            key: "name",
            label: "Name",
            render: (row) => (
              <div>
                <p className="font-semibold">{row.name}</p>
                <p className="text-xs text-[var(--pb-muted)]">{row.email}</p>
              </div>
            )
          },
          { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
          { key: "location", label: "Location", render: (row) => `${row.city}, ${row.state}` },
          { key: "interest", label: "Interest", render: (row) => row.interestType.replaceAll("_", " ") },
          { key: "source", label: "Source", render: (row) => row.sourcePath },
          { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) }
        ]}
        emptyLabel="No waitlist entries found."
        rows={entries}
      />
    </div>
  );
}
