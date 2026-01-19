import React from 'react';
import { Award, Globe, Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div id="about" className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-light-green py-16 md:py-24">
        <div className="section-container text-center">
          <h1 className="section-heading">About Grainiacs & Co.</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Committed to bringing you the purest dairy products while caring for our cows and the planet.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Grainiacs & Co. was founded on a simple belief: the best dairy comes from happy cows and sustainable farming practices. What started as a small family farm has grown into a trusted brand serving thousands of health-conscious families.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We partner with local, ethical farms that share our commitment to animal welfare and environmental stewardship. Every product you purchase supports sustainable agriculture and fair treatment of livestock.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to deliver farm-fresh dairy directly to your doorstep, ensuring maximum freshness and nutritional value.
            </p>
          </div>

          <div className="relative animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1552521432-6fefe4c3b66d?w=600&h=600&fit=crop"
              alt="Our Farm"
              className="rounded-3xl shadow-lg-soft"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="section-heading">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-12 h-12 text-natural-gold mb-4" />,
                title: 'Purity',
                description: 'We believe in transparency and purity. No artificial additives, hormones, or shortcuts. Just pure, wholesome dairy.',
              },
              {
                icon: <Globe className="w-12 h-12 text-natural-gold mb-4" />,
                title: 'Sustainability',
                description: 'Environmental responsibility is at the heart of everything we do. From farming practices to eco-friendly packaging.',
              },
              {
                icon: <Leaf className="w-12 h-12 text-natural-gold mb-4" />,
                title: 'Animal Welfare',
                description: 'Our cows are treated with respect and compassion. Happy cows produce better milk, and we ensure their wellbeing.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-cream rounded-2xl shadow-soft p-8 text-center hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Happy Cows Section */}
        <div className="bg-light-green rounded-3xl shadow-soft p-12 text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            🐄 Our Happy Cows Program
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-6">
            Every cow in our network is treated as a valued member of the farm family. We ensure proper nutrition, comfortable housing, regular veterinary care, and ample time to graze in pastures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Natural Diet', 'Spacious Pastures', 'Stress-Free Living'].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4">
                <p className="font-semibold text-sage-green">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Happy Cows' },
            { number: '10K+', label: 'Families Served' },
            { number: '100%', label: 'Organic' },
            { number: '24H', label: 'Farm to You' },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="text-4xl md:text-5xl font-bold text-natural-gold mb-2">
                {stat.number}
              </p>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
