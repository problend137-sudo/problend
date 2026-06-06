import type { Metadata } from "next";
import Image from "next/image";
import { GsapReveal } from "@/components/public/GsapReveal";
import { ProductExplorer } from "@/components/public/ProductExplorer";
import { problendAssets } from "@/content/assets";
import { productOfferingCategories } from "@/content/products";
import { productOfferingsContent, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.productOfferings;

export default function ProductOfferingsPage() {
  return (
    <main>
      <GsapReveal>
        <section className="bg-[var(--pb-black)] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.86fr_1fr]">
            <div>
              <h1 className="pb-text-balance font-[var(--font-display)] text-6xl font-bold leading-[0.86] md:text-8xl" data-reveal>
                {productOfferingsContent.title}
              </h1>
              <h2 className="mt-8 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-green)]" data-reveal>
                {productOfferingsContent.heading}
              </h2>
            </div>
            <figure className="pb-media-shadow relative min-h-[30rem] overflow-hidden border border-[var(--pb-line)] md:min-h-[36rem]" data-image-reveal>
              <Image
                alt={problendAssets.generatedMachineProductPortrait.alt}
                className="object-cover"
                fill
                loading="eager"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={problendAssets.generatedMachineProductPortrait.src}
                style={{ objectPosition: "center top" }}
              />
              <div aria-hidden className="absolute left-[20%] top-[20%] h-[66%] w-[51%] border border-[rgba(168,255,63,0.1)] bg-black/50 backdrop-blur-[6px]" />
            </figure>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <ProductExplorer />
      </GsapReveal>

      <GsapReveal>
        <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <figure className="pb-media-shadow relative min-h-[26rem] overflow-hidden lg:min-h-[36rem]" data-image-reveal>
                <Image
                  alt={problendAssets.generatedShakeDispensing.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  src={problendAssets.generatedShakeDispensing.src}
                  style={{ objectPosition: "42% center" }}
                  data-parallax
                />
                <div aria-hidden className="absolute left-[42%] top-[17%] h-[28%] w-[23%] bg-black/42 backdrop-blur-[5px]" />
              </figure>
            </div>

            <div className="grid gap-10">
              {productOfferingCategories.map((category) => (
                <article className="border-t border-[rgba(4,5,4,0.18)] pt-8" data-reveal key={category.number}>
                  <div className="grid gap-5 md:grid-cols-[5rem_1fr]">
                    <p className="font-[var(--font-display)] text-5xl font-bold leading-none text-[var(--pb-green-dark)]">
                      {category.number}
                    </p>
                    <div>
                      <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none md:text-5xl">
                        {category.title}
                      </h2>
                      {"intro" in category ? <p className="mt-5 text-base leading-7 text-[var(--pb-graphite)]">{category.intro}</p> : null}
                      <ul className="mt-5 grid gap-3 text-sm leading-7 text-[var(--pb-graphite)]">
                        {category.items.map((item) => (
                          <li className="border-b border-[rgba(4,5,4,0.12)] pb-3" key={item}>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {"outro" in category ? <p className="mt-5 text-base leading-7 text-[var(--pb-graphite)]">{category.outro}</p> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-black px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
            <figure className="pb-media-shadow relative min-h-[28rem] overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
              <Image
                alt={problendAssets.generatedMachineInteractionPayment.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                src={problendAssets.generatedMachineInteractionPayment.src}
                data-parallax
              />
              <div aria-hidden className="absolute right-[4%] top-[20%] h-[34%] w-[48%] bg-black/42 backdrop-blur-[6px]" />
              <div aria-hidden className="absolute left-[44%] top-[71%] h-[16%] w-[23%] bg-black/50 backdrop-blur-[4px]" />
            </figure>
            <h2 className="pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-[0.95] text-[var(--pb-cream)] md:text-7xl" data-reveal>
              {productOfferingsContent.conclusion}
            </h2>
          </div>
        </section>
      </GsapReveal>
    </main>
  );
}
