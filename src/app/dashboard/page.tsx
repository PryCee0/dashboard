'use client';

import WelcomeWidget from '@/components/dashboard/WelcomeWidget';
import QuickReports from '@/components/dashboard/QuickReports';
import ReleasesCarousel from '@/components/dashboard/ReleasesCarousel';
import ProcessingQueue from '@/components/dashboard/ProcessingQueue';
import WhatsHappening from '@/components/dashboard/WhatsHappening';
import DeliveryLog from '@/components/dashboard/DeliveryLog';
import SupportTickets from '@/components/dashboard/SupportTickets';
import AnalyticsSnapshot from '@/components/dashboard/AnalyticsSnapshot';
import TopTracks from '@/components/dashboard/TopTracks';
import FeaturesGrid from '@/components/dashboard/FeaturesGrid';

export default function DashboardPage() {
    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">
            {/* Row 1: Welcome + Wallet */}
            <WelcomeWidget />

            {/* Row 2: Quick Reports */}
            <QuickReports />

            {/* Row 3: Releases + Processing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ReleasesCarousel />
                <ProcessingQueue />
            </div>

            {/* Row 4: What's Happening */}
            <WhatsHappening />

            {/* Row 5: Delivery Log + Support Tickets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DeliveryLog />
                <SupportTickets />
            </div>

            {/* Row 6: Analytics + Top Tracks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnalyticsSnapshot />
                <TopTracks />
            </div>

            {/* Row 7: Features Grid */}
            <FeaturesGrid />
        </div>
    );
}
