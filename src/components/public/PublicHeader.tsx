import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publicCtas, publicNavigation } from "@/content/site";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--pb-border)] bg-[rgba(7,7,7,0.92)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link className="group flex items-center gap-3" href={"/" as Route}>
          <span className="grid size-9 place-items-center border border-[var(--pb-blush)] bg-[var(--pb-cream)] font-[var(--font-barlow-condensed)] text-xl font-bold text-[var(--pb-black)]">
            PB
          </span>
          <span className="leading-none">
            <span className="block font-[var(--font-barlow-condensed)] text-2xl font-semibold text-[var(--pb-cream)]">
              ProBlend
            </span>
            <span className="block text-xs font-medium text-[var(--pb-muted)]">Nutrition on demand</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
          {publicNavigation.map((item) => (
            <Link
              className="text-sm font-medium text-[var(--pb-muted)] underline-offset-4 transition hover:text-[var(--pb-cream)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--pb-blush)]"
              href={item.href as Route}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--pb-cream)] underline underline-offset-4 transition hover:text-[var(--pb-blush)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-blush)]"
          href={publicCtas.submitOpportunity.href as Route}
        >
          {publicCtas.submitOpportunity.label}
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
      </div>
      <nav
        aria-label="Mobile primary navigation"
        className="flex gap-4 overflow-x-auto border-t border-[var(--pb-border)] px-5 py-3 text-sm text-[var(--pb-muted)] lg:hidden"
      >
        {publicNavigation.map((item) => (
          <Link
            className="shrink-0 underline-offset-4 hover:text-[var(--pb-cream)] hover:underline"
            href={item.href as Route}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
