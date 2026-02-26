'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockAnalytics } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const platforms = [
    { key: 'spotify', label: 'Spotify', color: '#1DB954' },
    { key: 'tiktok', label: 'TikTok', color: '#FF0050' },
    { key: 'applemusic', label: 'Apple Music', color: '#FA2D48' },
    { key: 'youtubemusic', label: 'YouTube Music', color: '#FF0000' },
];

export default function AnalyticsSnapshot() {
    const [activePlatform, setActivePlatform] = useState('spotify');
    const { t } = useLanguage();
    const activeData = mockAnalytics[activePlatform] || [];
    const activeColor = platforms.find(p => p.key === activePlatform)?.color || '#E41E2B';

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase">{t('analytics')}</h3>
                <div className="flex items-center gap-1 bg-[#0C0A09] border border-[#F5F0EB]/[0.06] px-2 py-1">
                    <span className="text-[10px] text-[#F5F0EB]/40 uppercase tracking-wider">{t('last90Days')}</span>
                </div>
            </div>
            <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
                {platforms.map((platform) => (
                    <button key={platform.key} onClick={() => setActivePlatform(platform.key)}
                        className={`text-[10px] font-bold uppercase tracking-[2px] px-3 py-1.5 transition-all whitespace-nowrap
              ${activePlatform === platform.key ? 'text-white' : 'text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60 bg-transparent'}`}
                        style={activePlatform === platform.key ? { background: platform.color } : {}}>
                        {platform.label}
                    </button>
                ))}
            </div>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeData}>
                        <defs>
                            <linearGradient id={`gradient-${activePlatform}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={activeColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={activeColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(245,240,235,0.3)' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(245,240,235,0.3)' }} />
                        <Tooltip contentStyle={{ background: '#111110', border: '1px solid rgba(245,240,235,0.1)', fontSize: '12px', color: '#F5F0EB' }} />
                        <Area type="monotone" dataKey="streams" stroke={activeColor} fill={`url(#gradient-${activePlatform})`} strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
