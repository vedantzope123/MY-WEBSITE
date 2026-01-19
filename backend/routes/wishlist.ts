import express from 'express';
import Wishlist from '../models/Wishlist.js';

const router = express.Router();

// Get wishlist by user ID
router.get('/:userId', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate(
      'productIds'
    );
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.params.userId, productIds: [] });
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
});

// Add product to wishlist
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.params.userId, productIds: [productId] });
    } else if (!wishlist.productIds.includes(productId)) {
      wishlist.productIds.push(productId);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: 'Error adding to wishlist', error });
  }
});

// Remove product from wishlist
router.post('/:userId/remove', async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });

    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.productIds = wishlist.productIds.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
});

export default router;
