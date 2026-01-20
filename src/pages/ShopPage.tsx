import React, { useMemo } from 'react';
import { Sparkles, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { Product } from '../data/products';
import { categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { formatCurrency } from '../utils/currency';
import { useUnsplash } from '../hooks/useUnsplash';

interface ShopPageProps {
  products: Product[];
  subscriptionPlans: {
    id: number;
    name: string;
    price: number;
    frequency: string;
    items: string[];
    description: string;
    popular?: boolean;
  }[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistIds: number[];
  useUnsplashImages?: boolean;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  subscriptionPlans,
  onAddToCart,
  onAddToWishlist,
  wishlistIds,
  useUnsplashImages = true,
}) => {
  // Build a generic query for shop page (mix of categories)
  const query = useMemo(() => 'dairy products milk cheese butter yogurt', []);
  const { images: unsplashImages, loading: unsplashLoading, pick } = useUnsplash(query, 18);
  const runtimeProducts = useMemo(() => {
    if (!useUnsplashImages || !unsplashImages.length) return products;
    return products.map((p, idx) => {
      const chosen = pick(idx);
      return chosen ? { ...p, image: chosen.url } : p;
    });
  }, [useUnsplashImages, unsplashImages, products, pick]);
  return (
    <section id="shop" className="section-container">
      <div className="text-center mb-12">
        <h2 className="section-heading">Shop Our Dairy</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Browse premium milk, cheese, butter, yogurt, and ghee. Freshly crafted and delivered with care.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: <Sparkles className="text-natural-gold" />, title: 'Premium Quality', desc: 'Hormone-free, grass-fed dairy.' },
          { icon: <Truck className="text-natural-gold" />, title: 'Fast Delivery', desc: 'Fresh to your door in Minutes.' },
          { icon: <ShieldCheck className="text-natural-gold" />, title: 'Safe & Tested', desc: 'Rigorous quality checks.' },
          { icon: <HeartHandshake className="text-natural-gold" />, title: 'Ethical Farms', desc: 'Happy cows, better milk.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-cream rounded-2xl shadow-soft p-5 flex gap-3 items-start">
            <div className="p-3 rounded-full bg-white shadow-soft">{item.icon}</div>
            <div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <span key={cat.id} className="px-3 py-1 rounded-full bg-light-green text-sage-green text-sm font-semibold">
            {cat.icon} {cat.name}
          </span>
        ))}
      </div>

      {/* Products Grid */}
      {useUnsplashImages && (
        <div className="mb-4 text-center text-sm text-gray-600">
          {unsplashLoading ? 'Loading fresh images from Unsplash…' : 'Showing live images from Unsplash'}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

      {/* Subscription Plans */}
      <div className="bg-light-green rounded-3xl p-10 shadow-soft">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">Subscription Plans</h3>
          <p className="text-gray-700">Choose weekly or monthly deliveries and never run out of essentials.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-soft p-6 border ${plan.popular ? 'border-natural-gold' : 'border-transparent'}`}
            >
              {plan.popular && (
                <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-natural-gold rounded-full">
                  Most Popular
                </div>
              )}
              <h4 className="text-xl font-serif font-bold text-gray-900 mb-2">{plan.name}</h4>
              <p className="text-natural-gold text-3xl font-bold mb-1">{formatCurrency(plan.price)}</p>
              <p className="text-sm text-gray-600 mb-4">{plan.frequency} delivery</p>
              <ul className="space-y-2 mb-6 text-gray-700 text-sm">
                {plan.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <button className="btn-primary w-full">Subscribe</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
