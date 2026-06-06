import type { Metadata } from "next";
import Image from "next/image";
import { GsapReveal } from "@/components/public/GsapReveal";
import { problendAssets } from "@/content/assets";
import { contactDetails, contactPageContent, routeMetadata, workingHours } from "@/content/site";

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
            </div>

            <form className="grid gap-6" data-reveal>
              <div className="grid gap-6 md:grid-cols-2">
                {contactPageContent.form.fields.slice(0, 2).map((field) => (
                  <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]" key={field}>
                    {field}
                    <input className="min-h-12 border-b border-[var(--pb-line)] bg-transparent text-[var(--pb-cream)] outline-none focus:border-[var(--pb-green)]" />
                  </label>
                ))}
              </div>
              {contactPageContent.form.fields.slice(2).map((field) => (
                <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]" key={field}>
                  {field}
                  {field === "Message" ? (
                    <textarea className="min-h-40 resize-y border-b border-[var(--pb-line)] bg-transparent text-[var(--pb-cream)] outline-none focus:border-[var(--pb-green)]" />
                  ) : (
                    <input className="min-h-12 border-b border-[var(--pb-line)] bg-transparent text-[var(--pb-cream)] outline-none focus:border-[var(--pb-green)]" />
                  )}
                </label>
              ))}
              <div className="flex flex-wrap items-center gap-5">
                <button className="min-h-11 border border-[var(--pb-line-strong)] px-6 text-sm font-bold text-[var(--pb-green)]" type="button">
                  {contactPageContent.form.submit}
                </button>
                <p className="text-sm text-[var(--pb-muted)]">{contactPageContent.form.successText}</p>
              </div>
            </form>
          </div>
        </section>
      </GsapReveal>
    </main>
  );
}

