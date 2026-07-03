import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 flex items-center justify-center gap-4">

            <button
                type="button"
                onClick={() => onPageChange(Math.max(page - 1, 0))}
                disabled={page === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-800 disabled:hover:text-slate-200"
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            <span className="text-sm font-medium text-slate-400">
                Page <span className="text-white">{page + 1}</span> of {totalPages}
            </span>

            <button
                type="button"
                onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-800 disabled:hover:text-slate-200"
            >
                Next
                <ChevronRight size={16} />
            </button>

        </div>
    );
}

export default Pagination;
