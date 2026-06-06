"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  machineCapabilities,
  productCustomizationNotes,
  productNutritionProfiles,
  products
} from "@/content/products";

type ProductSlug = (typeof products)[number]["slug"];

const nutritionLabels = [
  { key: "serving", label: "Serving" },
  { key: "protein", label: "Protein target" },
  { key: "calories", label: "Calories" },
  { key: "sugar", label: "Sugar profile" },
  { key: "functionalBlend", label: "Functional blend" }
] as const;

function getProductTabLabel(name: string) {
  return name.replace(" Protein Shake", "").replace(" Shake", "");
}

export function ProductExplorer() {
  const [activeSlug, setActiveSlug] = useState<ProductSlug>(products[0].slug);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeProduct = useMemo(
    () => products.find((product) => product.slug === activeSlug) ?? products[0],
    [activeSlug]
  );
  const nutritionProfile =
    productNutritionProfiles.find((profile) => profile.slug === activeProduct.slug) ?? productNutritionProfiles[0];

  useEffect(() => {
    const panel = panelRef.current;
    const reducedMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!panel || reducedMotion || typeof window.matchMedia !== "function") {
      return;
    }

    const tween = gsap.fromTo(
      panel,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out" }
    );

    return () => {
      tween.kill();
    };
  }, [activeSlug]);

  return (
    <section className="bg-[var(--pb-oled)] px-5 py-16 md:px-8 md:py-24" aria-labelledby="product-explorer-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 border-y border-[var(--pb-line)] py-8 lg:grid-cols-[0.47fr_0.53fr]">
          <div>
            <h2
              className="pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-cream)] md:text-7xl"
              data-reveal
              id="product-explorer-title"
            >
              Product Explorer
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--pb-muted)]" data-reveal>
              Explore the four public ProBlend flavours, nutrition display framework, machine capabilities, and customization controls that make each placement feel venue-ready.
            </p>
          </div>

          <div className="pb-scrollbar-hidden flex gap-3 overflow-x-auto pb-2" role="tablist" aria-label="Product Explorer">
            {products.map((product) => {
              const selected = activeSlug === product.slug;

              return (
                <button
                  aria-controls={`product-panel-${product.slug}`}
                  aria-selected={selected}
                  className={
                    selected
                      ? "min-h-12 shrink-0 border border-[var(--pb-green)] bg-[var(--pb-green)] px-5 text-sm font-extrabold text-[var(--pb-black)]"
                      : "min-h-12 shrink-0 border border-[var(--pb-line)] px-5 text-sm font-extrabold text-[var(--pb-cream)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                  }
                  id={`product-tab-${product.slug}`}
                  key={product.slug}
                  onClick={() => setActiveSlug(product.slug)}
                  role="tab"
                  type="button"
                >
                  {getProductTabLabel(product.name)}
                </button>
              );
            })}
          </div>
        </div>

        <div
          aria-labelledby={`product-tab-${activeProduct.slug}`}
          className="mt-10 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]"
          id={`product-panel-${activeProduct.slug}`}
          ref={panelRef}
          role="tabpanel"
        >
          <figure className="pb-media-shadow relative min-h-[28rem] overflow-hidden border border-[var(--pb-line)]" data-image-reveal>
            <Image
              alt={activeProduct.visual.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              src={activeProduct.visual.src}
              style={{ objectPosition: activeProduct.slug === "cola-electrolyte" ? "54% center" : "center" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.7))]" />
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-6 block h-1.5 w-24"
              style={{ backgroundColor: activeProduct.accent }}
            />
          </figure>

          <div className="grid gap-7">
            <div className="border-t border-[var(--pb-line)] pt-7" data-reveal>
              <p className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-green)]">
                {getProductTabLabel(activeProduct.name)}
              </p>
              <h3 className="mt-3 font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-cream)] md:text-6xl">
                {activeProduct.name}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--pb-muted)]">{activeProduct.description}</p>
            </div>

            <div className="grid gap-4">
              <h4 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]" data-reveal>
                Nutrition display framework
              </h4>
              <dl className="grid gap-3 sm:grid-cols-2">
                {nutritionLabels.map((item) => (
                  <div className="min-h-28 border border-[var(--pb-line)] bg-[rgba(245,239,233,0.03)] p-4" data-reveal key={item.key}>
                    <dt className="text-xs font-extrabold uppercase text-[var(--pb-dim)]">{item.label}</dt>
                    <dd className="mt-3 text-base font-bold leading-6 text-[var(--pb-cream)]">{nutritionProfile[item.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid gap-4">
              <h4 className="font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]" data-reveal>
                Machine capability panel
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {machineCapabilities.map((capability) => (
                  <article className="border-t border-[var(--pb-line)] pt-4" data-capability-step key={capability.title}>
                    <h5 className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-green)]">
                      {capability.title}
                    </h5>
                    <p className="mt-3 text-sm leading-6 text-[var(--pb-muted)]">{capability.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-3 border-y border-[var(--pb-line)] py-6" data-reveal>
              {productCustomizationNotes.map((note) => (
                <p className="text-base font-bold leading-7 text-[var(--pb-cream)]" key={note}>
                  {note}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
