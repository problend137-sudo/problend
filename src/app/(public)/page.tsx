import type { Metadata } from "next";
import Image from "next/image";
import { ProductFlavorCard } from "@/components/public/ProductFlavorCard";
import { PublicLink } from "@/components/public/PublicLink";
import { featureMoments, problendAssets } from "@/content/assets";
import { products } from "@/content/products";
import {
  currentCollaborationNeeds,
  preservedCopy,
  publicCtas,
  routeMetadata,
  venueTypes
} from "@/content/site";

export const metadata: Metadata = routeMetadata.home;

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate min-h-[clamp(560px,calc(100svh-7rem),760px)] overflow-hidden bg-[var(--pb-oled)]">
        <Image
          alt={problendAssets.heroGymMachine.alt}
          className="object-cover"
          fill
          loading="eager"
          priority
          sizes="100vw"
          src={problendAssets.heroGymMachine.src}
          style={{ objectPosition: "58% center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.68)_34%,rgba(0,0,0,0.22)_68%,rgba(0,0,0,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.98))]" />

        <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl items-center px-5 py-14 md:px-8">
          <div className="max-w-4xl">
            <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-[0.9] text-[var(--pb-cream)] md:text-8xl lg:text-[6rem] xl:text-[6.5rem]">
              {preservedCopy.heroHeadline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[rgba(245,239,233,0.82)] md:text-lg">
              {preservedCopy.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <PublicLink href={publicCtas.howItWorks.href} label="How it Works" />
              <PublicLink href={publicCtas.exploreProducts.href} label={publicCtas.exploreProducts.label} tone="muted" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-oled)] px-5 py-16 text-center md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] text-[var(--pb-cream)] md:text-7xl">
            {preservedCopy.positioning}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[var(--pb-muted)] md:text-lg">
            {preservedCopy.positioningBody}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-12 md:grid-cols-3">
          {featureMoments.map((moment) => (
            <article className="mx-auto max-w-sm text-center" key={moment.title}>
              <div className="relative mx-auto size-32 overflow-hidden rounded-full border border-[rgba(245,239,233,0.18)] md:size-36">
                <Image alt={moment.image.alt} className="object-cover" fill sizes="9rem" src={moment.image.src} />
              </div>
              <h3 className="mt-7 font-[var(--font-barlow-condensed)] text-3xl font-semibold text-[var(--pb-cream)]">
                {moment.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--pb-muted)]">{moment.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative min-h-[38rem] overflow-hidden md:min-h-[48rem]">
        <Image
          alt={problendAssets.machineCloseup.alt}
          className="object-cover"
          fill
          sizes="100vw"
          src={problendAssets.machineCloseup.src}
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82),rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.5))]" />
        <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl items-end px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-xl">
            <p className="font-[var(--font-barlow-condensed)] text-3xl font-semibold text-[var(--pb-gold)]">Our Story</p>
            <h2 className="mt-3 font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none md:text-7xl">
              {preservedCopy.premiumLine}
            </h2>
            <p className="mt-5 text-base leading-8 text-[rgba(245,239,233,0.84)]">
              {preservedCopy.companyStory} {preservedCopy.wellnessMission}
            </p>
          </div>
        </div>
      </section>

      <section className="grid bg-[var(--pb-oled)] lg:grid-cols-[0.75fr_1fr_0.75fr_1fr]">
        <div className="flex min-h-72 items-center justify-center px-8 py-12 text-center">
          <p className="max-w-xs font-[var(--font-barlow-condensed)] text-4xl font-semibold italic leading-tight text-[var(--pb-lavender)]">
            &quot;Here&apos;s a closer look at our protein vending machine&quot;
          </p>
        </div>
        <figure className="relative min-h-[28rem] overflow-hidden">
          <Image
            alt={problendAssets.machineFront.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            src={problendAssets.machineFront.src}
          />
        </figure>
        <div className="flex min-h-72 items-center justify-center px-8 py-12 text-center">
          <p className="max-w-xs font-[var(--font-barlow-condensed)] text-4xl font-semibold italic leading-tight text-[var(--pb-lavender)]">
            &quot;Behind the scenes: Where innovation meets wellness&quot;
          </p>
        </div>
        <figure className="relative min-h-[28rem] overflow-hidden">
          <Image
            alt={problendAssets.behindScenes.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            src={problendAssets.behindScenes.src}
          />
        </figure>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-2xl font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
                Flavours for active spaces.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--pb-graphite)]">
                Four focused ProBlend offerings keep the range clear while supporting customization, functional blends, and
                venue-specific promotions.
              </p>
            </div>
            <PublicLink href={publicCtas.exploreProducts.href} label={publicCtas.exploreProducts.label} tone="dark" />
          </div>

          <div className="mt-10 grid gap-px overflow-hidden bg-[rgba(7,7,7,0.18)] sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductFlavorCard compact index={index} key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Built for venues where wellness is part of the day.
            </h2>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {venueTypes.map((venue) => (
                <span className="border-b border-[rgba(245,239,233,0.22)] pb-1 text-sm text-[var(--pb-muted)]" key={venue}>
                  {venue}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-7 border-l border-[rgba(245,239,233,0.14)] pl-6 md:pl-10">
            {currentCollaborationNeeds.map((need) => (
              <article key={need.title}>
                <h3 className="font-[var(--font-barlow-condensed)] text-3xl font-semibold text-[var(--pb-cream)]">
                  {need.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--pb-muted)]">{need.body}</p>
              </article>
            ))}
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-3">
              <PublicLink href={publicCtas.submitOpportunity.href} label={publicCtas.submitOpportunity.label} />
              <PublicLink href={publicCtas.contact.href} label={publicCtas.contact.label} tone="muted" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
