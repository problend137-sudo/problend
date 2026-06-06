import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#050705] text-[var(--pb-cream)]">{children}</div>;
}
