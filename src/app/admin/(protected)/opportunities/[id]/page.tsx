import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DataTable } from "@/components/admin/DataTable";
import { ScoreCard } from "@/components/admin/ScoreCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { getOpportunityRecordDetail } from "@/db/queries/admin-operations";
import { updateOpportunityStatusAction } from "@/features/admin-operations/actions";

export const metadata: Metadata = {
  title: "Opportunity Detail"
};

type PageParams = Promise<{ id: string }>;

const opportunityStatuses = ["new", "reviewing", "qualified", "forecasted", "contacted", "won", "lost", "archived"];

async function updateOpportunityStatusFormAction(formData: FormData) {
  "use server";
  await updateOpportunityStatusAction(null, formData);
}

function formatDate(value: Date | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="max-h-80 overflow-auto border border-[var(--pb-line)] bg-black p-3 text-xs leading-5 text-[var(--pb-muted)]">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function DetailItem({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="border border-[var(--pb-line)] bg-[var(--pb-panel)] p-3">
      <p className="text-xs font-bold uppercase text-[var(--pb-dim)]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--pb-cream)]">{String(value ?? "Not provided")}</p>
    </div>
  );
}

export default async function OpportunityDetailPage({ params }: { params: PageParams }) {
  const { id } = await params;
  const detail = await getOpportunityRecordDetail(id);

  if (!detail) {
    notFound();
  }

  const { opportunity, events, latestScore, forecastRuns } = detail;

  return (
    <div className="grid gap-6">
      <section className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--pb-line)] pb-5">
        <div>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">{opportunity.contactName}</h1>
          <p className="mt-2 text-sm text-[var(--pb-muted)]">
            {opportunity.organizationName ?? "Independent source"} / {opportunity.email}
          </p>
        </div>
        <StatusPill status={opportunity.status} />
      </section>
      <section className="grid gap-3 lg:grid-cols-4">
        <DetailItem label="Phone" value={opportunity.phone} />
        <DetailItem label="Location" value={[opportunity.city, opportunity.state].filter(Boolean).join(", ")} />
        <DetailItem label="Commercial intent" value={opportunity.commercialIntent?.replaceAll("_", " ")} />
        <DetailItem label="Created" value={formatDate(opportunity.createdAt)} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-4">
          <div className="grid gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold">Record</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <DetailItem label="Identity" value={opportunity.identityType?.replaceAll("_", " ")} />
              <DetailItem label="Access" value={opportunity.accessMethod?.replaceAll("_", " ")} />
              <DetailItem label="Authority" value={opportunity.authorityLevel?.replaceAll("_", " ")} />
              <DetailItem label="Venue count" value={opportunity.venueCount} />
              <DetailItem label="Daily footfall" value={opportunity.approximateDailyFootfall} />
              <DetailItem label="Expected machines" value={opportunity.expectedMachineCount} />
            </div>
            <JsonBlock value={opportunity.details} />
          </div>
          <div className="grid gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold">Events</h2>
            <DataTable
              columns={[
                { key: "type", label: "Type", render: (row) => row.eventType.replaceAll("_", " ") },
                { key: "note", label: "Note", render: (row) => row.note ?? "No note" },
                { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) }
              ]}
              emptyLabel="No events recorded."
              rows={events}
            />
          </div>
          <div className="grid gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold">Forecast runs</h2>
            <DataTable
              columns={[
                { key: "source", label: "Source", render: (row) => row.source.replaceAll("_", " ") },
                { key: "version", label: "Config version", render: (row) => row.forecastConfigVersionId },
                { key: "created", label: "Created", render: (row) => formatDate(row.createdAt) }
              ]}
              emptyLabel="No forecast runs linked to this opportunity."
              rows={forecastRuns}
            />
          </div>
        </div>
        <aside className="grid h-fit gap-4">
          <form action={updateOpportunityStatusFormAction} className="grid gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold">Update status</h2>
            <input name="id" type="hidden" value={opportunity.id} />
            <select
              className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              defaultValue={opportunity.status}
              name="status"
            >
              {opportunityStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <button
              className="min-h-11 border border-[var(--pb-line-strong)] bg-[var(--pb-green)] px-4 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              type="submit"
            >
              Save status
            </button>
          </form>
          <div className="grid gap-3">
            <h2 className="font-[var(--font-display)] text-2xl font-semibold">Latest score</h2>
            {latestScore ? (
              <div className="grid gap-3">
                <ScoreCard label="Score" value={latestScore.score} detail={latestScore.rating} />
                <ScoreCard label="Confidence" value={`${latestScore.confidence}%`} detail="Opportunity score confidence" />
                <JsonBlock value={latestScore.factorBreakdown} />
              </div>
            ) : (
              <p className="border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4 text-sm text-[var(--pb-muted)]">
                No score has been generated for this opportunity.
              </p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
