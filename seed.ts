import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './backend/models/Product.js';

dotenv.config({ override: true });

const seedProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://vedantzope123:Sunidhi%3C3@cluster0.pjuvsdk.mongodb.net/';
    console.log('Using MONGODB_URI:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const products = [
      {
        name: 'Organic Whole Milk',
        category: 'milk',
        price: 349,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b25a968?w=500&h=500&fit=crop',
        description: 'Fresh, organic whole milk from grass-fed cows. Rich in calcium and nutrients.',
        inStock: true,
      },
      {
        name: 'Artisan Cheddar Cheese',
        category: 'cheese',
        price: 899,
        image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop',
        description: 'Aged for 12 months, with a rich, complex flavor. Perfect for cheese boards.',
        inStock: true,
      },
      {
        name: 'Grass-Fed Butter',
        category: 'butter',
        price: 549,
        image: 'https://images.unsplash.com/photo-1589985643862-ea1ba0fb9d9c?w=500&h=500&fit=crop',
        description: 'Creamy, golden butter from grass-fed cows. Rich in omega-3 fatty acids.',
        inStock: true,
      },
      {
        name: 'Greek Yogurt',
        category: 'yogurt',
        price: 379,
        image: 'https://images.unsplash.com/photo-1488528505585-acdd338db74d?w=500&h=500&fit=crop',
        description: 'Thick, creamy Greek yogurt with live active cultures. No artificial ingredients.',
        inStock: true,
      },
      {
        name: 'Premium Ghee',
        category: 'ghee',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1585521199219-351aab97318c?w=500&h=500&fit=crop',
        description: 'Pure clarified butter. Great for cooking and traditional recipes.',
        inStock: true,
      },
      {
        name: 'Lactose-Free Milk',
        category: 'milk',
        price: 419,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b25a968?w=500&h=500&fit=crop',
        description: 'All the nutrition of milk without the lactose. Perfect for sensitive digestive systems.',
        inStock: true,
      },
      {
        name: 'Mozzarella Cheese',
        category: 'cheese',
        price: 629,
        image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop',
        description: 'Fresh, stretchy mozzarella. Ideal for pizzas, salads, and more.',
        inStock: true,
      },
      {
        name: 'Salted Cultured Butter',
        category: 'butter',
        price: 589,
        image: 'https://images.unsplash.com/photo-1589985643862-ea1ba0fb9d9c?w=500&h=500&fit=crop',
        description: 'Traditional cultured butter with a hint of sea salt. Gourmet quality.',
        inStock: true,
      },
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
