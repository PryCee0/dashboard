'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#060606]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 bg-[#E41E2B] animate-pulse" />
                    <p className="text-[#F5F0EB]/50 text-sm tracking-[4px] uppercase font-medium">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#060606]">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="lg:ml-[260px] flex flex-col min-h-screen">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
