import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { problendAssets } from "@/content/assets";
import { contactDetails, preservedCopy, workingHours } from "@/content/site";

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cancellation-and-refunds", label: "Cancellation & Refunds" },
  { href: "/shipping-policy", label: "Shipping Policy" }
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-[rgba(245,239,233,0.14)] bg-[var(--pb-oled)] px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.15fr_1fr_1fr]">
        <div>
          <Image
            alt={problendAssets.logo.alt}
            className="mb-4 object-contain"
            height={61}
            src={problendAssets.logo.src}
            width={168}
          />
          <p className="font-[var(--font-barlow-condensed)] text-3xl font-semibold">{preservedCopy.premiumLine}</p>
          <p className="mt-4 max-w-md text-base leading-7 text-[var(--pb-muted)]">{preservedCopy.wellnessMission}</p>
        </div>

        <address className="not-italic text-sm leading-7 text-[var(--pb-muted)]">
          <p className="font-[var(--font-barlow-condensed)] text-2xl font-semibold text-[var(--pb-cream)]">Contact</p>
          <a className="block underline-offset-4 hover:text-[var(--pb-cream)] hover:underline" href={`mailto:${contactDetails.email}`}>
            {contactDetails.email}
          </a>
          {contactDetails.phones.map((phone) => (
            <a
              className="block underline-offset-4 hover:text-[var(--pb-cream)] hover:underline"
              href={`tel:${phone.replaceAll(" ", "")}`}
              key={phone}
            >
              {phone}
            </a>
          ))}
          <p className="mt-3">{contactDetails.address}</p>
        </address>

        <div className="grid gap-5 text-sm text-[var(--pb-muted)]">
          <div>
            <p className="font-[var(--font-barlow-condensed)] text-2xl font-semibold text-[var(--pb-cream)]">Hours</p>
            {workingHours.map((slot) => (
              <p key={slot.days}>
                {slot.days}: {slot.hours}
              </p>
            ))}
          </div>
          <nav aria-label="Policy links" className="flex flex-wrap gap-x-4 gap-y-2">
            {policyLinks.map((item) => (
              <Link
                className="underline underline-offset-4 hover:text-[var(--pb-cream)]"
                href={item.href as Route}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
