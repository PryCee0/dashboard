'use client';

import Link from 'next/link';
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
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden animate-fadeInUp stagger-2">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]" />

            {/* Background orb */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#3B82F6]/[0.03] rounded-full blur-2xl" />

            <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase">{t('releases')}</h3>
                <Link href="/dashboard/releases"
                    className="text-[#E41E2B] text-xs font-semibold uppercase tracking-[2px] hover:text-[#FF2D3B] transition-colors flex items-center gap-1 group">
                    {t('viewAll')}
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-150" />
                </Link>
            </div>

            <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2">
                {mockReleases.map((release, idx) => (
                    <Link
                        key={release.id}
                        href={`/dashboard/releases/${release.id}`}
                        className="flex-shrink-0 w-[140px] group cursor-pointer animate-fadeInScale"
                        style={{ animationDelay: `${idx * 0.07}s` }}
                    >
                        <div className="w-[140px] h-[140px] bg-[#0C0A09] border border-[#F5F0EB]/[0.06] flex items-center justify-center mb-2
                            group-hover:border-[#E41E2B]/30 group-hover:scale-[1.03] transition-all duration-300 relative overflow-hidden">

                            {/* Hover overlay glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E41E2B]/0 to-[#E41E2B]/0 group-hover:from-[#E41E2B]/10 group-hover:to-transparent transition-all duration-300" />

                            <Disc3 className="w-10 h-10 text-[#F5F0EB]/10 group-hover:text-[#F5F0EB]/20 group-hover:rotate-12 transition-all duration-300" />

                            <div className="absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                                style={{ background: statusColors[release.status] }}>
                                {statusLabels[release.status]}
                            </div>
                        </div>
                        <p className="text-sm font-medium text-[#F5F0EB] truncate group-hover:text-[#E41E2B] transition-colors duration-200">{release.title}</p>
                        <p className="text-xs text-[#F5F0EB]/40 truncate">{release.artist}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
