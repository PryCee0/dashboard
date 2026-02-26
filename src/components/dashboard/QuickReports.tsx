'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Disc3, DollarSign, ArrowRight } from 'lucide-react';

export default function QuickReports() {
    const { t } = useLanguage();

    const reports = [
        {
            titleKey: 'salesReport' as const,
            value: '$0.00',
            subtitleKey: 'totalRevenue' as const,
            icon: <TrendingUp className="w-5 h-5" />,
            color: '#E41E2B',
        },
        {
            titleKey: 'catalog' as const,
            value: '5',
            subtitleKey: 'liveReleases' as const,
            icon: <Disc3 className="w-5 h-5" />,
            color: '#3B82F6',
        },
        {
            titleKey: 'payouts' as const,
            value: '$0.00',
            subtitleKey: 'totalPaidOut' as const,
            icon: <DollarSign className="w-5 h-5" />,
            color: '#10B981',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reports.map((report) => (
                <div
                    key={report.titleKey}
                    className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden group
            hover:border-[#E41E2B]/20 transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#E41E2B]"
                >
                    <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300" style={{ background: report.color }} />
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 flex items-center justify-center" style={{ background: report.color }}>
                            <span className="text-white">{report.icon}</span>
                        </div>
                        <button className="text-[#F5F0EB]/30 hover:text-[#F5F0EB] transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-[#F5F0EB]/50 text-xs uppercase tracking-[2px] font-semibold mb-1">{t(report.titleKey)}</p>
                    <p className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[1px]">{report.value}</p>
                    <p className="text-[#F5F0EB]/30 text-xs mt-1">{t(report.subtitleKey)}</p>
                </div>
            ))}
        </div>
    );
}
