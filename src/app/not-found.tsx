import type { Route } from "next";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--pb-black)] px-6 py-20 text-[var(--pb-cream)]">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--pb-muted)]">Page not found</p>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl font-semibold">
          This page is not on the ProBlend route.
        </h1>
        <Link className="mt-8 inline-block underline underline-offset-4" href={"/" as Route}>
          Return home
        </Link>
      </div>
    </main>
  );
}
