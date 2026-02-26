'use client';

import { useState } from 'react';
import { Download, FileText, BarChart3, CreditCard, Link as LinkIcon, Music, Database, BookOpen } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const tabs = [
    { id: 'sales', label: 'Sales' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'release-links', label: 'Release Links' },
    { id: 'additional', label: 'Ek Raporlar' },
    { id: 'stream', label: 'Stream Data' },
    { id: 'raw', label: 'Raw Data' },
    { id: 'publishing', label: 'Publishing' },
];

interface ReportItem {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const reportsData: Record<string, ReportItem[]> = {
    sales: [
        { id: 's1', title: 'Revenue By Release', description: 'Her yayının toplam gelir raporu', icon: <FileText className="w-5 h-5" /> },
        { id: 's2', title: 'Revenue By Track', description: 'Parça bazlı gelir detayları', icon: <Music className="w-5 h-5" /> },
        { id: 's3', title: 'Revenue By Store', description: 'Mağaza bazlı gelir raporu', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 's4', title: 'Revenue By Territory', description: 'Bölge bazlı gelir raporu', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 's5', title: 'Revenue By Artist', description: 'Sanatçı bazlı gelir raporu', icon: <FileText className="w-5 h-5" /> },
        { id: 's6', title: 'Monthly Overview', description: 'Aylık gelir özeti', icon: <FileText className="w-5 h-5" /> },
    ],
    catalog: [
        { id: 'c1', title: 'Full Catalog Report', description: 'Tüm katalog raporu', icon: <Database className="w-5 h-5" /> },
        { id: 'c2', title: 'Release Metadata', description: 'Yayın metadata raporu', icon: <FileText className="w-5 h-5" /> },
        { id: 'c3', title: 'Track Listing', description: 'Tüm parçalar listesi', icon: <Music className="w-5 h-5" /> },
    ],
    payouts: [
        { id: 'p1', title: 'Payout History', description: 'Ödeme geçmişi raporu', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'p2', title: 'Pending Payouts', description: 'Bekleyen ödemeler', icon: <CreditCard className="w-5 h-5" /> },
    ],
    'release-links': [
        { id: 'rl1', title: 'Link Click Report', description: 'Bağlantı tıklama istatistikleri', icon: <LinkIcon className="w-5 h-5" /> },
        { id: 'rl2', title: 'Conversion Report', description: 'Platform dönüşüm oranları', icon: <BarChart3 className="w-5 h-5" /> },
    ],
    additional: [
        { id: 'a1', title: 'YouTube Analytics', description: 'YouTube performans raporu', icon: <BarChart3 className="w-5 h-5" /> },
    ],
    stream: [
        { id: 'sd1', title: 'Spotify Streams', description: 'Detaylı Spotify stream verileri', icon: <Music className="w-5 h-5" /> },
        { id: 'sd2', title: 'Apple Music Streams', description: 'Apple Music stream verileri', icon: <Music className="w-5 h-5" /> },
        { id: 'sd3', title: 'TikTok Usage', description: 'TikTok kullanım verileri', icon: <Music className="w-5 h-5" /> },
    ],
    raw: [
        { id: 'r1', title: 'Raw Sales Data', description: 'Ham satış verileri (CSV)', icon: <Database className="w-5 h-5" /> },
    ],
    publishing: [
        { id: 'pb1', title: 'Publishing Royalties', description: 'Yayın telif gelirleri', icon: <BookOpen className="w-5 h-5" /> },
    ],
};

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState('sales');

    const reports = reportsData[activeTab] || [];

    return (
        <div>
            <PageHeader title="Reports" description="Detaylı raporlar oluşturun ve indirin." />

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report) => (
                    <Card key={report.id} hover>
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-[#E41E2B]/10 flex items-center justify-center shrink-0 text-[#E41E2B]">
                                    {report.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-[#F5F0EB] mb-1">{report.title}</h3>
                                    <p className="text-xs text-[#F5F0EB]/40 mb-3">{report.description}</p>
                                    <Button variant="outline" size="sm" icon={<Download className="w-3 h-3" />}>
                                        Oluştur
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
