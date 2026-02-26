'use client';

import { useState } from 'react';
import { Plus, Upload, Download } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

const tabs = [
    { id: 'created', label: 'Oluşturduklarım' },
    { id: 'included', label: 'Dahil Olduklarım' },
];

export default function RoyaltySplitsPage() {
    const [activeTab, setActiveTab] = useState('created');

    return (
        <div>
            <PageHeader
                title="Royalty Splits"
                description="İşbirlikçiler arasında otomatik telif paylaşımı yönetimi."
            >
                <Button variant="secondary" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
                    Toplu İçe Aktar
                </Button>
                <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                    Rapor Oluştur
                </Button>
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Royalty Split
                </Button>
            </PageHeader>

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            <EmptyState
                icon="cactus"
                title="Henüz burada bir şey yok..."
                description={
                    activeTab === 'created'
                        ? 'Telif paylaşımı oluşturmaya başlayın. CSV dosyasıyla toplu aktarım da yapabilirsiniz.'
                        : 'Dahil olduğunuz telif paylaşımları burada görüntülenecektir.'
                }
                action={
                    activeTab === 'created' ? (
                        <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                            İlk Paylaşımınızı Oluşturun
                        </Button>
                    ) : undefined
                }
            />
        </div>
    );
}
