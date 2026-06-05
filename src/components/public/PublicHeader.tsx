import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { problendAssets } from "@/content/assets";
import { publicCtas, publicNavigation } from "@/content/site";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(245,239,233,0.12)] bg-[rgba(0,0,0,0.94)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 md:px-8">
        <Link className="group flex items-center gap-3" href={"/" as Route}>
          <Image
            alt={problendAssets.logo.alt}
            className="object-contain transition duration-200 group-hover:opacity-85"
            height={40}
            priority
            src={problendAssets.logo.src}
            width={110}
          />
          <span className="sr-only">ProBlend home</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
          {publicNavigation.map((item) => (
            <Link
              className="text-sm font-semibold text-[var(--pb-muted)] underline-offset-8 transition duration-200 hover:text-[var(--pb-cream)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--pb-gold)]"
              href={item.href as Route}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="inline-flex min-h-10 items-center gap-2 border border-[rgba(245,239,233,0.34)] px-4 text-sm font-semibold text-[var(--pb-cream)] transition duration-200 hover:border-[var(--pb-gold)] hover:text-[var(--pb-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-gold)]"
          href={publicCtas.contact.href as Route}
        >
          {publicCtas.contact.label}
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
      </div>
      <nav
        aria-label="Mobile primary navigation"
        className="flex gap-4 overflow-x-auto border-t border-[var(--pb-border)] px-5 py-3 text-sm text-[var(--pb-muted)] lg:hidden"
      >
        {publicNavigation.map((item) => (
          <Link
            className="shrink-0 font-semibold underline-offset-8 transition duration-200 hover:text-[var(--pb-cream)] hover:underline"
            href={item.href as Route}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
