import type { ReactNode } from "react";

export interface TableColumn<T> {
    header: string;
    cell: (row: T) => ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
}

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    keyField: (row: T) => React.Key;
    onRowClick?: (row: T) => void;
}

const alignClass: Record<"left" | "right" | "center", string> = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
};

function Table<T>({ columns, data, keyField, onRowClick }: TableProps<T>) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm">
            <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/80">
                            {columns.map((column) => (
                                <th
                                    key={column.header}
                                    scope="col"
                                    className={`whitespace-nowrap px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-400 ${alignClass[column.align ?? "left"]} ${column.className ?? ""}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800/80">
                        {data.map((row) => (
                            <tr
                                key={keyField(row)}
                                onClick={onRowClick ? () => onRowClick(row) : undefined}
                                className={`transition-colors ${onRowClick ? "cursor-pointer hover:bg-slate-800/40" : "hover:bg-slate-800/20"}`}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.header}
                                        className={`px-5 py-4 align-middle text-slate-200 ${alignClass[column.align ?? "left"]} ${column.className ?? ""}`}
                                    >
                                        {column.cell(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;