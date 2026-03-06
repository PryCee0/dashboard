'use client';

import WelcomeWidget from '@/components/dashboard/WelcomeWidget';
import ReleasesCarousel from '@/components/dashboard/ReleasesCarousel';
import SupportTickets from '@/components/dashboard/SupportTickets';
import QuickReports from '@/components/dashboard/QuickReports';

export default function DashboardPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">
            {/* Row 1: Welcome + Wallet Snapshot */}
            <WelcomeWidget />

            {/* Row 2: Recent Releases */}
            <ReleasesCarousel />

            {/* Row 3: Quick Stats + Support Tickets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickReports />
                <SupportTickets />
            </div>
        </div>
    );
}
