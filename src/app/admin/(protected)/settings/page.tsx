import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { ScoreCard } from "@/components/admin/ScoreCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { getAdminSettingsOverview } from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Settings"
};

function formatDate(value: Date | null) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

export default async function AdminSettingsPage() {
  const settings = await getAdminSettingsOverview();

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Settings</h1>
        <p className="text-sm text-[var(--pb-muted)]">Admin account overview and setup status.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <ScoreCard label="Setup status" value={settings.setupComplete ? "Complete" : "Pending"} detail="Initial owner setup gate" />
        <ScoreCard label="Admin accounts" value={settings.adminCount} detail="Built-in admin auth users" />
      </section>
      <DataTable
        columns={[
          {
            key: "admin",
            label: "Admin",
            render: (row) => (
              <div>
                <p className="font-semibold">{row.name}</p>
                <p className="text-xs text-[var(--pb-muted)]">{row.email}</p>
              </div>
            )
          },
          { key: "role", label: "Role", render: (row) => row.role },
          { key: "active", label: "Active", render: (row) => <StatusPill status={row.isActive ? "active" : "archived"} /> },
          { key: "lastLogin", label: "Last login", render: (row) => formatDate(row.lastLoginAt) },
          { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) }
        ]}
        emptyLabel="No admin users found."
        rows={settings.admins}
      />
    </div>
  );
}
