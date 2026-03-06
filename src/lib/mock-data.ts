import { Release, ReleaseTrack, StoreDelivery, ReleaseDetail, DeliveryLogEntry, WalletInfo } from '@/types';

// ─── WALLET ──────────────────────────────────────────────────────────────────
export const mockWallet: WalletInfo = {
    available: 0.00,
    pending: 0.00,
    currency: 'USD',
};

// ─── RELEASES ─────────────────────────────────────────────────────────────────
export const mockReleases: Release[] = [
    { id: '1', title: 'UMRUMDA', artist: 'ARDA', coverUrl: '/covers/cover1.jpg', status: 'live', releaseDate: '2026-01-15', upc: '0609360636746', releaseType: 'single', genre: 'Hip-Hop/Rap', label: 'Redpot Records', tracksCount: 1, language: 'Turkish' },
    { id: '2', title: 'KAYIP RUH', artist: 'ARDA', coverUrl: '/covers/cover2.jpg', status: 'live', releaseDate: '2026-01-20', upc: '0609360670061', releaseType: 'ep', genre: 'Hip-Hop/Rap', label: 'Redpot Records', tracksCount: 4, language: 'Turkish' },
    { id: '3', title: 'Onlar Anlamazlar', artist: 'ARDA', coverUrl: '/covers/cover3.jpg', status: 'live', releaseDate: '2025-12-10', upc: '0609360686499', releaseType: 'album', genre: 'Hip-Hop/Rap', label: 'Redpot Records', tracksCount: 8, language: 'Turkish' },
    { id: '4', title: 'Neon Drift', artist: 'Eclipse', coverUrl: '', status: 'pending', releaseDate: '2026-02-18', upc: '012345678904', releaseType: 'single', genre: 'Synthwave', label: 'Redpot Records', tracksCount: 1 },
    { id: '5', title: 'Shattered Glass', artist: 'Pulse Theory', coverUrl: '', status: 'processing', releaseDate: '2026-02-25', upc: '012345678905', releaseType: 'album', genre: 'Rock', label: 'Redpot Records', tracksCount: 10 },
    { id: '6', title: 'Velvet Storm', artist: 'Luna Arc', coverUrl: '', status: 'draft', releaseDate: '2026-03-01', upc: '', releaseType: 'single', genre: 'R&B', label: 'Redpot Records', tracksCount: 1 },
];

// ─── RELEASE DETAILS ──────────────────────────────────────────────────────────
const release1Tracks: ReleaseTrack[] = [
    { id: 't1', trackNumber: 1, title: 'UMRUMDA', artist: 'ARDA', isrc: 'QZW9L2502720', duration: '3:24', explicit: false, genre: 'Hip-Hop/Rap', language: 'Turkish' },
];

const release2Tracks: ReleaseTrack[] = [
    { id: 't2', trackNumber: 1, title: 'INTRO', artist: 'ARDA', isrc: 'QZW9L2502725', duration: '1:48', explicit: false },
    { id: 't3', trackNumber: 2, title: 'Kayıp Ruhum', artist: 'ARDA', isrc: 'QZW9L2502726', duration: '3:12', explicit: false },
    { id: 't4', trackNumber: 3, title: 'Çıkamayabilirim Yarına', artist: 'ARDA', isrc: 'QZW9L2502727', duration: '3:45', explicit: false },
    { id: 't5', trackNumber: 4, title: 'Yalandan İbaret', artist: 'ARDA', isrc: 'QZW9L2502728', duration: '2:58', explicit: false },
];

