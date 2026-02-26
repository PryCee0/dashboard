export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
  label?: string;
  tracksCount?: number;
  stores?: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  streams: number;
  change: number; // percentage
  platform: string;
}

export interface DeliveryLogEntry {
  id: string;
  platform: string;
  releaseName: string;
  status: 'completed' | 'pending' | 'processing' | 'failed';
  date: string;
}

export interface ProcessingItem {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'processing' | 'completed';
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'update' | 'news' | 'feature';
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  date: string;
}

export interface AnalyticsData {
  date: string;
  streams: number;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface WalletInfo {
  available: number;
  pending: number;
  currency: string;
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
