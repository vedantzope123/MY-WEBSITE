import React from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '../data/products';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="card-glow animate-fade-in">
      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-natural-gold text-natural-gold" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
      <div>
        <p className="font-semibold text-gray-900">{testimonial.author}</p>
        {testimonial.role && (
          <p className="text-sm text-sage-green">{testimonial.role}</p>
        )}
      </div>
    </div>
  );
};