const release3Tracks: ReleaseTrack[] = [
    { id: 't6', trackNumber: 1, title: 'Giriş', artist: 'ARDA', isrc: 'QZW9L2502730', duration: '1:22', explicit: false },
    { id: 't7', trackNumber: 2, title: 'Onlar Anlamazlar', artist: 'ARDA', isrc: 'QZW9L2502731', duration: '3:10', explicit: false },
    { id: 't8', trackNumber: 3, title: 'Karanlık Sokaklar', artist: 'ARDA', isrc: 'QZW9L2502732', duration: '3:33', explicit: true },
    { id: 't9', trackNumber: 4, title: 'Son Söz', artist: 'ARDA', isrc: 'QZW9L2502733', duration: '2:45', explicit: false },
    { id: 't10', trackNumber: 5, title: 'Yıkılmaz', artist: 'ARDA', isrc: 'QZW9L2502734', duration: '3:18', explicit: false },
    { id: 't11', trackNumber: 6, title: 'Rüzgarla Dans', artist: 'ARDA', isrc: 'QZW9L2502735', duration: '4:02', explicit: false },
    { id: 't12', trackNumber: 7, title: 'Gecenin Sesi', artist: 'ARDA', isrc: 'QZW9L2502736', duration: '3:55', explicit: false },
    { id: 't13', trackNumber: 8, title: 'Final', artist: 'ARDA', isrc: 'QZW9L2502737', duration: '2:30', explicit: false },
];

const commonStores: StoreDelivery[] = [
    { id: 's1', storeName: 'Spotify', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 's2', storeName: 'Apple Music', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 's3', storeName: 'Amazon Music', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 's4', storeName: 'Deezer', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 's5', storeName: 'Tidal', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 's6', storeName: 'YouTube Music', status: 'delivered', deliveryDate: '2026-01-16' },
    { id: 's7', storeName: 'TikTok / Resso', status: 'delivered', deliveryDate: '2026-01-16' },
    { id: 's8', storeName: 'Instagram / Facebook', status: 'delivered', deliveryDate: '2026-01-16' },
    { id: 's9', storeName: 'Pandora', status: 'delivered', deliveryDate: '2026-01-16' },
    { id: 's10', storeName: 'iHeartRadio', status: 'delivered', deliveryDate: '2026-01-16' },
    { id: 's11', storeName: 'KKBOX', status: 'delivered', deliveryDate: '2026-01-17' },
    { id: 's12', storeName: 'Anghami', status: 'delivered', deliveryDate: '2026-01-17' },
    { id: 's13', storeName: 'Boomplay', status: 'delivered', deliveryDate: '2026-01-17' },
    { id: 's14', storeName: 'Audiomack', status: 'delivered', deliveryDate: '2026-01-17' },
    { id: 's15', storeName: 'Claro Música', status: 'delivered', deliveryDate: '2026-01-17' },
    { id: 's16', storeName: 'Napster', status: 'delivered', deliveryDate: '2026-01-17' },
];

const commonAdditional: StoreDelivery[] = [
    { id: 'a1', storeName: 'YouTube Content ID', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 'a2', storeName: 'SoundCloud', status: 'not-included' },
    { id: 'a3', storeName: 'SoundExchange', status: 'delivered', deliveryDate: '2026-01-15' },
    { id: 'a4', storeName: 'Beatport', status: 'not-included' },
    { id: 'a5', storeName: 'LyricFind', status: 'delivered', deliveryDate: '2026-01-16' },
];

const commonDeliveryLogs: DeliveryLogEntry[] = [
    { id: 'dl1', platform: 'Spotify', releaseName: 'UMRUMDA', status: 'completed', date: '2026-01-15', actionType: 'Insert' },
    { id: 'dl2', platform: 'Apple Music', releaseName: 'UMRUMDA', status: 'completed', date: '2026-01-15', actionType: 'Insert' },
    { id: 'dl3', platform: 'Amazon Music', releaseName: 'UMRUMDA', status: 'completed', date: '2026-01-15', actionType: 'Insert' },
    { id: 'dl4', platform: 'Deezer', releaseName: 'UMRUMDA', status: 'completed', date: '2026-01-15', actionType: 'Insert' },
    { id: 'dl5', platform: 'YouTube Music', releaseName: 'UMRUMDA', status: 'completed', date: '2026-01-16', actionType: 'Insert' },
    { id: 'dl6', platform: 'TikTok / Resso', releaseName: 'UMRUMDA', status: 'completed', date: '2026-01-16', actionType: 'Insert' },
];

