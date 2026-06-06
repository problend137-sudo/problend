import type { ReactNode } from "react";

type DataTableColumn<Row> = {
  key: string;
  label: string;
  className?: string;
  render: (row: Row) => ReactNode;
};

type DataTableProps<Row> = {
  columns: Array<DataTableColumn<Row>>;
  rows: Row[];
  emptyLabel: string;
};

export function DataTable<Row>({ columns, rows, emptyLabel }: DataTableProps<Row>) {
  return (
    <div className="overflow-x-auto border border-[var(--pb-line)] bg-black/20">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-white/[0.04] text-xs font-bold uppercase text-[var(--pb-dim)]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={`border-b border-[var(--pb-line)] px-4 py-3 ${column.className ?? ""}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-center text-[var(--pb-muted)]" colSpan={columns.length}>
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-[var(--pb-line)] last:border-b-0">
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-3 align-top text-[var(--pb-cream)] ${column.className ?? ""}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
