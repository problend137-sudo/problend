"use client";

import gsap from "gsap";
import { Calculator, CheckCircle2, LoaderCircle, TrendingUp } from "lucide-react";
import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import {
  runPlacementEstimateAction,
  type PlacementEstimateActionResult,
  type PlacementEstimatePublicResult
} from "@/features/forecasting/actions";

type ChoiceOption = {
  value: string;
  label: string;
  body?: string;
};

type FieldErrors = Record<string, string[] | undefined>;

const initialState: PlacementEstimateActionResult | null = null;

const inputClass =
  "min-h-12 w-full border border-[var(--pb-line)] bg-[rgba(245,239,233,0.04)] px-4 text-base text-[var(--pb-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--pb-dim)] focus:border-[var(--pb-green)] focus:ring-2 focus:ring-[rgba(168,255,63,0.28)]";

const labelClass = "grid gap-2 text-sm font-bold text-[var(--pb-muted)]";

const venueOptions: ChoiceOption[] = [
  { value: "gym", label: "Gym" },
  { value: "college", label: "College" },
  { value: "office", label: "Office" },
  { value: "hospital", label: "Hospital" },
  { value: "mall", label: "Mall or retail" },
  { value: "residence", label: "Residence" },
  { value: "other", label: "Other" }
];

const locationOptions: ChoiceOption[] = [
  { value: "metro", label: "Metro" },
  { value: "tier_1", label: "Tier 1" },
  { value: "tier_2", label: "Tier 2" },
  { value: "tier_3", label: "Tier 3" }
];

const placementAreaOptions: ChoiceOption[] = [
  { value: "inside_venue", label: "Inside venue" },
  { value: "reception_wall", label: "Reception wall" },
  { value: "lobby", label: "Lobby" },
  { value: "cafeteria", label: "Cafeteria" },
  { value: "near_exit", label: "Near exit" },
  { value: "other_visible_area", label: "Other visible area" }
];

const accessOptions: ChoiceOption[] = [
  { value: "direct_owner", label: "Direct owner" },
  { value: "decision_maker", label: "Decision maker" },
  { value: "strong_relationship", label: "Strong relationship" },
  { value: "warm_introduction", label: "Warm introduction" },
  { value: "cold_access", label: "Early access" },
  { value: "unknown", label: "Not sure yet" }
];

const infrastructureOptions: ChoiceOption[] = [
  { value: "ready", label: "Ready" },
  { value: "can_arrange", label: "Can arrange" },
  { value: "not_available", label: "Not available" },
  { value: "unknown", label: "Not sure yet" }
];

