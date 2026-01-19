import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['milk', 'cheese', 'butter', 'yogurt', 'ghee'],
      required: true,
    },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
