import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Heart, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  cartCount: number;
  wishlistCount: number;
  user: { name: string; email: string } | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  onWishlistClick, 
  cartCount, 
  wishlistCount,
  user,
  onSignIn,
  onSignOut
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Shop', href: '#shop' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌾</span>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-sage-green">
            Grainiacs & Co.
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-700 hover:text-sage-green transition-colors font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart & Wishlist Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={onWishlistClick}
            className="relative p-2 hover:bg-light-green rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md"
            aria-label="Wishlist"
          >
            <Heart size={24} className="text-sage-green transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-natural-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-bounce-in">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-light-green rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={24} className="text-sage-green transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-natural-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-bounce-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-cream rounded-lg transition-colors"
              >
                <User size={24} className="text-sage-green" />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 card-glow">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onSignOut();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="hidden md:block btn-premium"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-sage-green" />
            ) : (
              <Menu size={24} className="text-sage-green" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-cream border-t border-light-green animate-fade-in">
          <ul className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-sage-green transition-colors font-medium block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            {!user && (
              <li>
                <button
                  onClick={() => {
                    onSignIn();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-sage-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
