import { Release, Track, DeliveryLogEntry, ProcessingItem, Announcement, FeatureCard, AnalyticsData, WalletInfo } from '@/types';

export const mockWallet: WalletInfo = {
    available: 0.00,
    pending: 0.00,
    currency: 'USD',
};

export const mockReleases: Release[] = [
    { id: '1', title: 'Midnight Echo', artist: 'NOVA', coverUrl: '', status: 'live', releaseDate: '2026-01-15', upc: '012345678901', releaseType: 'single', genre: 'Electronic', label: 'Redpot Records', tracksCount: 1 },
    { id: '2', title: 'Crimson Waves', artist: 'Pulse Theory', coverUrl: '', status: 'live', releaseDate: '2026-01-20', upc: '012345678902', releaseType: 'ep', genre: 'Alternative', label: 'Redpot Records', tracksCount: 5 },
    { id: '3', title: 'Urban Solace', artist: 'NOVA', coverUrl: '', status: 'processing', releaseDate: '2026-02-10', upc: '012345678903', releaseType: 'album', genre: 'Indie Pop', label: 'Redpot Records', tracksCount: 12 },
    { id: '4', title: 'Neon Drift', artist: 'Eclipse', coverUrl: '', status: 'pending', releaseDate: '2026-02-18', upc: '012345678904', releaseType: 'single', genre: 'Synthwave', label: 'Redpot Records', tracksCount: 1 },
    { id: '5', title: 'Shattered Glass', artist: 'Pulse Theory', coverUrl: '', status: 'live', releaseDate: '2025-12-01', upc: '012345678905', releaseType: 'album', genre: 'Rock', label: 'Redpot Records', tracksCount: 10 },
    { id: '6', title: 'Velvet Storm', artist: 'Luna Arc', coverUrl: '', status: 'live', releaseDate: '2026-02-01', upc: '012345678906', releaseType: 'single', genre: 'R&B', label: 'Redpot Records', tracksCount: 1 },
    { id: '7', title: 'Horizon Fade', artist: 'Eclipse', coverUrl: '', status: 'processing', releaseDate: '2026-02-22', upc: '012345678907', releaseType: 'ep', genre: 'Electronic', label: 'Redpot Records', tracksCount: 4 },
    { id: '8', title: 'Phantom Frequency', artist: 'NOVA', coverUrl: '', status: 'draft', releaseDate: '2026-03-01', upc: '', releaseType: 'single', genre: 'Techno', label: 'Redpot Records', tracksCount: 1 },
];

export const mockTopTracks: Track[] = [
    { id: '1', title: 'Midnight Echo', artist: 'NOVA', streams: 125400, change: 12.5, platform: 'Spotify' },
    { id: '2', title: 'Crimson Waves', artist: 'Pulse Theory', streams: 98200, change: 8.3, platform: 'Apple Music' },
    { id: '3', title: 'Shattered Glass', artist: 'Pulse Theory', streams: 76800, change: -2.1, platform: 'Spotify' },
    { id: '4', title: 'Urban Solace', artist: 'NOVA', streams: 54300, change: 15.7, platform: 'TikTok' },
    { id: '5', title: 'Neon Drift', artist: 'Eclipse', streams: 32100, change: 5.4, platform: 'YouTube Music' },
];

export const mockDeliveryLog: DeliveryLogEntry[] = [
    { id: '1', platform: 'Spotify', releaseName: 'Midnight Echo', status: 'completed', date: '2026-01-15' },
    { id: '2', platform: 'Apple Music', releaseName: 'Midnight Echo', status: 'completed', date: '2026-01-15' },
    { id: '3', platform: 'KKBOX', releaseName: 'Crimson Waves', status: 'completed', date: '2026-01-20' },
    { id: '4', platform: 'Deezer', releaseName: 'Crimson Waves', status: 'completed', date: '2026-01-21' },
    { id: '5', platform: 'TikTok', releaseName: 'Urban Solace', status: 'pending', date: '2026-02-10' },
    { id: '6', platform: 'YouTube Music', releaseName: 'Urban Solace', status: 'processing', date: '2026-02-10' },
];

export const mockProcessing: ProcessingItem[] = [
    { id: '1', title: 'Spotify Discovery Mode', type: 'Feature Request', status: 'pending', date: '2026-02-18' },
    { id: '2', title: 'Apple Music Connect', type: 'Integration', status: 'processing', date: '2026-02-15' },
    { id: '3', title: 'Neon Drift - QC Review', type: 'Quality Check', status: 'pending', date: '2026-02-19' },
];

export const mockAnnouncements: Announcement[] = [
    { id: '1', title: 'Yeni DSP Entegrasyonu: Boomplay', description: 'Artık müziğinizi Boomplay üzerinden de dağıtabilirsiniz.', date: '2026-02-20', type: 'feature' },
    { id: '2', title: 'Şubat 2026 Telif Raporları', description: 'Ocak ayı telif raporlarınız hesabınıza yüklenmiştir.', date: '2026-02-15', type: 'news' },
    { id: '3', title: 'Platform Bakımı - 25 Şubat', description: '25 Şubat 02:00-04:00 arası planlı bakım yapılacaktır.', date: '2026-02-14', type: 'update' },
];

