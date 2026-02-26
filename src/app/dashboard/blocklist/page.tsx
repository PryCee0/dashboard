'use client';

import { Plus } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function BlocklistPage() {
    return (
        <div>
            <PageHeader
                title="Blocklist"
                description="Yetkisiz kullanım engelleme — istenmeyen kanalları ve kullanıcıları engelleyin."
            >
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Başvuru
                </Button>
            </PageHeader>

            <EmptyState
                icon="cactus"
                title="Henüz burada bir şey yok..."
                description="İçeriklerinizin yetkisiz kullanımını engelleyin. Yeni engelleme başvurusu oluşturarak başlayın."
                action={
                    <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                        İlk Engellemenizi Oluşturun
                    </Button>
                }
            />
        </div>
    );
}
