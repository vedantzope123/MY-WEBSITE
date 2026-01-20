import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchImages, getRandomImage, getPhotoById } from './unsplash-config.js';

// Load .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function testUnsplash() {
  console.log('=== Unsplash Integration Test ===\n');
  console.log(`Access Key: ${process.env.VITE_UNSPLASH_ACCESS_KEY ? '✓ Found' : '❌ Not found'}\n`);

  // Test 1: Search for dairy products
  console.log('🔍 Test 1: Searching for "dairy products"...');
  const dairyImages = await searchImages('dairy products', 1, 5);
  if (dairyImages.length > 0) {
    console.log('✓ Found images:');
    dairyImages.forEach((img, idx) => {
      console.log(`  ${idx + 1}. ${img.description || 'Untitled'}`);
      console.log(`     URL: ${img.url}`);
      console.log(`     By: ${img.photographer}\n`);
    });
  } else {
    console.log('✗ No images found. Check your API key!\n');
  }

  // Test 2: Get random milk image
  console.log('🎲 Test 2: Getting random "milk" image...');
  const randomMilk = await getRandomImage({ query: 'milk' });
  if (randomMilk) {
    console.log('✓ Random image:');
    console.log(`  ${randomMilk.description || 'Untitled'}`);
    console.log(`  URL: ${randomMilk.url}`);
    console.log(`  By: ${randomMilk.photographer}\n`);
  } else {
    console.log('✗ Could not fetch random image\n');
  }

  // Test 3: Search for cheese
  console.log('🔍 Test 3: Searching for "cheese"...');
  const cheeseImages = await searchImages('cheese', 1, 3);
  if (cheeseImages.length > 0) {
    console.log(`✓ Found ${cheeseImages.length} cheese images`);
  } else {
    console.log('✗ No cheese images found\n');
  }

  console.log('\n✅ Unsplash integration is ready!');
  console.log('Learn more: https://unsplash.com/developers');
}

testUnsplash();
