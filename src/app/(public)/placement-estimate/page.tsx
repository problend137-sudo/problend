import type { Metadata } from "next";
import Image from "next/image";
import { PublicLink } from "@/components/public/PublicLink";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
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
    <main>
      <PublicPageHero
        body="Prepare the basic venue information ProBlend needs to discuss machine placement fit for gyms, offices, campuses, residences, and other high-footfall locations."
        image={problendAssets.heroGymMachine}
        imagePosition="64% center"
        primaryLink={publicCtas.contact}
        title="Run Placement Estimate"
      />

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr]">
          <figure className="relative min-h-[28rem] overflow-hidden border-y border-[rgba(245,239,233,0.18)]">
            <Image
              alt={problendAssets.machineCloseup.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={problendAssets.machineCloseup.src}
            />
          </figure>
          <div>
            <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Details to prepare.
            </h2>
            <div className="mt-8 grid gap-3">
              {estimateInputs.map((item) => (
                <p className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-base text-[var(--pb-muted)]" key={item}>
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <PublicLink href={publicCtas.contact.href} label={publicCtas.contact.label} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
