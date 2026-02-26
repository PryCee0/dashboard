'use client';

import { useState, useMemo } from 'react';
import { Plus, Disc3, Music, ArrowUpDown } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import DataTable, { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import { mockReleases } from '@/lib/mock-data';
import { Release } from '@/types';

const tabs = [
    { id: 'all', label: 'Tüm Yayınlar', count: 0 },
    { id: 'singles', label: "Single'lar" },
    { id: 'albums', label: 'Albümler & EP' },
    { id: 'review', label: 'İncelemede' },
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
    album: 'Albüm',
    ep: 'EP',
    compilation: 'Derleme',
};

export default function ReleasesPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredReleases = useMemo(() => {
        switch (activeTab) {
            case 'singles':
                return mockReleases.filter(r => r.releaseType === 'single');
            case 'albums':
                return mockReleases.filter(r => r.releaseType === 'album' || r.releaseType === 'ep');
            case 'review':
                return mockReleases.filter(r => r.status === 'processing' || r.status === 'pending');
            default:
                return mockReleases;
        }
    }, [activeTab]);

    // Update tab counts
    const tabsWithCounts = useMemo(() => {
        return tabs.map(tab => ({
            ...tab,
            count: tab.id === 'all' ? mockReleases.length
                : tab.id === 'singles' ? mockReleases.filter(r => r.releaseType === 'single').length
                    : tab.id === 'albums' ? mockReleases.filter(r => r.releaseType === 'album' || r.releaseType === 'ep').length
                        : mockReleases.filter(r => r.status === 'processing' || r.status === 'pending').length,
        }));
    }, []);

    const columns: Column<Release>[] = [
        {
            key: 'title',
            label: 'Yayın',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.08] flex items-center justify-center shrink-0">
                        {row.coverUrl ? (
                            <img src={row.coverUrl} alt={row.title} className="w-full h-full object-cover" />
                        ) : (
                            <Disc3 className="w-4 h-4 text-[#F5F0EB]/20" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#F5F0EB]">{row.title}</p>
                        <p className="text-xs text-[#F5F0EB]/40">{row.artist}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'releaseType',
            label: 'Tür',
            render: (row) => (
                <span className="text-xs text-[#F5F0EB]/50">
                    {releaseTypeLabels[row.releaseType || 'single']}
                </span>
            ),
        },
        {
            key: 'genre',
            label: 'Tarz',
            render: (row) => (
                <span className="text-xs text-[#F5F0EB]/50">{row.genre || '—'}</span>
            ),
        },
        {
            key: 'upc',
            label: 'UPC',
            render: (row) => (
                <span className="text-xs text-[#F5F0EB]/30 font-mono">{row.upc || '—'}</span>
            ),
        },
        {
            key: 'tracksCount',
            label: 'Parça',
            render: (row) => (
                <span className="flex items-center gap-1.5 text-xs text-[#F5F0EB]/40">
                    <Music className="w-3 h-3" />
                    {row.tracksCount || 0}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Durum',
            sortable: true,
            render: (row) => (
                <StatusBadge variant={statusMap[row.status] || 'draft'} />
            ),
        },
        {
            key: 'releaseDate',
            label: 'Tarih',
            sortable: true,
            render: (row) => (
                <span className="text-xs text-[#F5F0EB]/40">
                    {new Date(row.releaseDate).toLocaleDateString('tr-TR')}
                </span>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Releases"
                description="Yayınlarınızı yönetin, yeni müzik ekleyin ve dağıtım durumunu takip edin."
            >
                <Button variant="secondary" size="sm" icon={<ArrowUpDown className="w-3.5 h-3.5" />}>
                    Transfer In
                </Button>
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Yayın
                </Button>
            </PageHeader>

            <TabNav tabs={tabsWithCounts} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            <DataTable<Release>
                columns={columns}
                data={filteredReleases}
                keyExtractor={(r) => r.id}
                searchPlaceholder="Yayın ara..."
                pageSize={10}
                emptyMessage="Bu kategoride yayın bulunamadı."
            />
        </div>
    );
}
