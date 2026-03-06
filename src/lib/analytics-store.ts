/**
 * Global in-memory analytics store.
 * Gerçek veritabanına geçilene kadar burada tutulur.
 * Next.js dev server her yeniden başladığında sıfırlanır.
 */

export interface AnalyticsRecord {
    releaseId: string;
    popularityScore?: number;
    lastfmListeners?: number;
    radarScore?: number;
    spotifyData?: {
        id: string;
        name: string;
        artistName: string;
        albumImage?: string;
        externalUrl?: string;
        isrc?: string;
        duration_ms?: number;
    };
    lastUpdated?: string;
}

// Global store (process-level singleton)
const globalStore = global as typeof global & {
    analyticsStore?: Map<string, AnalyticsRecord>;
};

if (!globalStore.analyticsStore) {
    globalStore.analyticsStore = new Map<string, AnalyticsRecord>();
}

export const analyticsStore = globalStore.analyticsStore;

/**
 * Calculate Redpot Radar score (0–100)
 * Weighted combination of Spotify popularity (60%) + Last.fm listeners (40%)
 */
export function calculateRadarScore(
    popularityScore: number = 0,
    lastfmListeners: number = 0
): number {
    const spotifyWeight = popularityScore * 0.6; // already 0-100
    // Normalize Last.fm listeners: 100k listeners = 100 points
    const lastfmNormalized = Math.min((lastfmListeners / 100000) * 100, 100);
    const lastfmWeight = lastfmNormalized * 0.4;
    return Math.round(spotifyWeight + lastfmWeight);
}
