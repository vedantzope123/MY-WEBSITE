import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../data/products';

interface WishlistPageProps {
  userId: string | null;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ userId, onBack, onAddToCart }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
      const data = await response.json();
      setWishlistItems(data.products || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await fetch(`http://localhost:5000/api/wishlist/${userId}/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const clearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      try {
        await fetch(`http://localhost:5000/api/wishlist/${userId}/clear`, {
          method: 'POST',
        });
        fetchWishlist();
      } catch (error) {
        console.error('Error clearing wishlist:', error);
      }
    }
  };

  const handleAddToCart = async (product: Product) => {
    onAddToCart(product);
    // Optionally remove from wishlist after adding to cart
    // await removeFromWishlist(product._id || product.id.toString());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-xl text-sage-green">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sage-green mb-6 hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif font-bold text-sage-green flex items-center gap-3">
              <Heart size={32} className="fill-sage-green" />
              My Wishlist
            </h1>
            {wishlistItems.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-4">Your wishlist is empty</p>
              <button
                onClick={onBack}
                className="bg-sage-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
              >
                Discover Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product) => (
                <div key={product._id || product.id} className="relative">
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToWishlist={() => removeFromWishlist(product._id || product.id.toString())}
                    isInWishlist={true}
                  />
                  <button
                    onClick={() => removeFromWishlist(product._id || product.id.toString())}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
