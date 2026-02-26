'use client';

import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import DataTable, { Column } from '@/components/ui/DataTable';

interface Ticket {
    id: string;
    subject: string;
    category: string;
    status: 'open' | 'closed';
    date: string;
}

const mockTickets: Ticket[] = [
    { id: 'T-001', subject: 'Spotify dağıtım gecikmesi', category: 'Technical Issues', status: 'open', date: '2026-02-22' },
    { id: 'T-002', subject: 'Telif raporu sorgusu', category: 'Royalties', status: 'closed', date: '2026-02-18' },
    { id: 'T-003', subject: 'Fatura iade talebi', category: 'Billing and Subscriptions', status: 'open', date: '2026-02-15' },
];

const ticketCategories = [
    'Technical Issues', 'Billing and Subscriptions', 'Payout Issues',
    'Sync/Publishing Administration', 'Change Artist Name', 'SoundCloud Account Merges',
    'YouTube Official Artist Channel Requests', 'YouTube Remapping', 'Content Redelivery',
    'Digital Sound Match', 'Instagram and Facebook Song Mapping', 'Content Mapping',
    'Royalties', 'Analytics', 'Needs Documentation', 'Copyright Infringement', 'Other Reason',
];

export default function SupportPage() {
    const [showCreate, setShowCreate] = useState(false);

    const columns: Column<Ticket>[] = [
        { key: 'id', label: 'Ticket #', render: (r) => <span className="font-mono text-xs text-[#F5F0EB]/40">{r.id}</span> },
        { key: 'subject', label: 'Konu', sortable: true, render: (r) => <span className="text-sm font-medium text-[#F5F0EB]">{r.subject}</span> },
        { key: 'category', label: 'Kategori', render: (r) => <span className="text-xs text-[#F5F0EB]/40">{r.category}</span> },
        { key: 'status', label: 'Durum', render: (r) => <StatusBadge variant={r.status === 'open' ? 'open' : 'closed'} /> },
        { key: 'date', label: 'Tarih', sortable: true, render: (r) => <span className="text-xs text-[#F5F0EB]/40">{new Date(r.date).toLocaleDateString('tr-TR')}</span> },
    ];

    return (
        <div>
            <PageHeader title="Support" description="Destek taleplerinizi yönetin ve belgeleri inceleyin.">
                <Button variant="secondary" size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
                    Belgeler
                </Button>
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowCreate(true)}>
                    Talep Oluştur
                </Button>
            </PageHeader>

            <DataTable<Ticket>
                columns={columns}
                data={mockTickets}
                keyExtractor={(t) => t.id}
                searchPlaceholder="Talep ara..."
            />

            {/* Create Ticket Modal */}
            <Modal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                title="Yeni Destek Talebi"
                description="Sorununuzu açıklayın, en kısa sürede size dönüş yapılacaktır."
                size="lg"
                footer={
                    <>
                        <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)}>İptal</Button>
                        <Button size="sm">Gönder</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Kategori</label>
                        <select className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40">
                            <option value="">Kategori seçin...</option>
                            {ticketCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Konu</label>
                        <input
                            type="text"
                            placeholder="Konu başlığı"
                            className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Açıklama</label>
                        <textarea
                            rows={4}
                            placeholder="Sorununuzu detaylı açıklayın..."
                            className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40 resize-none"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
