import type { Metadata } from "next";
import Image from "next/image";
import { OpportunityForm } from "@/components/public/OpportunityForm";
import { OpportunityPostList } from "@/components/public/OpportunityPostList";
import { problendAssets } from "@/content/assets";
import { platformAcquisitionContent, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.businessSolutions;
export const dynamic = "force-dynamic";

const proofImages = [
  problendAssets.generatedVenuePlacementProof,
  problendAssets.generatedMachineInteractionPayment,
  problendAssets.generatedOperationsRestocking
] as const;

export default function BusinessSolutionsPage() {
  return (
    <main className="bg-[var(--pb-black)]">
      <section className="relative isolate overflow-hidden border-b border-[var(--pb-line)] px-5 py-14 md:px-8 md:py-20">
        <Image
          alt={problendAssets.generatedHeroGymMachineWide.alt}
          className="object-cover"
          fill
          loading="eager"
          priority
          sizes="100vw"
          src={problendAssets.generatedHeroGymMachineWide.src}
          style={{ objectPosition: "68% center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.82)_48%,rgba(0,0,0,0.46)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(4,5,4,0.96))]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-start lg:grid-cols-[0.86fr_1.14fr] lg:gap-10">
          <div className="pt-4 lg:pt-10">
            <h1 className="pb-text-balance max-w-4xl font-[var(--font-display)] text-5xl font-bold leading-[0.92] text-[var(--pb-cream)] md:text-5xl lg:text-7xl xl:text-8xl">
              {platformAcquisitionContent.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--pb-muted)] md:text-xl">
              {platformAcquisitionContent.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-11 items-center border border-[var(--pb-green)] bg-[var(--pb-green)] px-5 text-sm font-extrabold text-[#040504] transition-colors duration-200 hover:bg-transparent hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                href="#opportunity-intake"
              >
                {platformAcquisitionContent.actions.primary}
              </a>
              <a
                className="inline-flex min-h-11 items-center border border-[var(--pb-line)] px-5 text-sm font-extrabold text-[var(--pb-cream)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                href="#open-opportunities"
              >
                {platformAcquisitionContent.actions.secondary}
              </a>
            </div>
          </div>

          <div className="bg-slate-50 p-3 text-slate-950 md:p-4">
            <OpportunityForm sourcePath="/business-solutions" />
          </div>
        </div>
      </section>

      <OpportunityPostList sourcePath="/business-solutions" />

      <section className="bg-[var(--pb-black)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <h2 className="pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-[0.94] text-[var(--pb-cream)] md:text-7xl">
              {platformAcquisitionContent.credibility.statement}
            </h2>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {proofImages.map((image) => (
                <figure className="relative min-h-48 overflow-hidden border border-[var(--pb-line)]" key={image.src}>
                  <Image alt={image.alt} className="object-cover" fill sizes="(min-width: 768px) 28vw, 100vw" src={image.src} />
                </figure>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {platformAcquisitionContent.credibility.points.map((point) => (
                <p className="border-t border-[var(--pb-line)] pt-3 text-base leading-7 text-[var(--pb-muted)]" key={point}>
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
