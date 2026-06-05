import Image from "next/image";
import { PublicLink } from "@/components/public/PublicLink";
import type { ProBlendImage } from "@/content/assets";

type HeroLink = {
  href: string;
  label: string;
};

type PublicPageHeroProps = {
  title: string;
  body: string;
  image: ProBlendImage;
  primaryLink?: HeroLink;
  secondaryLink?: HeroLink;
  imagePosition?: string;
};

export function PublicPageHero({
  title,
  body,
  image,
  primaryLink,
  secondaryLink,
  imagePosition = "center"
}: PublicPageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--pb-border)] bg-[var(--pb-black)] px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1fr]">
        <div className="relative z-10">
          <h1 className="max-w-4xl font-[var(--font-barlow-condensed)] text-6xl font-semibold leading-[0.92] text-[var(--pb-cream)] md:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--pb-muted)] md:text-xl">{body}</p>
          {(primaryLink || secondaryLink) && (
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {primaryLink ? <PublicLink href={primaryLink.href} label={primaryLink.label} /> : null}
              {secondaryLink ? <PublicLink href={secondaryLink.href} label={secondaryLink.label} tone="muted" /> : null}
            </div>
          )}
        </div>
        <figure className="relative min-h-[22rem] overflow-hidden border-y border-[rgba(245,239,233,0.22)] md:min-h-[30rem]">
          <Image
            alt={image.alt}
            className="object-cover"
            fill
            loading="eager"
            priority={false}
            sizes="(min-width: 1024px) 52vw, 100vw"
            src={image.src}
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.28),transparent_45%,rgba(0,0,0,0.28))]" />
        </figure>
      </div>
    </section>
  );
}
