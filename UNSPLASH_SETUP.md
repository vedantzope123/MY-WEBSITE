# Unsplash Integration Setup Guide

## 📸 What is Unsplash?

Unsplash is a free stock photo platform with millions of high-quality images. Perfect for your dairy shop website!

## 🚀 Quick Setup

### Step 1: Get Your Access Key

1. Go to [https://unsplash.com/oauth/applications](https://unsplash.com/oauth/applications)
2. Sign up or log in to Unsplash
3. Click "Create a new application"
4. Accept the terms and submit
5. Copy your **Access Key**

### Step 2: Add to Environment

Create a `.env.local` file in your project root (or update existing):

```env
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

**Note**: `VITE_` prefix makes it available in frontend React code.

### Step 3: Test the Integration

```bash
npm run test:unsplash
```

You should see dairy, milk, and cheese images in the console.

## 💻 Usage Examples

### Frontend (React Component)

```tsx
import UnsplashGallery from '@/components/UnsplashGallery';

export default function MyComponent() {
  return (
    <UnsplashGallery 
      query="dairy products"
      limit={12}
      onSelectImage={(image) => {
        console.log('Selected:', image.url);
      }}
    />
  );
}
```

### Frontend (Direct Function Calls)

```tsx
import { searchUnsplashImages, getRandomUnsplashImage } from '@/utils/unsplash';

// Search for images
const images = await searchUnsplashImages('cheese', 1, 20);
console.log(images);

// Get random image
const randomImage = await getRandomUnsplashImage('milk');
console.log(randomImage.url);
```

### Backend (Node.js)

```javascript
import { searchImages, getRandomImage } from './unsplash-config.js';

// Search
const dairyImages = await searchImages('dairy', 1, 10);

// Random
const randomImage = await getRandomImage({ query: 'yogurt' });
```

## 🎯 Common Search Queries for Your Store

- `dairy products`
- `milk`
- `cheese`
- `yogurt`
- `butter`
- `ice cream`
- `fresh milk`
- `organic dairy`

## 📊 Image Object Structure

```typescript
{
  id: string;              // Unsplash photo ID
  url: string;             // Regular size (1080px)
  thumb: string;           // Thumbnail
  small: string;           // Small size (400px)
  full: string;            // Full resolution
  description: string;     // Photo description
  photographer: string;    // Photographer name
  profileUrl: string;      // Link to photographer
  likes: number;           // Like count
}
```

## 🔗 Integration Points

### Product Images
Use Unsplash for product placeholders:

```tsx
const image = await searchUnsplashImages('dairy products', 1, 1);
productData.image = image[0].url;
```

### Hero Sections
Get random dairy images for hero banners:

```tsx
const hero = await getRandomUnsplashImage('farm');
```

### Background Images
Use in CSS or as image components

## ⚠️ Important Notes

1. **Attribution**: Unsplash requires photographer attribution
2. **Limits**: Free tier allows unlimited searches
3. **Downloads**: Call `trackUnsplashDownload()` when using images
4. **Cache**: Consider caching results to reduce API calls

## 📚 Resources

- [Unsplash API Docs](https://unsplash.com/developers)
- [unsplash-js Library](https://github.com/unsplash/unsplash-js)
- [API Rate Limits](https://unsplash.com/developers#rate-limiting)

## 🛠️ Troubleshooting

### Images not loading?
- Check your Access Key is correct
- Ensure `.env` file has `VITE_UNSPLASH_ACCESS_KEY`
- Restart dev server after adding env vars

### Rate limit exceeded?
- Free tier: 50 requests/hour
- Implement caching to reduce calls
- Pre-load images during off-peak hours

### Environment variable not working?
- Must start with `VITE_` for frontend
- Restart dev server after changes
- Check `.env.local` file encoding (UTF-8)

## ✅ Files Created

- `unsplash-config.js` - Backend configuration
- `test-unsplash.js` - Test suite
- `src/utils/unsplash.ts` - Frontend utilities
- `src/components/UnsplashGallery.tsx` - Gallery component
- `.env.example` - Environment variables template

## 🎨 Next Steps

1. Add Unsplash Gallery to your product pages
2. Use random images for hero sections
3. Create image upload workflow combining Cloudinary + Unsplash
4. Add image search feature to admin panel

---

Happy coding! 🚀
