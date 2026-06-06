import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { StatusPill } from "@/components/admin/StatusPill";
import {
  createOpportunityPostAction,
  updateOpportunityStatusAction
} from "@/features/admin-operations/actions";
import {
  listOpportunityApplicationsForAdmin,
  listOpportunityPostsForAdmin,
  listOpportunityRecords
} from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Opportunities"
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const opportunityStatuses = ["new", "reviewing", "qualified", "forecasted", "contacted", "won", "lost", "archived"];
const commercialIntents = ["purchase", "revenue_share", "lease_commission", "distribution", "co_investment", "open_discussion"];

async function updateOpportunityStatusFormAction(formData: FormData) {
  "use server";
  await updateOpportunityStatusAction(null, formData);
}

async function createOpportunityPostFormAction(formData: FormData) {
  "use server";
  await createOpportunityPostAction(null, formData);
}

function valueOf(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function formatDate(value: Date | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

function TabLink({ href, label, active }: { href: Route; label: string; active: boolean }) {
  return (
    <Link
      className={`inline-flex min-h-10 items-center border px-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] ${
        active
          ? "border-[var(--pb-line-strong)] bg-[rgba(168,255,63,0.12)] text-[var(--pb-green)]"
          : "border-[var(--pb-line)] text-[var(--pb-muted)] hover:text-[var(--pb-cream)]"
      }`}
      href={href}
    >
      {label}
    </Link>
  );
}

function OpportunityStatusForm({ id, status }: { id: string; status: string }) {
  return (
    <form action={updateOpportunityStatusFormAction} className="flex flex-wrap items-center gap-2">
      <input name="id" type="hidden" value={id} />
      <select
        className="min-h-9 border border-[var(--pb-line)] bg-black px-2 text-xs font-semibold text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
        defaultValue={status}
        name="status"
      >
        {opportunityStatuses.map((option) => (
          <option key={option} value={option}>
            {option.replaceAll("_", " ")}
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

function PublishedNeedForm() {
  return (
    <details className="border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
      <summary className="cursor-pointer text-sm font-bold text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]">
        Create published need
      </summary>
      <form action={createOpportunityPostFormAction} className="mt-4 grid gap-3 lg:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
          Title
          <input
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue="Looking for operators"
            name="title"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
          Slug
          <input
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue="looking-for-operators"
            name="slug"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
          Category
          <select
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue="operator"
            name="category"
          >
            <option value="operator">Operator</option>
            <option value="venue_access">Venue access</option>
            <option value="distributor">Distributor</option>
            <option value="strategic_introduction">Strategic introduction</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
          Commercial model
          <select
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue="revenue_share"
            name="commercialModel"
          >
            {commercialIntents.map((intent) => (
              <option key={intent} value={intent}>
                {intent.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)] lg:col-span-2">
          Summary
          <textarea
            className="min-h-24 border border-[var(--pb-line)] bg-black px-3 py-2 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue="ProBlend is looking for operators who can manage smart protein shake machine placements in high-footfall fitness, workplace, and campus environments."
            name="summary"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
          Location scope
          <input
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue="India priority cities"
            name="locationScope"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
          Requirements
          <textarea
            className="min-h-24 border border-[var(--pb-line)] bg-black px-3 py-2 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue={"Operations capacity\nLocal venue relationships\nDaily service discipline"}
            name="requirements"
          />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--pb-cream)]">
          <input defaultChecked name="isPublished" type="checkbox" />
          Publish immediately
        </label>
        <button
          className="min-h-11 w-fit border border-[var(--pb-line-strong)] bg-[var(--pb-green)] px-4 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
          type="submit"
        >
          Save need
        </button>
      </form>
    </details>
  );
}

export default async function AdminOpportunitiesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const tab = valueOf(params.tab) ?? "records";
  const filters = {
    search: valueOf(params.search),
    status: valueOf(params.status),
    city: valueOf(params.city),
    state: valueOf(params.state),
    commercialIntent: valueOf(params.commercialIntent)
  };

  const [opportunities, posts, applications] = await Promise.all([
    listOpportunityRecords(filters),
    listOpportunityPostsForAdmin(),
    listOpportunityApplicationsForAdmin()
  ]);

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Opportunities</h1>
        <p className="text-sm text-[var(--pb-muted)]">Review submitted opportunities, published needs, and incoming applications.</p>
      </section>
      <div className="flex flex-wrap gap-2">
        <TabLink active={tab === "records"} href={"/admin/opportunities" as Route} label="Records" />
        <TabLink active={tab === "published"} href={"/admin/opportunities?tab=published" as Route} label="Published needs" />
        <TabLink active={tab === "applications"} href={"/admin/opportunities?tab=applications" as Route} label="Applications" />
      </div>
      {tab === "published" ? (
        <section className="grid gap-4">
          <PublishedNeedForm />
          <DataTable
            columns={[
              { key: "title", label: "Need", render: (row) => <span className="font-semibold">{row.title}</span> },
              { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
              { key: "category", label: "Category", render: (row) => row.category.replaceAll("_", " ") },
              { key: "published", label: "Published", render: (row) => (row.isPublished ? formatDate(row.publishedAt) : "No") },
              { key: "location", label: "Scope", render: (row) => row.locationScope }
            ]}
            emptyLabel="No published needs yet."
            rows={posts}
          />
        </section>
      ) : null}
      {tab === "applications" ? (
        <DataTable
          columns={[
            {
              key: "applicant",
              label: "Applicant",
              render: (row) => (
                <div>
                  <p className="font-semibold">{row.application.contactName}</p>
                  <p className="text-xs text-[var(--pb-muted)]">{row.application.email}</p>
                </div>
              )
            },
            { key: "post", label: "Need", render: (row) => row.postTitle ?? "Unlinked" },
            { key: "status", label: "Status", render: (row) => <StatusPill status={row.application.status} /> },
            { key: "city", label: "City", render: (row) => `${row.application.city}, ${row.application.state}` },
            { key: "intent", label: "Intent", render: (row) => row.application.intent },
            { key: "created", label: "Created", render: (row) => formatDate(row.application.createdAt) }
          ]}
          emptyLabel="No applications yet."
          rows={applications}
        />
      ) : null}
      {tab === "records" ? (
        <section className="grid gap-4">
          <form className="grid gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4 md:grid-cols-5" method="get">
            <input
              className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              defaultValue={filters.search}
              name="search"
              placeholder="Search"
            />
            <input
              className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              defaultValue={filters.city}
              name="city"
              placeholder="City"
            />
            <input
              className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              defaultValue={filters.state}
              name="state"
              placeholder="State"
            />
            <select
              className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              defaultValue={filters.status ?? ""}
              name="status"
            >
              <option value="">All statuses</option>
              {opportunityStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <select
              className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              defaultValue={filters.commercialIntent ?? ""}
              name="commercialIntent"
            >
              <option value="">All intent</option>
              {commercialIntents.map((intent) => (
                <option key={intent} value={intent}>
                  {intent.replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <button
              className="min-h-11 border border-[var(--pb-line-strong)] bg-[var(--pb-green)] px-4 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] md:col-start-5"
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
                    <Link
                      className="font-bold text-[var(--pb-green)] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                      href={`/admin/opportunities/${row.id}` as Route}
                    >
                      {row.contactName}
                    </Link>
                    <p className="text-xs text-[var(--pb-muted)]">{row.email}</p>
                  </div>
                )
              },
              { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
              { key: "location", label: "Location", render: (row) => [row.city, row.state].filter(Boolean).join(", ") || "Not provided" },
              { key: "intent", label: "Intent", render: (row) => row.commercialIntent?.replaceAll("_", " ") ?? "Not set" },
              { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) },
              { key: "action", label: "Update", render: (row) => <OpportunityStatusForm id={row.id} status={row.status} /> }
            ]}
            emptyLabel="No opportunities match the current filters."
            rows={opportunities}
          />
        </section>
      ) : null}
    </div>
  );
}
