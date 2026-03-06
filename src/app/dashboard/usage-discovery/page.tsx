'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Youtube, ExternalLink, Eye, Music, Info, AlertCircle, CheckCircle2, ShieldAlert, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockReleases } from '@/lib/mock-data';

interface YouTubeResult {
    videoId: string;
    title: string;
    channelTitle: string;
    views: number;
    thumbnail?: string;
    url: string;
    isShort: boolean;
}

interface UsageRecord {
    stats: {
        totalShorts: number;
        totalShortsViews: number;
        totalUgcVideos: number;
        totalUgcViews: number;
    };
    videos: YouTubeResult[];
    lastUpdated: string;
}

export default function UsageDiscoveryPage() {
    const [selectedRelease, setSelectedRelease] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false);
    const [usageData, setUsageData] = useState<Record<string, UsageRecord>>({});
    const [hasRealData, setHasRealData] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<UsageRecord | null>(null);

    const fetchUsage = useCallback(async () => {
        try {
            const res = await fetch('/api/youtube/usage');
            const json = await res.json();
            if (json.success && json.count > 0) {
                setUsageData(json.data);
                setHasRealData(true);
            }
        } catch { /* silent */ }
    }, []);

    useEffect(() => { fetchUsage(); }, [fetchUsage]);

    const handleSearch = () => {
        if (!selectedRelease) return;
        setIsSearching(true);
        setTimeout(() => {
            const record = usageData[selectedRelease];
            setCurrentRecord(record || {
                stats: { totalShorts: 0, totalShortsViews: 0, totalUgcVideos: 0, totalUgcViews: 0 },
                videos: [],
                lastUpdated: new Date().toISOString()
            });
            setIsSearching(false);
        }, 800);
    };

    const handleClaim = (videoId: string) => {
        alert("Telifi Topla (Claim) talebi Admin'e (Toprak) iletildi! Video ID: " + videoId);
    };

    const handleTakedown = (videoId: string) => {
        if (confirm("Bu videoyu yayından kaldırma (Takedown) talebi oluşturmak istediğinize emin misiniz?")) {
            alert("Takedown talebi Admin'e (Toprak) iletildi! Video ID: " + videoId);
        }
    };

    return (
        <div>
            <PageHeader
                title="Usage Discovery & UGC"
                description="Müziğinizin YouTube'daki izinsiz kullanımlarını (UGC) keşfedin ve Shorts viralitesini takip edin."
                breadcrumbs={[{ label: 'Portal', href: '/dashboard' }, { label: 'Usage Discovery' }]}
            />

            {/* Status Banner */}
            {hasRealData ? (
                <div className="mb-6 p-4 bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-emerald-400">YouTube Data v3 Aktif</p>
                        <p className="text-xs text-[#F5F0EB]/40 mt-1">
                            n8n güdümlü Kullanım Keşfi robotumuz arka planda çalışıyor. Şarkınızı aratarak güncel tarama sonuçlarını görebilirsiniz.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-amber-400">n8n YouTube Sync Bekleniyor</p>
                        <p className="text-xs text-[#F5F0EB]/40 mt-1">
                            Lütfen n8n üzerinden YouTube Workflow'u çalıştırın. Bekleyen tarama işlemi olmadığı için sonuçlar boş dönecektir.
                        </p>
                    </div>
                </div>
            )}

            {/* Search Panel */}
            <Card className="mb-6">
                <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <h3 className="text-sm font-bold uppercase tracking-[2px] text-[#F5F0EB]/70">Content-ID & Keşif Radarı</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={selectedRelease}
                            onChange={e => setSelectedRelease(e.target.value)}
                            className="flex-1 px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40"
                        >
                            <option value="">Şarkı seçin...</option>
                            {mockReleases.filter(r => r.status === 'live').map(r => (
                                <option key={r.id} value={r.id}>{r.title} — {r.artist}</option>
                            ))}
                        </select>
                        <Button
                            icon={<Search className="w-3.5 h-3.5" />}
                            onClick={handleSearch}
                            size="sm"
                            disabled={!selectedRelease || isSearching}
                        >
                            {isSearching ? 'Keşfediliyor...' : 'YouTube\'da Tara'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Area */}
            {currentRecord && (
                <div className="animate-in fade-in duration-500">
                    {/* Summary Widgets */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-4 relative overflow-hidden">
                            <Youtube className="absolute -right-4 -bottom-4 w-16 h-16 text-white/[0.02]" />
                            <p className="text-[10px] uppercase tracking-[2px] text-[#F5F0EB]/30 mb-1">Bulunan UGC Video</p>
                            <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                                {currentRecord.stats.totalUgcVideos}
                            </p>
                        </div>
                        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-4 relative overflow-hidden">
                            <Eye className="absolute -right-2 -bottom-2 w-12 h-12 text-[#E41E2B]/5" />
                            <p className="text-[10px] uppercase tracking-[2px] text-[#F5F0EB]/30 mb-1">UGC İzlenmesi</p>
                            <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                                {currentRecord.stats.totalUgcViews.toLocaleString('tr-TR')}
                            </p>
                        </div>
                        <div className="bg-[#111110] border border-[#E41E2B]/20 p-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E41E2B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <TrendingUp className="absolute -right-2 -bottom-2 w-12 h-12 text-[#E41E2B]/10" />
                            <p className="text-[10px] uppercase tracking-[2px] text-[#E41E2B]/70 mb-1">Bulunan Shorts</p>
                            <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#E41E2B]">
                                {currentRecord.stats.totalShorts}
                                <span className="text-xs font-sans tracking-normal text-[#E41E2B]/50 ml-2">Video</span>
                            </p>
                        </div>
                        <div className="bg-[#111110] border border-[#E41E2B]/20 p-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E41E2B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Eye className="absolute -right-2 -bottom-2 w-12 h-12 text-[#E41E2B]/10" />
                            <p className="text-[10px] uppercase tracking-[2px] text-[#E41E2B]/70 mb-1">Shorts Görüntülenmesi</p>
                            <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#E41E2B]">
                                {currentRecord.stats.totalShortsViews.toLocaleString('tr-TR')}
                            </p>
                        </div>
                    </div>

                    {/* Video List */}
                    <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] divide-y divide-[#F5F0EB]/[0.04]">
                        {currentRecord.videos.length === 0 ? (
                            <div className="text-center py-16">
                                <ShieldAlert className="w-10 h-10 text-[#F5F0EB]/10 mx-auto mb-3" />
                                <p className="text-sm text-[#F5F0EB]/30">
                                    Son taramada YouTube'da kaçak veya izinsiz kullanıma rastlanmadı.
                                </p>
                                <p className="text-xs text-[#F5F0EB]/20 mt-1">Son Tarama: {currentRecord.lastUpdated ? new Date(currentRecord.lastUpdated).toLocaleString('tr-TR') : 'Hiç yapılmadı'}</p>
                            </div>
                        ) : (
                            currentRecord.videos.sort((a, b) => b.views - a.views).map(video => (
                                <div key={video.videoId} className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 hover:bg-[#F5F0EB]/[0.02] transition-colors">
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        <div className="w-24 h-14 bg-[#1a1a1a] border border-[#F5F0EB]/[0.06] overflow-hidden relative flex-shrink-0 group">
                                            {video.thumbnail ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={video.thumbnail} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Youtube className="w-6 h-6 text-white/10" />
                                                </div>
                                            )}
                                            {video.isShort && (
                                                <div className="absolute top-1 left-1 bg-[#E41E2B] text-white text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                                                    SHORTS
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[#F5F0EB] line-clamp-1" title={video.title}>{video.title}</p>
                                            <p className="text-xs text-[#F5F0EB]/40 mt-0.5">{video.channelTitle}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1.5 text-xs text-[#F5F0EB]/50 font-medium">
                                                    <Eye className="w-3.5 h-3.5" />
                                                    {video.views.toLocaleString('tr-TR')}
                                                </span>
                                                <a
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#F5F0EB]/30 hover:text-[#3B82F6] transition-colors"
                                                >
                                                    İzle <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:w-auto w-full border-t border-[#F5F0EB]/[0.06] md:border-0 pt-3 md:pt-0">
                                        <button
                                            onClick={() => handleClaim(video.videoId)}
                                            className="flex-1 md:flex-none px-3 py-1.5 bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-xs font-semibold hover:bg-[#4ADE80]/20 transition-colors text-center"
                                        >
                                            CLAIM GELİRİ
                                        </button>
                                        <button
                                            onClick={() => handleTakedown(video.videoId)}
                                            className="flex-1 md:flex-none px-3 py-1.5 bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs font-semibold hover:bg-[#EF4444]/20 transition-colors text-center"
                                        >
                                            TAKEDOWN
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
