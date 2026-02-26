'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    searchable?: boolean;
    searchPlaceholder?: string;
    pageSize?: number;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
    headerActions?: React.ReactNode;
    keyExtractor: (row: T) => string;
}

export default function DataTable<T>({
    columns,
    data,
    searchable = true,
    searchPlaceholder = 'Ara...',
    pageSize = 10,
    emptyMessage = 'Kayıt bulunamadı',
    onRowClick,
    headerActions,
    keyExtractor,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);

    // Filter
    const filtered = useMemo(() => {
        if (!search.trim()) return data;
        const q = search.toLowerCase();
        return data.filter((row) =>
            columns.some((col) => {
                const val = (row as Record<string, unknown>)[col.key];
                return val != null && String(val).toLowerCase().includes(q);
            })
        );
    }, [data, search, columns]);

    // Sort
    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return [...filtered].sort((a, b) => {
            const va = (a as Record<string, unknown>)[sortKey];
            const vb = (b as Record<string, unknown>)[sortKey];
            if (va == null || vb == null) return 0;
            const cmp = String(va).localeCompare(String(vb), 'tr', { numeric: true });
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [filtered, sortKey, sortDir]);

    // Paginate
    const totalPages = Math.ceil(sorted.length / pageSize);
    const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
        setPage(0);
    };

    return (
        <div>
            {/* Toolbar */}
            {(searchable || headerActions) && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    {searchable && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/25" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                                placeholder={searchPlaceholder}
                                className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40 transition-colors"
                            />
                        </div>
                    )}
                    {headerActions && (
                        <div className="flex items-center gap-2">{headerActions}</div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto border border-[#F5F0EB]/[0.06]">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#F5F0EB]/[0.06] bg-[#F5F0EB]/[0.02]">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[2px] text-[#F5F0EB]/30
                    ${col.sortable ? 'cursor-pointer select-none hover:text-[#F5F0EB]/50' : ''} ${col.className || ''}`}
                                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                >
                                    <span className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && sortKey === col.key && (
                                            sortDir === 'asc'
                                                ? <ChevronUp className="w-3 h-3" />
                                                : <ChevronDown className="w-3 h-3" />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paged.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-12 text-center text-[#F5F0EB]/25 text-sm">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paged.map((row) => (
                                <tr
                                    key={keyExtractor(row)}
                                    className={`border-b border-[#F5F0EB]/[0.04] transition-colors hover:bg-[#F5F0EB]/[0.02]
                    ${onRowClick ? 'cursor-pointer' : ''}`}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className={`px-4 py-3 text-[#F5F0EB]/70 ${col.className || ''}`}>
                                            {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-xs text-[#F5F0EB]/30">
                    <span>
                        Sayfa {page + 1} / {totalPages} ({sorted.length} kayıt)
                    </span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="p-1.5 hover:bg-[#F5F0EB]/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const startPage = Math.max(0, Math.min(page - 2, totalPages - 5));
                            const p = startPage + i;
                            if (p >= totalPages) return null;
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-7 h-7 text-xs font-medium transition-colors
                    ${p === page ? 'bg-[#E41E2B] text-white' : 'hover:bg-[#F5F0EB]/[0.06] text-[#F5F0EB]/40'}`}
                                >
                                    {p + 1}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                            disabled={page >= totalPages - 1}
                            className="p-1.5 hover:bg-[#F5F0EB]/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
