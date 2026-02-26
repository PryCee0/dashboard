'use client';

import { Plus } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function GreenlistPage() {
    return (
        <div>
            <PageHeader
                title="Greenlist"
                description="Content ID izin listesi — onaylı kullanıcıları ve kanalları yönetin."
            >
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Başvuru
                </Button>
            </PageHeader>

            <EmptyState
                icon="cactus"
                title="Henüz burada bir şey yok..."
                description="İçeriklerinizin belirli kanallarda kullanılmasına izin verin. Yeni başvuru oluşturarak başlayın."
                action={
                    <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                        İlk Başvurunuzu Oluşturun
                    </Button>
                }
            />
        </div>
    );
}
