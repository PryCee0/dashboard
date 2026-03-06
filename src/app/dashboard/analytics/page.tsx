'use client';

import { useState, useEffect, useCallback } from 'react';
import { Disc3, TrendingUp, Music, RefreshCw, Zap, Info, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockReleases } from '@/lib/mock-data';

const PLATFORM_RATES: Record<string, number> = {
    'Spotify': 3.5,
    'Apple Music': 7.5,
    'YouTube Music': 1.5,
    'Deezer': 4.0,
    'Tidal': 9.5,
    'Amazon Music': 4.0,
};

interface AnalyticsTrack {
    id: string;
    title: string;
    artist: string;
    popularityScore: number;
    lastfmListeners: number;
    radarScore: number;
}

const DEMO_ANALYTICS: AnalyticsTrack[] = [
    { id: '1', title: 'UMRUMDA', artist: 'Vertigo', popularityScore: 0, lastfmListeners: 0, radarScore: 0 },
    { id: '2', title: 'Kayıp Ruhum', artist: 'Vertigo', popularityScore: 0, lastfmListeners: 0, radarScore: 0 },
    { id: '3', title: 'Onlar Anlamazlar', artist: 'Vertigo', popularityScore: 0, lastfmListeners: 0, radarScore: 0 },
];

function RadarGauge({ score }: { score: number }) {
    const color = score >= 70 ? '#10B981' : score >= 45 ? '#F59E0B' : '#EF4444';
    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#F5F0EB10" strokeWidth="6" />
                <circle
                    cx="40" cy="40" r="32" fill="none"
                    stroke={color} strokeWidth="6"
                    strokeDasharray={`${(score / 100) * 201} 201`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    className="transition-all duration-700"
                />
            </svg>
            <div className="absolute text-center">
                <p className="text-lg font-['Bebas_Neue',sans-serif] tracking-wider" style={{ color }}>{score}</p>
            </div>
        </div>
    );
}

