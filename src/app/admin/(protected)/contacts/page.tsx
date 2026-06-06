import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import { listContactSubmissionsForAdmin } from "@/db/queries/admin-operations";
import { updateContactStatusAction } from "@/features/admin-operations/actions";

export const metadata: Metadata = {
  title: "Contacts"
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const contactStatuses = ["new", "reviewed", "replied", "archived"];

async function updateContactStatusFormAction(formData: FormData) {
  "use server";
  await updateContactStatusAction(null, formData);
}

function valueOf(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

function StatusForm({ id, status }: { id: string; status: string }) {
  return (
    <form action={updateContactStatusFormAction} className="flex flex-wrap items-center gap-2">
      <input name="id" type="hidden" value={id} />
      <select
        className="min-h-9 border border-[var(--pb-line)] bg-black px-2 text-xs font-semibold text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
        defaultValue={status}
        name="status"
      >
        {contactStatuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button
        className="min-h-9 border border-[var(--pb-line)] px-3 text-xs font-bold text-[var(--pb-cream)] hover:border-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
        type="submit"
      >
        Update
      </button>
    </form>
  );
}

export default async function AdminContactsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const status = valueOf(params.status);
  const contacts = await listContactSubmissionsForAdmin(status);

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Contacts</h1>
        <p className="text-sm text-[var(--pb-muted)]">Review contact form submissions and update response status.</p>
      </section>
      <form className="flex flex-wrap gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4" method="get">
        <select
          className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
          defaultValue={status ?? ""}
          name="status"
        >
          <option value="">All statuses</option>
          {contactStatuses.map((option) => (
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
            key: "contact",
            label: "Contact",
            render: (row) => (
              <div>
                <p className="font-semibold">{row.firstName} {row.lastName}</p>
                <p className="text-xs text-[var(--pb-muted)]">{row.email}</p>
              </div>
            )
          },
          { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
          { key: "phone", label: "Phone", render: (row) => row.phone ?? "Not provided" },
          { key: "message", label: "Message", render: (row) => <span className="line-clamp-3">{row.message}</span> },
          { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) },
          { key: "update", label: "Update", render: (row) => <StatusForm id={row.id} status={row.status} /> }
        ]}
        emptyLabel="No contact submissions found."
        rows={contacts}
      />
    </div>
  );
}
