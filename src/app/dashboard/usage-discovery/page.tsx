'use client';

import { useState } from 'react';
import { Plus, Headphones } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

const tabs = [
    { id: 'matches', label: 'Eşleşme Sonuçları' },
    { id: 'discovery', label: 'Keşifte' },
];

export default function UsageDiscoveryPage() {
    const [activeTab, setActiveTab] = useState('matches');

    return (
        <div>
            <PageHeader
                title="Usage Discovery"
                description="Müziğinizin nerede kullanıldığını keşfedin ve telif haklarınızı koruyun."
            >
                <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                    Yeni Tarama
                </Button>
            </PageHeader>

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            {activeTab === 'matches' && (
                <EmptyState
                    icon="search"
                    title="Eşleşme bulunamadı"
                    description="İçeriklerinizin kullanımını tespit etmek için tarama başlatın."
                    action={
                        <Button size="sm" icon={<Headphones className="w-3.5 h-3.5" />}>
                            Taramaya Başla
                        </Button>
                    }
                />
            )}

            {activeTab === 'discovery' && (
                <EmptyState
                    icon="inbox"
                    title="Keşifte içerik bulunmuyor"
                    description="Taranmakta olan içerikleriniz burada görüntülenecektir."
                />
            )}
        </div>
    );
}
