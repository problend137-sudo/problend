import type { Metadata } from "next";
import { PlacementEstimateForm } from "@/components/public/PlacementEstimateForm";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
import { routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.placementEstimate;

export default function PlacementEstimatePage() {
  return (
    <main>
      <PublicPageHero
        body="Estimate demand, revenue range, machine count, score, and confidence for a gym, campus, office, residence, or other high-footfall location."
        image={problendAssets.heroGymMachine}
        imagePosition="64% center"
        primaryLink={{ href: "#placement-estimate-form", label: "Start estimate" }}
        title="Run Placement Estimate"
      />

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 border-y border-[var(--pb-line)] py-8 lg:grid-cols-[0.72fr_1.28fr]">
            <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-cream)] md:text-7xl">
              Live placement calculator.
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[var(--pb-muted)] md:text-lg">
              Share the venue basics ProBlend needs for an early placement read. The estimate is directional and helps frame the next conversation with the ProBlend team.
            </p>
          </div>
          <PlacementEstimateForm />
        </div>
      </section>
    </main>
  );
}
