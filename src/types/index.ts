export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: 'basic' | 'pro' | 'label';
  createdAt: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  status: 'live' | 'pending' | 'processing' | 'rejected' | 'draft';
  releaseDate: string;
  upc?: string;
  releaseType?: 'single' | 'album' | 'ep' | 'compilation';
  genre?: string;
  secondaryGenre?: string;
  label?: string;
  tracksCount?: number;
  stores?: string[];
  language?: string;
  copyrightCLine?: string;
  copyrightPLine?: string;
  originalReleaseDate?: string;
  // Analytics data (fetched via API)
  popularityScore?: number; // Spotify 0-100
  lastfmListeners?: number;
  shazamCount?: number;
  radarScore?: number; // Redpot Radar 0-100
  // Smart Link
  smartLinkSlug?: string;
}

export interface ReleaseTrack {
  id: string;
  trackNumber: number;
  title: string;
  artist: string;
  isrc?: string;
  duration?: string;
  explicit?: boolean;
  genre?: string;
  language?: string;
}

export interface StoreDelivery {
  id: string;
  storeName: string;
  storeIcon?: string;
  status: 'delivered' | 'processing' | 'not-included' | 'failed';
  deliveryDate?: string;
}

export interface ReleaseDetail extends Release {
  tracks: ReleaseTrack[];
  storeDeliveries: StoreDelivery[];
  additionalDeliveries: StoreDelivery[];
  releaseNotes?: string[];
  deliveryLogs: DeliveryLogEntry[];
}

export interface DeliveryLogEntry {
  id: string;
  platform: string;
  releaseName: string;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  date: string;
  actionType?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'closed' | 'pending';
  date: string;
  adminReply?: string;
}

export interface WalletInfo {
  available: number;
  pending: number;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  type: 'royalty' | 'withdrawal' | 'deposit';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
  date: string;
  isrc?: string;
}

export interface RoyaltySplit {
  id: string;
  collaboratorName: string;
  role: string;
  percentage: number;
  releaseTitle: string;
}

export interface PitchSubmission {
  id: string;
  releaseId: string;
  releaseTitle: string;
  targetDSPs: string[];
  pitchNote: string;
  targetDate: string;
  status: 'submitted' | 'reviewing' | 'accepted' | 'rejected';
  submittedAt: string;
  adminNote?: string;
}

export interface SmartLink {
  id: string;
  slug: string;
  releaseId: string;
  releaseTitle: string;
  platformLinks: Record<string, string>;
  views: number;
  createdAt: string;
}

export interface YouTubeUsage {
  videoId: string;
  videoTitle: string;
  channelName: string;
  viewCount: number;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

export type SidebarItem = {
  name: string;
  icon: string;
  href: string;
  badge?: number;
};
