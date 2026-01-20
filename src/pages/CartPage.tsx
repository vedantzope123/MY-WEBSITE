import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/currency';

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
    unit: string;
  };
  quantity: number;
  price: number;
}

interface CartPageProps {
  userId: string | null;
  onBack: () => void;
  onCheckout: (totalPrice: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ userId, onBack, onCheckout }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await response.json();
      setCartItems(data.items || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      // Remove and re-add with new quantity
      await fetch(`http://localhost:5000/api/cart/${userId}/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      await fetch(`http://localhost:5000/api/cart/${userId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${userId}/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await fetch(`http://localhost:5000/api/cart/${userId}/clear`, {
          method: 'POST',
        });
        fetchCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    onCheckout(totalPrice);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-xl text-sage-green">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sage-green mb-6 hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-serif font-bold text-sage-green flex items-center gap-3">
              <ShoppingBag size={32} />
              Shopping Cart
            </h1>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={onBack}
                className="bg-sage-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.productId.name}</h3>
                      <p className="text-sage-green font-bold">
                        {formatPrice(item.productId.price)} / {item.productId.unit}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId._id)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold">Total:</span>
                  <span className="text-3xl font-bold text-sage-green">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-sage-green text-white py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
