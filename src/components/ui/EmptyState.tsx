'use client';

import { Flower2, Inbox, Search, FileX } from 'lucide-react';

type EmptyIcon = 'cactus' | 'inbox' | 'search' | 'file';

const iconMap: Record<EmptyIcon, React.ReactNode> = {
    cactus: <Flower2 className="w-12 h-12" />,
    inbox: <Inbox className="w-12 h-12" />,
    search: <Search className="w-12 h-12" />,
    file: <FileX className="w-12 h-12" />,
};

interface EmptyStateProps {
    icon?: EmptyIcon;
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

export default function EmptyState({
    icon = 'cactus',
    title = 'Henüz burada bir şey yok...',
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.06] flex items-center justify-center mb-6 text-[#F5F0EB]/20">
                {iconMap[icon]}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[#F5F0EB]/60 mb-2">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="text-sm text-[#F5F0EB]/30 max-w-md mb-6">
                    {description}
                </p>
            )}

            {/* Action */}
            {action && <div>{action}</div>}
        </div>
    );
}
