import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";

import { ScoreCard } from "@/components/admin/ScoreCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { getAdminOverview } from "@/db/queries/admin-operations";

export const metadata: Metadata = {
  title: "Admin"
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(value);
}

export default async function AdminHomePage() {
  const overview = await getAdminOverview();
  const activeVersion = overview.activeForecastConfig?.latestVersion;

  return (
    <div className="grid gap-6">
      <section className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--pb-line)] pb-5">
        <div>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]">Overview</h1>
          <p className="mt-2 text-sm text-[var(--pb-muted)]">Live intake, calculator, and configuration signals.</p>
        </div>
        <Link
          className="text-sm font-bold text-[var(--pb-muted)] underline-offset-4 hover:text-[var(--pb-green)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
          href={"/" as Route}
        >
          View site
        </Link>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <ScoreCard label="New opportunities" value={overview.counts.newOpportunities} detail="Untriaged opportunity records" />
        <ScoreCard label="New applications" value={overview.counts.newOpportunityApplications} detail="Published need responses" />
        <ScoreCard label="New contacts" value={overview.counts.newContactSubmissions} detail="Contact submissions awaiting review" />
        <ScoreCard label="Calculator submissions" value={overview.counts.calculatorSubmissions} detail="Placement estimate leads" />
        <ScoreCard
          label="Active config"
          value={activeVersion ? `v${activeVersion.versionNumber}` : "None"}
          detail={overview.activeForecastConfig?.config.name ?? "No active config"}
        />
      </section>
      <section className="grid gap-3">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold">Recent activity</h2>
        <div className="border border-[var(--pb-line)] bg-[var(--pb-panel)]">
          {overview.recentActivity.length === 0 ? (
            <p className="px-4 py-6 text-sm text-[var(--pb-muted)]">No activity has been recorded yet.</p>
          ) : (
            <div className="divide-y divide-[var(--pb-line)]">
              {overview.recentActivity.map((activity) => (
                <div key={activity.id} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="font-semibold text-[var(--pb-cream)]">{activity.action.replaceAll("_", " ")}</p>
                    <p className="text-xs text-[var(--pb-muted)]">
                      {activity.entityType} {activity.entityId ? `/${activity.entityId}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--pb-muted)]">
                    <StatusPill status={activity.actorType} />
                    {formatDate(activity.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