export const mockAnalytics: Record<string, AnalyticsData[]> = {
    spotify: [
        { date: '2026-01', streams: 15000 },
        { date: '2026-02', streams: 28000 },
        { date: '2026-03', streams: 0 },
    ],
    tiktok: [
        { date: '2026-01', streams: 8500 },
        { date: '2026-02', streams: 12000 },
        { date: '2026-03', streams: 0 },
    ],
    applemusic: [
        { date: '2026-01', streams: 6200 },
        { date: '2026-02', streams: 9800 },
        { date: '2026-03', streams: 0 },
    ],
    youtubemusic: [
        { date: '2026-01', streams: 4100 },
        { date: '2026-02', streams: 7500 },
        { date: '2026-03', streams: 0 },
    ],
};

export const mockFeatures: FeatureCard[] = [
    { id: '1', title: 'Priority Pitch', description: 'DSP platformlarına öncelikli yerleştirme ve editöryel playlist başvurusu.', icon: 'Target', color: '#E41E2B' },
    { id: '2', title: 'Publishing Administration', description: 'Dünya genelinde yayın haklarınızın yönetimi ve telif toplama.', icon: 'FileText', color: '#3B82F6' },
    { id: '3', title: 'Greenlist', description: 'Onaylı sanatçı ve içerik listesi yönetimi.', icon: 'CheckCircle', color: '#10B981' },
    { id: '4', title: 'Blocklist', description: 'İstenmeyen kullanım ve yetkisiz dağıtımı engelleme.', icon: 'ShieldOff', color: '#EF4444' },
    { id: '5', title: 'Profile Defender', description: 'Sanatçı profilinizi yetkisiz değişikliklerden koruma.', icon: 'Shield', color: '#8B5CF6' },
    { id: '6', title: 'Cover Song Licensing', description: 'Cover şarkılar için otomatik lisanslama ve yasal uyumluluk.', icon: 'Music', color: '#F59E0B' },
    { id: '7', title: 'Advance Funding', description: 'Gelecek telif gelirlerinize karşılık avans finansman.', icon: 'DollarSign', color: '#06B6D4' },
    { id: '8', title: 'Release Links', description: 'Tüm platformlardaki müziğiniz için akıllı bağlantı sayfaları.', icon: 'Link', color: '#EC4899' },
    { id: '9', title: 'Royalty Splits', description: 'İşbirlikçiler arasında otomatik telif paylaşımı.', icon: 'PieChart', color: '#14B8A6' },
];

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
        ],
    },
    {
        label: 'FİNANS',
        items: [
            { name: 'Wallet', icon: 'Wallet', href: '/dashboard/wallet' },
            { name: 'Sales', icon: 'TrendingUp', href: '/dashboard/sales' },
        ],
    },
    {
        label: 'ANALİTİK',
        items: [
            { name: 'Analytics', icon: 'BarChart3', href: '/dashboard/analytics' },
            { name: 'Reports', icon: 'FileBarChart', href: '/dashboard/reports' },
            { name: 'Insights', icon: 'Lightbulb', href: '/dashboard/insights' },
            { name: 'Audience', icon: 'Users', href: '/dashboard/audience' },
        ],
    },
    {
        label: 'TELİF',
        items: [
            { name: 'Royalty Splits', icon: 'PieChart', href: '/dashboard/royalty-splits' },
        ],
    },
    {
        label: 'KORUMA',
        items: [
            { name: 'Greenlist', icon: 'CheckCircle', href: '/dashboard/greenlist' },
            { name: 'Blocklist', icon: 'ShieldOff', href: '/dashboard/blocklist' },
            { name: 'Profile Defender', icon: 'Shield', href: '/dashboard/profile-defender' },
        ],
    },
    {
        label: 'PAZARLAMA',
        items: [
            { name: 'Release Links', icon: 'Link', href: '/dashboard/release-links' },
            { name: 'Priority Pitch', icon: 'Target', href: '/dashboard/priority-pitch' },
            { name: 'Usage Discovery', icon: 'Search', href: '/dashboard/usage-discovery' },
        ],
    },
    {
        label: 'EK HİZMETLER',
        items: [
            { name: 'Chart Registration', icon: 'Award', href: '#', badge: -1 },
            { name: 'Copyright Registration', icon: 'Copyright', href: '#', badge: -1 },
            { name: 'Publishing Admin', icon: 'BookOpen', href: '#', badge: -1 },
            { name: 'Cover Song Licensing', icon: 'Music', href: '#', badge: -1 },
            { name: 'Advance Funding', icon: 'DollarSign', href: '#', badge: -1 },
            { name: 'Audio Recognition', icon: 'Headphones', href: '#', badge: -1 },
            { name: 'Spotify Discovery', icon: 'Disc', href: '#', badge: -1 },
            { name: 'AI Mastering', icon: 'Wand2', href: '#', badge: -1 },
        ],
    },
    {
        label: 'AYARLAR',
        items: [
            { name: 'Settings', icon: 'Settings', href: '/dashboard/settings' },
            { name: 'Preferences', icon: 'SlidersHorizontal', href: '/dashboard/preferences' },
            { name: 'Billing', icon: 'CreditCard', href: '/dashboard/billing' },
            { name: 'Notifications', icon: 'Bell', href: '/dashboard/notifications', badge: 3 },
        ],
    },
    {
        label: 'DESTEK',
        items: [
            { name: 'Support', icon: 'HelpCircle', href: '/dashboard/support' },
            { name: 'Changelog', icon: 'ScrollText', href: '/dashboard/changelog' },
        ],
    },
];

