'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'minimal' }) {
    const { locale, setLocale } = useLanguage();

    if (variant === 'minimal') {
        return (
            <button
                onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
                className="flex items-center gap-1.5 px-2 py-1.5 text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:bg-[#F5F0EB]/[0.03] transition-all"
                title={locale === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}
            >
                <Languages className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">{locale === 'tr' ? 'EN' : 'TR'}</span>
            </button>
        );
    }

    return (
        <div className="flex items-center bg-[#0C0A09] border border-[#F5F0EB]/[0.06]">
            <button
                onClick={() => setLocale('tr')}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] transition-all
          ${locale === 'tr'
                        ? 'bg-[#E41E2B] text-white'
                        : 'text-[#F5F0EB]/40 hover:text-[#F5F0EB]/70'
                    }`}
            >
                TR
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] transition-all
          ${locale === 'en'
                        ? 'bg-[#E41E2B] text-white'
                        : 'text-[#F5F0EB]/40 hover:text-[#F5F0EB]/70'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
