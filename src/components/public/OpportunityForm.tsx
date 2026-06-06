"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitOpportunityAction } from "@/features/opportunities/actions";

type ActionState =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string }
  | null;

const initialState: ActionState = null;

const inputClass =
  "min-h-12 w-full border-b border-[var(--pb-line)] bg-transparent px-0 text-base text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-0";

const selectClass =
  "min-h-12 w-full border-b border-[var(--pb-line)] bg-[var(--pb-oled)] px-0 text-base text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-0";

const labelClass = "grid gap-2 text-sm font-semibold text-[var(--pb-muted)]";

const sectionNames = ["Identity", "Contact", "Geography", "Venue Access", "Scale", "Readiness", "Commercial"] as const;

const identityOptions = [
  ["individual", "Individual"],
  ["institution", "Institution"],
  ["company", "Company"],
  ["operator", "Operator"],
  ["distributor", "Distributor"],
  ["venue_owner", "Venue owner"],
  ["strategic_introducer", "Strategic introducer"]
] as const;

const relationshipOptions = [
  ["direct_owner", "Direct owner"],
  ["decision_maker", "Decision maker"],
  ["strong_relationship", "Strong relationship"],
  ["warm_introduction", "Warm introduction"],
  ["cold_access", "Cold access"]
] as const;

const authorityOptions = [
  ["final_decision", "Final decision"],
  ["influencer", "Influencer"],
  ["introducer", "Introducer"],
  ["unknown", "Unknown"]
] as const;

const readinessOptions = [
  ["ready", "Ready"],
  ["can_arrange", "Can arrange"],
  ["not_available", "Not available"],
  ["unknown", "Unknown"]
] as const;

const commercialOptions = [
  ["revenue_share", "Revenue Share"],
  ["purchase", "Purchase"],
  ["lease_commission", "Lease or Commission"],
  ["distribution", "Distribution"],
  ["co_investment", "Co-investment"],
  ["open_discussion", "Open Discussion"]
] as const;

const locationTypeOptions = [
  ["gym", "Gym"],
  ["office_campus", "Office or campus"],
  ["college_university", "College or university"],
  ["hospital", "Hospital"],
  ["mall_retail", "Mall or retail"],
  ["residential_community", "Residential community"],
  ["distributor_network", "Distributor network"],
  ["strategic_introduction", "Strategic introduction"]
] as const;

function FieldError({ errors, name }: { errors?: Record<string, string[]>; name: string }) {
  const message = errors?.[name]?.[0];

  if (!message) {
    return null;
  }

  return <p className="text-sm font-normal text-red-200">{message}</p>;
}

function HoneypotField() {
  return (
    <div aria-hidden="true" className="hidden">
      <label>
        Leave this field empty
        <input autoComplete="off" name="honeypot" tabIndex={-1} />
      </label>
    </div>
  );
}

function getFieldErrors(state: ActionState) {
  return state && !state.ok ? state.fieldErrors : undefined;
}

