import type { Metadata } from "next";
import Image from "next/image";
import { PublicLink } from "@/components/public/PublicLink";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
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
    <main>
      <PublicPageHero
        body="Share the context for a venue, distribution, or strategic introduction so ProBlend can understand the right partnership conversation."
        image={problendAssets.machineFront}
        imagePosition="center top"
        primaryLink={publicCtas.contact}
        title="Submit Opportunity"
      />

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Details to include.
            </h2>
            <div className="mt-8 grid gap-3">
              {opportunityDetails.map((item) => (
                <p className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-base text-[var(--pb-muted)]" key={item}>
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <PublicLink href={publicCtas.contact.href} label={publicCtas.contact.label} />
            </div>
          </div>

          <div className="grid gap-8">
            <figure className="relative min-h-[24rem] overflow-hidden border-y border-[rgba(245,239,233,0.18)]">
              <Image
                alt={problendAssets.heroGymMachine.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                src={problendAssets.heroGymMachine.src}
                style={{ objectPosition: "64% center" }}
              />
            </figure>
            <div className="grid gap-6">
              {currentCollaborationNeeds.map((need) => (
                <article className="border-b border-[rgba(245,239,233,0.16)] pb-6" key={need.title}>
                  <h3 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">{need.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--pb-muted)]">{need.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
