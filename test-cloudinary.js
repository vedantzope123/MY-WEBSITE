import { cloudinary, testConnection } from './cloudinary-config.js';
import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log('=== Cloudinary Integration Test ===\n');
  
  // Test connection
  const connected = await testConnection();
  
  if (!connected) {
    console.log('\n✗ Please check your credentials');
    return;
  }
  
  console.log('\nTesting upload with base64...');
  try {
    // Create a simple 1x1 pixel image in base64
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    const result = await cloudinary.uploader.upload(testImage, {
      folder: 'test',
      public_id: 'test-image-' + Date.now(),
      resource_type: 'image'
    });
    
    console.log('✓ Upload successful!');
    console.log('  URL:', result.secure_url);
    console.log('  Public ID:', result.public_id);
    console.log('\n✓ Cloudinary is fully configured and working!');
  } catch (error) {
    console.error('✗ Upload error:', error.message);
  }
}

runTests();