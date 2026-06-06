"use client";

import { useActionState, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { submitOpportunityAction } from "@/features/opportunities/actions";

type ActionState =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string }
  | null;

type OpportunityKind = "venue" | "city_network" | "introduction" | "open_brief";
type LegacyMode = "partner" | "venue";

type ChoiceOption = {
  value: string;
  label: string;
  body?: string;
};

const initialState: ActionState = null;

const opportunityKinds: Array<ChoiceOption & { value: OpportunityKind }> = [
  {
    value: "venue",
    label: "A venue",
    body: "A gym, campus, office, residence, hospital, retail site, or other place ProBlend should review."
  },
  {
    value: "city_network",
    label: "A city or network",
    body: "A market, distributor network, operator group, or community where ProBlend should expand."
  },
  {
    value: "introduction",
    label: "An introduction",
    body: "A decision-maker, institution, company, or venue contact you can introduce to ProBlend."
  },
  {
    value: "open_brief",
    label: "An open ProBlend brief to answer",
    body: "A specific request from ProBlend that matches your access or capabilities."
  }
];

const venueLocationOptions: ChoiceOption[] = [
  { value: "gym", label: "Gym" },
  { value: "office_campus", label: "Office or campus" },
  { value: "college_university", label: "College or university" },
  { value: "hospital", label: "Hospital" },
  { value: "mall_retail", label: "Mall or retail" },
  { value: "residential_community", label: "Residential community" }
];

const networkLocationOptions: ChoiceOption[] = [
  { value: "distributor_network", label: "Distributor network" },
  { value: "gym", label: "Gym network" },
  { value: "office_campus", label: "Office or campus network" },
  { value: "college_university", label: "College or university access" },
  { value: "mall_retail", label: "Retail access" }
];

const relationshipOptions: ChoiceOption[] = [
  { value: "direct_owner", label: "Direct owner" },
  { value: "decision_maker", label: "Decision maker" },
  { value: "strong_relationship", label: "Strong relationship" },
  { value: "warm_introduction", label: "Warm introduction" },
  { value: "unknown", label: "Not sure yet" }
];

const readinessOptions: ChoiceOption[] = [
  { value: "ready", label: "Ready" },
  { value: "can_arrange", label: "Can arrange" },
  { value: "not_available", label: "Not available" },
  { value: "unknown", label: "Not sure yet" }
];

const commercialOptions: ChoiceOption[] = [
  { value: "revenue_share", label: "Revenue share" },
  { value: "lease_commission", label: "Lease or commission" },
  { value: "distribution", label: "Distribution" },
  { value: "open_discussion", label: "Open discussion" }
];

const inputClass =
  "min-h-12 w-full border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-[rgba(168,255,63,0.65)]";

