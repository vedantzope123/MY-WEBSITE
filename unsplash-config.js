import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple env file paths
const envPaths = [
  path.join(__dirname, '.env.local'),
  path.join(__dirname, '.env'),
];

let envConfig = {};
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    envConfig = dotenv.parse(fs.readFileSync(envPath));
    break;
  }
}

Object.assign(process.env, envConfig);

const UNSPLASH_API_BASE = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.VITE_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY || '';

/**
 * Search for images by query
 */
export async function searchImages(query, page = 1, perPage = 20) {
  try {
    const url = `${UNSPLASH_API_BASE}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      small: photo.urls.small,
      full: photo.urls.full,
      description: photo.description || photo.alt_description,
      photographer: photo.user.name,
      profileUrl: photo.user.links.html,
      likes: photo.likes,
    }));
  } catch (error) {
    console.error('❌ Unsplash search error:', error.message);
    return [];
  }
}

/**
 * Get random image
 */
export async function getRandomImage(options = {}) {
  try {
    const params = new URLSearchParams({
      client_id: ACCESS_KEY,
      ...options,
    });

    const response = await fetch(`${UNSPLASH_API_BASE}/photos/random?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const photo = await response.json();

    // Handle both single object and array responses
    const photoData = Array.isArray(photo) ? photo[0] : photo;

    if (!photoData || !photoData.urls) {
      throw new Error('Invalid response format');
    }

    return {
      id: photoData.id,
      url: photoData.urls.regular,
      thumb: photoData.urls.thumb,
      small: photoData.urls.small,
      full: photoData.urls.full,
      description: photoData.description || photoData.alt_description,
      photographer: photoData.user.name,
      profileUrl: photoData.user.links.html,
      likes: photoData.likes,
    };
  } catch (error) {
    console.error('❌ Unsplash random image error:', error.message);
    return null;
  }
}

/**
 * Get photo by ID
 */
export async function getPhotoById(photoId) {
  try {
    const response = await fetch(`${UNSPLASH_API_BASE}/photos/${photoId}?client_id=${ACCESS_KEY}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const photo = await response.json();

    return {
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      small: photo.urls.small,
      full: photo.urls.full,
      description: photo.description || photo.alt_description,
      photographer: photo.user.name,
      profileUrl: photo.user.links.html,
      likes: photo.likes,
    };
  } catch (error) {
    console.error('❌ Unsplash get photo error:', error.message);
    return null;
  }
}

/**
 * Track image download
 */
export async function trackDownload(photoId, downloadLocation) {
  try {
    if (downloadLocation) {
      await fetch(downloadLocation);
    }
  } catch (error) {
    console.error('⚠️  Download tracking error:', error.message);
  }
}

export default {
  searchImages,
  getRandomImage,
  getPhotoById,
  trackDownload,
};
