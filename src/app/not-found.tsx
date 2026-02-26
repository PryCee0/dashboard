import { Disc3, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#080810] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <Disc3 className="w-24 h-24 text-[#E41E2B]/20 animate-spin" style={{ animationDuration: '8s' }} />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-['Bebas_Neue',sans-serif] tracking-[6px] text-[#E41E2B]">
                            404
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl font-['Bebas_Neue',sans-serif] tracking-[4px] uppercase text-[#F5F0EB] mb-3">
                    Sayfa Bulunamadı
                </h1>
                <p className="text-sm text-[#F5F0EB]/40 mb-8">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>

                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E41E2B] text-white text-sm font-semibold uppercase tracking-[2px] hover:bg-[#C41926] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Dashboard&apos;a Dön
                </Link>
            </div>
        </div>
    );
}
