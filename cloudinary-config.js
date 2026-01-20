import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dvripywsj',
  api_key: '193882715678531',
  api_secret: 'qb2c60PGqA4T_EkttO07b0RPv0g',
  secure: true
});

export async function testConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log('✓ Cloudinary connected successfully');
    return true;
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    return false;
  }
}

export { cloudinary };