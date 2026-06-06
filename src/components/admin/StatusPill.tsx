const statusStyles: Record<string, string> = {
  new: "border-[rgba(168,255,63,0.38)] bg-[rgba(168,255,63,0.12)] text-[var(--pb-green)]",
  reviewing: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  reviewed: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  replied: "border-sky-300/40 bg-sky-300/10 text-sky-200",
  qualified: "border-emerald-300/40 bg-emerald-300/10 text-emerald-200",
  forecasted: "border-cyan-300/40 bg-cyan-300/10 text-cyan-200",
  contacted: "border-sky-300/40 bg-sky-300/10 text-sky-200",
  won: "border-[rgba(168,255,63,0.44)] bg-[rgba(168,255,63,0.16)] text-[var(--pb-green)]",
  lost: "border-red-300/40 bg-red-300/10 text-red-200",
  archived: "border-[var(--pb-line)] bg-white/5 text-[var(--pb-muted)]",
  open: "border-[rgba(168,255,63,0.38)] bg-[rgba(168,255,63,0.12)] text-[var(--pb-green)]",
  draft: "border-[var(--pb-line)] bg-white/5 text-[var(--pb-muted)]",
  closed: "border-red-300/40 bg-red-300/10 text-red-200"
};

export function StatusPill({ status }: { status: string | null | undefined }) {
  const value = status ?? "unknown";
  const className = statusStyles[value] ?? "border-[var(--pb-line)] bg-white/5 text-[var(--pb-muted)]";

  return (
    <span className={`inline-flex min-h-7 items-center border px-2.5 text-xs font-bold uppercase leading-none ${className}`}>
      {value.replaceAll("_", " ")}
    </span>
  );
}
