import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCapabilities, products } from "@/content/products";
import { machineCapabilities, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.productOfferings;

export default function ProductOfferingsPage() {
  return (
    <main>
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none md:text-8xl">
            Product Offerings
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">
            Fresh protein shakes, functional blends, smart vending capabilities, and customization designed for active
            public and workplace environments.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5" key={product.slug}>
              <h2 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">{product.name}</h2>
              <p className="mt-4 text-sm leading-6 text-[var(--pb-muted)]">{product.description}</p>
              <dl className="mt-6 grid gap-3 border-t border-[var(--pb-border)] pt-5 text-sm">
                <div>
                  <dt className="text-[var(--pb-muted)]">Protein</dt>
                  <dd className="font-semibold">{product.nutrition.protein}</dd>
                </div>
                <div>
                  <dt className="text-[var(--pb-muted)]">Sugar</dt>
                  <dd className="font-semibold">{product.nutrition.sugar}</dd>
                </div>
                <div>
                  <dt className="text-[var(--pb-muted)]">Format</dt>
                  <dd className="font-semibold">{product.nutrition.format}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span className="border border-[var(--pb-border)] px-2 py-1 text-xs text-[var(--pb-muted)]" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              Customization and wellness add-ons.
            </h2>
            <ul className="mt-8 grid gap-3 text-base text-[var(--pb-graphite)]">
              {productCapabilities.map((capability) => (
                <li className="border-t border-[rgba(7,7,7,0.16)] pt-3" key={capability}>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
              Machine capabilities.
            </h2>
            <ul className="mt-8 grid gap-3 text-base text-[var(--pb-graphite)]">
              {machineCapabilities.map((capability) => (
                <li className="border-t border-[rgba(7,7,7,0.16)] pt-3" key={capability}>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-y border-[var(--pb-border)] py-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-lg leading-8 text-[var(--pb-muted)]">
            Explore placement models for gyms, campuses, offices, residences, and other high-footfall environments.
          </p>
          <Link
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-[var(--pb-blush)]"
            href={publicCtas.submitOpportunity.href as Route}
          >
            {publicCtas.submitOpportunity.label}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
