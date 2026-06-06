import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { problendAssets } from "@/content/assets";
import { contactDetails, publicCtas } from "@/content/site";

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/cancellation-and-refunds", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" }
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--pb-line)] bg-black px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1fr_1fr]">
        <div>
          <Image
            alt={problendAssets.logo.alt}
            className="mb-4 object-contain"
            height={61}
            src={problendAssets.logo.src}
            style={{ height: "auto", width: "auto" }}
            width={168}
          />
        </div>

        <address className="not-italic text-sm leading-7 text-[var(--pb-muted)]">
          <p className="font-[var(--font-display)] text-2xl font-semibold text-[var(--pb-cream)]">Contact Us At</p>
          <a className="block underline-offset-4 hover:text-[var(--pb-cream)] hover:underline" href={`mailto:${contactDetails.email}`}>
            {contactDetails.email}
          </a>
          {contactDetails.phones.map((phone) => (
            <a
              className="block underline-offset-4 hover:text-[var(--pb-cream)] hover:underline"
              href={phone.startsWith("=") ? undefined : `tel:${phone}`}
              key={phone}
            >
              {phone}
            </a>
          ))}
          <p className="mt-3">{contactDetails.address}</p>
        </address>

        <div className="grid content-start gap-5 text-sm text-[var(--pb-muted)]">
          <nav aria-label="Policy links" className="flex flex-wrap gap-x-4 gap-y-2">
            <Link className="underline underline-offset-4 hover:text-[var(--pb-cream)]" href={publicCtas.submitOpportunity.href as Route}>
              {publicCtas.submitOpportunity.label}
            </Link>
            <Link className="underline underline-offset-4 hover:text-[var(--pb-cream)]" href={publicCtas.placementEstimate.href as Route}>
              Placement Estimate
            </Link>
            {policyLinks.map((item) => (
              <Link
                className="underline underline-offset-4 hover:text-[var(--pb-cream)]"
                href={item.href as Route}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link className="underline underline-offset-4 hover:text-[var(--pb-cream)]" href={"/contact" as Route}>
              Contact Us
            </Link>
          </nav>
          <p className="text-xs text-[var(--pb-dim)]">© 2025 by ProBlend. Powered and secured by Wix</p>
        </div>
      </div>
    </footer>
  );
}
