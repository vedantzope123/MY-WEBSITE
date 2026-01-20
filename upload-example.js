import { cloudinary } from './cloudinary-config.js';

// Function to upload local file
export async function uploadFile(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'my-website',
      resource_type: 'auto',
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    console.log('✓ File uploaded:', result.secure_url);
    return result;
  } catch (error) {
    console.error('✗ Upload failed:', error.message);
    throw error;
  }
}

// Function to delete image
export async function deleteFile(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('✓ File deleted:', publicId);
    return result;
  } catch (error) {
    console.error('✗ Delete failed:', error.message);
    throw error;
  }
}