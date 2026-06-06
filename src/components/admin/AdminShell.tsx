import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type { AdminContext } from "@/features/admin-auth/guards";

export function AdminShell({ admin, children }: { admin: AdminContext; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--pb-black)] text-[var(--pb-cream)]">
      <AdminSidebar />
      <div className="lg:pl-72">
        <AdminHeader adminName={admin.user.name} />
        <main className="px-5 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
