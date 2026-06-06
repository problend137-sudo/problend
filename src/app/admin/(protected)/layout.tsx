import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";

import { requireAdmin } from "@/features/admin-auth/guards";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--pb-line)] bg-black px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pb-dim)]">ProBlend Admin</p>
            <p className="mt-1 text-sm font-semibold text-[var(--pb-cream)]">{admin.user.name}</p>
          </div>
          <nav aria-label="Admin navigation" className="flex items-center gap-4 text-sm font-semibold">
            <Link
              className="text-[var(--pb-muted)] underline-offset-8 hover:text-[var(--pb-cream)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              href={"/admin" as Route}
            >
              Overview
            </Link>
            <a
              className="border border-[var(--pb-line)] px-4 py-2 text-[var(--pb-cream)] transition-colors duration-200 hover:border-[var(--pb-green)] hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
              href="/api/admin/logout"
            >
              Log out
            </a>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
