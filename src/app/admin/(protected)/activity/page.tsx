import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { listActivityLogsForAdmin } from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Activity"
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

export default async function AdminActivityPage() {
  const logs = await listActivityLogsForAdmin();

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Activity</h1>
        <p className="text-sm text-[var(--pb-muted)]">Operational activity and privileged audit events.</p>
      </section>
      <section className="grid gap-3">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold">Activity logs</h2>
        <DataTable
          columns={[
            { key: "actor", label: "Actor", render: (row) => <StatusPill status={row.actorType} /> },
            { key: "action", label: "Action", render: (row) => row.action.replaceAll("_", " ") },
            { key: "entity", label: "Entity", render: (row) => `${row.entityType} ${row.entityId ?? ""}` },
            { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) }
          ]}
          emptyLabel="No activity logs yet."
          rows={logs.activity}
        />
      </section>
      <section className="grid gap-3">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold">Audit logs</h2>
        <DataTable
          columns={[
            { key: "action", label: "Action", render: (row) => row.action.replaceAll("_", " ") },
            { key: "entity", label: "Entity", render: (row) => `${row.entityType} ${row.entityId ?? ""}` },
            { key: "admin", label: "Admin", render: (row) => row.adminUserId ?? "System" },
            { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) }
          ]}
          emptyLabel="No audit logs yet."
          rows={logs.audit}
        />
      </section>
    </div>
  );
}
