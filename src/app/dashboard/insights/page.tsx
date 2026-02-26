'use client';

import { Sparkles, TrendingUp, BarChart3, Target, FileText, Zap } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const features = [
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Gelir Trendleri', description: 'AI destekli gelir tahminleri ve trend analizi.' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Streaming Performansı', description: 'Platform bazlı derinlemesine performans analizi.' },
    { icon: <Target className="w-6 h-6" />, title: 'Reklam Kampanyaları', description: 'Hedefli reklam kampanyası önerileri.' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Aksiyon Önerileri', description: 'Veriye dayalı aksiyon planı ve öneriler.' },
    { icon: <FileText className="w-6 h-6" />, title: 'PDF Dışa Aktarma', description: 'Detaylı raporları PDF olarak indirin.' },
    { icon: <Zap className="w-6 h-6" />, title: 'Hızlı Analiz', description: 'Saniyeler içinde kapsamlı veri analizi.' },
];

export default function InsightsPage() {
    return (
        <div>
            <PageHeader title="Insights" description="AI destekli akıllı analizler ve öneriler." />

            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#E41E2B]/10 via-[#111110] to-[#111110] border border-[#E41E2B]/20 p-8 sm:p-12 mb-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E41E2B]/5 blur-[100px]" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#E41E2B] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-['Bebas_Neue',sans-serif] tracking-[3px] uppercase text-[#F5F0EB]">
                            AI-Powered Insights
                        </h2>
                    </div>
                    <p className="text-sm text-[#F5F0EB]/50 max-w-lg mb-6">
                        Yapay zeka destekli analizlerle müzik kariyerinizi bir sonraki seviyeye taşıyın.
                        Gelir trendleri, streaming performansı ve aksiyon önerileri tek bir yerde.
                    </p>
                    <Button size="lg" icon={<Sparkles className="w-4 h-4" />}>
                        Başla
                    </Button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, i) => (
                    <Card key={i} hover>
                        <CardContent>
                            <div className="w-10 h-10 bg-[#E41E2B]/10 flex items-center justify-center mb-4 text-[#E41E2B]">
                                {feature.icon}
                            </div>
                            <h3 className="text-sm font-semibold text-[#F5F0EB] mb-1">{feature.title}</h3>
                            <p className="text-xs text-[#F5F0EB]/40">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
