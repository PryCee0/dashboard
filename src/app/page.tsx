'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      router.replace(user ? '/dashboard' : '/login');
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060606]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 bg-[#E41E2B] animate-pulse" />
        <p className="text-[#F5F0EB]/50 text-sm tracking-[4px] uppercase font-medium">Yükleniyor...</p>
      </div>
    </div>
  );
}
