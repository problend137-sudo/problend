import type { Metadata } from "next";
import Image from "next/image";
import { PublicLink } from "@/components/public/PublicLink";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { pageVisuals, problendAssets } from "@/content/assets";
import { contactDetails, preservedCopy, publicCtas, routeMetadata, venueTypes } from "@/content/site";

export const metadata: Metadata = routeMetadata.about;

export default function AboutPage() {
  return (
    <main>
      <PublicPageHero
        body={preservedCopy.companyStory}
        image={pageVisuals.about}
        imagePosition="center top"
        primaryLink={publicCtas.contact}
        secondaryLink={publicCtas.howItWorks}
        title="About ProBlend"
      />

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1fr]">
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Health, convenience, and technology in one machine.
            </h2>
          </div>
          <div className="grid gap-6 text-lg leading-8 text-[var(--pb-graphite)]">
            <p>{preservedCopy.wellnessMission}</p>
            <p>
              Each placement is designed around fresh preparation, digital payments, hygiene, and reliable operation so
              active communities can access premium nutrition without waiting for a staffed beverage counter.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <figure className="relative min-h-[32rem] overflow-hidden border-y border-[rgba(245,239,233,0.18)]">
            <Image
              alt={problendAssets.machineCloseup.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              src={problendAssets.machineCloseup.src}
            />
          </figure>
          <div>
            <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Where ProBlend fits
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--pb-muted)]">
              ProBlend partners with active spaces that want nutrition access to feel immediate, hygienic, and premium.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {venueTypes.map((venue) => (
                <p className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-sm text-[var(--pb-muted)]" key={venue}>
                  {venue}
                </p>
              ))}
            </div>
            <p className="mt-8 text-sm leading-7 text-[var(--pb-muted)]">
              Reach ProBlend at {contactDetails.email} to begin a placement, flavour, or business discussion.
            </p>
            <div className="mt-5">
              <PublicLink href={publicCtas.contact.href} label={publicCtas.contact.label} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
