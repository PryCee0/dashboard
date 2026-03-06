import { NextRequest, NextResponse } from 'next/server';

// In-memory veri deposu (Gerçek DB bağlanana kadar)
const globalStore = global as typeof global & {
    youtubeUsageStore?: Map<string, any>;
};

if (!globalStore.youtubeUsageStore) {
    globalStore.youtubeUsageStore = new Map<string, any>();
}

const usageStore = globalStore.youtubeUsageStore;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { releaseId, artistName, trackName, videos, fetchedAt } = body;

        if (!releaseId || !videos) {
            return NextResponse.json({ error: 'releaseId and videos are required' }, { status: 400 });
        }

        // Gelen videolardan "Shorts" olanları (durationS < 60) ve uzunları ayır
        const allVideos = Array.isArray(videos) ? videos : [];

        // Viral Shorts (Opsiyon 2)
        const shorts = allVideos.filter(v => v.durationS <= 60);
        const totalShortsViews = shorts.reduce((sum, v) => sum + (Number(v.views) || 0), 0);

        // UGC / Normal Videolar (Opsiyon 1)
        const standardVideos = allVideos.filter(v => v.durationS > 60);
        const totalUgcViews = standardVideos.reduce((sum, v) => sum + (Number(v.views) || 0), 0);

        const record = {
            releaseId,
            artistName,
            trackName,
            stats: {
                totalShorts: shorts.length,
                totalShortsViews,
                totalUgcVideos: standardVideos.length,
                totalUgcViews
            },
            videos: allVideos.map(v => ({
                videoId: v.videoId,
                title: v.title,
                channelTitle: v.channelTitle,
                views: Number(v.views) || 0,
                thumbnail: v.thumbnail,
                url: `https://www.youtube.com/watch?v=${v.videoId}`,
                isShort: v.durationS <= 60,
            })),
            lastUpdated: fetchedAt ?? new Date().toISOString()
        };

        usageStore.set(releaseId, record);
        console.log(`[YouTube Sync] ${releaseId} | Shorts: ${shorts.length} | UGC: ${standardVideos.length}`);

        return NextResponse.json({ success: true, releaseId, stats: record.stats });
    } catch (err) {
        console.error('[YouTube Sync] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    const data = Object.fromEntries(usageStore.entries());
    return NextResponse.json({ success: true, data, count: usageStore.size });
}
