'use client';

import { Plus, Target } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';

const platforms = ['Spotify', 'Apple Music', 'Tidal', 'Deezer', 'TikTok', 'YouTube Music', 'Amazon Music'];

export default function PriorityPitchPage() {
    return (
        <div>
            <PageHeader
                title="Priority Pitch"
                description="DSP platformlarına öncelikli yerleştirme ve editöryel playlist başvurusu."
            >
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Başvuru
                </Button>
            </PageHeader>

            {/* Available Platforms */}
            <div className="mb-8">
                <h2 className="text-sm font-semibold text-[#F5F0EB] mb-4">Desteklenen Platformlar</h2>
                <div className="flex flex-wrap gap-2">
                    {platforms.map((p) => (
                        <span key={p} className="px-3 py-1.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-xs text-[#F5F0EB]/50">
                            {p}
                        </span>
                    ))}
                </div>
            </div>

            {/* Info Card */}
            <Card className="mb-8">
                <CardContent>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#E41E2B]/10 flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-[#E41E2B]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-[#F5F0EB] mb-1">Nasıl Çalışır?</h3>
                            <p className="text-xs text-[#F5F0EB]/40 leading-relaxed">
                                Priority Pitch ile yayınlarınızı editöryel playlist&apos;lere ve öne çıkan
                                bölümlere aday gösterebilirsiniz. Başvurularınız, yayın tarihinizden en az
                                3 hafta önce yapılmalıdır. DSP editörleri içeriğinizi inceleyecek ve uygun
                                bulduklarında playlist&apos;lerine ekleyecektir.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <EmptyState
                icon="inbox"
                title="Henüz başvuru yok"
                description="Yayınlarınızı editöryel playlist'lere sunarak daha geniş bir kitleye ulaşın."
                action={
                    <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                        İlk Başvurunuzu Oluşturun
                    </Button>
                }
            />
        </div>
    );
}
