'use client';

import { useState } from 'react';
import { Copy, ExternalLink, Check, Disc3, Globe, Eye, Zap, Music, Loader2, AlertCircle, Link as LinkIcon } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { mockReleases } from '@/lib/mock-data';

interface PlatformLinks {
    spotify?: string | null;
    appleMusic?: string | null;
    youtube?: string | null;
    deezer?: string | null;
    tidal?: string | null;
    amazon?: string | null;
    soundcloud?: string | null;
}

interface SmartLinkResult {
    slug: string;
    shareUrl: string;
    title: string;
    artistName: string;
    thumbnailUrl: string;
    links: PlatformLinks;
}

const PLATFORM_META: Record<string, { label: string; color: string }> = {
    spotify: { label: 'Spotify', color: 'text-emerald-400' },
    appleMusic: { label: 'Apple Music', color: 'text-pink-400' },
    youtube: { label: 'YouTube Music', color: 'text-red-400' },
    deezer: { label: 'Deezer', color: 'text-violet-400' },
    tidal: { label: 'TIDAL', color: 'text-cyan-400' },
    amazon: { label: 'Amazon Music', color: 'text-blue-400' },
    soundcloud: { label: 'SoundCloud', color: 'text-orange-400' },
};

function CopyBtn({ text, label = 'Kopyala' }: { text: string; label?: string }) {
    const [done, setDone] = useState(false);
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-[#F5F0EB]/10 text-[#F5F0EB]/40 hover:text-[#F5F0EB] hover:border-[#F5F0EB]/20 transition-all"
        >
            {done ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {done ? 'Kopyalandı!' : label}
        </button>
    );
}

// Per-song generate button — title/artist ile n8n webhook'unu çağırır
function SongLinkBtn({ title, artist }: { title: string; artist: string }) {
    const [loading, setLoading] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (shareUrl) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/smartlinks/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ freeText: `${artist} ${title}`, title, artistName: artist }),
            });
            const data = await res.json();
            if (data.success) {
                setShareUrl(data.shareUrl);
            } else {
                setError(data.error || 'Hata oluştu.');
            }
        } catch {
            setError('Bağlantı hatası.');
        } finally {
            setLoading(false);
        }
    };

    if (shareUrl) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-400 font-mono truncate max-w-[140px]">{shareUrl.replace('http://localhost:3000', '')}</span>
                <CopyBtn text={shareUrl} label="Kopyala" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                {loading ? 'Aranıyor...' : 'Link Oluştur'}
            </button>
            {error && <p className="text-[10px] text-red-400">{error}</p>}
        </div>
    );
}

