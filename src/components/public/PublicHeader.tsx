import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { problendAssets } from "@/content/assets";
import { publicNavigation } from "@/content/site";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--pb-line)] bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link className="flex items-center gap-3" href={"/" as Route}>
          <Image
            alt={problendAssets.logo.alt}
            className="object-contain"
            height={38}
            priority
            src={problendAssets.logo.src}
            style={{ height: "auto" }}
            width={112}
          />
          <span className="sr-only">ProBlend home</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {publicNavigation.map((item) => (
            <Link
              className="text-[13px] font-semibold text-[var(--pb-muted)] underline-offset-8 transition-colors duration-200 hover:text-[var(--pb-cream)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              href={item.href as Route}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="hidden min-h-10 items-center border border-[var(--pb-line-strong)] px-4 text-[13px] font-bold text-[var(--pb-green)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:bg-[rgba(168,255,63,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] md:inline-flex"
          href={"/contact" as Route}
        >
          Contact Us
        </Link>

      </div>
      <nav
        aria-label="Mobile primary navigation"
        className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-[var(--pb-line)] px-4 py-3 text-center text-[12px] text-[var(--pb-muted)] lg:hidden"
      >
        {publicNavigation.map((item) => (
          <Link
            className="font-semibold underline-offset-8 transition-colors duration-200 hover:text-[var(--pb-cream)] hover:underline"
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
