"use client";

import { useState } from "react";
import { MapPin, RadioTower } from "lucide-react";

export const expansionMapBase = {
  city: "New Delhi",
  address: "K-18 Green Park Extension, New Delhi-110016",
  category: "Existing base",
  x: 55,
  y: 38
} as const;

export const expansionMarkets = [
  { city: "Mumbai", category: "Fitness venues and corporate wellness", x: 28, y: 66 },
  { city: "Pune", category: "Gyms, offices, and student housing", x: 35, y: 69 },
  { city: "Bengaluru", category: "Campuses, tech parks, and gyms", x: 43, y: 82 },
  { city: "Hyderabad", category: "Offices, campuses, and active residences", x: 48, y: 66 },
  { city: "Chennai", category: "Fitness centers and campus corridors", x: 56, y: 87 },
  { city: "Ahmedabad", category: "Gyms, malls, and residential communities", x: 34, y: 49 },
  { city: "Kolkata", category: "Institutions, offices, and wellness venues", x: 75, y: 52 },
  { city: "Jaipur", category: "Fitness venues and high-footfall retail", x: 47, y: 37 }
] as const;

type ExpansionMarket = (typeof expansionMarkets)[number];

export function ExpansionMap() {
  const [activeCity, setActiveCity] = useState<ExpansionMarket["city"]>(expansionMarkets[0].city);
  const activeMarket = expansionMarkets.find((market) => market.city === activeCity) ?? expansionMarkets[0];

  return (
    <section
      aria-labelledby="expansion-map-title"
      className="bg-[var(--pb-black)] px-5 py-16 md:px-8 md:py-24"
      data-testid="expansion-map"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            className="pb-text-balance font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-cream)] md:text-7xl"
            data-reveal
            id="expansion-map-title"
          >
            India expansion map.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--pb-muted)]" data-reveal>
            ProBlend starts from New Delhi and is mapping public target markets where gyms, campuses, offices, residences, and fitness venues can support smarter nutrition access.
          </p>

          <div className="mt-8 border-y border-[var(--pb-line)] py-6" data-reveal>
            <p className="text-xs font-extrabold uppercase text-[var(--pb-dim)]">{expansionMapBase.category}</p>
            <p className="mt-2 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-green)]">
              {expansionMapBase.city}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--pb-muted)]">{expansionMapBase.address}</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="relative min-h-[34rem] overflow-hidden border border-[var(--pb-line)] bg-[radial-gradient(circle_at_50%_45%,rgba(168,255,63,0.16),transparent_38%),#080a08] p-5">
            <svg
              aria-hidden="true"
              className="absolute inset-0 size-full opacity-80"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 100 100"
            >
              <path
                d="M48 10 L61 16 L64 25 L72 30 L75 42 L84 51 L79 61 L72 65 L69 78 L58 91 L48 86 L41 76 L35 75 L33 66 L25 59 L31 49 L29 38 L38 31 L39 20 Z"
                fill="rgba(242,241,234,0.06)"
                stroke="rgba(168,255,63,0.42)"
                strokeWidth="0.7"
              />
              <path
                d="M39 20 L47 30 L47 45 L42 55 L44 69 L53 84"
                fill="none"
                stroke="rgba(242,241,234,0.18)"
                strokeDasharray="2 3"
                strokeWidth="0.5"
              />
            </svg>

            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-[var(--pb-green)]"
              style={{ left: `${expansionMapBase.x}%`, top: `${expansionMapBase.y}%` }}
            >
              <span className="flex size-11 items-center justify-center border border-[var(--pb-green)] bg-[rgba(4,5,4,0.86)]">
                <RadioTower aria-hidden="true" size={19} />
              </span>
            </div>

            {expansionMarkets.map((market) => {
              const selected = market.city === activeCity;

              return (
                <button
                  aria-pressed={selected}
                  className={
                    selected
                      ? "absolute z-20 -translate-x-1/2 -translate-y-1/2 border border-[var(--pb-green)] bg-[var(--pb-green)] px-3 py-2 text-xs font-extrabold text-[var(--pb-black)]"
                      : "absolute z-20 -translate-x-1/2 -translate-y-1/2 border border-[var(--pb-line-strong)] bg-[rgba(4,5,4,0.82)] px-3 py-2 text-xs font-extrabold text-[var(--pb-cream)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                  }
                  key={market.city}
                  onClick={() => setActiveCity(market.city)}
                  style={{ left: `${market.x}%`, top: `${market.y}%` }}
                  type="button"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin aria-hidden="true" size={13} />
                    {market.city}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 border-y border-[var(--pb-line)] py-6 md:grid-cols-[0.52fr_0.48fr]" data-reveal>
            <div>
              <p className="text-xs font-extrabold uppercase text-[var(--pb-dim)]">Selected target market</p>
              <h3 className="mt-2 font-[var(--font-display)] text-5xl font-semibold leading-none text-[var(--pb-cream)]">
                {activeMarket.city}
              </h3>
            </div>
            <p className="text-base leading-7 text-[var(--pb-muted)]">{activeMarket.category}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
