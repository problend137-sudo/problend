"use client";

import { useActionState, useMemo, useState } from "react";

import { createForecastConfigVersionAction, type AdminOperationActionState } from "@/features/admin-operations/actions";
import type { ForecastAssumptions, LocationType, VenueType } from "@/features/forecasting/types";

const venueLabels: Array<[VenueType, string]> = [
  ["college", "College"],
  ["gym", "Gym"],
  ["office", "Office"],
  ["hospital", "Hospital"],
  ["mall", "Mall"],
  ["residence", "Residence"],
  ["other", "Other"]
];

const geographyLabels: Array<[LocationType, string]> = [
  ["metro", "Metro"],
  ["tier_1", "Tier 1"],
  ["tier_2", "Tier 2"],
  ["tier_3", "Tier 3"]
];

const initialState: AdminOperationActionState | null = null;

function NumberField({
  label,
  value,
  step = "0.01",
  onChange
}: {
  label: string;
  value: number;
  step?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
      {label}
      <input
        className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
        inputMode="decimal"
        step={step}
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function ForecastConfigEditor({ assumptions }: { assumptions: ForecastAssumptions }) {
  const [state, formAction, isPending] = useActionState(createForecastConfigVersionAction, initialState);
  const [draft, setDraft] = useState<ForecastAssumptions>(assumptions);
  const serialized = useMemo(() => JSON.stringify(draft), [draft]);

  return (
    <form action={formAction} className="grid gap-5 border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
      <input name="assumptions" type="hidden" value={serialized} />
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="grid gap-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Commercial</h2>
          <NumberField
            label="Drink price"
            step="1"
            value={draft.commercial.drinkPrice}
            onChange={(value) =>
              setDraft((current) => ({ ...current, commercial: { ...current.commercial, drinkPrice: value } }))
            }
          />
          <NumberField
            label="Revenue per transaction"
            step="1"
            value={draft.commercial.revenuePerTransaction}
            onChange={(value) =>
              setDraft((current) => ({ ...current, commercial: { ...current.commercial, revenuePerTransaction: value } }))
            }
          />
          <div className="grid gap-3">
            <p className="text-xs font-bold uppercase text-[var(--pb-dim)]">Product mix</p>
            {Object.entries(draft.commercial.productMix).map(([key, value]) => (
              <NumberField
                key={key}
                label={key.replaceAll("_", " ")}
                value={value}
                onChange={(nextValue) =>
                  setDraft((current) => ({
                    ...current,
                    commercial: {
                      ...current.commercial,
                      productMix: {
                        ...current.commercial.productMix,
                        [key]: nextValue
                      }
                    }
                  }))
                }
              />
            ))}
          </div>
        </section>
        <section className="grid gap-4">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Behavioral</h2>
          <NumberField
            label="Conversion rate"
            value={draft.behavioral.conversionRate}
            onChange={(value) =>
              setDraft((current) => ({ ...current, behavioral: { ...current.behavioral, conversionRate: value } }))
            }
          />
          <NumberField
            label="Repeat purchase rate"
            value={draft.behavioral.repeatPurchaseRate}
            onChange={(value) =>
              setDraft((current) => ({ ...current, behavioral: { ...current.behavioral, repeatPurchaseRate: value } }))
            }
          />
          <h2 className="pt-2 font-[var(--font-display)] text-2xl font-semibold">Operational</h2>
          <NumberField
            label="Transactions per machine"
            step="1"
            value={draft.operational.transactionsPerMachinePerDay}
            onChange={(value) =>
              setDraft((current) => ({
                ...current,
                operational: { ...current.operational, transactionsPerMachinePerDay: value }
              }))
            }
          />
          <NumberField
            label="Max recommended machines"
            step="1"
            value={draft.operational.maxRecommendedMachines}
            onChange={(value) =>
              setDraft((current) => ({ ...current, operational: { ...current.operational, maxRecommendedMachines: value } }))
            }
          />
          <NumberField
            label="Operating-hour baseline"
            step="1"
            value={draft.operational.operatingHourBaseline}
            onChange={(value) =>
              setDraft((current) => ({ ...current, operational: { ...current.operational, operatingHourBaseline: value } }))
            }
          />
        </section>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="grid gap-3">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Venue Multipliers</h2>
          {venueLabels.map(([key, label]) => (
            <NumberField
              key={key}
              label={label}
              value={draft.venueMultipliers[key]}
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  venueMultipliers: { ...current.venueMultipliers, [key]: value }
                }))
              }
            />
          ))}
        </section>
        <section className="grid gap-3">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Geographic Multipliers</h2>
          {geographyLabels.map(([key, label]) => (
            <NumberField
              key={key}
              label={label}
              value={draft.geographyMultipliers[key]}
              onChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  geographyMultipliers: { ...current.geographyMultipliers, [key]: value }
                }))
              }
            />
          ))}
        </section>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]">
        Change note
        <textarea
          className="min-h-24 border border-[var(--pb-line)] bg-black px-3 py-2 text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
          name="changeNote"
          placeholder="Describe why this version is being created"
          required
        />
      </label>
      {state ? (
        <p className={`text-sm font-semibold ${state.ok ? "text-[var(--pb-green)]" : "text-red-200"}`}>{state.message}</p>
      ) : null}
      <button
        className="min-h-11 w-fit border border-[var(--pb-line-strong)] bg-[var(--pb-green)] px-4 text-sm font-extrabold text-black transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:opacity-50"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Saving..." : "Create new version"}
      </button>
    </form>
  );
}
