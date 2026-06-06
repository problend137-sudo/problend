"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactAction } from "@/features/contacts/actions";
import { submitWaitlistAction } from "@/features/waitlists/actions";
import { contactPageContent } from "@/content/site";

type ActionState =
  | { ok: true; id: string; message: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; message: string }
  | null;

const initialState: ActionState = null;

const inputClass =
  "min-h-12 w-full border-b border-[var(--pb-line)] bg-transparent px-0 text-base text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-0";

const selectClass =
  "min-h-12 w-full border-b border-[var(--pb-line)] bg-[var(--pb-black)] px-0 text-base text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-0";

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

export function ContactForm({ sourcePath = "/contact" }: { sourcePath?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);
  const fieldErrors = getFieldErrors(state);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form action={formAction} className="grid gap-6 border-y border-[var(--pb-line)] py-8" data-reveal ref={formRef}>
      <input name="sourcePath" type="hidden" value={sourcePath} />
      <HoneypotField />

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          {contactPageContent.form.fields[0]}
          <input autoComplete="given-name" className={inputClass} name="firstName" type="text" />
          <FieldError errors={fieldErrors} name="firstName" />
        </label>
        <label className={labelClass}>
          {contactPageContent.form.fields[1]}
          <input autoComplete="family-name" className={inputClass} name="lastName" type="text" />
          <FieldError errors={fieldErrors} name="lastName" />
        </label>
      </div>

      <label className={labelClass}>
        {contactPageContent.form.fields[2]}
        <input autoComplete="email" className={inputClass} name="email" type="email" />
        <FieldError errors={fieldErrors} name="email" />
      </label>

      <label className={labelClass}>
        {contactPageContent.form.fields[3]}
        <textarea className={`${inputClass} min-h-40 resize-y py-3`} name="message" />
        <FieldError errors={fieldErrors} name="message" />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <button
          className="min-h-11 border border-[var(--pb-line-strong)] px-6 text-sm font-bold text-[var(--pb-green)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:bg-[rgba(168,255,63,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Sending..." : contactPageContent.form.submit}
        </button>
        <p aria-live="polite" className={state?.ok ? "text-sm text-[var(--pb-green)]" : "text-sm text-red-200"}>
          {state?.message}
        </p>
      </div>
    </form>
  );
}

export function WaitlistForm({
  sourcePath = "/contact",
  title = "Join Waitlist",
  body = "Tell ProBlend which city or venue should be considered next."
}: {
  sourcePath?: string;
  title?: string;
  body?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitWaitlistAction, initialState);
  const fieldErrors = getFieldErrors(state);

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="bg-[var(--pb-oled)] px-5 py-14 md:px-8 md:py-18">
      <div className="mx-auto grid max-w-7xl gap-8 border-y border-[var(--pb-line)] py-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)] md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--pb-muted)]">{body}</p>
        </div>

        <form action={formAction} className="grid gap-5" ref={formRef}>
          <input name="sourcePath" type="hidden" value={sourcePath} />
          <HoneypotField />

          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Name
              <input autoComplete="name" className={inputClass} name="name" type="text" />
              <FieldError errors={fieldErrors} name="name" />
            </label>
            <label className={labelClass}>
              Email
              <input autoComplete="email" className={inputClass} name="email" type="email" />
              <FieldError errors={fieldErrors} name="email" />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
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
            Interest Type
            <select className={selectClass} defaultValue="venue" name="interestType">
              <option value="customer">Customer</option>
              <option value="venue">Venue</option>
              <option value="operator">Operator</option>
              <option value="distributor">Distributor</option>
              <option value="other">Other</option>
            </select>
            <FieldError errors={fieldErrors} name="interestType" />
          </label>

          <label className={labelClass}>
            Notes
            <textarea className={`${inputClass} min-h-28 resize-y py-3`} name="notes" />
            <FieldError errors={fieldErrors} name="notes" />
          </label>

          <div className="flex flex-wrap items-center gap-5">
            <button
              className="min-h-11 border border-[var(--pb-line-strong)] px-6 text-sm font-bold text-[var(--pb-green)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:bg-[rgba(168,255,63,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Recording..." : "Join Waitlist"}
            </button>
            <p aria-live="polite" className={state?.ok ? "text-sm text-[var(--pb-green)]" : "text-sm text-red-200"}>
              {state?.message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
