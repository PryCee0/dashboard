'use client';

import { CreditCard, FileText } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';

export default function BillingPage() {
    return (
        <div>
            <PageHeader title="Billing" description="Faturalama ve abonelik bilgilerinizi yönetin." />

            {/* Current Plan */}
            <Card className="mb-6">
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#E41E2B]/10 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-[#E41E2B]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#F5F0EB]">Label Plan</h3>
                                <p className="text-xs text-[#F5F0EB]/40">Aktif abonelik</p>
                            </div>
                        </div>
                        <StatusBadge variant="live" label="Aktif" />
                    </div>
                </CardContent>
            </Card>

            {/* Payment Method */}
            <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB] mb-4">Ödeme Yöntemi</h2>
            <Card className="mb-6">
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-[#F5F0EB]">•••• •••• •••• 4242</p>
                            <p className="text-xs text-[#F5F0EB]/40">Son kullanma: 12/2028</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Invoice History */}
            <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB] mb-4">Fatura Geçmişi</h2>
            <div className="space-y-3">
                {[
                    { date: 'Şubat 2026', amount: '$19.99', status: 'Ödendi' },
                    { date: 'Ocak 2026', amount: '$19.99', status: 'Ödendi' },
                    { date: 'Aralık 2025', amount: '$19.99', status: 'Ödendi' },
                ].map((invoice, i) => (
                    <Card key={i}>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-[#F5F0EB]/30" />
                                    <div>
                                        <p className="text-sm text-[#F5F0EB]">{invoice.date}</p>
                                        <p className="text-xs text-[#F5F0EB]/40">{invoice.amount}</p>
                                    </div>
                                </div>
                                <StatusBadge variant="live" label={invoice.status} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
