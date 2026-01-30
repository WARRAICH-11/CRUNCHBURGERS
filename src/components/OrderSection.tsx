import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface OrderSectionProps {
  isDark: boolean;
}

interface ComboItem {
  burger: string;
  fries: string;
  drink: string;
}

const burgerOptions = [
  { name: 'BEEF SUPREME', price: 12.99, image: 'https://images.unsplash.com/photo-1762631934669-7da9e3100add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBiZWVmJTIwYnVyZ2VyJTIwY2xvc2V8ZW58MXx8fHwxNzY5NjU3MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'ZINGER BLAST', price: 10.99, image: 'https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzY5NjU3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'FILLET DELUXE', price: 11.99, image: 'https://images.unsplash.com/photo-1643111998354-07e7a780c92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmlsbGV0JTIwYnVyZ2VyJTIwZGVsaWNpb3VzfGVufDF8fHx8MTc2OTY1NzM1MXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'PATTY MELT', price: 9.99, image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwcGF0dHklMjBidXJnZXIlMjBnb3VybWV0fGVufDF8fHx8MTc2OTY1NzM1MXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'EGGY SUNRISE', price: 8.99, image: 'https://images.unsplash.com/photo-1559962954-b92f15ab1b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2clMjBidXJnZXIlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzY5NjU3MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
];

const friesOptions = [
  { name: 'Classic Fries', price: 4.99 },
  { name: 'Cheese Fries', price: 6.99 },
  { name: 'Spicy Fries', price: 5.99 },
  { name: 'Garlic Parmesan', price: 6.99 },
  { name: 'Bacon Fries', price: 7.99 },
];

const drinkOptions = [
  { name: 'Cola', price: 2.99 },
  { name: 'Sprite', price: 2.99 },
  { name: 'Fanta', price: 2.99 },
  { name: 'Iced Tea', price: 3.49 },
  { name: 'Lemonade', price: 3.49 },
];

export function OrderSection({ isDark }: OrderSectionProps) {
  const [combo, setCombo] = useState<ComboItem>({
    burger: burgerOptions[0].name,
    fries: friesOptions[0].name,
    drink: drinkOptions[0].name
  });
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const selectedBurger = burgerOptions.find(b => b.name === combo.burger)!;
  const selectedFries = friesOptions.find(f => f.name === combo.fries)!;
  const selectedDrink = drinkOptions.find(d => d.name === combo.drink)!;
  
  const basePrice = selectedBurger.price + selectedFries.price + selectedDrink.price;
  const total = (basePrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    // Add burger
    addToCart({
      id: `burger-${Date.now()}`,
      name: selectedBurger.name,
      price: selectedBurger.price,
      image: selectedBurger.image,
      category: 'BURGER'
    });

    // Add fries
    addToCart({
      id: `fries-${Date.now()}`,
      name: selectedFries.name,
      price: selectedFries.price,
      image: 'https://images.unsplash.com/photo-1717294978892-cef673e1d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3Njk2NTczNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'FRIES'
    });

    // Add drink
    addToCart({
      id: `drink-${Date.now()}`,
      name: selectedDrink.name,
      price: selectedDrink.price,
      image: 'https://images.unsplash.com/photo-1685270386242-487b9e1c9fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyZXNoaW5nJTIwYmV2ZXJhZ2VzJTIwZHJpbmtzfGVufDF8fHx8MTc2OTY1NzM1NHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'BEVERAGE'
    });
  };

  return (
    <section className={`py-20 px-6 relative ${isDark ? 'text-white' : 'text-neutral-900'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
              BUILD YOUR COMBO
            </span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
            Create your perfect meal
          </p>
        </motion.div>

        {/* Combo Builder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`backdrop-blur-xl rounded-3xl border p-8 md:p-12 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}
        >
          {/* Burger Selection */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-4">🍔 Choose Your Burger</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {burgerOptions.map((burger) => (
                <button
                  key={burger.name}
                  onClick={() => setCombo({ ...combo, burger: burger.name })}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    combo.burger === burger.name
                      ? 'bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white scale-105 shadow-xl'
                      : isDark
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  {burger.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fries Selection */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-4">🍟 Choose Your Fries</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {friesOptions.map((fries) => (
                <button
                  key={fries.name}
                  onClick={() => setCombo({ ...combo, fries: fries.name })}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    combo.fries === fries.name
                      ? 'bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white scale-105 shadow-xl'
                      : isDark
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  {fries.name}
                </button>
              ))}
            </div>
          </div>

          {/* Drink Selection */}
          <div className="mb-8">
            <label className="block text-xl font-bold mb-4">🥤 Choose Your Drink</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {drinkOptions.map((drink) => (
                <button
                  key={drink.name}
                  onClick={() => setCombo({ ...combo, drink: drink.name })}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    combo.drink === drink.name
                      ? 'bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white scale-105 shadow-xl'
                      : isDark
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  {drink.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Total */}
          <div className="border-t border-white/10 pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-black w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Total</span>
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                ${total}
              </span>
            </div>

            {/* Order Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full font-black text-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`text-center mt-8 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}
        >
          <p className="text-sm">
            💬 Click "Add to Cart" to add your order to the cart!
          </p>
        </motion.div>
      </div>
    </section>
  );
}