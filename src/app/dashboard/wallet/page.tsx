'use client';

import { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, CreditCard } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import DataTable, { Column } from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockWallet } from '@/lib/mock-data';

interface Transaction {
    id: string;
    type: 'deposit' | 'withdrawal' | 'royalty';
    description: string;
    amount: number;
    status: 'completed' | 'pending' | 'processing';
    date: string;
}

const mockTransactions: Transaction[] = [
    { id: '1', type: 'royalty', description: 'Spotify — Ocak 2026 telif', amount: 245.80, status: 'completed', date: '2026-02-15' },
    { id: '2', type: 'royalty', description: 'Apple Music — Ocak 2026 telif', amount: 128.50, status: 'completed', date: '2026-02-15' },
    { id: '3', type: 'royalty', description: 'YouTube Music — Ocak 2026 telif', amount: 67.30, status: 'pending', date: '2026-02-20' },
    { id: '4', type: 'withdrawal', description: 'Banka transferi', amount: -200.00, status: 'completed', date: '2026-02-01' },
    { id: '5', type: 'royalty', description: 'TikTok — Aralık 2025 telif', amount: 89.20, status: 'completed', date: '2026-01-15' },
];

const statusMap: Record<string, 'live' | 'pending' | 'processing'> = {
    completed: 'live',
    pending: 'pending',
    processing: 'processing',
};

export default function WalletPage() {
    const [showPayoutModal, setShowPayoutModal] = useState(false);

    const columns: Column<Transaction>[] = [
        {
            key: 'date',
            label: 'Tarih',
            sortable: true,
            render: (row) => (
                <span className="text-xs text-[#F5F0EB]/40">
                    {new Date(row.date).toLocaleDateString('tr-TR')}
                </span>
            ),
        },
        {
            key: 'type',
            label: 'Tür',
            render: (row) => (
                <span className="flex items-center gap-1.5">
                    {row.type === 'royalty' && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />}
                    {row.type === 'withdrawal' && <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
                    {row.type === 'deposit' && <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />}
                    <span className="text-xs text-[#F5F0EB]/50 capitalize">
                        {row.type === 'royalty' ? 'Telif' : row.type === 'withdrawal' ? 'Çekim' : 'Yatırma'}
                    </span>
                </span>
            ),
        },
        {
            key: 'description',
            label: 'Açıklama',
            render: (row) => <span className="text-sm text-[#F5F0EB]/70">{row.description}</span>,
        },
        {
            key: 'amount',
            label: 'Tutar',
            sortable: true,
            render: (row) => (
                <span className={`text-sm font-semibold ${row.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {row.amount >= 0 ? '+' : ''}{row.amount.toFixed(2)} $
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Durum',
            render: (row) => <StatusBadge variant={statusMap[row.status]} />,
        },
    ];

    return (
        <div>
            <PageHeader title="Wallet" description="Bakiyenizi ve işlem geçmişinizi yönetin.">
                <Button
                    size="sm"
                    icon={<CreditCard className="w-3.5 h-3.5" />}
                    onClick={() => setShowPayoutModal(true)}
                >
                    Ödeme Talebi
                </Button>
            </PageHeader>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-emerald-500/10 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className="text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">Kullanılabilir</span>
                        </div>
                        <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                            ${mockWallet.available.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-amber-500/10 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-amber-400" />
                            </div>
                            <span className="text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">Beklemede</span>
                        </div>
                        <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                            ${mockWallet.pending.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-blue-500/10 flex items-center justify-center">
                                <ArrowUpRight className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">Toplam Kazanç</span>
                        </div>
                        <p className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[2px] text-[#F5F0EB]">
                            $530.80
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table */}
            <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB] mb-4">İşlem Geçmişi</h2>
            <DataTable<Transaction>
                columns={columns}
                data={mockTransactions}
                keyExtractor={(t) => t.id}
                searchPlaceholder="İşlem ara..."
            />

            {/* Payout Modal */}
            <Modal
                isOpen={showPayoutModal}
                onClose={() => setShowPayoutModal(false)}
                title="Ödeme Talebi"
                description="Bakiyenizden ödeme talep edin."
                footer={
                    <>
                        <Button variant="ghost" size="sm" onClick={() => setShowPayoutModal(false)}>İptal</Button>
                        <Button size="sm">Talep Gönder</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Tutar ($)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Ödeme Yöntemi</label>
                        <select className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40">
                            <option value="bank">Banka Transferi</option>
                            <option value="paypal">PayPal</option>
                            <option value="wise">Wise</option>
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
