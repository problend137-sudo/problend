import type { Metadata } from "next";
import Image from "next/image";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { pageVisuals, problendAssets } from "@/content/assets";
import { contactDetails, routeMetadata, workingHours } from "@/content/site";

export const metadata: Metadata = routeMetadata.contact;

const messageFields = ["First Name", "Last Name", "Email", "Message"] as const;

export default function ContactPage() {
  return (
    <main>
      <PublicPageHero
        body="Reach ProBlend for machine placement, product offerings, flavour conversations, or business solution enquiries."
        image={pageVisuals.contact}
        imagePosition="center"
        title="Contact Us"
      />

      <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <Image
              alt={problendAssets.logo.alt}
              className="object-contain"
              height={70}
              src={problendAssets.logo.src}
              width={193}
            />
            <h2 className="mt-8 font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-[0.95] md:text-7xl">
              Start the ProBlend conversation.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--pb-muted)]">
              Share the venue, product, or partnership context clearly so the ProBlend team can respond with the right
              next conversation.
            </p>
          </div>

          <div className="grid gap-10">
            <address className="not-italic">
              <h3 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Official contact</h3>
              <div className="mt-6 grid gap-4 text-base leading-8 text-[var(--pb-muted)]">
                <a className="underline-offset-8 transition hover:text-[var(--pb-cream)] hover:underline" href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
                {contactDetails.phones.map((phone) => (
                  <a
                    className="underline-offset-8 transition hover:text-[var(--pb-cream)] hover:underline"
                    href={`tel:${phone.replaceAll(" ", "")}`}
                    key={phone}
                  >
                    {phone}
                  </a>
                ))}
                <p>{contactDetails.address}</p>
              </div>
            </address>

            <div className="border-t border-[rgba(245,239,233,0.16)] pt-8">
              <h3 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Message details</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--pb-muted)]">
                Include these details when emailing the team so product, placement, or partnership enquiries can be routed
                clearly.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {messageFields.map((field) => (
                  <div className="border-b border-[rgba(245,239,233,0.16)] pb-3 text-sm text-[var(--pb-muted)]" key={field}>
                    {field}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[rgba(245,239,233,0.16)] pt-8">
              <h3 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Working hours</h3>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-[var(--pb-muted)]">
                {workingHours.map((slot) => (
                  <p key={slot.days}>
                    {slot.days}: {slot.hours}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
