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
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import type { Product } from './data/products';
import { products as localProducts, testimonials, subscriptionPlans } from './data/products';
import { productsAPI } from './utils/api';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Page = 'home' | 'signin' | 'signup' | 'cart' | 'wishlist';

function AppContent() {
  const { user, signIn, signUp, signOut, isAuthenticated } = useAuth();
  const [productData, setProductData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

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

  // Fetch cart and wishlist counts when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCartCount();
      fetchWishlistCount();
    }
  }, [isAuthenticated, user]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user?.id}`);
      const data = await response.json();
      setCartCount(data.items?.length || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${user?.id}`);
      const data = await response.json();
      setWishlistCount(data.products?.length || 0);
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return productData;
    return productData.filter((product) => product.category === activeCategory);
  }, [activeCategory, productData]);

  const handleAddToCart = async (product: Product) => {
    if (!isAuthenticated) {
      alert('Please sign in to add items to cart');
      setCurrentPage('signin');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/cart/${user?.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: product._id || product.id, 
          quantity: 1 
        }),
      });
      fetchCartCount();
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!isAuthenticated) {
      alert('Please sign in to add items to wishlist');
      setCurrentPage('signin');
      return;
    }

    try {
      const productId = product._id || product.id;
      const isInWishlist = wishlist.includes(Number(productId));
      
      if (isInWishlist) {
        await fetch(`http://localhost:5000/api/wishlist/${user?.id}/remove`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        setWishlist((prev) => prev.filter((id) => id !== Number(productId)));
      } else {
        await fetch(`http://localhost:5000/api/wishlist/${user?.id}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        setWishlist((prev) => [...prev, Number(productId)]);
      }
      fetchWishlistCount();
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      setCurrentPage('home');
      alert('Signed in successfully!');
    } catch (error: any) {
      alert(error.message || 'Sign in failed');
    }
  };

  const handleSignUp = async (userData: any) => {
    try {
      await signUp(userData);
      setCurrentPage('home');
      alert('Account created successfully!');
    } catch (error: any) {
      alert(error.message || 'Sign up failed');
    }
  };

  const handleCheckout = async (totalPrice: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          totalAmount: totalPrice,
        }),
      });

      if (response.ok) {
        alert(`Order placed successfully! Total: ₹${totalPrice}`);
        // Clear cart after checkout
        await fetch(`http://localhost:5000/api/cart/${user?.id}/clear`, {
          method: 'POST',
        });
        fetchCartCount();
        setCurrentPage('home');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Render different pages based on current page state
  if (currentPage === 'signin') {
    return (
      <div className="bg-white text-gray-900">
        <SignInPage
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => setCurrentPage('signup')}
        />
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="bg-white text-gray-900">
        <SignUpPage
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => setCurrentPage('signin')}
        />
      </div>
    );
  }

  if (currentPage === 'cart') {
    return (
      <div className="bg-white text-gray-900">
        <CartPage
          userId={user?.id || null}
          onBack={() => setCurrentPage('home')}
          onCheckout={handleCheckout}
        />
      </div>
    );
  }

  if (currentPage === 'wishlist') {
    return (
      <div className="bg-white text-gray-900">
        <WishlistPage
          userId={user?.id || null}
          onBack={() => setCurrentPage('home')}
          onAddToCart={handleAddToCart}
        />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      <Header
        onCartClick={() => {
          if (!isAuthenticated) {
            alert('Please sign in to view cart');
            setCurrentPage('signin');
          } else {
            setCurrentPage('cart');
          }
        }}
        onWishlistClick={() => {
          if (!isAuthenticated) {
            alert('Please sign in to view wishlist');
            setCurrentPage('signin');
          } else {
            setCurrentPage('wishlist');
          }
        }}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        user={user}
        onSignIn={() => setCurrentPage('signin')}
        onSignOut={() => {
          signOut();
          setCurrentPage('home');
        }}
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
