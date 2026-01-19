import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    planName: { type: String, required: true },
    price: { type: Number, required: true },
    frequency: { type: String, enum: ['Weekly', 'Monthly'], required: true },
    items: [{ type: String }],
    status: {
      type: String,
      enum: ['active', 'paused', 'cancelled'],
      default: 'active',
    },
    nextDeliveryDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('Subscription', subscriptionSchema);
