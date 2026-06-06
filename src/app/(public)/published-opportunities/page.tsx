import type { Metadata } from "next";
import { OpportunityPostList } from "@/components/public/OpportunityPostList";
import { platformAcquisitionContent, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.publishedOpportunities;
export const dynamic = "force-dynamic";

export default function PublishedOpportunitiesPage() {
  return (
    <main className="bg-[var(--pb-black)]">
      <section className="border-b border-[var(--pb-line)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="pb-text-balance max-w-4xl font-[var(--font-display)] text-6xl font-bold leading-[0.9] text-[var(--pb-cream)] md:text-8xl">
            {platformAcquisitionContent.board.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--pb-muted)] md:text-xl">
            {platformAcquisitionContent.board.body}
          </p>
        </div>
      </section>

      <OpportunityPostList sourcePath="/published-opportunities" />
    </main>
  );
}
