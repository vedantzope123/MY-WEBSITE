/**
 * Unsplash API utilities for frontend
 * Uses environment variable VITE_UNSPLASH_ACCESS_KEY
 */

interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  small: string;
  full: string;
  description: string;
  photographer: string;
  profileUrl: string;
  likes?: number;
}

const UNSPLASH_API_BASE = 'https://api.unsplash.com';
const ACCESS_KEY = (import.meta as any).env.VITE_UNSPLASH_ACCESS_KEY || '';

/**
 * Search for images on Unsplash
 */
export async function searchUnsplashImages(
  query: string,
  page: number = 1,
  perPage: number = 20
): Promise<UnsplashImage[]> {
  if (!ACCESS_KEY) {
    console.warn('VITE_UNSPLASH_ACCESS_KEY not set');
    return [];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_BASE}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`
    );

    if (!response.ok) throw new Error('Search failed');

    const data = await response.json();

    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      small: photo.urls.small,
      full: photo.urls.full,
      description: photo.description || photo.alt_description || 'Untitled',
      photographer: photo.user.name,
      profileUrl: photo.user.links.html,
      likes: photo.likes,
    }));
  } catch (error) {
    console.error('Unsplash search error:', error);
    return [];
  }
}

/**
 * Get random image from Unsplash
 */
export async function getRandomUnsplashImage(
  query?: string
): Promise<UnsplashImage | null> {
  if (!ACCESS_KEY) {
    console.warn('VITE_UNSPLASH_ACCESS_KEY not set');
    return null;
  }

  try {
    const url = query
      ? `${UNSPLASH_API_BASE}/photos/random?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`
      : `${UNSPLASH_API_BASE}/photos/random?client_id=${ACCESS_KEY}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch random image');

    const photo = await response.json();

    return {
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      small: photo.urls.small,
      full: photo.urls.full,
      description: photo.description || photo.alt_description || 'Untitled',
      photographer: photo.user.name,
      profileUrl: photo.user.links.html,
      likes: photo.likes,
    };
  } catch (error) {
    console.error('Unsplash random image error:', error);
    return null;
  }
}

/**
 * Track image download (required by Unsplash)
 */
export async function trackUnsplashDownload(
  photoId: string,
  downloadUrl: string
): Promise<void> {
  try {
    if (downloadUrl && ACCESS_KEY) {
      // Append access key to track the download
      const trackUrl = `${downloadUrl}?client_id=${ACCESS_KEY}`;
      await fetch(trackUrl, { mode: 'no-cors' });
    }
  } catch (error) {
    console.error('Download tracking error:', error);
  }
}

export default {
  searchUnsplashImages,
  getRandomUnsplashImage,
  trackUnsplashDownload,
};
