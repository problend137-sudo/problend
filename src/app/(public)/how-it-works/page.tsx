import type { Metadata } from "next";
import { CreditCard, Droplets, HandPlatter, Settings } from "lucide-react";
import { howItWorksSteps, preservedCopy, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.howItWorks;

const stepIcons = [HandPlatter, CreditCard, Droplets, Settings] as const;

export default function HowItWorksPage() {
  return (
    <main>
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-none md:text-8xl">
            How It Works
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-[var(--pb-muted)]">{preservedCopy.operationsPromise}</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {howItWorksSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article className="border border-[var(--pb-border)] bg-[rgba(245,239,233,0.04)] p-5" key={step.title}>
                <p className="font-[var(--font-barlow-condensed)] text-4xl font-semibold text-[var(--pb-blush)]">
                  0{index + 1}
                </p>
                <Icon aria-hidden="true" className="mt-8 text-[var(--pb-amber)]" size={28} />
                <h2 className="mt-5 font-[var(--font-barlow-condensed)] text-3xl font-semibold">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--pb-muted)]">{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr]">
          <h2 className="font-[var(--font-barlow-condensed)] text-5xl font-semibold leading-none">Operations handled.</h2>
          <div className="grid gap-5 text-lg leading-8 text-[var(--pb-graphite)]">
            <p>
              ProBlend handles stocking, cleaning, maintenance, remote monitoring, and updates so the venue can offer
              nutrition access without operating a full beverage counter.
            </p>
            <p>
              Hygiene, cashless access, and GPRS-enabled machine visibility keep the experience simple for customers and
              reliable for venue teams.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
