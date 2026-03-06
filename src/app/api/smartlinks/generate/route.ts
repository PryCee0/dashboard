import { NextRequest, NextResponse } from 'next/server';
import { generateSlug } from '@/lib/smartlinks-store';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { spotifyUrl, freeText, title: manualTitle, artistName: manualArtist } = body;
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // ── freeText modu (şarkı listesi) ──
        if (!spotifyUrl && freeText) {
            const slug = generateSlug(manualTitle || freeText, manualArtist || '');
            const payload = { title: manualTitle || freeText, artistName: manualArtist || '', thumbnailUrl: '', links: {} };
            const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
            return NextResponse.json({
                success: true, slug,
                shareUrl: `${baseUrl}/s/${slug}?d=${encoded}`,
                ...payload,
            });
        }

        // ── Spotify URL doğrula ──
        if (!spotifyUrl) {
            return NextResponse.json({ error: 'Spotify Şarkı Linki giriniz.' }, { status: 400 });
        }
        if (!/spotify\.com\/(?:intl-[a-z]+\/)?track\//.test(spotifyUrl)) {
            return NextResponse.json(
                { error: 'Sadece Şarkı (Track) linki kabul edilir. Örn: open.spotify.com/intl-tr/track/...' },
                { status: 400 }
            );
        }

        // Spotify URL'den si=, intl-xx gibi gereksiz parametreleri temizle
        let cleanUrl = spotifyUrl;
        try {
            const parsed = new URL(spotifyUrl);
            const pathname = parsed.pathname.replace(/^\/intl-[a-z]+/, '');
            cleanUrl = `https://open.spotify.com${pathname}`;
        } catch { /* orijinalini kullan */ }

        // ── Odesli API (ücretsiz, kayıt gerekmez) ──
        const odesliUrl = new URL('https://api.song.link/v1-alpha.1/links');
        odesliUrl.searchParams.set('url', cleanUrl);
        odesliUrl.searchParams.set('userCountry', 'TR');

        console.log('[SmartLink] Odesli →', cleanUrl);

        const odesliRes = await fetch(odesliUrl.toString(), {
            headers: { Accept: 'application/json', 'User-Agent': 'RedpotMedia/1.0' },
            signal: AbortSignal.timeout(15000),
        });

        console.log('[SmartLink] Odesli status:', odesliRes.status);

        if (!odesliRes.ok) {
            const errText = await odesliRes.text();
            console.error('[SmartLink] Odesli err:', errText.slice(0, 200));
            return NextResponse.json(
                { error: `Platform linkleri bulunamadı (${odesliRes.status}). Spotify linki geçerli mi?` },
                { status: 502 }
            );
        }

        const odesliData = await odesliRes.json();
        const entities: Record<string, any> = odesliData.entitiesByUniqueId || {};
        const byPlatform: Record<string, any> = odesliData.linksByPlatform || {};

        let title = 'Bilinmeyen Şarkı';
        let artistName = '';
        let thumbnailUrl = '';

        for (const entity of Object.values(entities)) {
            if (entity.title && title === 'Bilinmeyen Şarkı') title = entity.title;
            if (entity.artistName && !artistName) artistName = entity.artistName;
            if (entity.thumbnailUrl && !thumbnailUrl) thumbnailUrl = entity.thumbnailUrl;
            if (title !== 'Bilinmeyen Şarkı' && artistName && thumbnailUrl) break;
        }

        const links = {
            spotify: byPlatform.spotify?.url || null,
            appleMusic: byPlatform.appleMusic?.url || null,
            youtube: byPlatform.youtube?.url || byPlatform.youtubeMusic?.url || null,
            deezer: byPlatform.deezer?.url || null,
            tidal: byPlatform.tidal?.url || null,
            amazon: byPlatform.amazonMusic?.url || null,
            soundcloud: byPlatform.soundcloud?.url || null,
        };

        console.log(`[SmartLink] ✓ "${title}" – "${artistName}" | ${Object.values(links).filter(Boolean).length} platforms`);

        const slug = generateSlug(title, artistName);

        // Veriyi URL parametresi olarak encode et — no database needed!
        const payload = { title, artistName, thumbnailUrl, links };
        const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');

        return NextResponse.json({
            success: true,
            slug,
            shareUrl: `${baseUrl}/s/${slug}?d=${encoded}`,
            title, artistName, thumbnailUrl, links,
        });

    } catch (err: any) {
        const isTimeout = err?.name === 'TimeoutError';
        console.error('[SmartLink]', err.message);
        return NextResponse.json(
            { error: isTimeout ? 'Odesli 15 saniyede yanıt vermedi.' : 'Sunucu hatası: ' + err.message },
            { status: 500 }
        );
    }
}
