import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '../data/products';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  return (
    <div className="card-product animate-slide-up">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-cream h-48 md:h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white font-bold text-lg">Out of Stock</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sage-green text-sm font-semibold mb-2 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 h-14">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-natural-gold mb-4">
          {formatCurrency(product.price)}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button
            onClick={() => onAddToWishlist(product)}
            className={`p-3 rounded-full border-2 transition-all ${
              isInWishlist
                ? 'bg-natural-gold border-natural-gold text-white'
                : 'border-sage-green text-sage-green hover:bg-light-green'
            }`}
          >
            <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};