function EarningsSimulator() {
    const [streams, setStreams] = useState(100000);
    return (
        <Card>
            <CardContent>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-[#E41E2B]" />
                    <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#F5F0EB]/70">Earnings Simulator</h3>
                    <div className="group relative ml-auto">
                        <Info className="w-3.5 h-3.5 text-[#F5F0EB]/20 cursor-help" />
                        <div className="absolute right-0 top-5 hidden group-hover:block w-56 p-2 bg-[#1a1a1a] border border-[#F5F0EB]/10 text-[10px] text-[#F5F0EB]/50 z-10">
                            Tahmini gelir. Gerçek telif ödemeleri platform politikalarına göre değişir.
                        </div>
                    </div>
                </div>
                <p className="text-xs text-[#F5F0EB]/40 mb-3">Hedef stream sayısını girin:</p>
                <input
                    type="range" min={1000} max={10000000} step={1000}
                    value={streams} onChange={e => setStreams(Number(e.target.value))}
                    className="w-full accent-[#E41E2B] mb-2"
                />
                <p className="text-center font-['Bebas_Neue',sans-serif] text-2xl text-[#F5F0EB] tracking-[2px] mb-4">
                    {streams.toLocaleString('tr-TR')} streams
                </p>
                <div className="space-y-1.5">
                    {Object.entries(PLATFORM_RATES).map(([platform, rate]) => (
                        <div key={platform} className="flex items-center justify-between text-xs">
                            <span className="text-[#F5F0EB]/50">{platform}</span>
                            <span className="text-emerald-400 font-semibold">${((streams / 1000) * rate).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#F5F0EB]/[0.06] flex justify-between items-center">
                    <span className="text-xs text-[#F5F0EB]/30 uppercase tracking-widest">Tahmini Ortalama</span>
                    <span className="font-['Bebas_Neue',sans-serif] text-lg text-[#E41E2B] tracking-[2px]">
                        ${(Object.values(PLATFORM_RATES).reduce((s, r) => s + (streams / 1000) * r, 0) / Object.keys(PLATFORM_RATES).length).toFixed(2)}
                        <span className="text-xs text-[#F5F0EB]/30 font-sans ml-1">~/platform</span>
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default function AnalyticsPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsTrack[]>(DEMO_ANALYTICS);
    const [hasRealData, setHasRealData] = useState(false);
    const [lastSynced, setLastSynced] = useState<string | null>(null);

    const fetchAnalytics = useCallback(async () => {
        try {
            const res = await fetch('/api/analytics/sync');
            const json = await res.json();
            if (json.success && json.count > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const tracks: AnalyticsTrack[] = Object.values(json.data).map((d: any) => ({
                    id: d.releaseId,
                    title: d.spotifyData?.name ?? d.releaseId,
                    artist: d.spotifyData?.artistName ?? 'Vertigo',
                    popularityScore: d.popularityScore ?? 0,
                    lastfmListeners: d.lastfmListeners ?? 0,
                    radarScore: d.radarScore ?? 0,
                }));
                setAnalyticsData(tracks);
                setHasRealData(true);
                setLastSynced(new Date().toLocaleTimeString('tr-TR'));
            }
        } catch { /* silent — show demo */ }
    }, []);

    useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchAnalytics();
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const liveReleases = mockReleases.filter(r => r.status === 'live');

    return (
        <div>
            <PageHeader
                title="Analytics"
                description="Şarkılarınızın Spotify popülerlik skoru, Last.fm dinleyici trendi ve Redpot Radar skoru."
                breadcrumbs={[{ label: 'Portal', href: '/dashboard' }, { label: 'Analytics' }]}
            >
                <button
                    onClick={handleRefresh}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] border border-[#F5F0EB]/10 text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:border-[#F5F0EB]/20 transition-all ${isRefreshing ? 'animate-pulse' : ''}`}
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Yenile
                </button>
            </PageHeader>

            {/* Status Banner */}
            {hasRealData ? (
                <div className="mb-6 p-4 bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-emerald-400">Canlı Veri Aktif</p>
                        <p className="text-xs text-[#F5F0EB]/40 mt-1">
                            n8n&apos;den son senkronizasyon: {lastSynced}. Spotify + Last.fm verisi güncellendi.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                    <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-amber-400">n8n Sync Bekleniyor</p>
                        <p className="text-xs text-[#F5F0EB]/40 mt-1">
                            n8n workflow&apos;u çalıştırıldıktan sonra gerçek veriler burada görünecek.
                        </p>
                    </div>
                </div>
            )}

            {/* Redpot Radar */}
            <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-[3px] text-[#F5F0EB]/30 mb-4">🌟 Redpot Radar — Viral Potansiyel</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analyticsData.map((track: AnalyticsTrack) => (
                        <Card key={track.id}>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-[#E41E2B]/10 flex items-center justify-center flex-shrink-0">
                                        <Music className="w-4 h-4 text-[#E41E2B]" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-[#F5F0EB] truncate">{track.title}</p>
                                        <p className="text-xs text-[#F5F0EB]/40 truncate">{track.artist}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[2px] text-[#F5F0EB]/30">Spotify Popularity</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex-1 h-1.5 bg-[#F5F0EB]/[0.06] rounded-full">
                                                    <div className="h-full bg-[#1DB954] rounded-full transition-all" style={{ width: `${track.popularityScore}%` }} />
                                                </div>
                                                <span className="text-xs text-[#F5F0EB]/60 font-mono">{track.popularityScore}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[2px] text-[#F5F0EB]/30">Last.fm Listeners</p>
                                            <p className="text-sm font-semibold text-[#F5F0EB] mt-1">{track.lastfmListeners.toLocaleString('tr-TR')}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <RadarGauge score={track.radarScore} />
                                        <p className="text-[9px] uppercase tracking-[1px] text-[#F5F0EB]/20">Radar</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Live Releases */}
            <div>
                <h2 className="text-sm font-bold uppercase tracking-[3px] text-[#F5F0EB]/30 mb-4 flex items-center gap-2">
                    <Disc3 className="w-3.5 h-3.5" /> Yayındaki Şarkılar
                </h2>
                <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] divide-y divide-[#F5F0EB]/[0.04]">
                    {liveReleases.length === 0 && (
                        <p className="text-center py-12 text-sm text-[#F5F0EB]/30">Henüz yayında şarkı yok.</p>
                    )}
                    {liveReleases.map(release => (
                        <div key={release.id} className="flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#E41E2B]/20 to-purple-900/20 flex items-center justify-center">
                                    <Disc3 className="w-4 h-4 text-[#F5F0EB]/20" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#F5F0EB]">{release.title}</p>
                                    <p className="text-xs text-[#F5F0EB]/40">{release.artist} · {release.releaseType?.toUpperCase()}</p>
                                </div>
                            </div>
                            <StatusBadge variant="live" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Earnings Simulator */}
            <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-[3px] text-[#F5F0EB]/30 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Earnings Simulator
                </h2>
                <div className="max-w-md">
                    <EarningsSimulator />
                </div>
            </div>
        </div>
    );
}
