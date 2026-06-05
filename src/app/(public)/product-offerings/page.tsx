import type { Metadata } from "next";
import Image from "next/image";
import { ProductFlavorCard } from "@/components/public/ProductFlavorCard";
import { PublicLink } from "@/components/public/PublicLink";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
import { productCapabilities, products } from "@/content/products";
import { machineCapabilities, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.productOfferings;

export default function ProductOfferingsPage() {
  return (
    <main>
      <PublicPageHero
        body="Fresh protein shakes, functional blends, smart vending capabilities, and customization designed for active public and workplace environments."
        image={problendAssets.machineCloseup}
        primaryLink={publicCtas.contact}
        secondaryLink={{ href: "/business-solutions", label: "Business Solutions" }}
        title="Product Offerings"
      />

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Four focused flavours. Built for daily use.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--pb-graphite)]">
              ProBlend keeps the product range clear and venue-friendly while supporting protein levels, flavour intensity,
              and functional blends for different active communities.
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden bg-[rgba(7,7,7,0.18)] md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductFlavorCard index={index} key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1fr]">
          <figure className="relative min-h-[34rem] overflow-hidden border-y border-[rgba(245,239,233,0.18)]">
            <Image
              alt={problendAssets.heroGymMachine.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={problendAssets.heroGymMachine.src}
              style={{ objectPosition: "64% center" }}
            />
          </figure>
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Customizable nutrition, prepared on demand.
            </h2>
            <div className="mt-8 grid gap-3">
              {productCapabilities.map((capability) => (
                <p className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-base text-[var(--pb-muted)]" key={capability}>
                  {capability}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-oled)] px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 border-t border-[rgba(245,239,233,0.14)] pt-14 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Machine capabilities.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--pb-muted)]">
              The machine is part of the product experience: payment, monitoring, nutrition information, and reliable
              service are designed into every placement.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {machineCapabilities.map((capability) => (
              <p className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-sm text-[var(--pb-muted)]" key={capability}>
                {capability}
              </p>
            ))}
          </div>
          <div className="lg:col-start-2">
            <PublicLink href={publicCtas.submitOpportunity.href} label={publicCtas.submitOpportunity.label} />
          </div>
        </div>
      </section>
    </main>
  );
}
