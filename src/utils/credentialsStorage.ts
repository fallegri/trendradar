import { UserSocialCredentials } from '../types';

const STORAGE_KEY = 'sentisocial_credentials_v1';

export function getStoredCredentials(): UserSocialCredentials {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored credentials:', e);
    return {};
  }
}

export function saveStoredCredentials(creds: UserSocialCredentials): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
  } catch (e) {
    console.error('Error saving credentials:', e);
  }
}

export function clearStoredCredentials(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing credentials:', e);
  }
}

export function hasCredentialsForPlatform(
  creds: UserSocialCredentials,
  platform: 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'twitter'
): boolean {
  if (!creds) return false;
  if (platform === 'instagram') {
    return Boolean(
      (creds.instagram?.sessionId && creds.instagram.sessionId.trim().length > 5) ||
      (creds.instagram?.cookieString && creds.instagram.cookieString.trim().length > 10) ||
      (creds.instagram?.username && creds.instagram?.password)
    );
  }
  if (platform === 'tiktok') {
    return Boolean(
      (creds.tiktok?.sessionId && creds.tiktok.sessionId.trim().length > 5) ||
      (creds.tiktok?.cookieString && creds.tiktok.cookieString.trim().length > 10)
    );
  }
  if (platform === 'youtube') {
    return Boolean(creds.youtube?.apiKey && creds.youtube.apiKey.trim().length > 10);
  }
  if (platform === 'twitter') {
    return Boolean(
      (creds.twitter?.authToken && creds.twitter.authToken.trim().length > 10) ||
      (creds.twitter?.bearerToken && creds.twitter.bearerToken.trim().length > 10)
    );
  }
  if (platform === 'facebook') {
    return Boolean(
      (creds.facebook?.accessToken && creds.facebook.accessToken.trim().length > 10) ||
      (creds.facebook?.cookieString && creds.facebook.cookieString.trim().length > 10)
    );
  }
  return false;
}
