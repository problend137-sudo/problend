"use client";

import { useFormStatus } from "react-dom";

export function AuthSubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex min-h-11 w-full items-center justify-center border border-[var(--pb-green)] bg-[var(--pb-green)] px-5 text-sm font-extrabold text-[#040504] transition-colors duration-200 hover:bg-transparent hover:text-[var(--pb-green)] focus:outline-none focus:ring-2 focus:ring-[var(--pb-green)] disabled:cursor-not-allowed disabled:opacity-65"
      disabled={pending}
      type="submit"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
