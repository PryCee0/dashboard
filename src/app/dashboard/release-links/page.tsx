'use client';

import { Copy, Edit, Disc3, Search } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockReleases } from '@/lib/mock-data';
import { useState } from 'react';

export default function ReleaseLinksPage() {
    const [search, setSearch] = useState('');

    const liveReleases = mockReleases.filter(r => r.status === 'live');
    const filtered = search
        ? liveReleases.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
        : liveReleases;

    return (
        <div>
            <PageHeader
                title="Release Links"
                description="Yayınlarınız için akıllı bağlantı sayfalarını yönetin."
            />

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/25" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Yayın ara..."
                    className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40"
                />
            </div>

            {/* Release Links List */}
            <div className="space-y-3">
                {filtered.map((release) => (
                    <Card key={release.id}>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.08] flex items-center justify-center shrink-0">
                                    <Disc3 className="w-5 h-5 text-[#F5F0EB]/20" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-[#F5F0EB]">{release.title}</h3>
                                    <p className="text-xs text-[#F5F0EB]/40">{release.artist}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" icon={<Copy className="w-3.5 h-3.5" />}>
                                        Bağlantı Kopyala
                                    </Button>
                                    <Button variant="secondary" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>
                                        Düzenle
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
