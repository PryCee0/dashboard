'use client';

import { useState } from 'react';
import { BarChart3, Globe, Link as LinkIcon } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import Card, { CardContent } from '@/components/ui/Card';
import { mockAnalytics } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'platform', label: 'Platformlara Göre' },
    { id: 'discovery', label: 'Kullanım Keşfi' },
    { id: 'links', label: 'Release Links' },
];

const platformColors: Record<string, string> = {
    spotify: '#1DB954',
    tiktok: '#FE2C55',
    applemusic: '#FA233B',
    youtubemusic: '#FF0000',
};

const platformLabels: Record<string, string> = {
    spotify: 'Spotify',
    tiktok: 'TikTok',
    applemusic: 'Apple Music',
    youtubemusic: 'YouTube Music',
};

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Aggregate data for overview
    const overviewData = Object.entries(mockAnalytics).map(([platform, data]) => ({
        name: platformLabels[platform],
        streams: data.reduce((s, d) => s + d.streams, 0),
        color: platformColors[platform],
    }));

    const totalStreams = overviewData.reduce((s, d) => s + d.streams, 0);

    const monthlyTrend = ['2026-01', '2026-02'].map(month => ({
        month: month === '2026-01' ? 'Ocak' : 'Şubat',
        streams: Object.values(mockAnalytics).reduce((s, data) => {
            const found = data.find(d => d.date === month);
            return s + (found?.streams || 0);
        }, 0),
    }));

    return (
        <div>
            <PageHeader title="Analytics" description="Detaylı performans analitiği ve platform istatistikleri." />

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <Card>
                            <CardContent>
                                <p className="text-[10px] text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Toplam Stream</p>
                                <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                                    {totalStreams.toLocaleString('tr-TR')}
                                </p>
                            </CardContent>
                        </Card>
                        {overviewData.map((p) => (
                            <Card key={p.name}>
                                <CardContent>
                                    <p className="text-[10px] text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">{p.name}</p>
                                    <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px]" style={{ color: p.color }}>
                                        {p.streams.toLocaleString('tr-TR')}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardContent>
                                <h3 className="text-sm font-semibold text-[#F5F0EB] mb-4">Aylık Stream Trendi</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={monthlyTrend}>
                                            <XAxis dataKey="month" stroke="#F5F0EB40" fontSize={11} />
                                            <YAxis stroke="#F5F0EB40" fontSize={11} />
                                            <Tooltip
                                                contentStyle={{ background: '#111110', border: '1px solid rgba(245,240,235,0.08)', color: '#F5F0EB' }}
                                                labelStyle={{ color: '#F5F0EB' }}
                                            />
                                            <Bar dataKey="streams" fill="#E41E2B" radius={[2, 2, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <h3 className="text-sm font-semibold text-[#F5F0EB] mb-4">Platform Dağılımı</h3>
                                <div className="h-64 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={overviewData} cx="50%" cy="50%" outerRadius={80} dataKey="streams" label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                                                {overviewData.map((entry, i) => (
                                                    <Cell key={i} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ background: '#111110', border: '1px solid rgba(245,240,235,0.08)', color: '#F5F0EB' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === 'platform' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(mockAnalytics).map(([platform, data]) => (
                        <Card key={platform}>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: `${platformColors[platform]}20` }}>
                                        <BarChart3 className="w-4 h-4" style={{ color: platformColors[platform] }} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#F5F0EB]">{platformLabels[platform]}</h3>
                                        <p className="text-xs text-[#F5F0EB]/40">
                                            Toplam: {data.reduce((s, d) => s + d.streams, 0).toLocaleString('tr-TR')} stream
                                        </p>
                                    </div>
                                </div>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.filter(d => d.streams > 0)}>
                                            <XAxis dataKey="date" stroke="#F5F0EB30" fontSize={10} />
                                            <YAxis stroke="#F5F0EB30" fontSize={10} />
                                            <Bar dataKey="streams" fill={platformColors[platform]} radius={[2, 2, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {(activeTab === 'discovery' || activeTab === 'links') && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-[#F5F0EB]/[0.04] flex items-center justify-center mb-4">
                        {activeTab === 'discovery' ? <Globe className="w-8 h-8 text-[#F5F0EB]/20" /> : <LinkIcon className="w-8 h-8 text-[#F5F0EB]/20" />}
                    </div>
                    <h3 className="text-lg font-semibold text-[#F5F0EB]/60 mb-2">
                        {activeTab === 'discovery' ? 'Kullanım Keşfi' : 'Release Links'}
                    </h3>
                    <p className="text-sm text-[#F5F0EB]/30 max-w-md">
                        {activeTab === 'discovery'
                            ? 'Müziğinizin nerede kullanıldığını keşfedin. Veriler işlendikçe burada görüntülenecektir.'
                            : 'Release link performans verileriniz burada görüntülenecektir.'}
                    </p>
                </div>
            )}
        </div>
    );
}
