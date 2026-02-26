'use client';

import { useState, useMemo } from 'react';
import { Download, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import DataTable, { Column } from '@/components/ui/DataTable';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const tabs = [
    { id: 'releases', label: 'Yayınlar' },
    { id: 'tracks', label: 'Parçalar' },
    { id: 'stores', label: 'Mağazalar' },
    { id: 'artists', label: 'Sanatçılar' },
    { id: 'territories', label: 'Bölgeler' },
    { id: 'monthly', label: 'Aylık Özet' },
    { id: 'stream-rate', label: 'Stream Oranı' },
];

interface SalesRow {
    id: string;
    name: string;
    streams: number;
    revenue: number;
    change: number;
}

const mockSalesData: Record<string, SalesRow[]> = {
    releases: [
        { id: '1', name: 'Midnight Echo', streams: 125400, revenue: 312.50, change: 12.5 },
        { id: '2', name: 'Crimson Waves', streams: 98200, revenue: 245.50, change: 8.3 },
        { id: '3', name: 'Shattered Glass', streams: 76800, revenue: 192.00, change: -2.1 },
        { id: '4', name: 'Velvet Storm', streams: 54300, revenue: 135.75, change: 15.7 },
        { id: '5', name: 'Urban Solace', streams: 32100, revenue: 80.25, change: 5.4 },
    ],
    tracks: [
        { id: '1', name: 'Midnight Echo', streams: 125400, revenue: 312.50, change: 12.5 },
        { id: '2', name: 'Ocean Drive', streams: 45200, revenue: 113.00, change: 22.1 },
        { id: '3', name: 'Crystal Clear', streams: 38900, revenue: 97.25, change: -5.2 },
        { id: '4', name: 'Velvet Storm', streams: 54300, revenue: 135.75, change: 15.7 },
    ],
    stores: [
        { id: '1', name: 'Spotify', streams: 210000, revenue: 525.00, change: 10.2 },
        { id: '2', name: 'Apple Music', streams: 95000, revenue: 380.00, change: 7.5 },
        { id: '3', name: 'YouTube Music', streams: 65000, revenue: 97.50, change: 15.3 },
        { id: '4', name: 'TikTok', streams: 45000, revenue: 22.50, change: 35.0 },
        { id: '5', name: 'Deezer', streams: 12000, revenue: 36.00, change: -3.1 },
    ],
    artists: [
        { id: '1', name: 'NOVA', streams: 212000, revenue: 530.00, change: 14.2 },
        { id: '2', name: 'Pulse Theory', streams: 175000, revenue: 437.50, change: 3.1 },
        { id: '3', name: 'Eclipse', streams: 86400, revenue: 216.00, change: 5.4 },
        { id: '4', name: 'Luna Arc', streams: 54300, revenue: 135.75, change: 15.7 },
    ],
    territories: [
        { id: '1', name: 'Türkiye', streams: 180000, revenue: 270.00, change: 20.5 },
        { id: '2', name: 'ABD', streams: 120000, revenue: 420.00, change: 5.2 },
        { id: '3', name: 'Almanya', streams: 45000, revenue: 157.50, change: 8.1 },
        { id: '4', name: 'Birleşik Krallık', streams: 38000, revenue: 133.00, change: -1.4 },
    ],
    monthly: [
        { id: '1', name: 'Şubat 2026', streams: 285000, revenue: 712.50, change: 15.0 },
        { id: '2', name: 'Ocak 2026', streams: 248000, revenue: 620.00, change: 22.3 },
        { id: '3', name: 'Aralık 2025', streams: 202000, revenue: 505.00, change: 8.1 },
    ],
    'stream-rate': [
        { id: '1', name: 'Spotify', streams: 210000, revenue: 525.00, change: 0.0025 },
        { id: '2', name: 'Apple Music', streams: 95000, revenue: 380.00, change: 0.0040 },
        { id: '3', name: 'YouTube Music', streams: 65000, revenue: 97.50, change: 0.0015 },
    ],
};

export default function SalesPage() {
    const [activeTab, setActiveTab] = useState('releases');

    const data = useMemo(() => mockSalesData[activeTab] || [], [activeTab]);

    const isStreamRate = activeTab === 'stream-rate';

    const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
    const totalStreams = data.reduce((sum, row) => sum + row.streams, 0);

    const columns: Column<SalesRow>[] = [
        {
            key: 'name',
            label: activeTab === 'territories' ? 'Bölge' : activeTab === 'stores' ? 'Mağaza' : activeTab === 'monthly' ? 'Dönem' : 'Ad',
            sortable: true,
            render: (row) => <span className="text-sm font-medium text-[#F5F0EB]">{row.name}</span>,
        },
        {
            key: 'streams',
            label: 'Streams',
            sortable: true,
            render: (row) => (
                <span className="text-sm text-[#F5F0EB]/60">{row.streams.toLocaleString('tr-TR')}</span>
            ),
        },
        {
            key: 'revenue',
            label: 'Gelir',
            sortable: true,
            render: (row) => (
                <span className="text-sm font-semibold text-emerald-400">${row.revenue.toFixed(2)}</span>
            ),
        },
        {
            key: 'change',
            label: isStreamRate ? 'Oran ($/stream)' : 'Değişim',
            sortable: true,
            render: (row) => {
                if (isStreamRate) {
                    return <span className="text-xs text-[#F5F0EB]/40">${row.change.toFixed(4)}</span>;
                }
                const isPositive = row.change >= 0;
                return (
                    <span className={`flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                        {isPositive ? '+' : ''}{row.change}%
                    </span>
                );
            },
        },
    ];

    return (
        <div>
            <PageHeader title="Sales" description="Satış verilerinizi detaylı olarak inceleyin.">
                <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                    Dışa Aktar
                </Button>
            </PageHeader>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-2">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">Toplam Gelir</span>
                        </div>
                        <p className="text-xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                            ${totalRevenue.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-2">
                            <BarChart3 className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">Toplam Stream</span>
                        </div>
                        <p className="text-xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                            {totalStreams.toLocaleString('tr-TR')}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-4 h-4 text-amber-400" />
                            <span className="text-[10px] text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">Ort. Stream Oranı</span>
                        </div>
                        <p className="text-xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                            ${totalStreams > 0 ? (totalRevenue / totalStreams).toFixed(4) : '0.0000'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            <DataTable<SalesRow>
                columns={columns}
                data={data}
                keyExtractor={(r) => r.id}
                searchPlaceholder="Ara..."
            />
        </div>
    );
}
