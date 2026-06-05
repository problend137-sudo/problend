import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { products } from "@/content/products";
import {
  currentCollaborationNeeds,
  machineCapabilities,
  preservedCopy,
  publicCtas,
  routeMetadata,
  venueTypes
} from "@/content/site";

export const metadata: Metadata = routeMetadata.home;

const featureIcons = [ShieldCheck, CreditCard, MapPin, Sparkles] as const;

export default function HomePage() {
  return (
    <main>
      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.86fr]">
          <div>
            <h1 className="max-w-4xl font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none text-[var(--pb-cream)] md:text-7xl">
              {preservedCopy.heroHeadline}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--pb-muted)]">{preservedCopy.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--pb-cream)] underline underline-offset-4 hover:text-[var(--pb-blush)]"
                href={publicCtas.exploreProducts.href as Route}
              >
                {publicCtas.exploreProducts.label}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center font-semibold text-[var(--pb-muted)] underline underline-offset-4 hover:text-[var(--pb-cream)]"
                href={publicCtas.howItWorks.href as Route}
              >
                {publicCtas.howItWorks.label}
              </Link>
            </div>
          </div>

          <figure
            aria-label="ProBlend smart vending machine and shake flavour visual"
            className="relative min-h-[24rem] overflow-hidden border border-[var(--pb-border)] bg-[var(--pb-charcoal)] p-4"
          >
            <div className="absolute inset-x-8 top-8 h-1 bg-[var(--pb-blush)]" />
            <div className="mx-auto flex max-w-sm flex-col border border-[rgba(245,239,233,0.22)] bg-[var(--pb-black)] p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[var(--pb-border)] pb-3">
                <span className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">ProBlend</span>
                <span className="text-xs text-[var(--pb-muted)]">24/7</span>
              </div>
              <div className="my-4 grid gap-2">
                {products.map((product, index) => (
                  <div className="grid grid-cols-[2.5rem_1fr] items-center gap-3 border border-[var(--pb-border)] p-2" key={product.slug}>
                    <span
                      className="block size-10 border border-[rgba(245,239,233,0.22)]"
                      style={{ background: ["#5a301d", "#efe0c4", "#f3a93e", "#5b1f24"][index] }}
                    />
                    <span>
                      <span className="block text-sm font-semibold text-[var(--pb-cream)]">{product.name}</span>
                      <span className="block text-xs text-[var(--pb-muted)]">{product.nutrition.format}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.06)] p-3">
                <p className="text-sm font-semibold text-[var(--pb-blush)]">{preservedCopy.premiumLine}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--pb-muted)]">Hygienic. Cashless. Freshly prepared.</p>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className="border-y border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              {preservedCopy.positioning}
            </p>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--pb-muted)]">{preservedCopy.positioningBody}</p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-4">
            {machineCapabilities.slice(0, 4).map((capability, index) => {
              const Icon = featureIcons[index];
              return (
                <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5" key={capability}>
                  <Icon aria-hidden="true" className="text-[var(--pb-blush)]" size={24} />
                  <p className="mt-5 font-semibold">{capability}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none md:text-6xl">
              Flavours for active spaces.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--pb-graphite)]">
              Four focused ProBlend offerings keep the range clear while supporting customization, functional blends, and
              venue-specific promotions.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <article className="border border-[rgba(7,7,7,0.16)] bg-white p-5" key={product.slug}>
                <h3 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--pb-graphite)]">{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none md:text-6xl">
              Built for venues where wellness is part of the day.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {venueTypes.map((venue) => (
                <span className="border border-[var(--pb-border)] px-3 py-2 text-sm text-[var(--pb-muted)]" key={venue}>
                  {venue}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-6">
            <h3 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">Current collaboration needs</h3>
            <div className="mt-5 grid gap-5">
              {currentCollaborationNeeds.map((need) => (
                <div key={need.title}>
                  <p className="font-semibold text-[var(--pb-cream)]">{need.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--pb-muted)]">{need.body}</p>
                </div>
              ))}
            </div>
            <Link
              className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-[var(--pb-blush)]"
              href={publicCtas.submitOpportunity.href as Route}
            >
              {publicCtas.submitOpportunity.label}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
