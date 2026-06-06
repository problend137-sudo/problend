import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin"
};

export default function AdminHomePage() {
  return (
    <main className="px-5 py-10 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="border-y border-[var(--pb-line)] py-8">
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)] md:text-5xl">
            Admin operations
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--pb-muted)]">
            Secure admin access is active. Operations views, calculator submissions, exports, and forecast controls are scheduled for the next task.
          </p>
        </section>
      </div>
    </main>
  );
}
