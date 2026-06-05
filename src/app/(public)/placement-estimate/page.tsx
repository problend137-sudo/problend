import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.placementEstimate;

const estimateInputs = [
  "Venue type and city",
  "Approximate daily footfall",
  "Operating hours",
  "Available space and electricity readiness",
  "Preferred commercial model"
] as const;

export default function PlacementEstimatePage() {
  return (
    <main className="px-5 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-5xl">
        <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none md:text-8xl">
          Run Placement Estimate
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">
          Prepare the basic venue information ProBlend needs to evaluate machine placement fit for gyms, offices,
          campuses, residences, and other high-footfall locations.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {estimateInputs.map((item) => (
            <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5" key={item}>
              {item}
            </div>
          ))}
        </div>
        <Link
          className="mt-9 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-[var(--pb-blush)]"
          href={publicCtas.contact.href as Route}
        >
          {publicCtas.contact.label}
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>
    </main>
  );
}
