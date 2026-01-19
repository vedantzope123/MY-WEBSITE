import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <section id="contact" className="section-container bg-cream rounded-3xl shadow-soft">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-heading text-left">Get in Touch</h2>
          <p className="text-gray-700 mb-6">
            Questions about products, delivery, or subscriptions? Send us a note and we’ll respond within one business day.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="text-sage-green" />
              <span>hello@grainiacs.co</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-sage-green" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-sage-green" />
              <span>Green Valley Farms, Wisconsin</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
              <a key={idx} href="#" className="p-3 bg-white rounded-full shadow-soft text-sage-green hover:text-natural-gold transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-soft">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-light-green rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-light-green rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us how we can help"
                className="w-full border border-light-green rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};
