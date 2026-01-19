import { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ShopPage } from './pages/ShopPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import type { Product } from './data/products';
import { products as localProducts, testimonials, subscriptionPlans } from './data/products';
import { productsAPI } from './utils/api';

function App() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch products from API, fallback to local data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        setProductData(response.data);
        console.log('✅ Products loaded from MongoDB');
      } catch (error) {
        console.warn('⚠️ Backend not available, using local data');
        // Fallback to local products if API fails
        setProductData(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return productData;
    return productData.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-900">
      <Header
        onCartClick={() => scrollToSection('shop')}
        onWishlistClick={() => scrollToSection('products')}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />

      <main>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-2xl text-sage-green font-semibold">Loading products...</p>
          </div>
        ) : (
          <>
            <HomePage
              onShopClick={() => scrollToSection('shop')}
              onProductsClick={() => scrollToSection('products')}
              featuredProducts={productData.slice(0, 3)}
            />

            <AboutPage />

            <ProductsPage
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlistIds={wishlist}
              onFilter={(category) => setActiveCategory(category)}
              activeCategory={activeCategory}
            />

            <ShopPage
              products={productData}
              subscriptionPlans={subscriptionPlans}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlistIds={wishlist}
            />

            <TestimonialsPage testimonials={testimonials} />

            <ContactPage />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
