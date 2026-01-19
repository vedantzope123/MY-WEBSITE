import express from 'express';
import Subscription from '../models/Subscription.js';

const router = express.Router();

// Get all subscription plans
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
});

// Get subscriptions for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
});

// Create subscription
router.post('/', async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: 'Error creating subscription', error });
  }
});

// Update subscription
router.put('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ message: 'Error updating subscription', error });
  }
});

// Cancel subscription
router.post('/:id/cancel', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ message: 'Error cancelling subscription', error });
  }
});

export default router;
