'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockWallet } from '@/lib/mock-data';
import { Wallet, ArrowUpRight } from 'lucide-react';

export default function WelcomeWidget() {
    const { user } = useAuth();
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-[#111110] border border-[#F5F0EB]/[0.06] p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />
                <h1 className="font-['Bebas_Neue',sans-serif] text-2xl md:text-3xl tracking-[2px] uppercase mb-2">
                    {t('welcomeBack')}, {user?.name || 'Artist'} 👋
                </h1>
                <p className="text-[#F5F0EB]/50 text-sm mb-6">{t('accountOverview')}</p>

                <div className="bg-[#0C0A09] border border-[#F5F0EB]/[0.04] p-8 flex flex-col items-center justify-center min-h-[180px]">
                    <div className="w-16 h-16 border border-[#F5F0EB]/10 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-[#F5F0EB]/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                    </div>
                    <p className="text-[#F5F0EB]/30 text-sm text-center">{t('earningsPlaceholder')}</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-[#E41E2B] to-[#B8161F] p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                <div className="relative">
                    <div className="flex items-center gap-2 mb-6">
                        <Wallet className="w-5 h-5 text-white/80" />
                        <span className="text-white/80 text-xs font-semibold uppercase tracking-[2px]">{t('wallet')}</span>
                    </div>
                    <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">{t('availableInWallet')}</p>
                    <p className="font-['Bebas_Neue',sans-serif] text-4xl text-white tracking-[2px]">
                        ${mockWallet.available.toFixed(2)}
                    </p>
                    {mockWallet.pending > 0 && (
                        <p className="text-white/50 text-xs mt-2">{t('pending')}: ${mockWallet.pending.toFixed(2)}</p>
                    )}
                    <button
                        disabled
                        className="mt-6 w-full bg-white/15 hover:bg-white/20 text-white text-sm font-semibold py-2.5 flex items-center justify-center gap-2
              transition-colors disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-[2px] text-xs"
                    >
                        {t('requestPayout')}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
