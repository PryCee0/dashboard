'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { mockDeliveryLog } from '@/lib/mock-data';
import { CheckCircle, Clock, Loader2, XCircle } from 'lucide-react';

export default function DeliveryLog() {
    const { t } = useLanguage();

    const statusIcons: Record<string, React.ReactNode> = {
        completed: <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />,
        pending: <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />,
        processing: <Loader2 className="w-3.5 h-3.5 text-[#3B82F6] animate-spin" />,
        failed: <XCircle className="w-3.5 h-3.5 text-[#EF4444]" />,
    };
    const statusBadge: Record<string, string> = {
        completed: 'bg-[#10B981]/10 text-[#10B981]',
        pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
        processing: 'bg-[#3B82F6]/10 text-[#3B82F6]',
        failed: 'bg-[#EF4444]/10 text-[#EF4444]',
    };

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]" />
            <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase mb-4">{t('deliveryLog')}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-[#F5F0EB]/30 text-[10px] uppercase tracking-[2px] border-b border-[#F5F0EB]/[0.06]">
                            <th className="text-left pb-2 font-semibold">{t('platform')}</th>
                            <th className="text-left pb-2 font-semibold">{t('release')}</th>
                            <th className="text-left pb-2 font-semibold">{t('status')}</th>
                            <th className="text-right pb-2 font-semibold">{t('date')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockDeliveryLog.map((entry) => (
                            <tr key={entry.id} className="border-b border-[#F5F0EB]/[0.03] hover:bg-[#F5F0EB]/[0.02] transition-colors">
                                <td className="py-2.5 flex items-center gap-2">
                                    {statusIcons[entry.status]}
                                    <span className="text-[#F5F0EB]/80 font-medium">{entry.platform}</span>
                                </td>
                                <td className="py-2.5 text-[#F5F0EB]/50">{entry.releaseName}</td>
                                <td className="py-2.5">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${statusBadge[entry.status]}`}>{entry.status}</span>
                                </td>
                                <td className="py-2.5 text-right text-[#F5F0EB]/30 text-xs">{entry.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
