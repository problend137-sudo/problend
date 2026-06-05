import type { Metadata } from "next";
import Image from "next/image";
import { PublicLink } from "@/components/public/PublicLink";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
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
      <PublicPageHero
        body="ProBlend places smart protein shake vending machines in high-footfall environments through flexible commercial models and turnkey operations."
        image={problendAssets.heroGymMachine}
        imagePosition="62% center"
        primaryLink={publicCtas.submitOpportunity}
        secondaryLink={publicCtas.contact}
        title="Business Solutions"
      />

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Protein infrastructure for active locations.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--pb-muted)]">
              Partners provide the right space and utilities. ProBlend supports installation, stocking, servicing, and
              updates so wellness access can live naturally inside the venue.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {venueTypes.map((venue) => (
              <p className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-sm text-[var(--pb-muted)]" key={venue}>
                {venue}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr]">
          <figure className="relative min-h-[34rem] overflow-hidden">
            <Image
              alt={problendAssets.machineFront.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={problendAssets.machineFront.src}
              style={{ objectPosition: "center top" }}
            />
          </figure>
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Placement models.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {placementModels.map((model) => (
                <p className="border-b border-[rgba(7,7,7,0.18)] pb-3 text-base text-[var(--pb-graphite)]" key={model}>
                  {model}
                </p>
              ))}
            </div>
            <h3 className="mt-12 font-[var(--font-barlow-condensed)] text-4xl font-semibold">Turnkey support.</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {operatingSupport.map((item) => (
                <p className="border-b border-[rgba(7,7,7,0.18)] pb-3 text-sm text-[var(--pb-graphite)]" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Current collaboration needs.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--pb-muted)]">
              ProBlend is best suited for credible, high-footfall environments and partners who can support a clean,
              accessible nutrition moment.
            </p>
          </div>
          <div className="grid gap-7">
            {currentCollaborationNeeds.map((need) => (
              <article className="border-b border-[rgba(245,239,233,0.16)] pb-7" key={need.title}>
                <h3 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold text-[var(--pb-cream)]">
                  {need.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--pb-muted)]">{need.body}</p>
              </article>
            ))}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <PublicLink href={publicCtas.placementEstimate.href} label={publicCtas.placementEstimate.label} />
              <PublicLink href={publicCtas.submitOpportunity.href} label={publicCtas.submitOpportunity.label} tone="muted" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
