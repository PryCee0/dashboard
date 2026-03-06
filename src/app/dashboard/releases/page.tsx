'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, ArrowUpDown, Disc3, Search, Eye, Pencil, Share2, Trash2, Music, MoreVertical } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { mockReleases } from '@/lib/mock-data';
import { Release } from '@/types';

const tabs = [
    { id: 'all', label: 'Releases', count: 0 },
    { id: 'tracks', label: 'Tracks' },
    { id: 'history', label: 'Edit History' },
    { id: 'delivery', label: 'Delivery Logs' },
];

const statusMap: Record<string, 'live' | 'pending' | 'processing' | 'declined' | 'draft'> = {
    live: 'live',
    pending: 'pending',
    processing: 'processing',
    rejected: 'declined',
    draft: 'draft',
};

const releaseTypeLabels: Record<string, string> = {
    single: 'Single',
    album: 'Album',
    ep: 'EP',
    compilation: 'Compilation',
};

function ReleaseCard({ release }: { release: Release }) {
    const [showActions, setShowActions] = useState(false);

    return (
        <div className="group relative bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] hover:border-[#E41E2B]/30 transition-all duration-300">
            {/* Cover Image */}
            <Link href={`/dashboard/releases/${release.id}`}>
                <div className="aspect-square bg-[#F5F0EB]/[0.04] relative overflow-hidden cursor-pointer">
                    {release.coverUrl ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#E41E2B]/20 to-purple-900/20 flex items-center justify-center">
                            <Disc3 className="w-16 h-16 text-[#F5F0EB]/20" />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center">
                            <Disc3 className="w-16 h-16 text-[#F5F0EB]/10" />
                        </div>
                    )}

                    {/* Hover overlay with action icons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                        <button className="w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="View">
                            <Eye className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Edit">
                            <Pencil className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" title="Share">
                            <Share2 className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-2 left-2">
                        <StatusBadge variant={statusMap[release.status] || 'draft'} dot={false} />
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-2 right-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-black/50 text-white/70 px-1.5 py-0.5">
                            {releaseTypeLabels[release.releaseType || 'single']}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Info */}
            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <Link href={`/dashboard/releases/${release.id}`}>
                            <h3 className="text-sm font-semibold text-[#F5F0EB] truncate hover:text-[#E41E2B] transition-colors cursor-pointer">
                                {release.title}
                            </h3>
                        </Link>
                        <p className="text-xs text-[#F5F0EB]/40 mt-0.5 truncate">{release.artist}</p>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowActions(!showActions)}
                            className="w-6 h-6 flex items-center justify-center text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60 transition-colors"
                        >
                            <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                        {showActions && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
                                <div className="absolute right-0 top-7 z-20 bg-[#1a1a1a] border border-[#F5F0EB]/10 shadow-xl py-1 min-w-[140px]">
                                    <Link href={`/dashboard/releases/${release.id}`}
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#F5F0EB]/60 hover:bg-[#F5F0EB]/5 transition-colors">
                                        <Eye className="w-3 h-3" /> View Details
                                    </Link>
                                    <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F5F0EB]/60 hover:bg-[#F5F0EB]/5 transition-colors">
                                        <Pencil className="w-3 h-3" /> Edit Release
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F5F0EB]/60 hover:bg-[#F5F0EB]/5 transition-colors">
                                        <Share2 className="w-3 h-3" /> Share Link
                                    </button>
                                    <hr className="border-[#F5F0EB]/5 my-1" />
                                    <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400/70 hover:bg-red-500/10 transition-colors">
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-3 mt-2 text-[10px] text-[#F5F0EB]/25">
                    {release.upc && (
                        <span className="font-mono">{release.upc}</span>
                    )}
                    <span className="flex items-center gap-1">
                        <Music className="w-2.5 h-2.5" />
                        {release.tracksCount || 0}
                    </span>
                    <span>{new Date(release.releaseDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
            </div>
        </div>
    );
}

export default function ReleasesPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const tabsWithCounts = useMemo(() => {
        return tabs.map(tab => ({
            ...tab,
            count: tab.id === 'all' ? mockReleases.length : tab.count,
        }));
    }, []);

    const filteredReleases = useMemo(() => {
        let releases = mockReleases;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            releases = releases.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.artist.toLowerCase().includes(q) ||
                (r.upc && r.upc.includes(q))
            );
        }
        return releases;
    }, [searchQuery]);

    return (
        <div>
            <PageHeader
                title="Releases"
                description="Yayınlarınızı yönetin, yeni müzik ekleyin ve dağıtım durumunu takip edin."
                breadcrumbs={[
                    { label: 'Portal', href: '/dashboard' },
                    { label: 'Manage Releases' },
                ]}
            >
                <Button variant="secondary" size="sm" icon={<ArrowUpDown className="w-3.5 h-3.5" />}>
                    Transfer In
                </Button>
                <Link href="/dashboard/releases/create">
                    <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                        Create Release
                    </Button>
                </Link>
            </PageHeader>

            <TabNav tabs={tabsWithCounts} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            {activeTab === 'all' && (
                <>
                    {/* Search bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/20" />
                            <input
                                type="text"
                                placeholder="Yayınları ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#E41E2B]/40 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Card Grid */}
                    {filteredReleases.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {filteredReleases.map(release => (
                                <ReleaseCard key={release.id} release={release} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon="search"
                            title="Yayın bulunamadı"
                            description="Arama kriterlerinize uygun yayın bulunamadı."
                        />
                    )}

                    {/* Release count footer */}
                    <div className="mt-6 text-xs text-[#F5F0EB]/20">
                        {filteredReleases.length} yayın görüntüleniyor
                    </div>
                </>
            )}

            {activeTab === 'tracks' && (
                <EmptyState
                    icon="cactus"
                    title="Track listesi"
                    description="Tüm yayınlarınızdaki parçalar burada listelenecek."
                />
            )}

            {activeTab === 'history' && (
                <EmptyState
                    icon="file"
                    title="Düzenleme geçmişi"
                    description="Yayınlarınızdaki düzenleme geçmişi burada listelenecek."
                />
            )}

            {activeTab === 'delivery' && (
                <EmptyState
                    icon="inbox"
                    title="Teslimat logları"
                    description="DSP platformlarına yapılan teslimat kayıtları burada listelenecek."
                />
            )}
        </div>
    );
}
