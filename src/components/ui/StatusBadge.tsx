'use client';

type BadgeVariant = 'live' | 'pending' | 'processing' | 'declined' | 'closed' | 'open' | 'draft' | 'new' | 'coming-soon';

const variantStyles: Record<BadgeVariant, string> = {
    live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    open: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    processing: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    declined: 'bg-red-500/15 text-red-400 border-red-500/20',
    closed: 'bg-[#F5F0EB]/10 text-[#F5F0EB]/40 border-[#F5F0EB]/10',
    draft: 'bg-[#F5F0EB]/[0.06] text-[#F5F0EB]/30 border-[#F5F0EB]/[0.08]',
    new: 'bg-[#E41E2B]/15 text-[#E41E2B] border-[#E41E2B]/20',
    'coming-soon': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
};

const variantLabels: Record<BadgeVariant, string> = {
    live: 'Yayında',
    open: 'Açık',
    pending: 'Beklemede',
    processing: 'İşleniyor',
    declined: 'Reddedildi',
    closed: 'Kapatıldı',
    draft: 'Taslak',
    new: 'Yeni',
    'coming-soon': 'Yakında',
};

interface StatusBadgeProps {
    variant: BadgeVariant;
    label?: string;
    dot?: boolean;
}

export default function StatusBadge({ variant, label, dot = true }: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px] border ${variantStyles[variant]}`}
        >
            {dot && (
                <span className={`w-1.5 h-1.5 rounded-full ${variant === 'live' || variant === 'open' ? 'bg-emerald-400' :
                        variant === 'pending' ? 'bg-amber-400' :
                            variant === 'processing' ? 'bg-blue-400' :
                                variant === 'declined' ? 'bg-red-400' :
                                    variant === 'new' ? 'bg-[#E41E2B]' :
                                        variant === 'coming-soon' ? 'bg-purple-400' :
                                            'bg-[#F5F0EB]/30'
                    }`} />
            )}
            {label || variantLabels[variant]}
        </span>
    );
}
