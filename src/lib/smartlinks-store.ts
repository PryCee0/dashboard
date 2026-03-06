/**
 * Dosya tabanlı kalıcı Smart Links store.
 * Hot-reload ve sunucu yeniden başlatmalarında veri KAYBOLMAZ.
 */

import fs from 'fs';
import path from 'path';

export interface SmartLinkRecord {
    slug: string;
    title: string;
    artistName: string;
    thumbnailUrl: string;
    spotifyUrl: string;
    links: {
        spotify?: string | null;
        appleMusic?: string | null;
        youtube?: string | null;
        deezer?: string | null;
        tidal?: string | null;
        amazon?: string | null;
        soundcloud?: string | null;
    };
    views: number;
    createdAt: string;
}

// Proje kökünde .smartlinks-data.json dosyasına yaz
const DATA_FILE = path.join(process.cwd(), '.smartlinks-data.json');

function readStore(): Map<string, SmartLinkRecord> {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf-8');
            const obj = JSON.parse(raw);
            return new Map(Object.entries(obj));
        }
    } catch {
        // Bozuk dosya → boş başla
    }
    return new Map();
}

function writeStore(map: Map<string, SmartLinkRecord>) {
    try {
        const obj = Object.fromEntries(map.entries());
        fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8');
    } catch (err) {
        console.error('[SmartLinks] File write error:', err);
    }
}

// Singleton wrapper
const globalStore = global as typeof global & {
    smartLinksMemory?: Map<string, SmartLinkRecord>;
};

if (!globalStore.smartLinksMemory) {
    globalStore.smartLinksMemory = readStore();
}

export const smartLinksStore = {
    get(slug: string): SmartLinkRecord | undefined {
        // Her okumada dosyadan taze yükle (hot-reload güvenli)
        return readStore().get(slug);
    },
    set(slug: string, record: SmartLinkRecord): void {
        const current = readStore();
        current.set(slug, record);
        writeStore(current);
        globalStore.smartLinksMemory = current;
    },
    all(): SmartLinkRecord[] {
        return Array.from(readStore().values());
    }
};

/**
 * Şarkı adından URL-dostu bir slug üretir.
 */
export function generateSlug(title: string, artistName: string): string {
    const raw = `${artistName}-${title}`
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    return `${raw}-${Date.now().toString(36)}`;
}
