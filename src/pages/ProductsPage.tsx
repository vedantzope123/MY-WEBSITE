import React, { useMemo } from 'react';
import type { Product } from '../data/products';
import { categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useUnsplash } from '../hooks/useUnsplash';

interface ProductsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistIds: number[];
  onFilter: (category: string | null) => void;
  activeCategory: string | null;
  useUnsplashImages?: boolean; // optionally replace images at runtime
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onAddToCart,
  onAddToWishlist,
  wishlistIds,
  onFilter,
  activeCategory,
  useUnsplashImages = true,
}) => {
  // Build a query string based on active category
  const query = useMemo(() => {
    if (!activeCategory) return 'dairy products';
    // Map category id to a meaningful Unsplash query
    const map: Record<string, string> = {
      milk: 'milk dairy',
      cheese: 'cheese dairy',
      butter: 'butter dairy',
      yogurt: 'yogurt dairy',
      ghee: 'ghee butter',
    };
    return map[activeCategory] || 'dairy products';
  }, [activeCategory]);

  const { images: unsplashImages, loading: unsplashLoading, pick } = useUnsplash(query, 12);

  // Derive products with runtime Unsplash images if enabled
  const runtimeProducts = useMemo(() => {
    if (!useUnsplashImages || !unsplashImages.length) return products;
    return products.map((p, idx) => {
      const chosen = pick(idx);
      if (!chosen) return p;
      // Preserve existing product, swap image with Unsplash at runtime
      return { ...p, image: chosen.url };
    });
  }, [useUnsplashImages, unsplashImages, products, pick]);

  return (
    <div id="products" className="min-h-screen py-24 md:py-32 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h1 className="section-heading">Our Products</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our carefully crafted selection of premium dairy products, made with love from happy cows.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => onFilter(null)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === null ? 'bg-sage-green text-white border-sage-green' : 'border-sage-green text-sage-green hover:bg-light-green'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onFilter(category.id)}
              className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
                activeCategory === category.id ? 'bg-sage-green text-white border-sage-green' : 'border-sage-green text-sage-green hover:bg-light-green'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {useUnsplashImages && (
          <div className="mb-4 text-center text-sm text-gray-600">
            {unsplashLoading ? 'Loading fresh images from Unsplash…' : `Showing images for: ${query}`}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {runtimeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              isInWishlist={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-20 bg-light-green rounded-2xl shadow-soft p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
            Quality Guarantee
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            Every product is tested for purity and freshness. If you're not completely satisfied, we offer a 100% money-back guarantee.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center text-sm font-semibold text-sage-green">
            <span>✓ 100% Organic</span>
            <span>✓ No Additives</span>
            <span>✓ Fresh Guarantee</span>
            <span>✓ Eco-Friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
};
