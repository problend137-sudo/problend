import type { Metadata } from "next";
import Image from "next/image";
import { GsapReveal } from "@/components/public/GsapReveal";
import { PublicLink } from "@/components/public/PublicLink";
import { problendAssets } from "@/content/assets";
import { homeContent, publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.home;

const featureImages = [
  problendAssets.generatedMachineInteractionPayment,
  problendAssets.generatedShakeDispensing,
  problendAssets.generatedOperationsRestocking
] as const;

function CharacterRevealHeading({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <span aria-hidden="true" className="block" data-character-reveal>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
            {Array.from(word).map((character, characterIndex) => (
              <span className="inline-block" data-char key={`${word}-${character}-${characterIndex}`}>
                {character}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? (
            <span aria-hidden="true" className="inline-block" data-char-space>
              &nbsp;
            </span>
          ) : null}
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <main>
      <GsapReveal>
        <section className="relative isolate min-h-[500px] overflow-hidden bg-black md:min-h-[clamp(560px,calc(100svh-14rem),700px)]">
          <Image
            alt={problendAssets.generatedHeroGymMachineWide.alt}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="100vw"
            src={problendAssets.generatedHeroGymMachineWide.src}
            style={{ objectPosition: "46% center" }}
          />
          <div aria-hidden className="absolute left-0 top-[31%] h-[27%] w-[20%] bg-black/50 backdrop-blur-[2px] md:left-[27%] md:top-[17%] md:h-[32%] md:w-[18%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.22)_36%,rgba(0,0,0,0.76)_62%,rgba(0,0,0,0.94)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(4,5,4,1))]" />

          <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl items-center px-5 py-10 md:px-8 md:py-16">
            <div className="ml-auto max-w-[42rem]">
              <h1
                aria-label={homeContent.hero.title}
                className="pb-text-balance font-[var(--font-display)] text-[clamp(3.35rem,7.6vw,6.5rem)] font-bold leading-[0.88] text-[var(--pb-cream)]"
              >
                <CharacterRevealHeading text={homeContent.hero.title} />
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-[rgba(242,241,234,0.84)] md:text-lg" data-reveal>
                {homeContent.hero.body}
              </p>
              <div className="mt-8" data-reveal>
                <PublicLink href={publicCtas.howItWorks.href} label={publicCtas.howItWorks.label} />
              </div>
            </div>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-[var(--pb-black)] px-5 pb-12 pt-5 md:px-8 md:pb-16 md:pt-7">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="pb-text-balance font-[var(--font-display)] text-5xl font-bold leading-[0.9] md:text-7xl" data-reveal>
                {homeContent.positioning.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--pb-muted)]" data-reveal>
                {homeContent.positioning.body}
              </p>
            </div>

            <div className="grid gap-10">
              {homeContent.featureMoments.map((moment, index) => (
                <article className="grid gap-5 border-t border-[var(--pb-line)] pt-7 md:grid-cols-[0.9fr_1.1fr]" data-reveal key={moment.title}>
                  <figure className="pb-media-shadow relative min-h-60 overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
                    <Image
                      alt={featureImages[index].alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 34vw, 100vw"
                      src={featureImages[index].src}
                      data-parallax
                    />
                    {index === 0 ? (
                      <>
                        <div aria-hidden className="absolute right-[4%] top-[20%] h-[34%] w-[48%] bg-black/42 backdrop-blur-[6px]" />
                        <div aria-hidden className="absolute left-[44%] top-[71%] h-[16%] w-[23%] bg-black/50 backdrop-blur-[4px]" />
                      </>
                    ) : null}
                    {index === 1 ? (
                      <div aria-hidden className="absolute left-[48%] top-[17%] h-[28%] w-[20%] bg-black/42 backdrop-blur-[5px]" />
                    ) : null}
                  </figure>
                  <div className="self-center">
                    <h3 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-green)]">
                      {moment.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--pb-muted)]">{moment.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="bg-[var(--pb-cream)] px-5 py-16 text-[var(--pb-black)] md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <figure className="pb-media-shadow relative min-h-[28rem] overflow-hidden" data-image-reveal>
              <Image
                alt={problendAssets.generatedVenuePlacementProof.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 54vw, 100vw"
                src={problendAssets.generatedVenuePlacementProof.src}
                style={{ objectPosition: "68% center" }}
                data-parallax
              />
            </figure>
            <div>
              <p className="font-[var(--font-display)] text-3xl font-semibold text-[var(--pb-green-dark)]" data-reveal>
                {homeContent.story.title}
              </p>
              <p className="mt-5 text-lg leading-8 text-[var(--pb-graphite)]" data-reveal>
                {homeContent.story.body}
              </p>
            </div>
          </div>
        </section>
      </GsapReveal>

      <GsapReveal>
        <section className="grid bg-black md:grid-cols-2">
          <figure className="relative min-h-[32rem] overflow-hidden" data-image-reveal>
            <Image
              alt={problendAssets.generatedMachineProductPortrait.alt}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={problendAssets.generatedMachineProductPortrait.src}
              style={{ objectPosition: "center top" }}
              data-parallax
            />
            <div aria-hidden className="absolute left-[20%] top-[20%] h-[66%] w-[51%] border border-[rgba(168,255,63,0.1)] bg-black/50 backdrop-blur-[6px]" />
          </figure>
          <div className="grid content-center gap-10 px-5 py-14 md:px-10 lg:px-16">
            {homeContent.story.mediaQuotes.map((quote) => (
              <p
                className="pb-text-balance max-w-xl border-t border-[var(--pb-line)] pt-8 font-[var(--font-display)] text-4xl font-semibold italic leading-tight text-[var(--pb-cream)] md:text-5xl"
                data-reveal
                key={quote}
              >
                {quote}
              </p>
            ))}
          </div>
        </section>
      </GsapReveal>
    </main>
  );
}
