import Link from "next/link";
import type { Route } from "next";
import { ExternalLink, LogOut } from "lucide-react";

export function AdminHeader({ adminName }: { adminName: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--pb-line)] bg-[rgba(4,5,4,0.92)] px-5 py-3 backdrop-blur md:px-6">
      <div className="flex min-h-12 items-center justify-between gap-4 pl-12 lg:pl-0">
        <div>
          <p className="text-xs font-bold uppercase text-[var(--pb-dim)]">Signed in</p>
          <p className="text-sm font-semibold text-[var(--pb-cream)]">{adminName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            className="inline-flex min-h-10 items-center gap-2 border border-[var(--pb-line)] px-3 text-sm font-bold text-[var(--pb-muted)] transition-colors hover:border-[var(--pb-green)] hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            href={"/" as Route}
          >
            <ExternalLink aria-hidden="true" size={16} />
            View site
          </Link>
          <a
            className="inline-flex min-h-10 items-center gap-2 border border-[var(--pb-line)] px-3 text-sm font-bold text-[var(--pb-cream)] transition-colors hover:border-[var(--pb-green)] hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
            href="/api/admin/logout"
          >
            <LogOut aria-hidden="true" size={16} />
            Log out
          </a>
        </div>
      </div>
    </header>
  );
}
