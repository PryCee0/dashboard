'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Music, Copy, Check } from 'lucide-react';

const PLATFORM_META: Record<string, { label: string; color: string; emoji: string }> = {
    spotify: { label: 'Spotify', color: '#1DB954', emoji: '🎵' },
    appleMusic: { label: 'Apple Music', color: '#FC3C44', emoji: '🍎' },
    youtube: { label: 'YouTube Music', color: '#FF0000', emoji: '▶️' },
    deezer: { label: 'Deezer', color: '#A238FF', emoji: '🎧' },
    tidal: { label: 'TIDAL', color: '#00FFFF', emoji: '🌊' },
    amazon: { label: 'Amazon Music', color: '#00A8E0', emoji: '📦' },
    soundcloud: { label: 'SoundCloud', color: '#FF5500', emoji: '☁️' },
};

interface SmartLinkPayload {
    title: string;
    artistName: string;
    thumbnailUrl: string;
    links: Record<string, string | null>;
}

function CopyBtn({ url }: { url: string }) {
    const [done, setDone] = useState(false);
    return (
        <button
            onClick={() => { navigator.clipboard.writeText(url); setDone(true); setTimeout(() => setDone(false), 2000); }}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
        >
            {done ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {done ? 'Kopyalandı!' : 'Linki Kopyala'}
        </button>
    );
}

export default function SmartLinkPublicPage({ params }: { params: { slug: string } }) {
    const [data, setData] = useState<SmartLinkPayload | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        // URL'deki ?d= parametresinden veriyi decode et
        const searchParams = new URLSearchParams(window.location.search);
        const encoded = searchParams.get('d');

        if (encoded) {
            try {
                const decoded = JSON.parse(atob(encoded.replace(/-/g, '+').replace(/_/g, '/')));
                if (decoded.title) {
                    setData(decoded);
                    return;
                }
            } catch {
                // decode başarısız, 404 göster
            }
        }

        // Parametre yoksa veya bozuksa API'ye sor (geriye dönük uyumluluk)
        fetch(`/api/smartlinks/${params.slug}`)
            .then(r => r.json())
            .then(json => {
                if (json.success && json.data) setData(json.data);
                else setNotFound(true);
            })
            .catch(() => setNotFound(true));
    }, [params.slug]);

    if (!data && !notFound) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    if (notFound || !data) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white/50 px-6">
                <Music className="w-12 h-12" />
                <p className="text-center text-sm">Bu link bulunamadı veya süresi dolmuş.</p>
                <a href="/" className="text-xs underline underline-offset-4">Redpot Media</a>
            </div>
        );
    }

    const availableLinks = Object.entries(data.links).filter(([, v]) => !!v);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10 sm:py-16">
            {/* Album Art */}
            <div className="w-56 h-56 sm:w-72 sm:h-72 mb-8 flex-shrink-0">
                {data.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={data.thumbnailUrl}
                        alt={data.title}
                        className="w-full h-full object-cover rounded-2xl shadow-[0_0_80px_rgba(255,255,255,0.15)]"
                    />
                ) : (
                    <div className="w-full h-full rounded-2xl bg-white/5 flex items-center justify-center">
                        <Music className="w-20 h-20 text-white/20" />
                    </div>
                )}
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">{data.title}</h1>
                {data.artistName && (
                    <p className="text-base sm:text-lg text-white/50 mt-2">{data.artistName}</p>
                )}
            </div>

            {/* Platform Links */}
            <div className="w-full max-w-sm space-y-3">
                {availableLinks.map(([key, url]) => {
                    const meta = PLATFORM_META[key];
                    if (!meta || !url) return null;
                    return (
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full px-5 py-4 rounded-xl font-semibold text-sm transition-transform active:scale-95 hover:scale-[1.02]"
                            style={{ backgroundColor: meta.color + '18', border: `1px solid ${meta.color}40` }}
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-lg">{meta.emoji}</span>
                                <span style={{ color: meta.color }}>{meta.label}</span>
                            </span>
                            <ExternalLink className="w-4 h-4 text-white/30" />
                        </a>
                    );
                })}
            </div>

            {/* Share row */}
            <div className="mt-10">
                <CopyBtn url={typeof window !== 'undefined' ? window.location.href : ''} />
            </div>

            {/* Redpot Branding */}
            <div className="mt-12 text-center">
                <p className="text-[11px] uppercase tracking-[3px] text-white/20">
                    Powered by <a href="/" className="text-white/40 hover:text-white/60 transition-colors">Redpot Media</a>
                </p>
            </div>
        </div>
    );
}
