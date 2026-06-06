"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitOpportunityApplicationAction } from "@/features/opportunities/actions";

type ActionState =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string }
  | null;

const initialState: ActionState = null;

const inputClass =
  "min-h-12 w-full border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition-colors duration-200 focus:border-slate-950 focus:ring-2 focus:ring-[rgba(168,255,63,0.65)]";

const labelClass = "grid gap-2 text-sm font-bold text-slate-700";

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

export function OpportunityApplicationForm({
  opportunityPostId,
  sourcePath = "/business-solutions"
}: {
  opportunityPostId: string;
  sourcePath?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitOpportunityApplicationAction, initialState);
  const fieldErrors = getFieldErrors(state);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form action={formAction} className="mt-5 grid gap-5 border-t border-slate-200 pt-5" ref={formRef}>
      <input name="opportunityPostId" type="hidden" value={opportunityPostId} />
      <input name="sourcePath" type="hidden" value={sourcePath} />
      <HoneypotField />

      <div>
        <p className="font-[var(--font-display)] text-2xl font-semibold leading-none text-slate-950">Respond</p>
      </div>

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
        What can you bring?
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
          className="min-h-11 border border-slate-950 bg-slate-950 px-6 text-sm font-extrabold text-white transition-colors duration-200 hover:bg-[var(--pb-green)] hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Submitting..." : "Respond"}
        </button>
        <p aria-live="polite" className={state?.ok ? "text-sm font-bold text-green-700" : "text-sm font-bold text-red-700"}>
          {state?.message}
        </p>
      </div>
    </form>
  );
}
