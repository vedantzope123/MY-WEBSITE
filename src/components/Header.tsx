import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Heart } from 'lucide-react';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  onWishlistClick, 
  cartCount, 
  wishlistCount 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="relative p-2 hover:bg-cream rounded-full transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={24} className="text-sage-green" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-natural-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-cream rounded-full transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={24} className="text-sage-green" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-natural-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

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
          </ul>
        </div>
      )}
    </header>
  );
};
