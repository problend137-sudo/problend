import type { Metadata } from "next";
import Image from "next/image";
import { WaitlistForm } from "@/components/public/ContactForm";
import { GsapReveal } from "@/components/public/GsapReveal";
import { OpportunityPostList } from "@/components/public/OpportunityPostList";
import { PublicLink } from "@/components/public/PublicLink";
import { problendAssets } from "@/content/assets";
import { businessSolutionsContent, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.businessSolutions;
export const dynamic = "force-dynamic";

const sectionImages = [
  problendAssets.generatedVenuePlacementProof,
  problendAssets.generatedShakeDispensing,
  problendAssets.generatedMachineUpiGym,
  problendAssets.generatedHeroGymMachineWide,
  problendAssets.generatedOperationsRestocking
] as const;

const platformPathways = [
  {
    title: "Bring ProBlend to a venue",
    body: "Share a gym, office, campus, residence, hospital, mall, or other high-footfall location.",
    link: publicCtas.submitOpportunity
  },
  {
    title: "Partner as an operator, distributor, or introducer",
    body: "Express partnership intent for operations, distribution, venue access, or strategic introductions.",
    link: publicCtas.submitOpportunity
  },
  {
    title: "Join Waitlist",
    body: "Record city or venue interest where ProBlend should evaluate future availability.",
    link: { href: "#business-waitlist", label: "Join Waitlist" }
  },
  {
    title: "Placement Estimate",
    body: "Prepare the venue information needed for a future-facing placement conversation.",
    link: publicCtas.placementEstimate
  }
] as const;

export default function BusinessSolutionsPage() {
  return (
    <main>
      <GsapReveal>
        <section className="relative isolate min-h-[32rem] overflow-hidden bg-black px-5 py-12 md:px-8 md:py-16">
          <Image
            alt={problendAssets.generatedVenuePlacementProof.alt}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="100vw"
            src={problendAssets.generatedVenuePlacementProof.src}
            style={{ objectPosition: "70% center" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_46%,rgba(0,0,0,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.92)_70%,rgba(0,0,0,1))]" />
          <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl items-center">
            <h1 className="pb-text-balance max-w-3xl font-[var(--font-display)] text-6xl font-bold leading-[0.86] md:text-8xl" data-reveal>
              {businessSolutionsContent.title}
            </h1>
          </div>
        </section>
      </GsapReveal>

      <section className="bg-[var(--pb-oled)] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 border-y border-[var(--pb-line)] py-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <h2 className="pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Ways to Work With ProBlend
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--pb-muted)]">
              High-intent venue, partnership, waitlist, and estimate paths now sit at the public front door.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {platformPathways.map((pathway) => (
              <article className="border-b border-[var(--pb-line)] pb-6" key={pathway.title}>
                <h3 className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">
                  {pathway.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--pb-muted)]">{pathway.body}</p>
                <div className="mt-4">
                  <PublicLink href={pathway.link.href} label={pathway.link.label} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <OpportunityPostList />

      <section className="bg-[var(--pb-black)] px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-14">
          {businessSolutionsContent.sections.map((section, index) => (
            <GsapReveal key={section.title}>
              <article className="grid gap-8 border-t border-[var(--pb-line)] pt-10 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <p className="font-[var(--font-display)] text-4xl font-bold leading-none text-[var(--pb-green)]" data-reveal>
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-[0.92] md:text-6xl" data-reveal>
                    {section.title}
                  </h2>
                  <figure className="pb-media-shadow relative mt-8 min-h-64 overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
                    <Image
                      alt={sectionImages[index].alt}
                      className="object-cover"
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      src={sectionImages[index].src}
                      style={{ objectPosition: index === 0 ? "68% center" : "center" }}
                      data-parallax
                    />
                  </figure>
                </div>
                <div className="grid content-start gap-7">
                  {section.items.map((item) => (
                    <div className="border-b border-[var(--pb-line)] pb-6" data-reveal key={item.label}>
                      <h3 className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">
                        {item.label}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-[var(--pb-muted)]">{item.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            </GsapReveal>
          ))}
        </div>
      </section>

      <div id="business-waitlist">
        <WaitlistForm
          body="Share the city, venue, or local access interest ProBlend should keep in view."
          sourcePath="/business-solutions"
        />
      </div>
    </main>
  );
}
