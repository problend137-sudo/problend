import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";

import { SetupForm } from "@/app/admin/setup/SetupForm";

export const metadata: Metadata = {
  title: "Admin Setup"
};

export default function AdminSetupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10 md:px-8">
      <section className="w-full max-w-md border-y border-[var(--pb-line)] py-8">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pb-dim)]">ProBlend Admin</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]">
            Create owner
          </h1>
        </div>
        <SetupForm />
        <p className="mt-5 text-sm text-[var(--pb-muted)]">
          Already configured?{" "}
          <Link className="font-semibold text-[var(--pb-cream)] underline underline-offset-4" href={"/admin/login" as Route}>
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
