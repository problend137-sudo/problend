import type { ReactNode } from "react";

type ScoreCardProps = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
};

export function ScoreCard({ label, value, detail }: ScoreCardProps) {
  return (
    <div className="border border-[var(--pb-line)] bg-[var(--pb-panel)] p-4">
      <p className="text-xs font-bold uppercase text-[var(--pb-dim)]">{label}</p>
      <div className="mt-3 font-[var(--font-display)] text-4xl font-semibold leading-none text-[var(--pb-cream)]">{value}</div>
      {detail ? <div className="mt-3 text-sm leading-5 text-[var(--pb-muted)]">{detail}</div> : null}
    </div>
  );
}
