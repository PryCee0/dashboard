'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { Bell, Wallet, Menu, LogOut, Disc3 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="h-16 bg-[#080810]/90 backdrop-blur-xl border-b border-[#F5F0EB]/[0.06] flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="hidden sm:flex items-center gap-2 text-sm">
                    <Disc3 className="w-4 h-4 text-[#E41E2B]" />
                    <span className="font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB]/70">{t('dashboard')}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:bg-[#F5F0EB]/[0.03] transition-all">
                    <Wallet className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-medium">$0.00</span>
                </button>

                <button className="relative p-2 text-[#F5F0EB]/50 hover:text-[#F5F0EB] hover:bg-[#F5F0EB]/[0.03] transition-all">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#E41E2B] text-[9px] font-bold text-white flex items-center justify-center">
                        3
                    </span>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-[#F5F0EB]/[0.03] transition-all"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#E41E2B] to-[#B8161F] flex items-center justify-center text-white text-xs font-bold">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="hidden md:inline text-sm text-[#F5F0EB]/70 font-medium max-w-[120px] truncate">
                            {user?.name || t('user')}
                        </span>
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#111110] border border-[#F5F0EB]/[0.06] shadow-xl z-50">
                            <div className="px-4 py-3 border-b border-[#F5F0EB]/[0.06]">
                                <p className="text-sm font-medium text-[#F5F0EB] truncate">{user?.name}</p>
                                <p className="text-xs text-[#F5F0EB]/40 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#FF2D3B] hover:bg-[#E41E2B]/10 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                {t('logout')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
