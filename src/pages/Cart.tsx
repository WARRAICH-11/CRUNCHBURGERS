import { motion } from 'motion/react';
import { useOutletContext, Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface OutletContext {
  isDark: boolean;
}

export default function Cart() {
  const { isDark } = useOutletContext<OutletContext>();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const delivery = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + tax + delivery;

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const itemsList = items
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\n${itemsList}\n\n` +
      `Subtotal: $${subtotal.toFixed(2)}\n` +
      `Tax: $${tax.toFixed(2)}\n` +
      `Delivery: $${delivery.toFixed(2)}\n` +
      `Total: $${total.toFixed(2)}\n\n` +
      `Please confirm availability!`
    );
    
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`backdrop-blur-xl rounded-3xl border p-12 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-[#FFD700] opacity-50" />
            <h2 className="text-4xl font-black mb-4">
              <span className={isDark ? 'text-white' : 'text-neutral-900'}>
                Your Cart is Empty
              </span>
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
              Add some delicious burgers to get started!
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
              YOUR CART
            </span>
          </h1>
          <p className={`text-xl ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
            {items.length} {items.length === 1 ? 'item' : 'items'} in your order
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`backdrop-blur-xl rounded-3xl border p-6 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-2xl font-black mb-1 ${
                          isDark ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {item.name}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={`p-2 rounded-full transition-all ${
                          isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                        }`}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                          }`}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className={`text-xl font-black w-8 text-center ${
                          isDark ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={clearCart}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                  : 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-neutral-900'
              }`}
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`backdrop-blur-xl rounded-3xl border p-8 sticky top-28 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
            >
              <h2 className={`text-2xl font-black mb-6 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-white/70' : 'text-neutral-600'}>
                    Subtotal
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-white/70' : 'text-neutral-600'}>
                    Tax (8%)
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-white/70' : 'text-neutral-600'}>
                    Delivery
                  </span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    ${delivery.toFixed(2)}
                  </span>
                </div>
                <div className={`border-t pt-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Total
                    </span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-4 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full font-black text-lg hover:shadow-2xl hover:scale-105 transition-all mb-3"
              >
                Order via WhatsApp
              </button>

              <Link
                to="/"
                className={`block text-center py-3 rounded-full font-bold transition-all ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
