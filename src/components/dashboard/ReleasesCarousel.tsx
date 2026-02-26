'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { mockReleases } from '@/lib/mock-data';
import { ChevronRight, Disc3 } from 'lucide-react';
import { useRef } from 'react';

export default function ReleasesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    const statusColors: Record<string, string> = {
        live: '#10B981', pending: '#F59E0B', processing: '#3B82F6', rejected: '#EF4444',
    };
    const statusLabels: Record<string, string> = {
        live: 'Live', pending: 'Pending', processing: 'Processing', rejected: 'Rejected',
    };

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]" />
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase">{t('releases')}</h3>
                <button className="text-[#E41E2B] text-xs font-semibold uppercase tracking-[2px] hover:text-[#FF2D3B] transition-colors flex items-center gap-1">
                    {t('viewAll')} <ChevronRight className="w-3 h-3" />
                </button>
            </div>
            <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {mockReleases.map((release) => (
                    <div key={release.id} className="flex-shrink-0 w-[140px] group cursor-pointer">
                        <div className="w-[140px] h-[140px] bg-[#0C0A09] border border-[#F5F0EB]/[0.06] flex items-center justify-center mb-2
              group-hover:border-[#E41E2B]/30 transition-all duration-300 relative overflow-hidden">
                            <Disc3 className="w-10 h-10 text-[#F5F0EB]/10" />
                            <div className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                                style={{ background: statusColors[release.status] }}>
                                {statusLabels[release.status]}
                            </div>
                        </div>
                        <p className="text-sm font-medium text-[#F5F0EB] truncate">{release.title}</p>
                        <p className="text-xs text-[#F5F0EB]/40 truncate">{release.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
