'use client';

import { X } from 'lucide-react';

interface ChipListProps {
    items: string[];
    removable?: boolean;
    onRemove?: (item: string) => void;
    maxVisible?: number;
    className?: string;
}

export default function ChipList({
    items,
    removable = false,
    onRemove,
    maxVisible,
    className = '',
}: ChipListProps) {
    const visible = maxVisible ? items.slice(0, maxVisible) : items;
    const remaining = maxVisible ? items.length - maxVisible : 0;

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {visible.map((item) => (
                <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.08]
            text-xs text-[#F5F0EB]/60 font-medium transition-colors hover:border-[#F5F0EB]/[0.15]"
                >
                    {item}
                    {removable && onRemove && (
                        <button
                            onClick={() => onRemove(item)}
                            className="text-[#F5F0EB]/25 hover:text-[#E41E2B] transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    )}
                </span>
            ))}
            {remaining > 0 && (
                <span className="inline-flex items-center px-3 py-1.5 bg-[#E41E2B]/10 border border-[#E41E2B]/20
          text-xs text-[#E41E2B] font-bold">
                    +{remaining} daha
                </span>
            )}
        </div>
    );
}
