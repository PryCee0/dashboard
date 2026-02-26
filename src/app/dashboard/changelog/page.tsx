'use client';

import PageHeader from '@/components/ui/PageHeader';
import StatusBadge from '@/components/ui/StatusBadge';

interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    changes: string[];
    type: 'new' | 'live' | 'pending';
}

const changelog: ChangelogEntry[] = [
    {
        version: 'v0.2.0',
        date: '23 Şubat 2026',
        title: 'Dashboard Tam Sayfa Genişlemesi',
        type: 'new',
        changes: [
            'Tüm alt sayfalar eklendi (Releases, Wallet, Sales, Analytics, Reports, Insights, Audience)',
            'Telif ve Koruma sayfaları: Royalty Splits, Greenlist, Blocklist, Profile Defender',
            'Pazarlama: Release Links',
            'Ayarlar: Settings (6 sub-tab), Preferences, Billing, Notifications',
            'Destek: Support (17 kategori), Changelog',
            '12 reusable UI bileşeni: PageHeader, EmptyState, DataTable, TabNav, StatusBadge, Modal, StepWizard, Card, FileUpload, Accordion, ChipList, Button',
        ],
    },
    {
        version: 'v0.1.0',
        date: '22 Şubat 2026',
        title: 'İlk Dashboard Sürümü',
        type: 'live',
        changes: [
            'Authentication (Login/Signup) sistemi',
            'Dashboard Overview: Welcome Widget, Quick Reports, Releases Carousel, Analytics Snapshot',
            'Sidebar navigasyon ve Header bileşenleri',
            'TR/EN çoklu dil desteği',
            'Brutal Music Editorial tasarım sistemi',
        ],
    },
];

export default function ChangelogPage() {
    return (
        <div>
            <PageHeader title="Changelog" description="Platform güncellemeleri ve sürüm notları." />

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#F5F0EB]/[0.06]" />

                <div className="space-y-8">
                    {changelog.map((entry) => (
                        <div key={entry.version} className="relative pl-16">
                            {/* Timeline dot */}
                            <div className="absolute left-[18px] top-1 w-3 h-3 bg-[#E41E2B] border-2 border-[#111110]" />

                            {/* Content */}
                            <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#E41E2B]">{entry.version}</span>
                                    <StatusBadge variant={entry.type} />
                                    <span className="text-xs text-[#F5F0EB]/30">{entry.date}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-[#F5F0EB] mb-3">{entry.title}</h3>
                                <ul className="space-y-2">
                                    {entry.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-[#F5F0EB]/50">
                                            <span className="w-1.5 h-1.5 bg-[#E41E2B]/40 mt-1.5 shrink-0" />
                                            {change}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
