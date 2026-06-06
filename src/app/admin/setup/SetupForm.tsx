"use client";

import Link from "next/link";
import type { Route } from "next";
import { useActionState } from "react";

import { AuthSubmitButton } from "@/app/admin/AuthSubmitButton";
import { setupAdminAction, type AdminAuthActionState } from "@/features/admin-auth/actions";

const initialState: AdminAuthActionState | null = null;

export function SetupForm() {
  const [state, formAction] = useActionState(setupAdminAction, initialState);
  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[var(--pb-cream)]" htmlFor="name">
          Name
        </label>
        <input
          autoComplete="name"
          className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-2 focus:ring-[var(--pb-green)]"
          id="name"
          name="name"
          required
          type="text"
        />
        {fieldErrors?.name ? <p className="text-xs font-semibold text-red-300">{fieldErrors.name[0]}</p> : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[var(--pb-cream)]" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-2 focus:ring-[var(--pb-green)]"
          id="email"
          name="email"
          required
          type="email"
        />
        {fieldErrors?.email ? <p className="text-xs font-semibold text-red-300">{fieldErrors.email[0]}</p> : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[var(--pb-cream)]" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="new-password"
          className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-2 focus:ring-[var(--pb-green)]"
          id="password"
          name="password"
          required
          type="password"
        />
        {fieldErrors?.password ? (
          <p className="text-xs font-semibold text-red-300">{fieldErrors.password[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-[var(--pb-cream)]" htmlFor="setupKey">
          Setup key
        </label>
        <input
          autoComplete="off"
          className="min-h-11 border border-[var(--pb-line)] bg-black px-3 text-sm text-[var(--pb-cream)] outline-none transition-colors duration-200 focus:border-[var(--pb-green)] focus:ring-2 focus:ring-[var(--pb-green)]"
          id="setupKey"
          name="setupKey"
          required
          type="password"
        />
        {fieldErrors?.setupKey ? (
          <p className="text-xs font-semibold text-red-300">{fieldErrors.setupKey[0]}</p>
        ) : null}
      </div>

      {state ? (
        <div
          className={`border px-3 py-2 text-sm font-semibold ${
            state.ok
              ? "border-[var(--pb-line-strong)] text-[var(--pb-green)]"
              : "border-red-400/40 text-red-300"
          }`}
          role="status"
        >
          {state.message}
          {state.ok ? (
            <Link className="ml-2 underline underline-offset-4" href={"/admin" as Route}>
              Open admin
            </Link>
          ) : null}
        </div>
      ) : null}

      <AuthSubmitButton label="Create owner" pendingLabel="Creating owner..." />
    </form>
  );
}
