import type { Metadata } from "next";

import { DataTable } from "@/components/admin/DataTable";
import { ForecastConfigEditor } from "@/components/admin/ForecastConfigEditor";
import { ScoreCard } from "@/components/admin/ScoreCard";
import { StatusPill } from "@/components/admin/StatusPill";
import { getActiveForecastConfig, listForecastConfigVersions } from "@/db/queries/admin-operations";
import type { ForecastAssumptions } from "@/features/forecasting/types";

export const metadata: Metadata = {
  title: "Forecast Configs"
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(value);
}

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="max-h-96 overflow-auto border border-[var(--pb-line)] bg-black p-3 text-xs leading-5 text-[var(--pb-muted)]">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function versionLabel(versionNumber: number) {
  return `v${versionNumber}`;
}

export default async function AdminForecastConfigsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [activeConfig, versions] = await Promise.all([getActiveForecastConfig(), listForecastConfigVersions()]);
  const leftVersionId = valueOf(params.a) ?? versions[0]?.version.id;
  const rightVersionId = valueOf(params.b) ?? versions[1]?.version.id;
  const leftVersion = versions.find((entry) => entry.version.id === leftVersionId)?.version;
  const rightVersion = versions.find((entry) => entry.version.id === rightVersionId)?.version;
  const activeVersion = activeConfig?.latestVersion;

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 border-b border-[var(--pb-line)] pb-5">
        <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none">Forecast Configs</h1>
        <p className="text-sm text-[var(--pb-muted)]">Versioned commercial, behavioral, geographic, venue, and operational assumptions.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <ScoreCard label="Active config" value={activeConfig?.config.name ?? "None"} detail={activeConfig?.config.description ?? "No active config"} />
        <ScoreCard label="Active version" value={activeVersion ? versionLabel(activeVersion.versionNumber) : "None"} detail={activeVersion?.changeNote ?? "No version"} />
        <ScoreCard label="Versions" value={versions.length} detail="Stored immutable versions" />
      </section>
      {activeVersion ? (
        <section className="grid gap-3">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Create new version</h2>
          <ForecastConfigEditor assumptions={activeVersion.assumptions as ForecastAssumptions} />
        </section>
      ) : (
        <p className="border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4 text-sm text-[var(--pb-muted)]">
          No active forecast config version exists.
        </p>
      )}
      <section className="grid gap-3">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold">Compare versions</h2>
        <form className="grid gap-3 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4 md:grid-cols-[1fr_1fr_auto]" method="get">
          <select
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue={leftVersionId}
            name="a"
          >
            {versions.map((entry) => (
              <option key={entry.version.id} value={entry.version.id}>
                {entry.configName} {versionLabel(entry.version.versionNumber)}
              </option>
            ))}
          </select>
          <select
            className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            defaultValue={rightVersionId}
            name="b"
          >
            {versions.map((entry) => (
              <option key={entry.version.id} value={entry.version.id}>
                {entry.configName} {versionLabel(entry.version.versionNumber)}
              </option>
            ))}
          </select>
          <button
            className="min-h-11 border border-[var(--pb-line-strong)] bg-[var(--pb-green)] px-4 text-sm font-extrabold text-black focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            type="submit"
          >
            Compare
          </button>
        </form>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold text-[var(--pb-muted)]">
              {leftVersion ? versionLabel(leftVersion.versionNumber) : "Select a version"}
            </p>
            <JsonBlock value={leftVersion?.assumptions ?? {}} />
          </div>
          <div>
            <p className="mb-2 text-sm font-bold text-[var(--pb-muted)]">
              {rightVersion ? versionLabel(rightVersion.versionNumber) : "Select a version"}
            </p>
            <JsonBlock value={rightVersion?.assumptions ?? {}} />
          </div>
        </div>
      </section>
      <section className="grid gap-3">
        <h2 className="font-[var(--font-display)] text-2xl font-semibold">Version history</h2>
        <DataTable
          columns={[
            { key: "config", label: "Config", render: (row) => row.configName },
            { key: "version", label: "Version", render: (row) => versionLabel(row.version.versionNumber) },
            { key: "active", label: "Active", render: (row) => <StatusPill status={row.isActiveConfig ? "active" : "archived"} /> },
            { key: "note", label: "Change note", render: (row) => row.version.changeNote },
            { key: "created", label: "Created", render: (row) => formatDate(row.version.createdAt) }
          ]}
          emptyLabel="No forecast config versions found."
          rows={versions}
        />
      </section>
    </div>
  );
}
