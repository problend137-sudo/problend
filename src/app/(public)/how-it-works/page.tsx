import type { Metadata } from "next";
import Image from "next/image";
import { PublicLink } from "@/components/public/PublicLink";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
import { howItWorksSteps, preservedCopy, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.howItWorks;

const stepImages = [
  problendAssets.proteinPowder,
  problendAssets.machinePurchase,
  problendAssets.machineInteraction,
  problendAssets.machineCloseup
] as const;

export default function HowItWorksPage() {
  return (
    <main>
      <PublicPageHero
        body={preservedCopy.operationsPromise}
        image={problendAssets.machineInteraction}
        primaryLink={publicCtas.exploreProducts}
        secondaryLink={publicCtas.contact}
        title="How It Works"
      />

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <article className="relative" key={step.title}>
                <div className="relative h-72 overflow-hidden border-y border-[rgba(245,239,233,0.18)]">
                  <Image
                    alt={stepImages[index].alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    src={stepImages[index].src}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.55))]" />
                  <p className="absolute bottom-5 left-5 font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none text-[var(--pb-gold)]">
                    0{index + 1}
                  </p>
                </div>
                <h2 className="mt-6 font-[var(--font-barlow-condensed)] text-4xl font-semibold leading-none">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--pb-muted)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1fr]">
          <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
            Operations handled.
          </h2>
          <div className="grid gap-6 text-lg leading-8 text-[var(--pb-graphite)]">
            <p>
              ProBlend handles stocking, cleaning, maintenance, remote monitoring, and updates so the venue can offer
              nutrition access without operating a full beverage counter.
            </p>
            <p>
              Hygiene, cashless access, and GPRS-enabled machine visibility keep the experience simple for customers and
              reliable for venue teams.
            </p>
            <PublicLink href="/business-solutions" label="Business Solutions" tone="dark" />
          </div>
        </div>
      </section>
    </main>
  );
}
