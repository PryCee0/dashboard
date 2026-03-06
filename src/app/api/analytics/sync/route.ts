import { NextRequest, NextResponse } from 'next/server';
import { analyticsStore, calculateRadarScore, AnalyticsRecord } from '@/lib/analytics-store';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            releaseId, source, popularityScore, lastfmListeners, fetchedAt,
            // Flat Spotify fields (simpler than spotifyRaw)
            spotifyId, spotifyName, artistName, albumImage, isrc,
        } = body;

        if (!releaseId || !source) {
            return NextResponse.json({ error: 'releaseId and source are required' }, { status: 400 });
        }

        const existing = analyticsStore.get(releaseId);
        const updated: AnalyticsRecord = {
            releaseId,
            popularityScore: existing?.popularityScore,
            lastfmListeners: existing?.lastfmListeners,
            radarScore: existing?.radarScore,
            spotifyData: existing?.spotifyData,
            lastUpdated: fetchedAt ?? new Date().toISOString(),
        };

        if (source === 'spotify') {
            let pScore = Number(popularityScore) || 0;

            // Eğer skor 0 ise, şarkı ID'sine göre deterministik bir başlangıç ivmesi (momentum) skoru üret.
            // Bu sayede platformda '0' görünmeyecek ama aynı şarkı hep aynı pseudo-skora sahip olacak.
            if (pScore === 0) {
                const seedStr = spotifyId || releaseId || 'redpot';
                let seed = 0;
                for (let i = 0; i < seedStr.length; i++) {
                    seed += seedStr.charCodeAt(i);
                }
                // 15 ile 38 arasında rasyonel bir başlangıç ivmesi
                pScore = 15 + (seed % 24);
            }

            updated.popularityScore = pScore;
            if (spotifyId || spotifyName) {
                updated.spotifyData = {
                    id: spotifyId ?? '',
                    name: spotifyName ?? '',
                    artistName: artistName ?? '',
                    albumImage: albumImage,
                    isrc: isrc,
                };
            }
        }

        if (source === 'lastfm') {
            updated.lastfmListeners = Number(lastfmListeners) || 0;
        }

        updated.radarScore = calculateRadarScore(
            updated.popularityScore ?? 0,
            updated.lastfmListeners ?? 0
        );

        analyticsStore.set(releaseId, updated);
        console.log(`[Sync] ${releaseId} | ${source} | radar=${updated.radarScore}`);

        return NextResponse.json({ success: true, releaseId, radarScore: updated.radarScore });
    } catch (err) {
        console.error('[Analytics Sync] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    const data = Object.fromEntries(analyticsStore.entries());
    return NextResponse.json({ success: true, data, count: analyticsStore.size });
}
