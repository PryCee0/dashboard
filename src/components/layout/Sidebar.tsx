'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { sidebarNavigation } from '@/lib/mock-data';
import { SidebarItem } from '@/types';
import { TranslationKey } from '@/lib/translations';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import {
    LayoutDashboard, Disc3, Wallet, BarChart3, Link as LinkIcon,
    HelpCircle, X, Target, Search, Plus,
    ChevronDown, ChevronUp
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
    Disc3: <Disc3 className="w-4 h-4" />,
    Wallet: <Wallet className="w-4 h-4" />,
    BarChart3: <BarChart3 className="w-4 h-4" />,
    Link: <LinkIcon className="w-4 h-4" />,
    Target: <Target className="w-4 h-4" />,
    Search: <Search className="w-4 h-4" />,
    HelpCircle: <HelpCircle className="w-4 h-4" />,
    Plus: <Plus className="w-4 h-4" />,
};

// Map sidebar section labels to translation keys
const sectionLabelMap: Record<string, TranslationKey> = {
    'ANA': 'sidebarMain',
    'MÜZİK': 'sidebarMusic',
    'FİNANS': 'sidebarFinance',
    'ANALİTİK': 'sidebarAnalytics',
    'PAZARLAMA': 'sidebarMarketing',
    'DESTEK': 'sidebarSupport',
};

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [showMoreExtras, setShowMoreExtras] = useState(false);

    const EXTRAS_VISIBLE_COUNT = 4;

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-[260px] bg-[#080810] border-r border-[#F5F0EB]/[0.06] z-50
          flex flex-col overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-[#F5F0EB]/[0.06]">
                    <Link href="/dashboard" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-[#E41E2B] flex items-center justify-center">
                            <Disc3 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-['Bebas_Neue',sans-serif] text-xl tracking-[3px] uppercase">
                            <span className="text-[#E41E2B]">RED</span>POT
                        </span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden text-[#F5F0EB]/40 hover:text-[#F5F0EB] transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {sidebarNavigation.map((section) => {
                        const isExtras = section.label === 'EK HİZMETLER';
                        const visibleItems = isExtras && !showMoreExtras
                            ? section.items.slice(0, EXTRAS_VISIBLE_COUNT)
                            : section.items;
                        const hiddenCount = isExtras ? section.items.length - EXTRAS_VISIBLE_COUNT : 0;

                        return (
                            <div key={section.label} className="mb-4">
                                <p className="px-3 text-[10px] font-bold uppercase tracking-[3px] text-[#F5F0EB]/25 mb-2">
                                    {sectionLabelMap[section.label] ? t(sectionLabelMap[section.label]) : section.label}
                                </p>
                                {visibleItems.map((rawItem) => {
                                    const item = rawItem as SidebarItem;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 text-sm transition-all duration-150 group relative
                      ${isActive
                                                    ? 'text-[#F5F0EB] bg-[#E41E2B]/10'
                                                    : 'text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:bg-[#F5F0EB]/[0.03]'
                                                }`}
                                        >
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#E41E2B]" />
                                            )}
                                            <span className={isActive ? 'text-[#E41E2B]' : 'text-[#F5F0EB]/40 group-hover:text-[#F5F0EB]/70'}>
                                                {iconMap[item.icon] || <LayoutDashboard className="w-4 h-4" />}
                                            </span>
                                            <span className="font-medium">{item.name}</span>
                                            {item.badge && item.badge > 0 && (
                                                <span className="ml-auto bg-[#E41E2B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.badge && item.badge < 0 && (
                                                <span className="ml-auto text-[8px] font-bold uppercase tracking-[1px] text-[#F5F0EB]/20 bg-[#F5F0EB]/[0.04] px-1.5 py-0.5">
                                                    Yakında
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                                {isExtras && hiddenCount > 0 && (
                                    <button
                                        onClick={() => setShowMoreExtras(!showMoreExtras)}
                                        className="flex items-center gap-3 px-3 py-2 text-sm text-[#E41E2B]/70 hover:text-[#E41E2B] transition-all duration-150 w-full"
                                    >
                                        <span className="text-[#E41E2B]/40">
                                            {showMoreExtras ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </span>
                                        <span className="font-medium text-xs">
                                            {showMoreExtras ? 'Show Less' : `Show More (${hiddenCount})`}
                                        </span>
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Language + Footer */}
                <div className="px-5 py-4 border-t border-[#F5F0EB]/[0.06] space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#F5F0EB]/30 uppercase tracking-[2px] font-semibold">{t('language')}</span>
                        <LanguageSwitcher />
                    </div>
                    <p className="text-[10px] text-[#F5F0EB]/20 tracking-[2px] uppercase text-center">
                        {t('copyright')}
                    </p>
                </div>
            </aside>
        </>
    );
}

