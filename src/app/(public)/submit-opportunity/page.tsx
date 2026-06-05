import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { currentCollaborationNeeds, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.submitOpportunity;

const opportunityDetails = [
  "Your role and organization",
  "City, state, and venue access",
  "Location type and expected footfall",
  "Infrastructure readiness",
  "Commercial interest: revenue share, lease, commission, purchase, distribution, or open discussion"
] as const;

export default function SubmitOpportunityPage() {
  return (
    <main className="px-5 py-16 md:px-8 md:py-24">
      <section className="mx-auto max-w-5xl">
        <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none md:text-8xl">
          Submit Opportunity
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">
          Share a venue, distribution, or strategic introduction opportunity as an external opportunity source. ProBlend
          will qualify the relationship before any partner terms are discussed.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-6">
          <h2 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Details to include</h2>
          <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--pb-muted)]">
            {opportunityDetails.map((item) => (
              <li className="border-t border-[var(--pb-border)] pt-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <Link
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-[var(--pb-blush)]"
            href={publicCtas.contact.href as Route}
          >
            {publicCtas.contact.label}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div>
          <h2 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Current collaboration needs</h2>
          <div className="mt-6 grid gap-5">
            {currentCollaborationNeeds.map((need) => (
              <article className="border-t border-[var(--pb-border)] pt-5" key={need.title}>
                <h3 className="font-semibold">{need.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--pb-muted)]">{need.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
