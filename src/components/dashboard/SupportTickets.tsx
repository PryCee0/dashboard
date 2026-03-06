'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquarePlus, Inbox, ExternalLink } from 'lucide-react';

const mockTickets = [
    { id: 'T-001', subject: 'Spotify dağıtım gecikmesi', status: 'open' as const, date: '22 Şub' },
    { id: 'T-002', subject: 'Telif raporu sorgusu', status: 'closed' as const, date: '18 Şub' },
];

const statusStyles = {
    open: 'text-amber-400 bg-amber-400/10',
    closed: 'text-[#F5F0EB]/30 bg-[#F5F0EB]/[0.05]',
};

export default function SupportTickets() {
    const { t } = useLanguage();

    return (
        <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-5 relative overflow-hidden animate-fadeInUp stagger-3">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />

            <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[2px] uppercase">{t('supportTickets')}</h3>
                <Link href="/dashboard/support"
                    className="text-[#E41E2B] text-xs font-semibold uppercase tracking-[2px] hover:text-[#FF2D3B] transition-colors flex items-center gap-1 group">
                    Tümü <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                </Link>
            </div>

            {mockTickets.length > 0 ? (
                <div className="space-y-2">
                    {mockTickets.map((ticket, idx) => (
                        <div
                            key={ticket.id}
                            className="flex items-center justify-between p-3 bg-[#0C0A09] border border-[#F5F0EB]/[0.04] hover:border-[#F5F0EB]/[0.08] transition-all duration-200 animate-slideInLeft group"
                            style={{ animationDelay: `${idx * 0.08}s` }}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="font-mono text-[10px] text-[#F5F0EB]/25 shrink-0">{ticket.id}</span>
                                <p className="text-sm text-[#F5F0EB]/70 truncate group-hover:text-[#F5F0EB] transition-colors">{ticket.subject}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-3">
                                <span className="text-[10px] text-[#F5F0EB]/25">{ticket.date}</span>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 ${statusStyles[ticket.status]}`}>
                                    {ticket.status === 'open' ? 'Açık' : 'Kapalı'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#0C0A09] border border-[#F5F0EB]/[0.04] p-8 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border border-[#F5F0EB]/10 flex items-center justify-center mb-3 animate-float">
                        <Inbox className="w-6 h-6 text-[#F5F0EB]/15" />
                    </div>
                    <p className="text-[#F5F0EB]/30 text-sm mb-4">{t('noOpenTickets')}</p>
                </div>
            )}

            <Link href="/dashboard/support">
                <button className="mt-4 w-full bg-[#E41E2B]/10 hover:bg-[#E41E2B]/15 border border-[#E41E2B]/20 text-[#E41E2B] text-xs font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase
                    py-2 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]">
                    <MessageSquarePlus className="w-3.5 h-3.5" />
                    {t('createTicket')}
                </button>
            </Link>
        </div>
    );
}
