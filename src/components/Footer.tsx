import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌾</span>
              <h3 className="text-xl font-serif font-bold">Grainiacs & Co.</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Pure goodness from nature to you. Premium dairy products for a healthier lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#shop" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Our Products</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-serif font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-natural-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-natural-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-natural-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-natural-gold transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 Grainiacs &amp; Co. All rights reserved.</p>
            <p className="mt-2">Crafted with care for your health and happiness.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
