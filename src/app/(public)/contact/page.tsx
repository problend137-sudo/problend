import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactDetails, routeMetadata, workingHours } from "@/content/site";

export const metadata: Metadata = routeMetadata.contact;

const messageFields = ["First Name", "Last Name", "Email", "Message"] as const;

export default function ContactPage() {
  return (
    <main>
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none md:text-8xl">
            Contact Us
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">
            Reach ProBlend for machine placement, product offerings, flavour conversations, or business solution enquiries.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div className="grid gap-5">
            <a
              className="flex min-h-11 items-center gap-4 border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5 hover:border-[var(--pb-blush)]"
              href={`mailto:${contactDetails.email}`}
            >
              <Mail aria-hidden="true" className="text-[var(--pb-blush)]" size={24} />
              <span>{contactDetails.email}</span>
            </a>
            {contactDetails.phones.map((phone) => (
              <a
                className="flex min-h-11 items-center gap-4 border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5 hover:border-[var(--pb-blush)]"
                href={`tel:${phone.replaceAll(" ", "")}`}
                key={phone}
              >
                <Phone aria-hidden="true" className="text-[var(--pb-blush)]" size={24} />
                <span>{phone}</span>
              </a>
            ))}
            <div className="flex gap-4 border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5">
              <MapPin aria-hidden="true" className="mt-1 shrink-0 text-[var(--pb-blush)]" size={24} />
              <span>{contactDetails.address}</span>
            </div>
          </div>

          <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-6">
            <h2 className="font-[var(--font-barlow-condensed)] text-4xl font-semibold">Message details</h2>
            <p className="mt-4 text-base leading-7 text-[var(--pb-muted)]">
              When reaching out, include the same details from the original ProBlend contact form so the team can respond
              clearly.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {messageFields.map((field) => (
                <div className="border border-[var(--pb-border)] px-4 py-3 text-sm text-[var(--pb-muted)]" key={field}>
                  {field}
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-[var(--pb-border)] pt-6">
              <h3 className="font-semibold">Working hours</h3>
              <div className="mt-3 grid gap-2 text-sm text-[var(--pb-muted)]">
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
