'use client';

import { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, CreditCard, PieChart, TrendingUp } from 'lucide-react';
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

const royaltySplits = [
    { platform: 'Spotify', percent: 46, amount: 245.80, color: '#1DB954' },
    { platform: 'Apple Music', percent: 24, amount: 128.50, color: '#FC3C44' },
    { platform: 'YouTube Music', percent: 13, amount: 67.30, color: '#FF0000' },
    { platform: 'TikTok', percent: 11, amount: 57.40, color: '#010101' },
    { platform: 'Diğer', percent: 6, amount: 31.80, color: '#7C3AED' },
];

const statusMap: Record<string, 'live' | 'pending' | 'processing'> = {
    completed: 'live',
    pending: 'pending',
    processing: 'processing',
};

function AnimatedBar({ percent, color, delay }: { percent: number; color: string; delay: number }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setWidth(percent), 200 + delay);
        return () => clearTimeout(t);
    }, [percent, delay]);
    return (
        <div className="h-1.5 bg-[#F5F0EB]/[0.06] rounded-full overflow-hidden">
            <div
                className="h-full rounded-full progress-fill"
                style={{ width: `${width}%`, backgroundColor: color }}
            />
        </div>
    );
}

export default function WalletPage() {
    const [showPayoutModal, setShowPayoutModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmitPayout = () => {
        setShowPayoutModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

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
            <PageHeader title="Wallet & Royalties" description="Bakiyenizi, gelirlerinizi ve işlem geçmişinizi yönetin.">
                <Button
                    size="sm"
                    icon={<CreditCard className="w-3.5 h-3.5" />}
                    onClick={() => setShowPayoutModal(true)}
                >
                    Ödeme Talebi
                </Button>
            </PageHeader>

            {/* Success notification */}
            {showSuccess && (
                <div className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 animate-fadeInDown">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-sm text-emerald-400">Ödeme talebiniz alındı! Admin inceleyecek ve onaylayacaktır.</p>
                </div>
            )}

            {/* Balance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Kullanılabilir', value: mockWallet.available, icon: <DollarSign className="w-4 h-4 text-emerald-400" />, bg: 'bg-emerald-500/10', delay: 0.05 },
                    { label: 'Beklemede', value: mockWallet.pending, icon: <Clock className="w-4 h-4 text-amber-400" />, bg: 'bg-amber-500/10', delay: 0.12 },
                    { label: 'Toplam Kazanç', value: 530.80, icon: <ArrowUpRight className="w-4 h-4 text-blue-400" />, bg: 'bg-blue-500/10', delay: 0.19 },
                ].map(({ label, value, icon, bg, delay }) => (
                    <Card key={label} hover glow className={`animate-fadeInUp`} padding="none">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 ${bg} flex items-center justify-center`}>
                                    {icon}
                                </div>
                                <span className="text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold">{label}</span>
                            </div>
                            <p className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[2px] text-[#F5F0EB] animate-fadeInScale" style={{ animationDelay: `${delay}s` }}>
                                ${value.toFixed(2)}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ── Royalty Splits Section ── */}
            <div className="mb-8 animate-fadeInUp stagger-2">
                <h2 className="text-sm font-bold uppercase tracking-[3px] text-[#F5F0EB]/30 mb-4 flex items-center gap-2">
                    <PieChart className="w-3.5 h-3.5" /> Royalty Splits — Platform Dağılımı
                </h2>
                <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Bar chart */}
                        <div className="space-y-4">
                            {royaltySplits.map((split, idx) => (
                                <div key={split.platform} className="animate-slideInLeft" style={{ animationDelay: `${idx * 0.07}s` }}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: split.color }} />
                                            <span className="text-sm text-[#F5F0EB]/60">{split.platform}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-emerald-400">${split.amount.toFixed(2)}</span>
                                            <span className="text-xs text-[#F5F0EB]/30 font-mono w-8 text-right">{split.percent}%</span>
                                        </div>
                                    </div>
                                    <AnimatedBar percent={split.percent} color={split.color} delay={idx * 100} />
                                </div>
                            ))}
                        </div>

                        {/* Donut visualizer using SVG */}
                        <div className="flex items-center justify-center">
                            <div className="relative w-40 h-40">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    {royaltySplits.reduce((acc, split, idx) => {
                                        const total = royaltySplits.reduce((s, r) => s + r.percent, 0);
                                        const offset = royaltySplits.slice(0, idx).reduce((s, r) => s + r.percent, 0) / total * 251.2;
                                        const dash = (split.percent / total) * 251.2;
                                        acc.push(
                                            <circle
                                                key={split.platform}
                                                cx="50" cy="50" r="40"
                                                fill="none"
                                                stroke={split.color}
                                                strokeWidth="14"
                                                strokeDasharray={`${dash} ${251.2 - dash}`}
                                                strokeDashoffset={-offset}
                                                className="transition-all duration-1000"
                                                style={{ opacity: 0.85 }}
                                            />
                                        );
                                        return acc;
                                    }, [] as React.ReactElement[])}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="font-['Bebas_Neue',sans-serif] text-xl tracking-[2px] text-[#F5F0EB]">$530</p>
                                    <p className="text-[9px] uppercase tracking-[2px] text-[#F5F0EB]/30">toplam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB] mb-4 animate-fadeInUp stagger-3">İşlem Geçmişi</h2>
            <div className="animate-fadeInUp stagger-4">
                <DataTable<Transaction>
                    columns={columns}
                    data={mockTransactions}
                    keyExtractor={(t) => t.id}
                    searchPlaceholder="İşlem ara..."
                />
            </div>

            {/* Payout Modal */}
            <Modal
                isOpen={showPayoutModal}
                onClose={() => setShowPayoutModal(false)}
                title="Ödeme Talebi"
                description="Bakiyenizden ödeme talep edin. Admin onayından sonra 3-5 iş günü içinde ödeme gerçekleştirilir."
                footer={
                    <>
                        <Button variant="ghost" size="sm" onClick={() => setShowPayoutModal(false)}>İptal</Button>
                        <Button size="sm" onClick={handleSubmitPayout}>Talep Gönder</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Tutar ($)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            max={mockWallet.available}
                            className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40 transition-colors"
                        />
                        <p className="text-[10px] text-[#F5F0EB]/25 mt-1">Maksimum: ${mockWallet.available.toFixed(2)}</p>
                    </div>
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Ödeme Yöntemi</label>
                        <select className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40 transition-colors appearance-none">
                            <option value="bank">Banka Transferi (IBAN)</option>
                            <option value="paypal">PayPal</option>
                            <option value="wise">Wise</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Ödeme Detayları</label>
                        <input
                            type="text"
                            placeholder="IBAN / PayPal e-posta / Wise hesabı"
                            className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40 transition-colors"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
