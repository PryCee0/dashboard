'use client';

import { Users, Upload, Download, Plus, Mail } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function AudiencePage() {
    return (
        <div>
            <PageHeader
                title="Audience"
                description="Fan kitlenizi yönetin, toplu içe aktarın ve kampanyalar oluşturun."
            >
                <Button variant="secondary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
                    Toplu İçe Aktar
                </Button>
                <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                    Dışa Aktar
                </Button>
                <Button variant="secondary" size="sm" icon={<Mail className="w-3.5 h-3.5" />}>
                    Fan Blast
                </Button>
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Fan
                </Button>
            </PageHeader>

            <EmptyState
                icon="cactus"
                title="Henüz burada bir şey yok..."
                description="Fan kitlenizi oluşturmaya başlayın. CSV dosyasıyla toplu içe aktarma yapabilir veya tek tek fan ekleyebilirsiniz."
                action={
                    <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                        İlk Fanınızı Ekleyin
                    </Button>
                }
            />
        </div>
    );
}
