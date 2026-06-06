import type { Metadata } from "next";
import Image from "next/image";
import { GsapReveal } from "@/components/public/GsapReveal";
import { PublicLink } from "@/components/public/PublicLink";
import { problendAssets } from "@/content/assets";
import { howItWorksContent, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.howItWorks;

const stepImages = [
  problendAssets.generatedMachineInteractionPayment,
  problendAssets.generatedMachineUpiGym,
  problendAssets.generatedShakeDispensing,
  problendAssets.generatedOperationsRestocking
] as const;

export default function HowItWorksPage() {
  return (
    <main>
      <GsapReveal>
        <section className="bg-[var(--pb-black)] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <h1 className="pb-text-balance font-[var(--font-display)] text-6xl font-bold leading-[0.86] md:text-8xl" data-reveal>
                {howItWorksContent.title}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[var(--pb-muted)]" data-reveal>
                {howItWorksContent.subhead}
              </p>
              <div className="mt-8" data-reveal>
                <PublicLink href={publicCtas.exploreFeatures.href} label={howItWorksContent.cta} />
              </div>
            </div>
            <figure className="pb-media-shadow relative min-h-[24rem] overflow-hidden border border-[var(--pb-line)] md:min-h-[28rem]" data-image-reveal>
              <Image
                alt={problendAssets.generatedMachineInteractionPayment.alt}
                className="object-cover"
                fill
                loading="eager"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={problendAssets.generatedMachineInteractionPayment.src}
                style={{ objectPosition: "42% center" }}
                data-parallax
              />
              <div aria-hidden className="absolute right-[4%] top-[20%] h-[34%] w-[48%] bg-black/42 backdrop-blur-[6px]" />
              <div aria-hidden className="absolute left-[44%] top-[71%] h-[16%] w-[23%] bg-black/50 backdrop-blur-[4px]" />
            </figure>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-black px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-green)]" data-reveal>
              {howItWorksContent.intro}
            </h2>
            <div className="mt-12 grid gap-12">
              {howItWorksContent.steps.map((step, index) => (
                <article className="grid gap-7 border-t border-[var(--pb-line)] pt-8 lg:grid-cols-[0.86fr_1.14fr]" data-reveal key={step.number}>
                  <figure className="pb-media-shadow relative min-h-[24rem] overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
                    <Image
                      alt={stepImages[index].alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 44vw, 100vw"
                      src={stepImages[index].src}
                      style={{ objectPosition: index === 1 ? "55% center" : "center" }}
                      data-parallax
                    />
                    {index === 0 ? (
                      <>
                        <div aria-hidden className="absolute right-[4%] top-[20%] h-[34%] w-[48%] bg-black/42 backdrop-blur-[6px]" />
                        <div aria-hidden className="absolute left-[44%] top-[71%] h-[16%] w-[23%] bg-black/50 backdrop-blur-[4px]" />
                      </>
                    ) : null}
                    {index === 1 ? (
                      <div aria-hidden className="absolute left-[38%] top-[20%] h-[45%] w-[19%] bg-black/35 backdrop-blur-[2px]" />
                    ) : null}
                    {index === 2 ? (
                      <div aria-hidden className="absolute left-[50%] top-[17%] h-[28%] w-[18%] bg-black/35 backdrop-blur-[2px]" />
                    ) : null}
                  </figure>
                  <div className="self-center">
                    <p className="font-[var(--font-display)] text-4xl font-bold leading-none text-[var(--pb-green)]">
                      {step.number}
                    </p>
                    <h3 className="mt-4 font-[var(--font-display)] text-5xl font-semibold leading-none md:text-6xl">
                      {step.title}
                    </h3>
                    <ul className="mt-6 grid gap-3 text-base leading-8 text-[var(--pb-muted)]">
                      {step.body.map((line) => (
                        <li className="border-b border-[var(--pb-line)] pb-3" key={line}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-none md:text-7xl">
                {howItWorksContent.maintenanceTitle}
              </h2>
              <p className="mt-4 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-green-dark)]">
                {howItWorksContent.maintenanceSubhead}
              </p>
            </div>
            <figure className="pb-media-shadow relative min-h-[30rem] overflow-hidden" data-image-reveal>
              <Image
                alt={problendAssets.generatedOperationsRestocking.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                src={problendAssets.generatedOperationsRestocking.src}
                data-parallax
              />
            </figure>
          </div>
        </section>
      </GsapReveal>
    </main>
  );
}
