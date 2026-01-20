import { useEffect, useMemo, useState } from 'react';
import { searchUnsplashImages, getRandomUnsplashImage } from '../utils/unsplash';

export interface UnsplashImage {
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

/**
 * Fetch Unsplash images at runtime for a given query/category.
 * Provides images array and a helper to pick an image by index.
 */
export function useUnsplash(query: string, perPage: number = 12) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const results = await searchUnsplashImages(query, 1, perPage);
        if (!cancelled) setImages(results);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load Unsplash images');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [query, perPage]);

  const pick = useMemo(
    () => (index: number) => {
      if (!images.length) return null;
      const i = Math.abs(index) % images.length;
      return images[i] || null;
    },
    [images]
  );

  return { images, loading, error, pick } as const;
}
