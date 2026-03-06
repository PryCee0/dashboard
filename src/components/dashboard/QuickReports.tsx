'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Disc3, DollarSign, ArrowRight } from 'lucide-react';

export default function QuickReports() {
    const { t } = useLanguage();

    const reports = [
        {
            titleKey: 'salesReport' as const,
            value: '$530.80',
            subtitleKey: 'totalRevenue' as const,
            icon: <TrendingUp className="w-5 h-5" />,
            color: '#E41E2B',
            href: '/dashboard/wallet',
        },
        {
            titleKey: 'catalog' as const,
            value: '8',
            subtitleKey: 'liveReleases' as const,
            icon: <Disc3 className="w-5 h-5" />,
            color: '#3B82F6',
            href: '/dashboard/releases',
        },
        {
            titleKey: 'payouts' as const,
            value: '$200.00',
            subtitleKey: 'totalPaidOut' as const,
            icon: <DollarSign className="w-5 h-5" />,
            color: '#10B981',
            href: '/dashboard/wallet',
        },
    ];

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden animate-fadeInUp stagger-3">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase mb-4">Hızlı Rapor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reports.map((report, idx) => (
                    <Link
                        href={report.href}
                        key={report.titleKey}
                        className="bg-[#0C0A09] border border-[#F5F0EB]/[0.04] p-4 relative overflow-hidden group
                            hover:border-[#E41E2B]/20 transition-all duration-300
                            hover:translate-y-[-2px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]
                            animate-fadeInScale block"
                        style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                        {/* Color left bar (expands on hover) */}
                        <div className="absolute top-0 left-0 w-0.5 h-0 group-hover:h-full transition-all duration-300" style={{ background: report.color }} />

                        <div className="flex items-start justify-between mb-3">
                            <div className="w-9 h-9 flex items-center justify-center" style={{ background: `${report.color}20`, border: `1px solid ${report.color}30` }}>
                                <span style={{ color: report.color }}>{report.icon}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#F5F0EB]/20 group-hover:text-[#F5F0EB]/60 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                        <p className="text-[#F5F0EB]/40 text-[10px] uppercase tracking-[2px] font-semibold mb-1">{t(report.titleKey)}</p>
                        <p className="font-['Bebas_Neue',sans-serif] text-xl tracking-[1px] text-[#F5F0EB]">{report.value}</p>
                        <p className="text-[#F5F0EB]/25 text-[10px] mt-0.5">{t(report.subtitleKey)}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
