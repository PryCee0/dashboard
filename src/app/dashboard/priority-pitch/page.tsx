'use client';

import { useState } from 'react';
import { Target, Plus, CheckCircle2, Clock, XCircle, Disc3, ChevronRight, Send } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockReleases } from '@/lib/mock-data';

interface PitchSubmission {
    id: string;
    releaseTitle: string;
    targetDSPs: string[];
    pitchNote: string;
    targetDate: string;
    status: 'submitted' | 'reviewing' | 'accepted' | 'rejected';
    submittedAt: string;
    adminNote?: string;
}

const DSPS = ['Spotify', 'Apple Music', 'Amazon Music', 'Deezer', 'YouTube Music', 'Tidal', 'TikTok'];

const mockPitches: PitchSubmission[] = [
    { id: 'pp-001', releaseTitle: 'UMRUMDA', targetDSPs: ['Spotify', 'Apple Music'], pitchNote: 'Türkçe Rap haftalık listesi için başvuru.', targetDate: '2026-03-01', status: 'reviewing', submittedAt: '2026-02-22' },
    { id: 'pp-002', releaseTitle: 'KAYIP RUH', targetDSPs: ['Spotify'], pitchNote: 'New Music Friday Türkiye için uygun.', targetDate: '2026-02-20', status: 'accepted', submittedAt: '2026-02-10', adminNote: 'Spotify ekibine iletildi.' },
];

const statusVariants: Record<string, { icon: React.ReactNode, label: string, color: string }> = {
    submitted: { icon: <Send className="w-3.5 h-3.5" />, label: 'Gönderildi', color: 'text-blue-400' },
    reviewing: { icon: <Clock className="w-3.5 h-3.5" />, label: 'İnceleniyor', color: 'text-amber-400' },
    accepted: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: 'Kabul Edildi', color: 'text-emerald-400' },
    rejected: { icon: <XCircle className="w-3.5 h-3.5" />, label: 'Reddedildi', color: 'text-red-400' },
};

