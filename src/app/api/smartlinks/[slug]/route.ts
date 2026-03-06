import { NextRequest, NextResponse } from 'next/server';
import { smartLinksStore } from '@/lib/smartlinks-store';

// fs kullanıyoruz, Node.js runtime zorunlu
export const runtime = 'nodejs';

export async function GET(
    _req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const record = smartLinksStore.get(params.slug);

    if (!record) {
        return NextResponse.json({ error: 'Smart Link bulunamadı.' }, { status: 404 });
    }

    // View sayacını artır
    record.views += 1;
    smartLinksStore.set(params.slug, record);

    return NextResponse.json({ success: true, data: record });
}
