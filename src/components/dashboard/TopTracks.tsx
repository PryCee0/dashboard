'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { mockTopTracks } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Music } from 'lucide-react';

export default function TopTracks() {
    const { t } = useLanguage();

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />
            <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase mb-4">{t('topTracks')}</h3>
            <div className="space-y-2">
                {mockTopTracks.map((track, index) => (
                    <div key={track.id} className="flex items-center gap-3 bg-[#0C0A09] border border-[#F5F0EB]/[0.04] px-3 py-2.5 hover:border-[#F5F0EB]/10 transition-colors group">
                        <span className="font-['Bebas_Neue',sans-serif] text-lg text-[#F5F0EB]/20 w-6 text-center">{index + 1}</span>
                        <div className="w-9 h-9 bg-[#111110] border border-[#F5F0EB]/[0.06] flex items-center justify-center flex-shrink-0">
                            <Music className="w-3.5 h-3.5 text-[#F5F0EB]/15" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#F5F0EB] truncate group-hover:text-[#E41E2B] transition-colors">{track.title}</p>
                            <p className="text-[11px] text-[#F5F0EB]/35 truncate">{track.artist}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="text-sm font-medium text-[#F5F0EB]/70">{track.streams.toLocaleString()}</p>
                            <div className="flex items-center justify-end gap-1">
                                {track.change >= 0 ? <TrendingUp className="w-3 h-3 text-[#10B981]" /> : <TrendingDown className="w-3 h-3 text-[#EF4444]" />}
                                <span className={`text-[10px] font-bold ${track.change >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                    {track.change >= 0 ? '+' : ''}{track.change}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