export default function PriorityPitchPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDSPs, setSelectedDSPs] = useState<string[]>([]);
    const [selectedRelease, setSelectedRelease] = useState('');
    const [pitchNote, setPitchNote] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const toggleDSP = (dsp: string) => {
        setSelectedDSPs(prev => prev.includes(dsp) ? prev.filter(d => d !== dsp) : [...prev, dsp]);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setShowModal(false);
                setSubmitted(false);
                setSelectedDSPs([]);
                setSelectedRelease('');
                setPitchNote('');
                setTargetDate('');
            }, 1500);
        }, 1200);
    };

    const liveReleases = mockReleases.filter(r => r.status === 'live');

    return (
        <div>
            <PageHeader
                title="Priority Pitch"
                description="DSP editöryal listeleri için başvuru yapın ve başvurularınızın durumunu takip edin."
                breadcrumbs={[{ label: 'Portal', href: '/dashboard' }, { label: 'Priority Pitch' }]}
            >
                <Button icon={<Plus className="w-3.5 h-3.5" />} size="sm" onClick={() => setShowModal(true)}>
                    Yeni Başvuru
                </Button>
            </PageHeader>

            {/* Info Card */}
            <Card className="mb-8">
                <CardContent>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#E41E2B]/10 flex items-center justify-center flex-shrink-0">
                            <Target className="w-5 h-5 text-[#E41E2B]" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#F5F0EB] mb-1">Priority Pitch Nedir?</p>
                            <p className="text-xs text-[#F5F0EB]/50 leading-relaxed">
                                Redpot Media ekibi, başvurunuzu değerlendirerek şarkınızı Spotify New Music Friday, Apple Music New Artist Spotlight ve diğer editöryal listeler için DSP küratörlerine iletir.
                                Ortalama yanıt süresi: 5-7 iş günü.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pitch Tracker */}
            <h2 className="text-sm font-bold uppercase tracking-[3px] text-[#F5F0EB]/30 mb-4">🎯 Başvuru Takibi</h2>
            {mockPitches.length === 0 ? (
                <div className="text-center py-16 border border-[#F5F0EB]/[0.06]">
                    <Target className="w-10 h-10 text-[#F5F0EB]/10 mx-auto mb-3" />
                    <p className="text-sm text-[#F5F0EB]/30">Henüz başvuru yapılmadı.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {mockPitches.map(pitch => {
                        const sv = statusVariants[pitch.status];
                        return (
                            <div key={pitch.id} className="bg-[#111110] border border-[#F5F0EB]/[0.06] p-4 hover:border-[#E41E2B]/20 transition-all">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-[#E41E2B]/10 flex items-center justify-center flex-shrink-0">
                                            <Disc3 className="w-4 h-4 text-[#E41E2B]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#F5F0EB]">{pitch.releaseTitle}</p>
                                            <p className="text-xs text-[#F5F0EB]/40 mt-0.5">{pitch.targetDSPs.join(', ')}</p>
                                            <p className="text-xs text-[#F5F0EB]/25 mt-1">{new Date(pitch.submittedAt).toLocaleDateString('tr-TR')}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${sv.color}`}>
                                        {sv.icon}
                                        {sv.label}
                                    </div>
                                </div>
                                {pitch.adminNote && (
                                    <div className="mt-3 pl-12">
                                        <p className="text-xs text-[#F5F0EB]/40 bg-[#F5F0EB]/[0.03] border border-[#F5F0EB]/[0.06] px-3 py-2">
                                            💬 {pitch.adminNote}
                                        </p>
                                    </div>
                                )}
                                {/* Progress steps */}
                                <div className="mt-4 pl-12 flex items-center gap-2">
                                    {['submitted', 'reviewing', 'accepted'].map((step, i) => {
                                        const stepOrder = { submitted: 0, reviewing: 1, accepted: 2, rejected: 2 };
                                        const currentStep = stepOrder[pitch.status as keyof typeof stepOrder];
                                        const isDone = i <= currentStep;
                                        const isRejected = pitch.status === 'rejected' && i === 2;
                                        return (
                                            <div key={step} className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full transition-all ${isRejected ? 'bg-red-500' : isDone ? 'bg-[#E41E2B]' : 'bg-[#F5F0EB]/10'}`} />
                                                {i < 2 && <div className={`h-px w-8 ${i < currentStep ? 'bg-[#E41E2B]/40' : 'bg-[#F5F0EB]/[0.06]'}`} />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* New Pitch Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Yeni Priority Pitch Başvurusu"
                description="Editöryal listeye girmesini istediğiniz şarkıyı ve hedef platformları seçin."
                size="lg"
                footer={submitted ? undefined : (
                    <>
                        <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>İptal</Button>
                        <Button size="sm" onClick={handleSubmit} disabled={!selectedRelease || selectedDSPs.length === 0 || isSubmitting}>
                            {isSubmitting ? 'Gönderiliyor...' : 'Başvuru Gönder'}
                        </Button>
                    </>
                )}
            >
                {submitted ? (
                    <div className="text-center py-8">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-[#F5F0EB]">Başvurunuz alındı!</p>
                        <p className="text-xs text-[#F5F0EB]/40 mt-1">Redpot Media ekibi en kısa sürede geri dönecektir.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs uppercase tracking-[2px] text-[#F5F0EB]/40 font-bold mb-2">Şarkı Seç *</label>
                            <select
                                value={selectedRelease}
                                onChange={e => setSelectedRelease(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40"
                            >
                                <option value="">Şarkı seçin...</option>
                                {liveReleases.map(r => (
                                    <option key={r.id} value={r.id}>{r.title} — {r.artist}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-[2px] text-[#F5F0EB]/40 font-bold mb-2">Hedef Platformlar *</label>
                            <div className="flex flex-wrap gap-2">
                                {DSPS.map(dsp => (
                                    <button
                                        key={dsp}
                                        onClick={() => toggleDSP(dsp)}
                                        className={`px-3 py-1.5 text-xs font-semibold border transition-all ${selectedDSPs.includes(dsp) ? 'bg-[#E41E2B] border-[#E41E2B] text-white' : 'border-[#F5F0EB]/10 text-[#F5F0EB]/50 hover:border-[#F5F0EB]/20'}`}
                                    >
                                        {dsp}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-[2px] text-[#F5F0EB]/40 font-bold mb-2">Hedef Çıkış Tarihi</label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={e => setTargetDate(e.target.value)}
                                className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] focus:outline-none focus:border-[#E41E2B]/40"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-[2px] text-[#F5F0EB]/40 font-bold mb-2">Pitch Notu</label>
                            <textarea
                                rows={4}
                                value={pitchNote}
                                onChange={e => setPitchNote(e.target.value)}
                                placeholder="Bu şarkı neden bu listeye girebilir? Hedef kitle, tür, dönem, influencer bağlantıları gibi detayları paylaşın..."
                                className="w-full px-4 py-2.5 bg-[#F5F0EB]/[0.04] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-[#E41E2B]/40 resize-none"
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
