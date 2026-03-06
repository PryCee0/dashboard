'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Download, Pencil, Link2, ImageIcon, Disc3, Music, Globe,
    Calendar, Tag, Building2, Copyright, CheckCircle, XCircle, Clock,
    AlertTriangle, Search, ChevronDown, Plus, Trash2, ExternalLink, BarChart3,
    Hash, Languages, ArrowUpRight, X, Mic2, Upload, FileAudio, Smartphone,
    Apple, CircleDot, FileText, HelpCircle
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { mockReleaseDetails, mockReleases } from '@/lib/mock-data';
import { ReleaseDetail, StoreDelivery, DeliveryLogEntry } from '@/types';

const tabs = [
    { id: 'info', label: 'Information' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'stores', label: 'Stores & Services' },
    { id: 'analytics', label: 'Release Link Analytics' },
    { id: 'delivery', label: 'Delivery Log' },
    { id: 'usage', label: 'Usage Discovery' },
];

const statusMap: Record<string, 'live' | 'pending' | 'processing' | 'declined' | 'draft'> = {
    live: 'live',
    pending: 'pending',
    processing: 'processing',
    rejected: 'declined',
    draft: 'draft',
};

/* ── Info Card (2-column grid) ── */
function InfoCard({ label, value, icon, hasAction }: { label: string; value: string; icon?: React.ReactNode; hasAction?: boolean }) {
    return (
        <div className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-4 flex items-start gap-3">
            <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#7C3AED]">{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-[#F5F0EB]/40 mb-0.5">{label}</p>
                <p className="text-sm text-[#F5F0EB]/80 font-medium">{value || 'Not set'}</p>
            </div>
            {hasAction && (
                <button className="shrink-0 text-[#F5F0EB]/20 hover:text-[#F5F0EB]/60 transition-colors mt-1">
                    <ArrowUpRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

/* ── Additional Delivery Row (2-col grid) ── */
function AdditionalDeliveryCard({ store }: { store: StoreDelivery }) {
    const isProcessing = store.status === 'processing';
    const isNotIncluded = store.status === 'not-included';

    return (
        <div className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.06] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#F5F0EB]/20" />
                </div>
                <span className="text-sm text-[#F5F0EB]/70">{store.storeName}</span>
            </div>
            {isProcessing ? (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-500/15 text-emerald-400">
                    Processing
                </span>
            ) : isNotIncluded ? (
                <span className="text-xs text-red-400/60">Not included</span>
            ) : (
                <span className="text-xs text-emerald-400">Delivered</span>
            )}
        </div>
    );
}

/* ── Delivery Log Row ── */
function DeliveryLogRow({ log }: { log: DeliveryLogEntry }) {
    const statusBadgeMap: Record<string, 'live' | 'pending' | 'processing' | 'declined'> = {
        completed: 'live',
        pending: 'pending',
        processing: 'processing',
        failed: 'declined',
    };

    return (
        <div className="flex items-center justify-between py-3 px-4 hover:bg-[#F5F0EB]/[0.02] transition-colors border-b border-[#F5F0EB]/[0.04] last:border-0">
            <div className="flex items-center gap-4 flex-1">
                <div className="w-8 h-8 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.06] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#F5F0EB]/20" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#F5F0EB]/70">{log.platform}</p>
                    <p className="text-[10px] text-[#F5F0EB]/25">{log.actionType || 'Insert'}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs text-[#F5F0EB]/30">
                    {new Date(log.date).toLocaleDateString('tr-TR')}
                </span>
                <StatusBadge variant={statusBadgeMap[log.status] || 'pending'} dot={false} />
            </div>
        </div>
    );
}

/* ── Track Detail Modal ── */
function TrackDetailModal({ track, onClose }: { track: any; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60" onClick={onClose} />
            <div className="relative bg-[#12121a] border border-[#F5F0EB]/[0.08] w-full max-w-lg max-h-[85vh] overflow-y-auto z-10">
                {/* Modal content */}
                <div className="divide-y divide-[#F5F0EB]/[0.06]">
                    {/* Preview */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <FileAudio className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">Preview</p>
                            <p className="text-sm text-[#7C3AED] break-all">https://toolost.com/track/{track.id}</p>
                        </div>
                    </div>

                    {/* Writers */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <Pencil className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">Writers</p>
                            <p className="text-sm text-[#F5F0EB]/80 font-medium">{track.artist || 'Not provided'}</p>
                        </div>
                    </div>

                    {/* Artists */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <Mic2 className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">Artists</p>
                            <p className="text-sm text-[#F5F0EB]/80 font-medium">{track.artist || 'Not provided'}</p>
                        </div>
                    </div>

                    {/* Spotify URI */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <CircleDot className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">Spotify URI</p>
                            <p className="text-sm text-[#F5F0EB]/50">Not provided</p>
                        </div>
                    </div>

                    {/* Apple ID */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <Apple className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">Apple ID</p>
                            <p className="text-sm text-[#F5F0EB]/50">Not provided</p>
                        </div>
                    </div>

                    {/* ISRC */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <Hash className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">ISRC</p>
                            <p className="text-sm text-[#F5F0EB]/80 font-medium font-mono">{track.isrc || 'Not provided'}</p>
                        </div>
                    </div>

                    {/* ISWC */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">ISWC</p>
                            <p className="text-sm text-[#F5F0EB]/50">Not provided</p>
                        </div>
                    </div>

                    {/* TikTok Start Time */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                            <Smartphone className="w-4 h-4 text-[#7C3AED]" />
                        </div>
                        <div>
                            <p className="text-xs text-[#F5F0EB]/40">TikTok Start Time</p>
                            <p className="text-sm text-[#F5F0EB]/80 font-medium">00:15</p>
                        </div>
                    </div>

                    {/* Instrumental */}
                    <div className="p-4">
                        <p className="text-sm text-[#F5F0EB]/80 font-semibold mb-1">Instrumental</p>
                        <p className="text-xs text-[#F5F0EB]/40 mb-3">Add Instrumental</p>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.06] flex items-center justify-center shrink-0">
                                <Upload className="w-3.5 h-3.5 text-[#F5F0EB]/30" />
                            </div>
                            <input
                                type="text"
                                placeholder="Add Instrumental"
                                className="flex-1 px-3 py-2 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#7C3AED]/40 transition-colors"
                            />
                            <button className="px-4 py-2 bg-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.08] text-xs text-[#F5F0EB]/50 hover:text-[#F5F0EB]/80 transition-colors">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

                {/* Close button */}
                <div className="p-4 border-t border-[#F5F0EB]/[0.06] text-right">
                    <button
                        onClick={onClose}
                        className="text-sm text-[#7C3AED] hover:text-[#7C3AED]/80 font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ReleaseDetailPage() {
    const params = useParams();
    const releaseId = params?.id as string;
    const [activeTab, setActiveTab] = useState('info');
    const [deliverySearch, setDeliverySearch] = useState('');
    const [selectedTrack, setSelectedTrack] = useState<any>(null);

    // Find release detail
    const release: ReleaseDetail | undefined = mockReleaseDetails[releaseId];
    const basicRelease = mockReleases.find(r => r.id === releaseId);

    if (!release && !basicRelease) {
        return (
            <div className="py-20">
                <EmptyState
                    icon="search"
                    title="Yayın bulunamadı"
                    description="Bu yayın mevcut değil veya kaldırılmış olabilir."
                    action={
                        <Link href="/dashboard/releases">
                            <Button size="sm" variant="secondary">Yayınlara Dön</Button>
                        </Link>
                    }
                />
            </div>
        );
    }

    const data = release || {
        ...(basicRelease as any),
        tracks: [],
        storeDeliveries: [],
        additionalDeliveries: [],
        deliveryLogs: [],
        releaseNotes: [],
    };

    const filteredLogs = deliverySearch
        ? data.deliveryLogs.filter((l: DeliveryLogEntry) => l.platform.toLowerCase().includes(deliverySearch.toLowerCase()))
        : data.deliveryLogs;

    const formatType = data.releaseType === 'single' ? 'Single' : data.releaseType === 'album' ? 'Album' : data.releaseType === 'ep' ? 'EP' : 'Compilation';

    return (
        <div>
            {/* Header */}
            <PageHeader
                title={data.title}
                breadcrumbs={[
                    { label: 'Portal', href: '/dashboard' },
                    { label: 'Manage Releases', href: '/dashboard/releases' },
                    { label: 'Release' },
                ]}
            >
                <StatusBadge variant={statusMap[data.status] || 'draft'} />
                <Button variant="secondary" size="sm" icon={<Link2 className="w-3.5 h-3.5" />}>
                    Release Link
                </Button>
                <Button variant="secondary" size="sm" icon={<ImageIcon className="w-3.5 h-3.5" />}>
                    Generate Graphics
                </Button>
            </PageHeader>

            {/* Main content: sidebar + content */}
            <div className="flex flex-col lg:flex-row gap-6 animate-fadeInUp">
                {/* Left sidebar */}
                <div className="lg:w-72 shrink-0 space-y-4 animate-slideInLeft">
                    {/* Cover */}
                    <div className="relative bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] aspect-square flex items-center justify-center overflow-hidden group hover-glow-red transition-all duration-300">
                        <Disc3 className="w-20 h-20 text-[#F5F0EB]/10 group-hover:rotate-180 transition-transform duration-1000" />
                        <button className="absolute bottom-3 right-3 w-9 h-9 bg-[#7C3AED] hover:bg-[#7C3AED]/80 flex items-center justify-center transition-colors active:scale-95" title="Download artwork">
                            <Download className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    {/* Artists */}
                    <div className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-4">
                        <h3 className="text-sm font-semibold text-[#F5F0EB]/80 mb-3">Artists</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#7C3AED] flex items-center justify-center text-xs font-bold text-white">
                                {data.artist?.charAt(0)}
                            </div>
                            <span className="text-sm text-[#F5F0EB]/70">{data.artist}</span>
                        </div>
                    </div>

                    {/* Release Notes */}
                    <div className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-[#F5F0EB]/80">Release Notes</h3>
                            <button className="w-5 h-5 bg-[#F5F0EB]/[0.06] flex items-center justify-center text-[#F5F0EB]/30 hover:text-[#F5F0EB]/60 transition-colors">
                                <HelpCircle className="w-3 h-3" />
                            </button>
                        </div>
                        {data.releaseNotes && data.releaseNotes.length > 0 ? (
                            <ul className="space-y-2">
                                {data.releaseNotes.map((note: string, i: number) => (
                                    <li key={i} className="text-xs text-[#F5F0EB]/40">{note}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs text-[#F5F0EB]/20">No notes yet.</p>
                        )}
                        <button className="mt-3 flex items-center gap-1 text-xs text-[#7C3AED]/70 hover:text-[#7C3AED] transition-colors font-medium">
                            Add note
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <button className="w-full py-3 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] hover:bg-[#F5F0EB]/[0.06] transition-colors flex items-center justify-center gap-2 text-sm text-[#F5F0EB]/70">
                            <Pencil className="w-4 h-4" />
                            Edit Release
                        </button>
                        <button className="w-full py-3 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2 text-sm text-[#F5F0EB]/50 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                            Takedown Release
                        </button>
                    </div>
                </div>

                {/* Right content */}
                <div className="flex-1 min-w-0 animate-slideInRight">
                    <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

                    {/* ─── Information Tab ─── */}
                    {activeTab === 'info' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeInScale">
                            <InfoCard label="UPC" value={data.upc || '—'} icon={<Hash className="w-4 h-4" />} />
                            <InfoCard label="Version Line" value="" icon={<Tag className="w-4 h-4" />} />
                            <InfoCard label="Release Date" value={data.releaseDate ? new Date(data.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''} icon={<Calendar className="w-4 h-4" />} />
                            <InfoCard label="Original Release Date" value="" icon={<Calendar className="w-4 h-4" />} />
                            <InfoCard label="Pre Order Date" value="" icon={<Calendar className="w-4 h-4" />} />
                            <InfoCard label="Catalog Number" value={`TOOLOST${data.upc?.slice(-7) || '0000000'}`} icon={<Hash className="w-4 h-4" />} />
                            <InfoCard label="Release Format" value={formatType} icon={<Disc3 className="w-4 h-4" />} />
                            <InfoCard label="Label" value={data.label || ''} icon={<Building2 className="w-4 h-4" />} />
                            <InfoCard label="Language" value={data.language || ''} icon={<Languages className="w-4 h-4" />} />
                            <InfoCard label="Genre" value={data.genre || ''} icon={<Music className="w-4 h-4" />} />
                            <InfoCard label="C-Line" value={data.copyrightCLine ? `${data.copyrightCLine.replace('Redpot Records', data.label || 'Redpot Records')}` : ''} icon={<Copyright className="w-4 h-4" />} />
                            <InfoCard label="P-Line" value={data.copyrightPLine ? `${data.copyrightPLine.replace('Redpot Records', data.label || 'Redpot Records')}` : ''} icon={<Copyright className="w-4 h-4" />} />
                            <InfoCard label="Amazon ASIN" value="View codes" icon={<Tag className="w-4 h-4" />} hasAction />
                        </div>
                    )}

                    {/* ─── Tracks Tab ─── */}
                    {activeTab === 'tracks' && (
                        <div>
                            {data.tracks && data.tracks.length > 0 ? (
                                <div className="space-y-2">
                                    {data.tracks.map((track: any) => (
                                        <div
                                            key={track.id}
                                            className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-4 flex items-center gap-4 hover:bg-[#F5F0EB]/[0.05] transition-colors cursor-pointer"
                                            onClick={() => setSelectedTrack(track)}
                                        >
                                            {/* Track number */}
                                            <div className="w-9 h-9 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                                                <span className="text-sm font-bold text-[#7C3AED]">{track.trackNumber}</span>
                                            </div>

                                            {/* Track info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-[#F5F0EB]/80 font-medium">{track.title}</p>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-xs text-[#F5F0EB]/30">Version: <span className="text-[#F5F0EB]/50">{track.version || 'Not set'}</span></span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    <span className="text-xs text-[#F5F0EB]/30">ISRC: <span className="text-[#F5F0EB]/50 font-mono">{track.isrc || '—'}</span></span>
                                                </div>
                                            </div>

                                            {/* Expand arrow */}
                                            <button className="shrink-0 text-[#F5F0EB]/20 hover:text-[#F5F0EB]/60 transition-colors">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12">
                                    <EmptyState icon="cactus" title="No tracks" description="This release has no tracks yet." />
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── Stores & Services Tab ─── */}
                    {activeTab === 'stores' && (
                        <div className="space-y-8">
                            {/* Platforms header */}
                            <div className="bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] p-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                                        <Globe className="w-5 h-5 text-[#7C3AED]" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#F5F0EB]/80 mb-1">Platforms</h3>
                                        <p className="text-xs text-[#F5F0EB]/40 mb-3">View the platforms included and excluded from this release</p>
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-emerald-500/15 text-emerald-400">
                                            All stores &amp; platforms included
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Deliveries */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#F5F0EB]/80 mb-4">Additional Deliveries</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {data.additionalDeliveries?.map((store: StoreDelivery) => (
                                        <AdditionalDeliveryCard key={store.id} store={store} />
                                    ))}
                                </div>
                            </div>

                            {/* Platform Links */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#F5F0EB]/80 mb-4">Platform Links</h3>
                                <div className="py-12">
                                    <EmptyState icon="inbox" title="Nothing here" description="No platform links available for this release." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── Release Link Analytics Tab ─── */}
                    {activeTab === 'analytics' && (
                        <EmptyState
                            icon="search"
                            title="No analytics available"
                            description="There are no analytics available for release links at this time. Please try again later."
                        />
                    )}

                    {/* ─── Delivery Log Tab ─── */}
                    {activeTab === 'delivery' && (
                        <div>
                            <div className="mb-4 relative max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/20" />
                                <input
                                    type="text"
                                    placeholder="Search delivery logs..."
                                    value={deliverySearch}
                                    onChange={(e) => setDeliverySearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#7C3AED]/40 transition-colors"
                                />
                            </div>
                            <div className="border border-[#F5F0EB]/[0.06]">
                                {filteredLogs.length > 0 ? (
                                    filteredLogs.map((log: DeliveryLogEntry) => (
                                        <DeliveryLogRow key={log.id} log={log} />
                                    ))
                                ) : (
                                    <div className="py-12">
                                        <EmptyState icon="inbox" title="No delivery logs" description="No delivery logs found." />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ─── Usage Discovery Tab ─── */}
                    {activeTab === 'usage' && (
                        <EmptyState
                            icon="search"
                            title="No Matches"
                            description="No usage discovery matches found for this release."
                            action={
                                <Link href="/dashboard/usage-discovery">
                                    <Button size="sm" variant="secondary" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                                        Go to Usage Discovery
                                    </Button>
                                </Link>
                            }
                        />
                    )}
                </div>
            </div>

            {/* Track Detail Modal */}
            {selectedTrack && (
                <TrackDetailModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />
            )}
        </div>
    );
}
