'use client';

import { Edit, Trash2, Plus, Search } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';

export default function PreferencesPage() {
    return (
        <div>
            <PageHeader title="Preferences" description="Label ve sanatçı tercihlerinizi yönetin." />

            {/* Label Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB]">Label</h2>
                        <StatusBadge variant="live" label="Label Plan" dot={false} />
                    </div>
                    <Button variant="secondary" size="sm" icon={<Edit className="w-3 h-3" />}>Düzenle</Button>
                </div>
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#F5F0EB]/[0.06] border border-[#F5F0EB]/[0.08] flex items-center justify-center shrink-0">
                                <span className="text-xl font-bold text-[#F5F0EB]/20">R</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#F5F0EB]">Redpot Records</h3>
                                <p className="text-xs text-[#F5F0EB]/40">Dijital müzik dağıtımı ve telif yönetimi</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Artists Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-['Bebas_Neue',sans-serif] tracking-[2px] uppercase text-[#F5F0EB]">Sanatçılar</h2>
                    <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>Sanatçı Ekle</Button>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/25" />
                    <input
                        type="text"
                        placeholder="Sanatçı ara..."
                        className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40"
                    />
                </div>

                <div className="space-y-3">
                    {[
                        { name: 'NOVA', days: 45 },
                        { name: 'Pulse Theory', days: 38 },
                        { name: 'Eclipse', days: 22 },
                        { name: 'Luna Arc', days: 10 },
                    ].map((artist) => (
                        <Card key={artist.name}>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#E41E2B]/10 flex items-center justify-center shrink-0">
                                        <span className="text-sm font-bold text-[#E41E2B]">{artist.name[0]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-[#F5F0EB]">{artist.name}</h3>
                                        <p className="text-xs text-[#F5F0EB]/30">{artist.days} gün önce oluşturuldu</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" icon={<Edit className="w-3 h-3" />}>Düzenle</Button>
                                        <Button variant="ghost" size="sm" icon={<Trash2 className="w-3 h-3 text-red-400" />} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
