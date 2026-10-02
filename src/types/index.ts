export type Platform = 'all' | 'tiktok' | 'instagram' | 'facebook';

export type SentimentType = 'positive' | 'negative' | 'neutral' | 'mixed';

export type EmotionType =
  | 'joy'
  | 'anger'
  | 'curiosity'
  | 'frustration'
  | 'love'
  | 'sarcasm'
  | 'skepticism'
  | 'neutral';

export interface SocialComment {
  id: string;
  platform: 'tiktok' | 'instagram' | 'facebook';
  author: string;
  authorHandle: string;
  authorAvatar?: string;
  isVerified?: boolean;
  content: string;
  timestamp: string;
  likes: number;
  repliesCount?: number;
  postUrl?: string;
  postTitle?: string;
  // Analysis fields
  sentiment?: SentimentType;
  sentimentScore?: number; // -1.00 to 1.00
  primaryEmotion?: EmotionType;
  emotionalIntensity?: number; // 1-10
  keywords?: string[];
  category?: string;
  isSarcastic?: boolean;
  suggestedReply?: string;
  reasoning?: string;
  starred?: boolean;
  userTags?: string[];
  isRealExtracted?: boolean;
}

export interface AnalyzedPostInfo {
  url: string;
  platform: 'tiktok' | 'instagram' | 'facebook';
  author: string;
  authorHandle: string;
  authorAvatar?: string;
  isVerified?: boolean;
  caption: string;
  likesCount?: number;
  commentsCount?: number;
  viewsCount?: number;
  audio?: string;
  thumbnailUrl?: string;
  extractedAt: string;
}

export interface AnalysisSummary {
  totalCount: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
  mixedCount: number;
  netSentimentScore: number; // -100 to +100 (NPS style)
  averageScore: number;
  executiveSummary: string;
  painPoints: string[];
  praises: string[];
  actionableRecommendations: string[];
  lastAnalyzedAt: string;
}

export type SupportedLanguage = 'es' | 'en' | 'pt' | 'fr';

export interface CampaignPreset {
  id: string;
  title: string;
  description: string;
  platform: 'tiktok' | 'instagram' | 'facebook' | 'all';
  category: string;
  comments: SocialComment[];
}

export interface SocialConnectionState {
  tiktokConnected: boolean;
  instagramConnected: boolean;
  facebookConnected: boolean;
  liveListenerActive: boolean;
  autoAnalyzeLive: boolean;
  syncIntervalSeconds: number;
}

export interface UserSocialCredentials {
  instagram?: {
    sessionId?: string;
    cookieString?: string;
    username?: string;
    password?: string;
    lastVerified?: string;
    isValid?: boolean;
    connectedAccount?: string;
  };
  tiktok?: {
    sessionId?: string;
    cookieString?: string;
    username?: string;
    lastVerified?: string;
    isValid?: boolean;
  };
  twitter?: {
    authToken?: string;
    ct0?: string;
    bearerToken?: string;
    lastVerified?: string;
    isValid?: boolean;
  };
  youtube?: {
    apiKey?: string;
    lastVerified?: string;
    isValid?: boolean;
  };
  facebook?: {
    accessToken?: string;
    cookieString?: string;
    lastVerified?: string;
    isValid?: boolean;
  };
}

export type CountryCode = 'global' | 'mx' | 'es' | 'ar' | 'co' | 'us' | 'cl' | 'pe' | 'br' | 'bo';

export type TrendTopic =
  | 'all'
  | 'entertainment'
  | 'tech'
  | 'sports'
  | 'fashion'
  | 'food'
  | 'business'
  | 'music'
  | 'lifestyle';

export interface TrendItem {
  id: string;
  rank: number; // 1 to 10
  name: string; // e.g. #ChampionsLeague
  displayName: string;
  topic: TrendTopic;
  topicLabel: string;
  country: CountryCode;
  countryLabel: string;
  countryFlag: string;
  volumeFormatted: string;
  volumeNumber: number;
  velocityPercent: number; // e.g. +85%
  heatScore: number; // 0 to 100
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    netScore: number;
  };
  topPlatforms: Array<{
    platform: 'tiktok' | 'instagram' | 'facebook';
    share: number; // percentage, e.g. 60
  }>;
  peakTimeLabel: string; // e.g. "19:00 - 22:00"
  hourlyHeat: number[]; // 6 slots: [00-04, 04-08, 08-12, 12-16, 16-20, 20-24] (0-100 each)
  contentAngle: string;
  sampleComments: string[];
  viralSound?: string;
  realPostUrl?: string; // Real video or post URL for real comment extraction
}

export interface TrendHeatmapResponse {
  country: CountryCode;
  countryLabel: string;
  countryFlag: string;
  topic: TrendTopic;
  topicLabel: string;
  platform?: 'all' | 'tiktok' | 'instagram' | 'facebook';
  timeframe: string;
  lastUpdated: string;
  top10Trends: TrendItem[];
  kpis: {
    topTrendName: string;
    totalVolumeFormatted: string;
    averageVelocity: number;
    dominantSentiment: string;
    netSentimentAverage: number;
  };
}
