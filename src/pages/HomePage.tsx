import React from 'react';
import { ArrowRight, Leaf, Heart, Truck } from 'lucide-react';
import type { Product } from '../data/products';
import { formatCurrency } from '../utils/currency';

interface HomePageProps {
  onShopClick: () => void;
  onProductsClick: () => void;
  featuredProducts: Product[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onShopClick,
  onProductsClick,
  featuredProducts,
}) => {
  return (
    <div id="home" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-light-green to-white overflow-hidden py-24 md:py-32">
        <div className="absolute top-10 right-10 w-72 h-72 bg-natural-gold opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-green opacity-5 rounded-full blur-3xl"></div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Pure Goodness from Nature to You
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Discover premium dairy products crafted with care from happy, grass-fed cows. Experience the difference that quality and sustainability make.
              </p>

              <div className="flex gap-4 mb-12">
                <button
                  onClick={onShopClick}
                  className="btn-primary flex items-center gap-2"
                >
                  Shop Now
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={onProductsClick}
                  className="btn-secondary"
                >
                  Learn More
                </button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Leaf className="text-sage-green" size={24} />
                  <span className="text-gray-700 font-medium">100% Organic & Sustainable</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="text-sage-green" size={24} />
                  <span className="text-gray-700 font-medium">Happy, Well-Treated Cows</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="text-sage-green" size={24} />
                  <span className="text-gray-700 font-medium">Fresh Delivery to Your Door</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in">
              <div className="bg-cream rounded-3xl shadow-lg-soft overflow-hidden h-96 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1553531889-e6cf89d45abc?w=600&h=600&fit=crop"
                  alt="Fresh Dairy Products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 max-w-xs">
                <p className="text-sm font-semibold text-sage-green mb-1">Farm Fresh</p>
                <p className="text-gray-700 text-sm">Delivered within Minutes of production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="section-container">
        <h2 className="section-heading">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className={`bg-cream rounded-2xl shadow-soft p-6 text-center animate-fade-in ${
                index % 2 === 0 ? 'md:translate-y-4' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4">{product.category === 'milk' ? '🥛' : product.category === 'cheese' ? '🧀' : product.category === 'butter' ? '🧈' : '🌟'}</div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-natural-gold font-bold text-2xl mb-4">
                {formatCurrency(product.price)}
              </p>
              <p className="text-gray-600 text-sm mb-6">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={onShopClick} className="btn-primary inline-flex items-center gap-2">
            View All Products
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};
