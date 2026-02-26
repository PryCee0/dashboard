'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { mockProcessing } from '@/lib/mock-data';
import { Clock, Loader2, CheckCircle } from 'lucide-react';

export default function ProcessingQueue() {
    const { t } = useLanguage();

    const statusIcons: Record<string, React.ReactNode> = {
        pending: <Clock className="w-4 h-4 text-[#F59E0B]" />,
        processing: <Loader2 className="w-4 h-4 text-[#3B82F6] animate-spin" />,
        completed: <CheckCircle className="w-4 h-4 text-[#10B981]" />,
    };
    const statusColors: Record<string, string> = {
        pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
        processing: 'bg-[#3B82F6]/10 text-[#3B82F6]',
        completed: 'bg-[#10B981]/10 text-[#10B981]',
    };

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]" />
            <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase mb-4">{t('processing')}</h3>
            <div className="space-y-2">
                {mockProcessing.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-[#0C0A09] border border-[#F5F0EB]/[0.04] px-4 py-3 hover:border-[#F5F0EB]/10 transition-colors">
                        {statusIcons[item.status]}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#F5F0EB] truncate">{item.title}</p>
                            <p className="text-xs text-[#F5F0EB]/30">{item.type}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${statusColors[item.status]}`}>{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
