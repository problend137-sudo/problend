import type { Metadata } from "next";
import Image from "next/image";
import { GsapReveal } from "@/components/public/GsapReveal";
import { problendAssets } from "@/content/assets";
import { aboutContent, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.about;

export default function AboutPage() {
  return (
    <main>
      <GsapReveal>
        <section className="bg-[var(--pb-black)] px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
            <div>
              <h1 className="font-[var(--font-display)] text-6xl font-bold leading-[0.86] md:text-8xl" data-reveal>
                {aboutContent.title}
              </h1>
              <h2 className="mt-8 pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-[0.92] text-[var(--pb-green)] md:text-7xl" data-reveal>
                {aboutContent.heading}
              </h2>
            </div>
            <figure className="pb-media-shadow relative min-h-[30rem] overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
              <Image
                alt={problendAssets.generatedOperationsRestocking.alt}
                className="object-cover"
                fill
                loading="eager"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={problendAssets.generatedOperationsRestocking.src}
                data-parallax
              />
            </figure>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <figure className="pb-media-shadow relative min-h-[28rem] overflow-hidden" data-image-reveal>
                <Image
                  alt={problendAssets.generatedVenuePlacementProof.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  src={problendAssets.generatedVenuePlacementProof.src}
                  style={{ objectPosition: "70% center" }}
                  data-parallax
                />
              </figure>
            </div>
            <div className="grid gap-8 text-base leading-8 text-[var(--pb-graphite)]">
              <p className="text-xl leading-9" data-reveal>
                {aboutContent.body[0]}
              </p>
              <div data-reveal>
                <p>{aboutContent.body[1]}</p>
                <ul className="mt-5 grid gap-3">
                  {aboutContent.bullets.map((item) => (
                    <li className="border-b border-[rgba(4,5,4,0.14)] pb-3" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p data-reveal>{aboutContent.body[2]}</p>
              <p className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-green-dark)]" data-reveal>
                {aboutContent.body[3]}
              </p>
            </div>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-black px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <h2 className="font-[var(--font-display)] text-5xl font-semibold leading-none md:text-7xl">
                {aboutContent.form.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--pb-muted)]">{aboutContent.form.body}</p>
            </div>
            <form className="grid gap-6" data-reveal>
              <div className="grid gap-6 md:grid-cols-2">
                {aboutContent.form.fields.slice(0, 2).map((field) => (
                  <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]" key={field}>
                    {field}
                    <input className="min-h-12 border-b border-[var(--pb-line)] bg-transparent text-[var(--pb-cream)] outline-none focus:border-[var(--pb-green)]" />
                  </label>
                ))}
              </div>
              {aboutContent.form.fields.slice(2).map((field) => (
                <label className="grid gap-2 text-sm font-semibold text-[var(--pb-muted)]" key={field}>
                  {field}
                  {field === "Message" ? (
                    <textarea className="min-h-32 resize-y border-b border-[var(--pb-line)] bg-transparent text-[var(--pb-cream)] outline-none focus:border-[var(--pb-green)]" />
                  ) : (
                    <input className="min-h-12 border-b border-[var(--pb-line)] bg-transparent text-[var(--pb-cream)] outline-none focus:border-[var(--pb-green)]" />
                  )}
                </label>
              ))}
              <div className="flex flex-wrap items-center gap-5">
                <button className="min-h-11 border border-[var(--pb-line-strong)] px-6 text-sm font-bold text-[var(--pb-green)]" type="button">
                  {aboutContent.form.submit}
                </button>
                <p className="text-sm text-[var(--pb-muted)]">{aboutContent.form.successText}</p>
              </div>
            </form>
          </div>
        </section>
      </GsapReveal>
    </main>
  );
}
