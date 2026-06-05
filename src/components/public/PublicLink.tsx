import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PublicLinkProps = {
  href: string;
  label: string;
  tone?: "light" | "dark" | "muted";
};

const toneClasses = {
  light: "text-[var(--pb-cream)] hover:text-[var(--pb-gold)]",
  dark: "text-[var(--pb-black)] hover:text-[var(--pb-bronze)]",
  muted: "text-[var(--pb-muted)] hover:text-[var(--pb-cream)]"
} as const;

export function PublicLink({ href, label, tone = "light" }: PublicLinkProps) {
  return (
    <Link
      className={`group inline-flex min-h-10 items-center gap-2 text-sm font-semibold underline decoration-current/55 underline-offset-8 transition duration-200 ${toneClasses[tone]}`}
      href={href as Route}
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="transition duration-200 group-hover:translate-x-1"
        size={16}
        strokeWidth={2}
      />
    </Link>
  );
}
