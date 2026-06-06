"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitOpportunityApplicationAction } from "@/features/opportunities/actions";

type ActionState =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string }
  | null;

const initialState: ActionState = null;

const inputClass =
  "min-h-12 w-full border-b border-[var(--pb-line)] bg-transparent px-0 text-base text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-0";

const labelClass = "grid gap-2 text-sm font-semibold text-[var(--pb-muted)]";

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

export function OpportunityApplicationForm({ opportunityPostId }: { opportunityPostId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitOpportunityApplicationAction, initialState);
  const fieldErrors = getFieldErrors(state);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-6 grid gap-5 border-t border-[var(--pb-line)] pt-6" ref={formRef}>
      <input name="opportunityPostId" type="hidden" value={opportunityPostId} />
      <HoneypotField />

      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Contact Name
          <input autoComplete="name" className={inputClass} name="contactName" type="text" />
          <FieldError errors={fieldErrors} name="contactName" />
        </label>
        <label className={labelClass}>
          Organization
          <input autoComplete="organization" className={inputClass} name="organizationName" type="text" />
          <FieldError errors={fieldErrors} name="organizationName" />
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
      </div>

      <label className={labelClass}>
        Intent
        <input className={inputClass} name="intent" type="text" />
        <FieldError errors={fieldErrors} name="intent" />
      </label>

      <label className={labelClass}>
        Message
        <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="message" />
        <FieldError errors={fieldErrors} name="message" />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <button
          className="min-h-11 border border-[var(--pb-line-strong)] px-6 text-sm font-bold text-[var(--pb-green)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:bg-[rgba(168,255,63,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Submitting..." : "Apply"}
        </button>
        <p aria-live="polite" className={state?.ok ? "text-sm text-[var(--pb-green)]" : "text-sm text-red-200"}>
          {state?.message}
        </p>
      </div>
    </form>
  );
}
