export interface Product {
  id: number;
  _id?: string;
  name: string;
  category: 'milk' | 'cheese' | 'butter' | 'yogurt' | 'ghee';
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  unit?: string;
}

export interface Testimonial {
  id: number;
  author: string;
  rating: number;
  text: string;
  role?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Organic Whole Milk',
    category: 'milk',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b25a968?w=500&h=500&fit=crop',
    description: 'Fresh, organic whole milk from grass-fed cows. Rich in calcium and nutrients.',
    inStock: true,
  },
  {
    id: 2,
    name: 'Artisan Cheddar Cheese',
    category: 'cheese',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop',
    description: 'Aged for 12 months, with a rich, complex flavor. Perfect for cheese boards.',
    inStock: true,
  },
  {
    id: 3,
    name: 'Grass-Fed Butter',
    category: 'butter',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1589985643862-ea1ba0fb9d9c?w=500&h=500&fit=crop',
    description: 'Creamy, golden butter from grass-fed cows. Rich in omega-3 fatty acids.',
    inStock: true,
  },
  {
    id: 4,
    name: 'Greek Yogurt',
    category: 'yogurt',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1488528505585-acdd338db74d?w=500&h=500&fit=crop',
    description: 'Thick, creamy Greek yogurt with live active cultures. No artificial ingredients.',
    inStock: true,
  },
  {
    id: 5,
    name: 'Premium Ghee',
    category: 'ghee',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1585521199219-351aab97318c?w=500&h=500&fit=crop',
    description: 'Pure clarified butter. Great for cooking and traditional recipes.',
    inStock: true,
  },
  {
    id: 6,
    name: 'Lactose-Free Milk',
    category: 'milk',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b25a968?w=500&h=500&fit=crop',
    description: 'All the nutrition of milk without the lactose. Perfect for sensitive digestive systems.',
    inStock: true,
  },
  {
    id: 7,
    name: 'Mozzarella Cheese',
    category: 'cheese',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop',
    description: 'Fresh, stretchy mozzarella. Ideal for pizzas, salads, and more.',
    inStock: true,
  },
  {
    id: 8,
    name: 'Salted Cultured Butter',
    category: 'butter',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1589985643862-ea1ba0fb9d9c?w=500&h=500&fit=crop',
    description: 'Traditional cultured butter with a hint of sea salt. Gourmet quality.',
    inStock: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Sarah Anderson',
    rating: 5,
    text: 'Grainiacs & Co. provides the best dairy products I\'ve ever tasted. The quality is unmatched, and I can taste the difference.',
    role: 'Home Chef',
  },
  {
    id: 2,
    author: 'Michael Chen',
    rating: 5,
    text: 'I\'ve switched all my dairy purchases to Grainiacs & Co. Their commitment to sustainability and animal welfare is inspiring.',
    role: 'Health Enthusiast',
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    rating: 4,
    text: 'Love the variety and freshness of the products. Delivery is always on time, and packaging is eco-friendly.',
    role: 'Professional Baker',
  },
  {
    id: 4,
    author: 'James Wilson',
    rating: 5,
    text: 'As a nutritionist, I recommend Grainiacs & Co. to all my clients. Pure, natural, and delicious!',
    role: 'Nutritionist',
  },
  {
    id: 5,
    author: 'Lisa Martinez',
    rating: 5,
    text: 'My family has been using Grainiacs & Co. for over a year. Best decision ever for our health.',
    role: 'Mother of 3',
  },
];

export const categories = [
  { id: 'milk', name: 'Milk', icon: '🥛' },
  { id: 'cheese', name: 'Cheese', icon: '🧀' },
  { id: 'butter', name: 'Butter', icon: '🧈' },
  { id: 'yogurt', name: 'Yogurt', icon: '🥄' },
  { id: 'ghee', name: 'Ghee', icon: '🌟' },
];

export const subscriptionPlans = [
  {
    id: 1,
    name: 'Weekly Essentials',
    price: 24.99,
    frequency: 'Weekly',
    items: ['1L Whole Milk', '200g Butter', 'Your choice of cheese'],
    description: 'Perfect for small households',
  },
  {
    id: 2,
    name: 'Family Plus',
    price: 49.99,
    frequency: 'Monthly',
    items: ['2L Whole Milk', '500g Butter', '2 Cheese varieties', 'Greek Yogurt'],
    description: 'Ideal for families',
    popular: true,
  },
  {
    id: 3,
    name: 'Premium Collection',
    price: 79.99,
    frequency: 'Monthly',
    items: ['3L Milk', '750g Butter', '3 Cheese varieties', 'Ghee', 'Yogurt', 'Priority support'],
    description: 'For dairy connoisseurs',
  },
];