const commercialOptions: ChoiceOption[] = [
  { value: "revenue_share", label: "Revenue share" },
  { value: "lease_commission", label: "Lease or commission" },
  { value: "purchase", label: "Purchase" },
  { value: "distribution", label: "Distribution" },
  { value: "co_investment", label: "Co-investment" },
  { value: "open_discussion", label: "Open discussion" }
];

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  currency: "INR",
  maximumFractionDigits: 0,
  style: "currency"
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0
});

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FieldError({ errors, name }: { errors?: FieldErrors; name: string }) {
  const message = errors?.[name]?.[0];

  if (!message) {
    return null;
  }

  return (
    <p className="text-sm font-semibold text-red-200" role="alert">
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

function OptionGroup({
  columns = "sm:grid-cols-2",
  errors,
  name,
  onChange,
  options,
  value
}: {
  columns?: string;
  errors?: FieldErrors;
  name: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  value: string;
}) {
  return (
    <div className="grid gap-3">
      <div className={`grid gap-3 ${columns}`}>
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <label
              className={cx(
                "flex min-h-12 cursor-pointer items-start gap-3 border p-3 text-sm font-bold transition-colors duration-200",
                selected
                  ? "border-[var(--pb-green)] bg-[rgba(168,255,63,0.1)] text-[var(--pb-cream)]"
                  : "border-[var(--pb-line)] bg-[rgba(245,239,233,0.03)] text-[var(--pb-muted)] hover:border-[var(--pb-line-strong)]"
              )}
              key={option.value}
            >
              <input
                checked={selected}
                className="mt-0.5 size-5 shrink-0 accent-[var(--pb-green)]"
                name={name}
                onChange={() => onChange(option.value)}
                type="radio"
                value={option.value}
              />
              <span>
                <span className="block leading-5">{option.label}</span>
                {option.body ? <span className="mt-1 block text-sm font-normal leading-5 opacity-80">{option.body}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError errors={errors} name={name} />
    </div>
  );
}

function SelectField({
  children,
  errors,
  label,
  name
}: {
  children: ReactNode;
  errors?: FieldErrors;
  label: string;
  name: string;
}) {
  return (
    <label className={labelClass}>
      {label}
      <select className={`${inputClass} appearance-none`} name={name}>
        {children}
      </select>
      <FieldError errors={errors} name={name} />
    </label>
  );
}

function AnimatedNumber({
  formatter = numberFormatter,
  value
}: {
  formatter?: Intl.NumberFormat;
  value: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const currentValueRef = useRef(value);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      currentValueRef.current = value;
      node.textContent = formatter.format(value);
      return;
    }

    const counter = { value: currentValueRef.current };
    const tween = gsap.to(counter, {
      duration: 0.75,
      ease: "power3.out",
      value,
      onUpdate: () => {
        node.textContent = formatter.format(counter.value);
      },
      onComplete: () => {
        currentValueRef.current = value;
        node.textContent = formatter.format(value);
      }
    });

    return () => {
      tween.kill();
    };
  }, [formatter, value]);

  return <span ref={nodeRef}>{formatter.format(value)}</span>;
}

function getFieldErrors(state: PlacementEstimateActionResult | null) {
  return state && !state.ok ? state.fieldErrors : undefined;
}

export function PlacementEstimateForm() {
  const [state, formAction, isPending] = useActionState(runPlacementEstimateAction, initialState);
  const [venueType, setVenueType] = useState("gym");
  const [locationType, setLocationType] = useState("metro");
  const [infrastructureReadiness, setInfrastructureReadiness] = useState("ready");
  const [commercialIntent, setCommercialIntent] = useState("revenue_share");
  const fieldErrors = getFieldErrors(state);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
      <form action={formAction} className="grid gap-7 border-y border-[var(--pb-line)] py-8" id="placement-estimate-form">
        <input name="sourcePath" type="hidden" value="/placement-estimate" />
        <HoneypotField />

        <section className="grid gap-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center border border-[var(--pb-line-strong)] text-[var(--pb-green)]">
              <Calculator aria-hidden="true" size={20} strokeWidth={2} />
            </span>
            <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)] md:text-5xl">
              Placement inputs
            </h2>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold text-[var(--pb-muted)]">Venue type</p>
            <OptionGroup
              columns="sm:grid-cols-2 xl:grid-cols-3"
              errors={fieldErrors}
              name="venueType"
              onChange={setVenueType}
              options={venueOptions}
              value={venueType}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Daily footfall
              <input className={inputClass} min={0} name="dailyFootfall" placeholder="500" type="number" />
              <FieldError errors={fieldErrors} name="dailyFootfall" />
            </label>
            <label className={labelClass}>
              Operating hours
              <input className={inputClass} max={24} min={1} name="operatingHours" placeholder="14" step="0.5" type="number" />
              <FieldError errors={fieldErrors} name="operatingHours" />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SelectField errors={fieldErrors} label="Placement area" name="placementArea">
              {placementAreaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
            <SelectField errors={fieldErrors} label="Access quality" name="accessQuality">
              {accessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              City
              <input autoComplete="address-level2" className={inputClass} name="city" placeholder="Mumbai" type="text" />
              <FieldError errors={fieldErrors} name="city" />
            </label>
            <label className={labelClass}>
              State
              <input autoComplete="address-level1" className={inputClass} name="state" placeholder="Maharashtra" type="text" />
              <FieldError errors={fieldErrors} name="state" />
            </label>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold text-[var(--pb-muted)]">Location type</p>
            <OptionGroup
              columns="sm:grid-cols-4"
              errors={fieldErrors}
              name="locationType"
              onChange={setLocationType}
              options={locationOptions}
              value={locationType}
            />
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold text-[var(--pb-muted)]">Infrastructure readiness</p>
            <OptionGroup
              columns="sm:grid-cols-2 xl:grid-cols-4"
              errors={fieldErrors}
              name="infrastructureReadiness"
              onChange={setInfrastructureReadiness}
              options={infrastructureOptions}
              value={infrastructureReadiness}
            />
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-bold text-[var(--pb-muted)]">Commercial intent</p>
            <OptionGroup
              columns="sm:grid-cols-2 xl:grid-cols-3"
              errors={fieldErrors}
              name="commercialIntent"
              onChange={setCommercialIntent}
              options={commercialOptions}
              value={commercialIntent}
            />
          </div>
        </section>

        <section className="grid gap-5 border-t border-[var(--pb-line)] pt-7">
          <h3 className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">
            Contact
          </h3>
          <div className="grid gap-5 md:grid-cols-3">
            <label className={labelClass}>
              Name
              <input autoComplete="name" className={inputClass} name="contactName" type="text" />
              <FieldError errors={fieldErrors} name="contactName" />
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
        </section>

        <div className="flex flex-wrap items-center gap-5 border-t border-[var(--pb-line)] pt-7">
          <button
            className="inline-flex min-h-12 items-center gap-2 border border-[var(--pb-line-strong)] px-6 text-sm font-extrabold text-[var(--pb-green)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:bg-[rgba(168,255,63,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            type="submit"
          >
            {isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" size={18} /> : <TrendingUp aria-hidden="true" size={18} />}
            {isPending ? "Estimating..." : "Run Estimate"}
          </button>
          <p aria-live="polite" className={state?.ok ? "text-sm font-bold text-[var(--pb-green)]" : "text-sm font-bold text-red-200"}>
            {state?.message}
          </p>
        </div>
      </form>

      <EstimateResultPanel result={state?.ok ? state.result : null} />
    </div>
  );
}

function EstimateResultPanel({ result }: { result: PlacementEstimatePublicResult | null }) {
  if (!result) {
    return (
      <aside className="border-y border-[var(--pb-line)] py-8 lg:sticky lg:top-24">
        <div className="grid min-h-[28rem] content-center gap-5">
          <span className="inline-flex size-12 items-center justify-center border border-[var(--pb-line-strong)] text-[var(--pb-green)]">
            <TrendingUp aria-hidden="true" size={22} />
          </span>
          <div>
            <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-cream)]">
              Estimate output
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-[var(--pb-muted)]">
              Submit venue details to see public-safe demand, revenue, machine count, score, confidence, and fit reasoning.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="border-y border-[var(--pb-line)] py-8 lg:sticky lg:top-24">
      <div className="grid gap-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center border border-[var(--pb-line-strong)] text-[var(--pb-green)]">
            <CheckCircle2 aria-hidden="true" size={20} />
          </span>
          <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)] md:text-5xl">
            Estimate ready
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Daily demand" suffix="shakes" value={result.demandEstimate.dailyTransactions} />
          <Metric label="Monthly demand" suffix="shakes" value={result.demandEstimate.monthlyTransactions} />
          <Metric formatter={rupeeFormatter} label="Daily revenue" value={result.revenueEstimate.daily} />
          <Metric formatter={rupeeFormatter} label="Monthly revenue" value={result.revenueEstimate.monthly} />
          <Metric label="Machines" value={result.recommendedMachineCount} />
          <Metric label="Score" suffix="/100" value={result.opportunityScore} />
          <Metric label="Confidence" suffix="/100" value={result.confidence} />
        </div>

        <div className="grid gap-3 border-t border-[var(--pb-line)] pt-6">
          <h3 className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">
            Fit reasoning
          </h3>
          <ul className="grid gap-3">
            {result.reasoning.map((line) => (
              <li className="border-b border-[var(--pb-line)] pb-3 text-sm leading-6 text-[var(--pb-muted)]" key={line}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function Metric({
  formatter,
  label,
  suffix,
  value
}: {
  formatter?: Intl.NumberFormat;
  label: string;
  suffix?: string;
  value: number;
}) {
  return (
    <div className="min-h-28 border border-[var(--pb-line)] bg-[rgba(245,239,233,0.03)] p-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--pb-dim)]">{label}</p>
      <p className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]">
        <AnimatedNumber formatter={formatter} value={value} />
        {suffix ? <span className="ml-1 text-2xl text-[var(--pb-muted)]">{suffix}</span> : null}
      </p>
    </div>
  );
}
