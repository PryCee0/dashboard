'use client';

import { useState } from 'react';
import { Shield, Key, Smartphone, Users, Mail, Globe } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import TabNav from '@/components/ui/TabNav';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import DataTable, { Column } from '@/components/ui/DataTable';

const tabs = [
    { id: 'general', label: 'Genel' },
    { id: 'account', label: 'Hesap Detayları' },
    { id: 'payout', label: 'Ödeme Tercihleri' },
    { id: 'billing', label: 'Fatura Geçmişi' },
    { id: 'documents', label: 'Belgeler' },
    { id: 'login', label: 'Giriş Geçmişi' },
];

interface LoginSession {
    id: string;
    date: string;
    ip: string;
    country: string;
    city: string;
    device: string;
    os: string;
    browser: string;
}

const mockSessions: LoginSession[] = [
    { id: '1', date: '2026-02-23 21:30', ip: '88.241.xxx.xxx', country: 'Türkiye', city: 'İstanbul', device: 'Desktop', os: 'Windows 11', browser: 'Chrome 132' },
    { id: '2', date: '2026-02-22 14:15', ip: '88.241.xxx.xxx', country: 'Türkiye', city: 'İstanbul', device: 'Mobil', os: 'iOS 19', browser: 'Safari 19' },
    { id: '3', date: '2026-02-20 09:45', ip: '88.241.xxx.xxx', country: 'Türkiye', city: 'Ankara', device: 'Desktop', os: 'macOS 16', browser: 'Firefox 135' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [twoFactor, setTwoFactor] = useState(false);

    const sessionColumns: Column<LoginSession>[] = [
        { key: 'date', label: 'Tarih', sortable: true },
        { key: 'ip', label: 'IP', render: (r) => <span className="font-mono text-xs text-[#F5F0EB]/50">{r.ip}</span> },
        { key: 'country', label: 'Ülke' },
        { key: 'city', label: 'Şehir' },
        { key: 'device', label: 'Cihaz' },
        { key: 'os', label: 'İşletim Sistemi' },
        { key: 'browser', label: 'Tarayıcı' },
    ];

    return (
        <div>
            <PageHeader title="Settings" description="Hesap ayarlarınızı yönetin." />

            <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            {activeTab === 'general' && (
                <div className="space-y-6 max-w-2xl">
                    {/* Password */}
                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                                <Key className="w-4 h-4 text-[#E41E2B]" />
                                <h3 className="text-sm font-semibold text-[#F5F0EB]">Şifre Değiştir</h3>
                            </div>
                            <div className="space-y-3">
                                <input type="password" placeholder="Mevcut şifre" className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40" />
                                <input type="password" placeholder="Yeni şifre" className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/25 focus:outline-none focus:border-[#E41E2B]/40" />
                                <Button size="sm">Güncelle</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2FA */}
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-4 h-4 text-emerald-400" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#F5F0EB]">İki Faktörlü Doğrulama (2FA)</h3>
                                        <p className="text-xs text-[#F5F0EB]/40">Hesabınıza ekstra güvenlik katmanı ekleyin</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setTwoFactor(!twoFactor)}
                                    className={`relative w-11 h-6 rounded-full transition-colors ${twoFactor ? 'bg-[#E41E2B]' : 'bg-[#F5F0EB]/10'}`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Connected Services */}
                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                                <Globe className="w-4 h-4 text-blue-400" />
                                <h3 className="text-sm font-semibold text-[#F5F0EB]">Bağlı Hizmetler</h3>
                            </div>
                            <div className="space-y-3">
                                {['Spotify for Artists', 'Audiomack', 'EVEN'].map(service => (
                                    <div key={service} className="flex items-center justify-between py-2 border-b border-[#F5F0EB]/[0.04] last:border-0">
                                        <span className="text-sm text-[#F5F0EB]/60">{service}</span>
                                        <Button variant="outline" size="sm">Bağla</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Communication */}
                    <Card>
                        <CardContent>
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-4 h-4 text-amber-400" />
                                <h3 className="text-sm font-semibold text-[#F5F0EB]">İletişim Tercihleri</h3>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#E41E2B]" />
                                    <span className="text-sm text-[#F5F0EB]/60">Bülten e-postaları</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#E41E2B]" />
                                    <span className="text-sm text-[#F5F0EB]/60">Ürün güncellemeleri</span>
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'account' && (
                <div className="space-y-4 max-w-2xl">
                    <Card>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Ad Soyad</label>
                                    <input type="text" defaultValue="Demo Kullanıcı" className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">Display Name</label>
                                    <input type="text" defaultValue="demo" className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#F5F0EB]/40 uppercase tracking-[2px] font-bold mb-2">E-posta</label>
                                    <input type="email" defaultValue="demo@redpotmedia.com" className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40" />
                                </div>
                                <Button size="sm">Kaydet</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'payout' && (
                <div className="max-w-2xl">
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 mb-6">
                        <p className="text-sm text-amber-400">Ödeme yönteminizi yapılandırmanız gerekmektedir.</p>
                    </div>
                    <div className="space-y-3">
                        {['ACH / Direct Deposit', 'Stripe', 'Wise', 'PayPal', 'Venmo'].map(method => (
                            <Card key={method} hover>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-[#F5F0EB]">{method}</span>
                                        <Button variant="outline" size="sm">Yapılandır</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <Card>
                    <CardContent>
                        <Button variant="secondary" size="sm">Faturaları Görüntüle</Button>
                    </CardContent>
                </Card>
            )}

            {activeTab === 'documents' && (
                <EmptyState
                    icon="cactus"
                    title="Henüz belge yok"
                    description="Vergi formları ve diğer belgeleriniz burada görüntülenecektir."
                />
            )}

            {activeTab === 'login' && (
                <div>
                    <h3 className="text-sm font-semibold text-[#F5F0EB] mb-4">Aktif Oturumlar</h3>
                    <DataTable<LoginSession>
                        columns={sessionColumns}
                        data={mockSessions}
                        keyExtractor={(s) => s.id}
                        searchable={false}
                    />
                </div>
            )}
        </div>
    );
}
