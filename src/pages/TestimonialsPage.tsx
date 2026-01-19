import React from 'react';
import type { Testimonial } from '../data/products';
import { TestimonialCard } from '../components/TestimonialCard';

interface TestimonialsPageProps {
  testimonials: Testimonial[];
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="section-container bg-white">
      <h2 className="section-heading">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <div key={testimonial.id} style={{ animationDelay: `${idx * 0.1}s` }}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
};
