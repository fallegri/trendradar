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
