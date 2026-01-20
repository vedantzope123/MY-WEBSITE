import express from 'express';
import { cloudinary } from './cloudinary-config.js';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static('.'));
app.use(express.json());

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'my-website',
      transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }]
    });
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
});