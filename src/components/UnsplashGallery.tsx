import React, { useState, useEffect } from 'react';
import { searchImages, getRandomImage } from '../utils/unsplash';
import { Heart, Download, ExternalLink } from 'lucide-react';

interface UnsplashImage {
  id: string;
  url: string;
  thumb: string;
  small: string;
  full: string;
  description: string;
  photographer: string;
  profileUrl: string;
  likes: number;
}

interface UnsplashGalleryProps {
  query?: string;
  limit?: number;
  onSelectImage?: (image: UnsplashImage) => void;
}

export const UnsplashGallery: React.FC<UnsplashGalleryProps> = ({
  query = 'dairy',
  limit = 12,
  onSelectImage,
}) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const results = await searchImages(query, 1, limit);
        setImages(results);
        setError(null);
      } catch (err) {
        setError('Failed to load images');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, limit]);

  const handleSelectImage = (image: UnsplashImage) => {
    setSelectedId(image.id);
    if (onSelectImage) {
      onSelectImage(image);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`card-glow cursor-pointer transition-all duration-300 ${
              selectedId === image.id ? 'ring-2 ring-sage-green' : ''
            }`}
            onClick={() => handleSelectImage(image)}
          >
            <div className="relative overflow-hidden h-48 bg-gray-200 rounded-lg mb-3">
              <img
                src={image.thumb}
                alt={image.description}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300" />
            </div>

            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
              {image.description}
            </h3>

            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
              <a
                href={image.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover text-sage-green hover:text-natural-gold"
                onClick={(e) => e.stopPropagation()}
              >
                {image.photographer}
              </a>
              <div className="flex items-center gap-1">
                <Heart size={14} className="fill-natural-gold text-natural-gold" />
                <span>{image.likes}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={image.full}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 btn-premium text-sm py-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={14} />
                View
              </a>
              <a
                href={image.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-light-green rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} className="text-sage-green" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnsplashGallery;
