'use client';

import { Plus, Shield } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function ProfileDefenderPage() {
    return (
        <div>
            <PageHeader
                title="Profile Defender"
                description="Sanatçı profillerinizi yetkisiz değişikliklerden koruyun."
            >
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Sanatçı Ekle
                </Button>
            </PageHeader>

            {/* Artist Filter */}
            <div className="mb-6">
                <select className="px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40">
                    <option>Tüm Sanatçılar</option>
                    <option>NOVA</option>
                    <option>Pulse Theory</option>
                    <option>Eclipse</option>
                </select>
            </div>

            <EmptyState
                icon="cactus"
                title="Henüz aktivite tespit edilmedi"
                description="Sanatçı profillerinize yapılan değişiklikler burada izlenir. Sanatçı ekleyerek korumayı başlatın."
                action={
                    <Button size="sm" icon={<Shield className="w-3.5 h-3.5" />}>
                        Korumayı Başlat
                    </Button>
                }
            />
        </div>
    );
}