function Fieldset({ children, number, title }: { children: ReactNode; number: string; title: string }) {
  return (
    <fieldset className="grid gap-6 border-t border-[var(--pb-line)] pt-7">
      <legend className="mb-5 font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">
        <span className="mr-3 text-[var(--pb-green)]">{number}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export function OpportunityForm({ sourcePath = "/submit-opportunity" }: { sourcePath?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitOpportunityAction, initialState);
  const fieldErrors = getFieldErrors(state);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="grid gap-9 border-y border-[var(--pb-line)] py-8"
      id="opportunity-intake"
      ref={formRef}
    >
      <input name="sourcePath" type="hidden" value={sourcePath} />
      <HoneypotField />

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Opportunity intake sections">
        {sectionNames.map((name, index) => (
          <p className="border-b border-[var(--pb-line)] pb-2 text-xs font-semibold uppercase text-[var(--pb-dim)]" key={name}>
            {String(index + 1).padStart(2, "0")} {name}
          </p>
        ))}
      </div>

      <Fieldset number="01" title="Identity">
        <label className={labelClass}>
          Opportunity Source
          <select className={selectClass} defaultValue="venue_owner" name="identityType">
            {identityOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <FieldError errors={fieldErrors} name="identityType" />
        </label>
      </Fieldset>

      <Fieldset number="02" title="Contact">
        <div className="grid gap-6 md:grid-cols-2">
          <label className={labelClass}>
            Contact Name
            <input autoComplete="name" className={inputClass} name="contactName" type="text" />
            <FieldError errors={fieldErrors} name="contactName" />
          </label>
          <label className={labelClass}>
            Designation
            <input autoComplete="organization-title" className={inputClass} name="designation" type="text" />
            <FieldError errors={fieldErrors} name="designation" />
          </label>
          <label className={labelClass}>
            Email
            <input autoComplete="email" className={inputClass} name="email" type="email" />
            <FieldError errors={fieldErrors} name="email" />
          </label>
          <label className={labelClass}>
            Phone
            <input autoComplete="tel" className={inputClass} name="phone" type="tel" />
            <FieldError errors={fieldErrors} name="phone" />
          </label>
        </div>
        <label className={labelClass}>
          Company or Institution
          <input autoComplete="organization" className={inputClass} name="organizationName" type="text" />
          <FieldError errors={fieldErrors} name="organizationName" />
        </label>
      </Fieldset>

      <Fieldset number="03" title="Geography">
        <div className="grid gap-6 md:grid-cols-3">
          <label className={labelClass}>
            City
            <input autoComplete="address-level2" className={inputClass} name="city" type="text" />
            <FieldError errors={fieldErrors} name="city" />
          </label>
          <label className={labelClass}>
            State
            <input autoComplete="address-level1" className={inputClass} name="state" type="text" />
            <FieldError errors={fieldErrors} name="state" />
          </label>
          <label className={labelClass}>
            Region
            <input autoComplete="address-line2" className={inputClass} name="region" type="text" />
            <FieldError errors={fieldErrors} name="region" />
          </label>
        </div>
        <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-[var(--pb-muted)]">
          <input className="size-5 accent-[var(--pb-green)]" name="hasMultiCityAccess" type="checkbox" value="on" />
          Multi-city access
        </label>
      </Fieldset>

      <Fieldset number="04" title="Venue Access">
        <div className="grid gap-3 md:grid-cols-2">
          {locationTypeOptions.map(([value, label]) => (
            <label className="flex min-h-11 items-center gap-3 border-b border-[var(--pb-line)] py-2 text-sm font-semibold text-[var(--pb-muted)]" key={value}>
              <input className="size-5 accent-[var(--pb-green)]" name="locationTypes" type="checkbox" value={value} />
              {label}
            </label>
          ))}
        </div>
        <FieldError errors={fieldErrors} name="locationTypes" />
        <label className={labelClass}>
          Access Method
          <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="accessMethod" />
          <FieldError errors={fieldErrors} name="accessMethod" />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label className={labelClass}>
            Relationship Strength
            <select className={selectClass} defaultValue="direct_owner" name="relationshipStrength">
              {relationshipOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError errors={fieldErrors} name="relationshipStrength" />
          </label>
          <label className={labelClass}>
            Authority Level
            <select className={selectClass} defaultValue="final_decision" name="authorityLevel">
              {authorityOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError errors={fieldErrors} name="authorityLevel" />
          </label>
        </div>
      </Fieldset>

      <Fieldset number="05" title="Scale">
        <div className="grid gap-6 md:grid-cols-3">
          <label className={labelClass}>
            Number of Venues
            <input className={inputClass} min={0} name="venueCount" type="number" />
            <FieldError errors={fieldErrors} name="venueCount" />
          </label>
          <label className={labelClass}>
            Approximate Daily Footfall
            <input className={inputClass} min={0} name="approximateDailyFootfall" type="number" />
            <FieldError errors={fieldErrors} name="approximateDailyFootfall" />
          </label>
          <label className={labelClass}>
            Expected Machine Count
            <input className={inputClass} min={0} name="expectedMachineCount" type="number" />
            <FieldError errors={fieldErrors} name="expectedMachineCount" />
          </label>
        </div>
        <label className={labelClass}>
          Reach
          <textarea className={`${inputClass} min-h-24 resize-y py-3`} name="reachDescription" />
          <FieldError errors={fieldErrors} name="reachDescription" />
        </label>
      </Fieldset>

      <Fieldset number="06" title="Infrastructure Readiness">
        <label className={labelClass}>
          Available Space
          <input autoComplete="address-line1" className={inputClass} name="availableSpace" type="text" />
          <FieldError errors={fieldErrors} name="availableSpace" />
        </label>
        <div className="grid gap-6 md:grid-cols-2">
          <label className={labelClass}>
            Electricity Readiness
            <select className={selectClass} defaultValue="ready" name="electricityReadiness">
              {readinessOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError errors={fieldErrors} name="electricityReadiness" />
          </label>
          <label className={labelClass}>
            Internet Readiness
            <select className={selectClass} defaultValue="can_arrange" name="internetReadiness">
              {readinessOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <FieldError errors={fieldErrors} name="internetReadiness" />
          </label>
        </div>
        <label className={labelClass}>
          Site Access Constraints
          <textarea className={`${inputClass} min-h-24 resize-y py-3`} name="siteAccessConstraints" />
          <FieldError errors={fieldErrors} name="siteAccessConstraints" />
        </label>
      </Fieldset>

      <Fieldset number="07" title="Commercial Intent">
        <label className={labelClass}>
          Commercial Interest
          <select className={selectClass} defaultValue="revenue_share" name="commercialIntent">
            {commercialOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <FieldError errors={fieldErrors} name="commercialIntent" />
        </label>
        <label className={labelClass}>
          Notes
          <textarea className={`${inputClass} min-h-32 resize-y py-3`} name="notes" />
          <FieldError errors={fieldErrors} name="notes" />
        </label>
      </Fieldset>

      <div className="flex flex-wrap items-center gap-5 border-t border-[var(--pb-line)] pt-7">
        <button
          className="min-h-11 border border-[var(--pb-line-strong)] px-6 text-sm font-bold text-[var(--pb-green)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:bg-[rgba(168,255,63,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Submitting..." : "Submit Opportunity"}
        </button>
        <p aria-live="polite" className={state?.ok ? "text-sm text-[var(--pb-green)]" : "text-sm text-red-200"}>
          {state?.message}
        </p>
      </div>
    </form>
  );
}
