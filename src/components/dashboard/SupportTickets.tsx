'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquarePlus, Inbox } from 'lucide-react';

export default function SupportTickets() {
    const { t } = useLanguage();

    const handleCreateTicket = () => {
        console.log('[Redpot Media] Support ticket requested — Manual Sync: Pending');
        alert(t('ticketCreated'));
    };

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />
            <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase mb-4">{t('supportTickets')}</h3>
            <div className="bg-[#0C0A09] border border-[#F5F0EB]/[0.04] p-8 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border border-[#F5F0EB]/10 flex items-center justify-center mb-3">
                    <Inbox className="w-6 h-6 text-[#F5F0EB]/15" />
                </div>
                <p className="text-[#F5F0EB]/30 text-sm mb-4">{t('noOpenTickets')}</p>
                <button onClick={handleCreateTicket}
                    className="bg-[#E41E2B] text-white text-xs font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase
            px-4 py-2 flex items-center gap-2 hover:bg-[#FF2D3B] hover:shadow-[2px_2px_0px_#B8161F]
            hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150">
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    {t('createTicket')}
                </button>
            </div>
        </div>
    );
}
