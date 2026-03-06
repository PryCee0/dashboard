'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockWallet } from '@/lib/mock-data';
import { Wallet, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedCounter({ target, prefix = '' }: { target: number; prefix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 900;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [target]);

    return <>{prefix}{count.toFixed(2)}</>;
}

export default function WelcomeWidget() {
    const { user } = useAuth();
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fadeInUp">
            {/* Left: Welcome + placeholder chart */}
            <div className="lg:col-span-2 bg-[#111110] border border-[#F5F0EB]/[0.06] p-6 relative overflow-hidden group hover-glow-white transition-all duration-300">
                {/* Red left accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E41E2B]" />

                {/* Background pulse orb */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#E41E2B]/[0.04] rounded-full blur-2xl group-hover:bg-[#E41E2B]/[0.07] transition-all duration-700" />

                <h1 className="font-['Bebas_Neue',sans-serif] text-2xl md:text-3xl tracking-[2px] uppercase mb-2 animate-slideInLeft stagger-1">
                    {t('welcomeBack')}, {user?.name || 'Artist'} 👋
                </h1>
                <p className="text-[#F5F0EB]/50 text-sm mb-6 animate-slideInLeft stagger-2">{t('accountOverview')}</p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6 animate-fadeInUp stagger-2">
                    <div className="text-center">
                        <p className="text-[9px] uppercase tracking-[2px] text-[#F5F0EB]/25 mb-1">Toplam Şarkı</p>
                        <p className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[2px] text-[#F5F0EB]">12</p>
                    </div>
                    <div className="text-center border-x border-[#F5F0EB]/[0.06]">
                        <p className="text-[9px] uppercase tracking-[2px] text-[#F5F0EB]/25 mb-1">Yayında</p>
                        <p className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[2px] text-emerald-400">8</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] uppercase tracking-[2px] text-[#F5F0EB]/25 mb-1">İncelemede</p>
                        <p className="font-['Bebas_Neue',sans-serif] text-2xl tracking-[2px] text-amber-400">4</p>
                    </div>
                </div>

                {/* Music waveform visualizer */}
                <div className="bg-[#0C0A09] border border-[#F5F0EB]/[0.04] p-6 flex items-end justify-center gap-1 h-[100px]">
                    {[40, 65, 30, 80, 55, 90, 45, 70, 35, 75, 50, 85, 40, 60].map((h, i) => (
                        <div
                            key={i}
                            className="wave-bar"
                            style={{
                                height: `${h}%`,
                                animationDelay: `${i * 0.06}s`,
                                opacity: 0.6,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Right: Wallet card */}
            <div className="bg-gradient-to-br from-[#E41E2B] to-[#B8161F] p-6 relative overflow-hidden animate-fadeInScale stagger-2 group">
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

                {/* Floating orb */}
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-all duration-700" />

                <div className="relative">
                    <div className="flex items-center gap-2 mb-6">
                        <Wallet className="w-5 h-5 text-white/80 animate-float" />
                        <span className="text-white/80 text-xs font-semibold uppercase tracking-[2px]">{t('wallet')}</span>
                    </div>
                    <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">{t('availableInWallet')}</p>
                    <p className="font-['Bebas_Neue',sans-serif] text-4xl text-white tracking-[2px] counter-animate">
                        $<AnimatedCounter target={mockWallet.available} />
                    </p>
                    {mockWallet.pending > 0 && (
                        <div className="flex items-center gap-1 text-white/50 text-xs mt-2">
                            <TrendingUp className="w-3 h-3" />
                            <span>{t('pending')}: ${mockWallet.pending.toFixed(2)}</span>
                        </div>
                    )}
                    <button
                        disabled
                        className="mt-6 w-full bg-white/15 hover:bg-white/25 text-white text-sm font-semibold py-2.5 flex items-center justify-center gap-2
                            transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-[2px] text-xs
                            border border-white/10 hover:border-white/20"
                    >
                        {t('requestPayout')}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
