'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { mockAnnouncements } from '@/lib/mock-data';
import { Megaphone, Sparkles, Newspaper, ChevronRight } from 'lucide-react';

export default function WhatsHappening() {
    const { t } = useLanguage();

    const typeIcons: Record<string, React.ReactNode> = {
        update: <Megaphone className="w-4 h-4" />, feature: <Sparkles className="w-4 h-4" />, news: <Newspaper className="w-4 h-4" />,
    };
    const typeColors: Record<string, string> = { update: '#3B82F6', feature: '#8B5CF6', news: '#E41E2B' };

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]" />
            <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase mb-4">{t('whatsHappening')}</h3>
            <div className="space-y-3">
                {mockAnnouncements.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 bg-[#0C0A09] border border-[#F5F0EB]/[0.04] px-4 py-3 hover:border-[#F5F0EB]/10 transition-colors cursor-pointer group">
                        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: typeColors[item.type] }}>
                            <span className="text-white">{typeIcons[item.type]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#F5F0EB] group-hover:text-[#E41E2B] transition-colors">{item.title}</p>
                            <p className="text-xs text-[#F5F0EB]/40 mt-0.5 line-clamp-2">{item.description}</p>
                            <p className="text-[10px] text-[#F5F0EB]/25 mt-1 uppercase tracking-wider">{item.date}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#F5F0EB]/20 group-hover:text-[#F5F0EB]/50 transition-colors flex-shrink-0 mt-1" />
                    </div>
                ))}
            </div>
        </div>
    );
}
