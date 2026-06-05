import type { Metadata, Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactDetails, preservedCopy, publicCtas, routeMetadata, venueTypes } from "@/content/site";

export const metadata: Metadata = routeMetadata.about;

export default function AboutPage() {
  return (
    <main>
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none text-[var(--pb-cream)] md:text-8xl">
            About ProBlend
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">{preservedCopy.companyStory}</p>
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr]">
          <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">
            Health, convenience, and technology in one machine.
          </h2>
          <div className="grid gap-6 text-lg leading-8 text-[var(--pb-graphite)]">
            <p>{preservedCopy.wellnessMission}</p>
            <p>
              Each placement is designed around easy access, fresh preparation, digital payments, and reliable operations so
              active communities can get premium nutrition without waiting for a staffed counter.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">Where ProBlend fits</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {venueTypes.map((venue) => (
              <div className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5" key={venue}>
                <p className="font-semibold">{venue}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-[var(--pb-border)] pt-8">
            <p className="text-lg leading-8 text-[var(--pb-muted)]">
              Reach ProBlend at {contactDetails.email} or visit the contact page to begin a placement, flavour, or business
              discussion.
            </p>
            <Link
              className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 hover:text-[var(--pb-blush)]"
              href={publicCtas.contact.href as Route}
            >
              {publicCtas.contact.label}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
