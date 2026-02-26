'use client';

import { Search } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { useState } from 'react';

interface Notification {
    id: string;
    title: string;
    description: string;
    date: string;
    isNew: boolean;
    attachment?: string;
}

const mockNotifications: Notification[] = [
    { id: '1', title: 'Yeni Rapor Hazır', description: 'Ocak 2026 satış raporunuz indirilmeye hazır.', date: '2 saat önce', isNew: true, attachment: 'ocak_2026_rapor.pdf' },
    { id: '2', title: 'Release Onaylandı', description: "Midnight Echo yayını tüm platformlara dağıtıldı.", date: '1 gün önce', isNew: true },
    { id: '3', title: 'Ödeme İşlendi', description: 'Şubat 2026 telif ödemeniz hesabınıza aktarıldı.', date: '3 gün önce', isNew: true },
    { id: '4', title: 'Platform Bakımı', description: '25 Şubat 02:00-04:00 arası planlı bakım yapılacaktır.', date: '1 hafta önce', isNew: false },
    { id: '5', title: 'Yeni Özellik', description: 'AI Insights artık kullanıma hazır!', date: '2 hafta önce', isNew: false },
    { id: '6', title: 'Güvenlik Uyarısı', description: 'Yeni cihazdan giriş tespit edildi.', date: '2 hafta önce', isNew: false },
];

export default function NotificationsPage() {
    const [search, setSearch] = useState('');
    const page = 1;
    const totalPages = 8;

    const filtered = search
        ? mockNotifications.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase()))
        : mockNotifications;

    return (
        <div>
            <PageHeader title="Notifications" description="Tüm bildirimlerinizi görüntüleyin." />

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/25" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Bildirim ara..."
                    className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40"
                />
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filtered.map((notif) => (
                    <Card key={notif.id} hover>
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        {notif.isNew && <StatusBadge variant="new" label="Yeni" dot={false} />}
                                        <h3 className="text-sm font-semibold text-[#F5F0EB]">{notif.title}</h3>
                                    </div>
                                    <p className="text-xs text-[#F5F0EB]/40 mb-2">{notif.description}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] text-[#F5F0EB]/25">{notif.date}</span>
                                        {notif.attachment && (
                                            <a href="#" className="text-[10px] text-[#E41E2B] uppercase tracking-[1px] font-bold hover:underline">
                                                📎 {notif.attachment}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-6">
                <span className="text-xs text-[#F5F0EB]/30">
                    Sayfa {page} / {totalPages}
                </span>
            </div>
        </div>
    );
}
