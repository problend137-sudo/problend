import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm, WaitlistForm } from "@/components/public/ContactForm";
import { GsapReveal } from "@/components/public/GsapReveal";
import { PublicLink } from "@/components/public/PublicLink";
import { problendAssets } from "@/content/assets";
import { contactDetails, contactPageContent, publicCtas, routeMetadata, workingHours } from "@/content/site";

export const metadata: Metadata = routeMetadata.contact;

export default function ContactPage() {
  return (
    <main>
      <GsapReveal>
        <section className="bg-[var(--pb-black)] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
            <div>
              <h1 className="font-[var(--font-display)] text-6xl font-bold leading-[0.86] md:text-8xl" data-reveal>
                {contactPageContent.title}
              </h1>
              <h2 className="mt-8 font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-green)]" data-reveal>
                {contactPageContent.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--pb-muted)]" data-reveal>
                {contactPageContent.body}
              </p>
            </div>
            <figure className="pb-media-shadow relative min-h-[28rem] overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
              <Image
                alt={problendAssets.generatedVenuePlacementProof.alt}
                className="object-cover"
                fill
                loading="eager"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={problendAssets.generatedVenuePlacementProof.src}
                style={{ objectPosition: "70% center" }}
              />
            </figure>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-black px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="grid content-start gap-9" data-reveal>
              <address className="grid gap-4 not-italic text-base leading-8 text-[var(--pb-muted)]">
                <p>{contactDetails.address}</p>
                <a className="underline-offset-8 hover:text-[var(--pb-cream)] hover:underline" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
                {contactDetails.phones.map((phone) => (
                  <a
                    className="underline-offset-8 hover:text-[var(--pb-cream)] hover:underline"
                    href={phone.startsWith("=") ? undefined : `tel:${phone}`}
                    key={phone}
                  >
                    {phone}
                  </a>
                ))}
              </address>

              <div className="grid gap-3 text-base text-[var(--pb-muted)]">
                {contactPageContent.socialLinks.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>

              <div className="border-t border-[var(--pb-line)] pt-8">
                <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none">
                  {contactPageContent.workingHoursTitle}
                </h2>
                <div className="mt-5 grid gap-3 text-base text-[var(--pb-muted)]">
                  {workingHours.map((slot) => (
                    <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-[var(--pb-line)] pb-3" key={slot.days}>
                      <p>{slot.days}</p>
                      <p>{slot.hours}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 border-t border-[var(--pb-line)] pt-8">
                <h2 className="font-[var(--font-display)] text-4xl font-semibold leading-none">
                  Opportunity Paths
                </h2>
                <p className="text-base leading-8 text-[var(--pb-muted)]">
                  Venue, operator, distributor, and city interest can move through the dedicated platform paths.
                </p>
                <div className="flex flex-wrap gap-x-7 gap-y-3">
                  <PublicLink href={publicCtas.submitOpportunity.href} label={publicCtas.submitOpportunity.label} />
                  <PublicLink href={publicCtas.placementEstimate.href} label="Placement Estimate" tone="muted" />
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </GsapReveal>

      <WaitlistForm
        body="Share the city, state, or venue type where ProBlend should consider future placement interest."
        sourcePath="/contact"
      />
    </main>
  );
}
