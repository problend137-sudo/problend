import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  currentCollaborationNeeds,
  placementModels,
  publicCtas,
  routeMetadata,
  venueTypes
} from "@/content/site";

export const metadata: Metadata = routeMetadata.businessSolutions;

const operatingSupport = [
  "Turnkey installation",
  "Stocking and restocking",
  "Preventive maintenance",
  "Machine updates",
  "Co-branding",
  "Sampling and seasonal promotions",
  "Real-time inventory visibility",
  "Sales and consumer preference analytics"
] as const;

export default function BusinessSolutionsPage() {
  return (
    <main>
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none md:text-8xl">
            Business Solutions
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">
            ProBlend places smart protein shake vending machines in high-footfall environments through flexible commercial
            models and turnkey operations.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              Placement models.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--pb-muted)]">
              Partners provide space and utilities. ProBlend can support installation, maintenance, stocking, and updates
              according to the selected commercial structure.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {placementModels.map((model) => (
              <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5" key={model}>
                <p className="font-semibold">{model}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              Built for active locations.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {venueTypes.map((venue) => (
                <span className="border border-[rgba(7,7,7,0.16)] px-3 py-2 text-sm" key={venue}>
                  {venue}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              Turnkey support.
            </h2>
            <ul className="mt-8 grid gap-3 text-base text-[var(--pb-graphite)] sm:grid-cols-2">
              {operatingSupport.map((item) => (
                <li className="border-t border-[rgba(7,7,7,0.16)] pt-3" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              Current collaboration needs.
            </h2>
            <div className="mt-8 grid gap-5">
              {currentCollaborationNeeds.map((need) => (
                <article className="border-t border-[var(--pb-border)] pt-5" key={need.title}>
                  <h3 className="font-semibold text-[var(--pb-cream)]">{need.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--pb-muted)]">{need.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-6">
            <h3 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Start the placement conversation.</h3>
            <p className="mt-4 text-base leading-7 text-[var(--pb-muted)]">
              Share venue access, city, expected footfall, infrastructure readiness, and preferred commercial model so
              ProBlend can evaluate the next step.
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <Link
                className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-[var(--pb-blush)]"
                href={publicCtas.placementEstimate.href as Route}
              >
                {publicCtas.placementEstimate.label}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center font-semibold text-[var(--pb-muted)] underline underline-offset-4 hover:text-[var(--pb-cream)]"
                href={publicCtas.submitOpportunity.href as Route}
              >
                {publicCtas.submitOpportunity.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
