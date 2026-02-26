'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Locale, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'redpot_locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('tr');

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'tr') {
            setLocaleState(stored);
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem(STORAGE_KEY, newLocale);
    }, []);

    const t = useCallback((key: TranslationKey): string => {
        return translations[locale][key] || key;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