export default function SmartLinksPage() {
    const [open, setOpen] = useState(false);
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<SmartLinkResult | null>(null);

    const handleGenerate = async () => {
        if (!spotifyUrl.trim()) { setError('Lütfen bir Spotify Şarkı Linki girin.'); return; }
        if (!/spotify\.com\/(?:intl-[a-z]+\/)?track\//.test(spotifyUrl)) {
            setError('Sadece Şarkı (Track) linki kabul edilir. Örn: open.spotify.com/intl-tr/track/...');
            return;
        }
        setLoading(true); setError(''); setResult(null);
        try {
            const res = await fetch('/api/smartlinks/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ spotifyUrl: spotifyUrl.trim() }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) { setError(data.error || 'Bir hata oluştu.'); return; }
            setResult(data);
        } catch (e: any) {
            setError('Ağ hatası: ' + (e.message || 'İnternet bağlantınızı kontrol edin.'));
        } finally { setLoading(false); }
    };

    const handleClose = () => {
        if (!loading) { setOpen(false); setSpotifyUrl(''); setError(''); setResult(null); }
    };

    const availableLinks = result
        ? (Object.entries(result.links) as [string, string | null | undefined][]).filter(([, v]) => !!v)
        : [];

    // Live şarkılar (spotifyUrl mockta olmadığı için filtrelemiyoruz, hepsi gösteriliyor)
    const liveReleases = mockReleases.filter(r => r.status === 'live');

    return (
        <div>
            <PageHeader
                title="Smart Links"
                description="Şarkının Spotify linkini yapıştır — Redpot AI bütün platformları bulup tek bir paylaşım sayfası oluşturur. Biyografine veya story'ne koy, dinleyiciler tercih ettikleri uygulamada açar."
                breadcrumbs={[{ label: 'Portal', href: '/dashboard' }, { label: 'Smart Links' }]}
            >
                <Button icon={<Zap className="w-4 h-4" />} onClick={() => setOpen(true)}>Oto-Link Oluştur</Button>
            </PageHeader>

            {/* Şarkı Listesi */}
            <h2 className="text-[11px] font-bold uppercase tracking-[4px] text-[#F5F0EB]/30 mb-4 mt-8">Yayındaki Şarkılar</h2>
            <div className="bg-[#111110] border border-[#F5F0EB]/[0.06] divide-y divide-[#F5F0EB]/[0.04]">
                {liveReleases.length === 0 ? (
                    <div className="text-center py-12">
                        <Music className="w-8 h-8 text-[#F5F0EB]/10 mx-auto mb-3" />
                        <p className="text-sm text-[#F5F0EB]/30">Henüz yayında şarkı yok.</p>
                    </div>
                ) : (
                    liveReleases.map(r => (
                        <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-[#F5F0EB]/[0.02] transition-colors">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                    <Disc3 className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[#F5F0EB] truncate">{r.title}</p>
                                    <p className="text-xs text-[#F5F0EB]/40">{r.artist}</p>
                                </div>
                            </div>
                            <div className="pl-12 sm:pl-0">
                                <SongLinkBtn title={r.title} artist={r.artist} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* AI Generator Modal */}
            <Modal
                isOpen={open}
                onClose={handleClose}
                title={result ? `${result.artistName ? result.artistName + ' – ' : ''}${result.title}` : 'Otomatik Platform Taraması'}
                description={result ? '' : 'Şarkının Spotify linkini yapıştırın. AI diğer tüm platformları saniyeler içinde bulur ve paylaşıma hazır bir link oluşturur.'}
                size="lg"
                footer={result ? (
                    <Button onClick={handleClose}>Kapat</Button>
                ) : (
                    <>
                        <Button variant="ghost" onClick={handleClose} disabled={loading}>İptal</Button>
                        <Button onClick={handleGenerate} disabled={loading || !spotifyUrl.trim()}
                            icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}>
                            {loading ? 'Taranıyor...' : 'Platformları Bul'}
                        </Button>
                    </>
                )}
            >
                {result ? (
                    <div className="space-y-4 py-2">
                        {/* Kapak + Şarkı Bilgisi */}
                        {(result.thumbnailUrl || result.title) && (
                            <div className="flex items-center gap-4 p-3 bg-[#111110] border border-[#F5F0EB]/[0.06]">
                                {result.thumbnailUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={result.thumbnailUrl}
                                        alt={result.title}
                                        className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                                    />
                                )}
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-[#F5F0EB] truncate">{result.title}</p>
                                    {result.artistName && (
                                        <p className="text-xs text-[#F5F0EB]/50 mt-0.5">{result.artistName}</p>
                                    )}
                                    <p className="text-xs text-emerald-400 font-semibold mt-1">
                                        {Object.values(result.links).filter(Boolean).length} Platformda bulundu
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* Share URL */}
                        <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20">
                            <div className="min-w-0">
                                <p className="text-[10px] uppercase tracking-widest text-emerald-400/70 mb-1">Paylaşım Linkin</p>
                                <p className="text-sm text-emerald-300 font-mono truncate">{result.shareUrl}</p>
                            </div>
                            <div className="flex gap-2 ml-3 flex-shrink-0">
                                <CopyBtn text={result.shareUrl} />
                                <a href={result.shareUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center border border-[#F5F0EB]/[0.08] text-[#F5F0EB]/30 hover:text-[#F5F0EB] transition-all">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                        {/* Platform Links */}
                        <div className="space-y-2">
                            {availableLinks.map(([key, url]) => {
                                const meta = PLATFORM_META[key] || { label: key, color: 'text-[#F5F0EB]/60' };
                                return (
                                    <div key={key} className="flex items-center justify-between p-3 bg-[#111110] border border-[#F5F0EB]/[0.06]">
                                        <span className={`text-sm font-semibold ${meta.color}`}>{meta.label}</span>
                                        <div className="flex items-center gap-2">
                                            <CopyBtn text={url!} />
                                            <a href={url!} target="_blank" rel="noopener noreferrer"
                                                className="w-8 h-8 flex items-center justify-center border border-[#F5F0EB]/[0.08] text-[#F5F0EB]/30 hover:text-[#F5F0EB] transition-all">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="py-2 space-y-4">
                        {error && (
                            <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/20">
                                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-red-400 leading-relaxed">{error}</p>
                            </div>
                        )}
                        <div>
                            <label className="block text-[11px] uppercase tracking-[2px] text-[#F5F0EB]/40 font-bold mb-2">Spotify Şarkı Linki *</label>
                            <div className="relative">
                                <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F0EB]/20" />
                                <input type="url" value={spotifyUrl}
                                    onChange={e => { setSpotifyUrl(e.target.value); setError(''); }}
                                    onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                                    placeholder="https://open.spotify.com/intl-tr/track/..."
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 bg-[#111110] border border-[#F5F0EB]/[0.08] text-sm text-[#F5F0EB] font-mono placeholder:text-[#F5F0EB]/20 focus:outline-none focus:border-emerald-500/40 disabled:opacity-50 transition-colors"
                                />
                            </div>
                        </div>
                        {loading && (
                            <div className="flex items-center gap-3 p-3 bg-emerald-500/5 border border-emerald-500/10">
                                <Loader2 className="w-4 h-4 text-emerald-400 animate-spin flex-shrink-0" />
                                <p className="text-xs text-emerald-400/70">N8N → Odesli API taranıyor...</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