export const mockReleaseDetails: Record<string, ReleaseDetail> = {
    '1': { ...mockReleases[0], tracks: release1Tracks, storeDeliveries: commonStores, additionalDeliveries: commonAdditional, releaseNotes: [], deliveryLogs: commonDeliveryLogs, copyrightCLine: '2026 Redpot Records', copyrightPLine: '2026 Redpot Records' },
    '2': { ...mockReleases[1], tracks: release2Tracks, storeDeliveries: commonStores, additionalDeliveries: commonAdditional, releaseNotes: [], deliveryLogs: commonDeliveryLogs.map(d => ({ ...d, releaseName: 'KAYIP RUH' })), copyrightCLine: '2026 Redpot Records', copyrightPLine: '2026 Redpot Records' },
    '3': { ...mockReleases[2], tracks: release3Tracks, storeDeliveries: commonStores, additionalDeliveries: commonAdditional, releaseNotes: [], deliveryLogs: commonDeliveryLogs.map(d => ({ ...d, releaseName: 'Onlar Anlamazlar' })), copyrightCLine: '2025 Redpot Records', copyrightPLine: '2025 Redpot Records' },
};

// ─── ALL DSP STORES (for Release wizard) ──────────────────────────────────────
export const allDSPStores = [
    'Spotify', 'Apple Music', 'Amazon Music', 'Deezer', 'Tidal', 'YouTube Music',
    'TikTok / Resso', 'Instagram / Facebook', 'Pandora', 'iHeartRadio', 'KKBOX',
    'Anghami', 'Boomplay', 'Audiomack', 'Claro Música', 'Napster', 'Qobuz',
    'NetEase Cloud Music', 'Tencent Music', 'JioSaavn', 'Gaana', 'Melon',
    'FLO', 'Bugs!', 'AWA', 'LINE Music', 'Yandex Music', 'Joox',
    'Shazam', 'Gracenote', 'ACRCloud', 'TikTok Sound Library',
];

// ─── SUPPORT TICKET CATEGORIES ────────────────────────────────────────────────
export const ticketCategories = [
    { value: 'profile-update', label: 'Profil / Sanatçı Adı Değişikliği' },
    { value: 'copyright', label: 'Telif Hakkı İhlali (Copyright)' },
    { value: 'takedown', label: 'Yayın İptali (Takedown)' },
    { value: 'artist-mapping', label: 'Spotify / Apple Music Profil Eşleştirme' },
    { value: 'earnings', label: 'Kazanç / Fatura Sorunları' },
    { value: 'priority-pitch', label: 'Priority Pitch Başvurusu' },
    { value: 'smart-link', label: 'Smart Link Talebi' },
    { value: 'discovery-mode', label: 'Discovery Mode Başvurusu' },
    { value: 'other', label: 'Diğer' },
];

// ─── SIDEBAR NAVIGATION (Hybrid MVP — 7 sections) ────────────────────────────
export const sidebarNavigation = [
    {
        label: 'ANA',
        items: [
            { name: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
        ],
    },
    {
        label: 'MÜZİK',
        items: [
            { name: 'Releases', icon: 'Disc3', href: '/dashboard/releases' },
            { name: 'New Release', icon: 'Plus', href: '/dashboard/releases/create' },
        ],
    },
    {
        label: 'FİNANS',
        items: [
            { name: 'Wallet & Royalties', icon: 'Wallet', href: '/dashboard/wallet' },
        ],
    },
    {
        label: 'ANALİTİK',
        items: [
            { name: 'Analytics', icon: 'BarChart3', href: '/dashboard/analytics' },
            { name: 'Usage Discovery', icon: 'Search', href: '/dashboard/usage-discovery' },
        ],
    },
    {
        label: 'PAZARLAMA',
        items: [
            { name: 'Priority Pitch', icon: 'Target', href: '/dashboard/priority-pitch' },
            { name: 'Smart Links', icon: 'Link', href: '/dashboard/smart-links' },
        ],
    },
    {
        label: 'DESTEK',
        items: [
            { name: 'Support & Tools', icon: 'HelpCircle', href: '/dashboard/support' },
        ],
    },
];