const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FieldError({ errors, name }: { errors?: Record<string, string[]>; name: string }) {
  const message = errors?.[name]?.[0];

  if (!message) {
    return null;
  }

  return (
    <p className="text-sm font-semibold text-red-700" role="alert">
      {message}
    </p>
  );
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

function getInitialKind(mode?: LegacyMode, initialKind?: OpportunityKind): OpportunityKind {
  if (initialKind) {
    return initialKind;
  }

  if (mode === "partner") {
    return "city_network";
  }

  return "venue";
}

function getDefaults(kind: OpportunityKind) {
  if (kind === "city_network") {
    return {
      identityType: "distributor",
      locationTypes: ["distributor_network"],
      relationshipStrength: "unknown",
      authorityLevel: "unknown",
      electricityReadiness: "unknown",
      internetReadiness: "unknown",
      commercialIntent: "distribution"
    };
  }

  if (kind === "introduction") {
    return {
      identityType: "strategic_introducer",
      locationTypes: ["strategic_introduction"],
      relationshipStrength: "warm_introduction",
      authorityLevel: "introducer",
      electricityReadiness: "unknown",
      internetReadiness: "unknown",
      commercialIntent: "open_discussion"
    };
  }

  return {
    identityType: "venue_owner",
    locationTypes: ["gym"],
    relationshipStrength: "direct_owner",
    authorityLevel: "final_decision",
    electricityReadiness: "ready",
    internetReadiness: "can_arrange",
    commercialIntent: "revenue_share"
  };
}

function OptionButton({
  checked,
  children,
  name,
  onSelect,
  value
}: {
  checked: boolean;
  children: ReactNode;
  name: string;
  onSelect: () => void;
  value: string;
}) {
  return (
    <label
      className={cx(
        "flex min-h-14 cursor-pointer items-start gap-3 border p-4 text-left transition-colors duration-200",
        checked
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-950"
      )}
    >
      <input checked={checked} className="mt-1 size-5 shrink-0 accent-[var(--pb-green)]" name={name} onChange={onSelect} type="radio" value={value} />
      <span>{children}</span>
    </label>
  );
}

function RadioGroup({
  columns = "sm:grid-cols-2",
  name,
  onChange,
  options,
  value
}: {
  columns?: string;
  name: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  value: string;
}) {
  return (
    <div className={`grid gap-3 ${columns}`}>
      {options.map((option) => (
        <OptionButton checked={value === option.value} key={option.value} name={name} onSelect={() => onChange(option.value)} value={option.value}>
          <span className="block text-sm font-bold leading-5">{option.label}</span>
          {option.body ? <span className="mt-1 block text-sm leading-5 opacity-80">{option.body}</span> : null}
        </OptionButton>
      ))}
    </div>
  );
}

function CheckboxGroup({
  name,
  onChange,
  options,
  values
}: {
  name: string;
  onChange: (values: string[]) => void;
  options: ChoiceOption[];
  values: string[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const selected = values.includes(option.value);

        return (
          <label
            className={cx(
              "flex min-h-12 cursor-pointer items-center gap-3 border p-3 text-sm font-bold transition-colors duration-200",
              selected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-950"
            )}
            key={option.value}
          >
            <input
              checked={selected}
              className="size-5 shrink-0 accent-[var(--pb-green)]"
              name={name}
              onChange={() => {
                if (selected) {
                  onChange(values.filter((item) => item !== option.value));
                  return;
                }

                onChange([...values, option.value]);
              }}
              type="checkbox"
              value={option.value}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}

export function OpportunityForm({
  initialKind,
  mode,
  sourcePath = "/business-solutions"
}: {
  initialKind?: OpportunityKind;
  mode?: LegacyMode;
  sourcePath?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitOpportunityAction, initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [kind, setKind] = useState<OpportunityKind>(() => getInitialKind(mode, initialKind));
  const defaults = useMemo(() => getDefaults(kind), [kind]);
  const [locationTypes, setLocationTypes] = useState<string[]>(defaults.locationTypes);
  const [relationshipStrength, setRelationshipStrength] = useState(defaults.relationshipStrength);
  const [electricityReadiness, setElectricityReadiness] = useState(defaults.electricityReadiness);
  const [internetReadiness, setInternetReadiness] = useState(defaults.internetReadiness);
  const [commercialIntent, setCommercialIntent] = useState(defaults.commercialIntent);
  const fieldErrors = getFieldErrors(state);
  const submitKind = kind === "open_brief" ? "introduction" : kind;
  const steps = kind === "open_brief" ? ["Type", "Board"] : ["Type", "Details", "Contact"];
  const progress = `${Math.round(((stepIndex + 1) / steps.length) * 100)}%`;

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  function selectKind(nextKind: OpportunityKind) {
    const nextDefaults = getDefaults(nextKind);
    setKind(nextKind);
    setLocationTypes(nextDefaults.locationTypes);
    setRelationshipStrength(nextDefaults.relationshipStrength);
    setElectricityReadiness(nextDefaults.electricityReadiness);
    setInternetReadiness(nextDefaults.internetReadiness);
    setCommercialIntent(nextDefaults.commercialIntent);
    setStepIndex(0);
  }

  function goToStep(nextIndex: number) {
    setStepIndex(Math.min(Math.max(nextIndex, 0), steps.length - 1));
    formRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <form
      action={formAction}
      className="grid scroll-mt-28 gap-6 border border-slate-300 bg-slate-50 p-4 text-slate-950 sm:p-6"
      id="opportunity-intake"
      ref={formRef}
    >
      <input name="sourcePath" type="hidden" value={sourcePath} />
      <input name="opportunityKind" type="hidden" value={submitKind} />
      <input name="identityType" type="hidden" value={defaults.identityType} />
      <input name="relationshipStrength" type="hidden" value={relationshipStrength} />
      <input name="authorityLevel" type="hidden" value={defaults.authorityLevel} />
      <input name="electricityReadiness" type="hidden" value={electricityReadiness} />
      <input name="internetReadiness" type="hidden" value={internetReadiness} />
      <input name="commercialIntent" type="hidden" value={commercialIntent} />
      {kind === "introduction" ? <input name="locationTypes" type="hidden" value="strategic_introduction" /> : null}
      {kind === "open_brief" ? <input name="locationTypes" type="hidden" value="strategic_introduction" /> : null}
      <HoneypotField />

      <div className="grid gap-3">
        <div className="flex items-center justify-between gap-4 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
          <span>
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span>{steps[stepIndex]}</span>
        </div>
        <div className="h-1 bg-slate-200">
          <div className="h-full bg-[var(--pb-green)] transition-[width] duration-300" style={{ width: progress }} />
        </div>
      </div>

      {stepIndex === 0 ? (
        <section aria-labelledby="opportunity-kind-title" className="grid gap-5">
          <div>
            <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-slate-950" id="opportunity-kind-title">
              What do you have?
            </h2>
          </div>
          <div className="grid gap-3">
            {opportunityKinds.map((option) => (
              <OptionButton checked={kind === option.value} key={option.value} name="kindPicker" onSelect={() => selectKind(option.value)} value={option.value}>
                <span className="block text-base font-extrabold leading-6">{option.label}</span>
                <span className="mt-1 block text-sm leading-6 opacity-80">{option.body}</span>
              </OptionButton>
            ))}
          </div>
        </section>
      ) : null}

      {stepIndex === 1 && kind === "open_brief" ? (
        <section aria-labelledby="open-brief-title" className="grid gap-4 border border-slate-300 bg-white p-4">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold leading-none text-slate-950" id="open-brief-title">
            See open opportunities
          </h2>
          <p className="text-base leading-7 text-slate-600">
            Open briefs are listed below this form. Choose a brief there and respond with your contact details.
          </p>
          <a
            className="inline-flex min-h-11 w-fit items-center border border-slate-950 px-5 text-sm font-extrabold text-slate-950 transition-colors duration-200 hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            href="#open-opportunities"
          >
            See open opportunities
          </a>
        </section>
      ) : null}

      {stepIndex === 1 && kind !== "open_brief" ? (
        <section aria-labelledby="opportunity-details-title" className="grid gap-5">
          <div>
            <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-slate-950" id="opportunity-details-title">
              {kind === "venue" ? "Tell us about the place." : kind === "city_network" ? "Tell us about the reach." : "Tell us about the introduction."}
            </h2>
          </div>

          {kind === "venue" ? (
            <>
              <div className="grid gap-3">
                <p className="text-sm font-bold text-slate-700">Venue type</p>
                <CheckboxGroup name="locationTypes" onChange={setLocationTypes} options={venueLocationOptions} values={locationTypes} />
                <FieldError errors={fieldErrors} name="locationTypes" />
              </div>
              <LocationFields fieldErrors={fieldErrors} requireState />
              <label className={labelClass}>
                Who do you know there?
                <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="accessMethod" />
                <FieldError errors={fieldErrors} name="accessMethod" />
              </label>
              <RadioField label="Relationship" name="relationshipStrengthPicker" onChange={setRelationshipStrength} options={relationshipOptions} value={relationshipStrength} />
              <VenueScaleFields fieldErrors={fieldErrors} />
              <div className="grid gap-5 md:grid-cols-2">
                <RadioField label="Electricity" name="electricityReadinessPicker" onChange={setElectricityReadiness} options={readinessOptions} value={electricityReadiness} />
                <RadioField label="Internet" name="internetReadinessPicker" onChange={setInternetReadiness} options={readinessOptions} value={internetReadiness} />
              </div>
              <RadioField
                columns="sm:grid-cols-4"
                label="Preferred model"
                name="commercialIntentPicker"
                onChange={setCommercialIntent}
                options={commercialOptions}
                value={commercialIntent}
              />
            </>
          ) : null}

          {kind === "city_network" ? (
            <>
              <div className="grid gap-3">
                <p className="text-sm font-bold text-slate-700">Network type</p>
                <CheckboxGroup name="locationTypes" onChange={setLocationTypes} options={networkLocationOptions} values={locationTypes} />
                <FieldError errors={fieldErrors} name="locationTypes" />
              </div>
              <LocationFields fieldErrors={fieldErrors} />
              <label className={labelClass}>
                How can you help open access?
                <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="accessMethod" />
                <FieldError errors={fieldErrors} name="accessMethod" />
              </label>
              <label className={labelClass}>
                Approximate reach
                <textarea className={`${inputClass} min-h-24 resize-y py-3`} name="reachDescription" />
                <FieldError errors={fieldErrors} name="reachDescription" />
              </label>
              <label className="flex min-h-12 items-center gap-3 border border-slate-300 bg-white p-4 text-sm font-bold text-slate-700">
                <input className="size-5 accent-[var(--pb-green)]" name="hasMultiCityAccess" type="checkbox" value="on" />
                Multi-city access
              </label>
            </>
          ) : null}

          {kind === "introduction" ? (
            <>
              <LocationFields fieldErrors={fieldErrors} />
              <label className={labelClass}>
                Who can you introduce?
                <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="accessMethod" />
                <FieldError errors={fieldErrors} name="accessMethod" />
              </label>
              <RadioField label="Relationship" name="relationshipStrengthPicker" onChange={setRelationshipStrength} options={relationshipOptions} value={relationshipStrength} />
            </>
          ) : null}
        </section>
      ) : null}

      {stepIndex === 2 && kind !== "open_brief" ? (
        <section aria-labelledby="opportunity-contact-title" className="grid gap-5">
          <div>
            <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-slate-950" id="opportunity-contact-title">
              How should we reach you?
            </h2>
          </div>
          <ContactFields fieldErrors={fieldErrors} />
          <label className={labelClass}>
            Notes
            <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="notes" />
            <FieldError errors={fieldErrors} name="notes" />
          </label>
        </section>
      ) : null}

      <div className="grid gap-4 border-t border-slate-300 pt-5 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex flex-wrap gap-3">
          <button
            className="min-h-11 border border-slate-300 px-5 text-sm font-extrabold text-slate-700 transition-colors duration-200 hover:border-slate-950 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPending || stepIndex === 0}
            onClick={() => goToStep(stepIndex - 1)}
            type="button"
          >
            Back
          </button>
          {stepIndex < steps.length - 1 ? (
            <button
              className="min-h-11 border border-slate-950 bg-slate-950 px-6 text-sm font-extrabold text-white transition-colors duration-200 hover:bg-[var(--pb-green)] hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              onClick={() => goToStep(stepIndex + 1)}
              type="button"
            >
              Next
            </button>
          ) : kind === "open_brief" ? null : (
            <button
              className="min-h-11 border border-slate-950 bg-slate-950 px-6 text-sm font-extrabold text-white transition-colors duration-200 hover:bg-[var(--pb-green)] hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
        <p aria-live="polite" className={state?.ok ? "text-sm font-bold text-green-700" : "text-sm font-bold text-red-700"}>
          {state?.message}
        </p>
      </div>
    </form>
  );
}

function LocationFields({
  fieldErrors,
  requireState = false
}: {
  fieldErrors?: Record<string, string[]>;
  requireState?: boolean;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className={labelClass}>
        City
        <input autoComplete="address-level2" className={inputClass} name="city" type="text" />
        <FieldError errors={fieldErrors} name="city" />
      </label>
      <label className={labelClass}>
        State{requireState ? "" : " or region"}
        <input autoComplete="address-level1" className={inputClass} name="state" type="text" />
        <FieldError errors={fieldErrors} name="state" />
      </label>
      <label className={`${labelClass} md:col-span-2`}>
        Area or region
        <input autoComplete="address-line2" className={inputClass} name="region" type="text" />
        <FieldError errors={fieldErrors} name="region" />
      </label>
    </div>
  );
}

function RadioField({
  columns,
  label,
  name,
  onChange,
  options,
  value
}: {
  columns?: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  value: string;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <RadioGroup columns={columns} name={name} onChange={onChange} options={options} value={value} />
    </div>
  );
}

function VenueScaleFields({ fieldErrors }: { fieldErrors?: Record<string, string[]> }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <label className={labelClass}>
        Venues
        <input className={inputClass} min={0} name="venueCount" type="number" />
        <FieldError errors={fieldErrors} name="venueCount" />
      </label>
      <label className={labelClass}>
        Daily footfall
        <input className={inputClass} min={0} name="approximateDailyFootfall" type="number" />
        <FieldError errors={fieldErrors} name="approximateDailyFootfall" />
      </label>
      <label className={labelClass}>
        Machines
        <input className={inputClass} min={0} name="expectedMachineCount" type="number" />
        <FieldError errors={fieldErrors} name="expectedMachineCount" />
      </label>
      <label className={`${labelClass} md:col-span-3`}>
        Space or site notes
        <textarea className={`${inputClass} min-h-24 resize-y py-3`} name="availableSpace" />
        <FieldError errors={fieldErrors} name="availableSpace" />
      </label>
    </div>
  );
}

function ContactFields({ fieldErrors }: { fieldErrors?: Record<string, string[]> }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <label className={labelClass}>
        Name
        <input autoComplete="name" className={inputClass} name="contactName" type="text" />
        <FieldError errors={fieldErrors} name="contactName" />
      </label>
      <label className={labelClass}>
        Role
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
      <label className={`${labelClass} md:col-span-2`}>
        Organization
        <input autoComplete="organization" className={inputClass} name="organizationName" type="text" />
        <FieldError errors={fieldErrors} name="organizationName" />
      </label>
    </div>
  );
}
