"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import {
  Activity,
  Calculator,
  ContactRound,
  FileClock,
  Gauge,
  LayoutDashboard,
  Menu,
  Settings,
  SlidersHorizontal,
  UsersRound,
  X
} from "lucide-react";

const adminRoutes = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Opportunities", href: "/admin/opportunities", icon: Gauge },
  { label: "Contacts", href: "/admin/contacts", icon: ContactRound },
  { label: "Calculator", href: "/admin/calculator", icon: Calculator },
  { label: "Forecast Configs", href: "/admin/forecast-configs", icon: SlidersHorizontal },
  { label: "Forecast Runs", href: "/admin/forecast-runs", icon: FileClock },
  { label: "Waitlists", href: "/admin/waitlists", icon: UsersRound },
  { label: "Activity", href: "/admin/activity", icon: Activity },
  { label: "Settings", href: "/admin/settings", icon: Settings }
] as const;

function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="grid gap-1">
      {adminRoutes.map((route) => {
        const Icon = route.icon;
        const isActive = pathname === route.href || (route.href !== "/admin" && pathname.startsWith(route.href));

        return (
          <Link
            key={route.href}
            className={`inline-flex min-h-11 items-center gap-3 border px-3 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] ${
              isActive
                ? "border-[var(--pb-line-strong)] bg-[rgba(168,255,63,0.12)] text-[var(--pb-green)]"
                : "border-transparent text-[var(--pb-muted)] hover:border-[var(--pb-line)] hover:text-[var(--pb-cream)]"
            }`}
            href={route.href as Route}
            onClick={onNavigate}
          >
            <Icon aria-hidden="true" size={17} />
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-label="Open admin navigation"
        className="fixed left-5 top-4 z-50 inline-flex size-10 items-center justify-center border border-[var(--pb-line)] bg-black text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] lg:hidden"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <Menu aria-hidden="true" size={18} />
      </button>
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[var(--pb-line)] bg-black p-5 lg:block">
        <div className="mb-8 border-b border-[var(--pb-line)] pb-5">
          <p className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">ProBlend</p>
          <p className="mt-2 text-xs font-bold uppercase text-[var(--pb-dim)]">Operations OS</p>
        </div>
        <AdminNav />
      </aside>
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation drawer">
          <div className="h-full w-[min(20rem,86vw)] border-r border-[var(--pb-line)] bg-black p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-[var(--font-display)] text-3xl font-semibold leading-none text-[var(--pb-cream)]">ProBlend</p>
                <p className="mt-2 text-xs font-bold uppercase text-[var(--pb-dim)]">Operations OS</p>
              </div>
              <button
                aria-label="Close admin navigation"
                className="inline-flex size-10 items-center justify-center border border-[var(--pb-line)] text-[var(--pb-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)]"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <AdminNav onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
