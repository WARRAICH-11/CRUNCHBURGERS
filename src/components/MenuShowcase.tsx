import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
  ingredients?: string[];
  spiceLevel?: number;
  isSecret?: boolean;
}

interface MenuShowcaseProps {
  isDark: boolean;
  konamiActivated: boolean;
}

const burgers: MenuItem[] = [
  {
    id: 1,
    name: 'BEEF SUPREME',
    category: 'BEEF',
    image: 'https://images.unsplash.com/photo-1762631934669-7da9e3100add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBiZWVmJTIwYnVyZ2VyJTIwY2xvc2V8ZW58MXx8fHwxNzY5NjU3MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 12.99,
    description: 'Premium angus beef with signature crunch sauce',
    ingredients: ['Angus Beef', 'Lettuce', 'Tomato', 'Crunch Sauce', 'Brioche Bun'],
    spiceLevel: 1
  },
  {
    id: 2,
    name: 'ZINGER BLAST',
    category: 'ZINGERS',
    image: 'https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzY5NjU3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 10.99,
    description: 'Crispy fried chicken with fiery seasoning',
    ingredients: ['Fried Chicken', 'Spicy Mayo', 'Pickles', 'Coleslaw', 'Sesame Bun'],
    spiceLevel: 3
  },
  {
    id: 3,
    name: 'FILLET DELUXE',
    category: 'FILLETS',
    image: 'https://images.unsplash.com/photo-1643111998354-07e7a780c92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwZmlsbGV0JTIwYnVyZ2VyJTIwZGVsaWNpb3VzfGVufDF8fHx8MTc2OTY1NzM1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 11.99,
    description: 'Tender grilled chicken fillet with herbs',
    ingredients: ['Grilled Fillet', 'Lettuce', 'Cheese', 'Ranch', 'Wheat Bun'],
    spiceLevel: 1
  },
  {
    id: 4,
    name: 'PATTY MELT',
    category: 'PATTY',
    image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwcGF0dHklMjBidXJnZXIlMjBnb3VybWV0fGVufDF8fHx8MTc2OTY1NzM1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 9.99,
    description: 'Double patty with melted cheese perfection',
    ingredients: ['Double Patty', 'Cheddar', 'Onions', 'Mustard', 'Potato Bun'],
    spiceLevel: 1
  },
  {
    id: 5,
    name: 'EGGY SUNRISE',
    category: 'EGGY',
    image: 'https://images.unsplash.com/photo-1559962954-b92f15ab1b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2clMjBidXJnZXIlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzY5NjU3MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 8.99,
    description: 'Breakfast burger with fried egg and bacon',
    ingredients: ['Fried Egg', 'Bacon', 'Cheese', 'Hash Brown', 'English Muffin'],
    spiceLevel: 0
  }
];

const fries: MenuItem[] = [
  {
    id: 6,
    name: 'CLASSIC FRIES',
    category: 'FRIES',
    image: 'https://images.unsplash.com/photo-1717294978892-cef673e1d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3Njk2NTczNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 4.99,
    description: 'Golden crispy perfection',
    spiceLevel: 0
  },
  {
    id: 7,
    name: 'CHEESE FRIES',
    category: 'FRIES',
    image: 'https://images.unsplash.com/photo-1639744210631-209fce3e256c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBmcmllcyUyMGxvYWRlZHxlbnwxfHx8fDE3Njk2NTczNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 6.99,
    description: 'Loaded with melted cheese',
    spiceLevel: 0
  },
  {
    id: 8,
    name: 'SPICY FRIES',
    category: 'FRIES',
    image: 'https://images.unsplash.com/photo-1625940951329-4e8d09f87692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGZyaWVzJTIwaG90fGVufDF8fHx8MTc2OTY1NzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 5.99,
    description: 'Hot and spicy seasoning',
    spiceLevel: 3
  },
  {
    id: 9,
    name: 'GARLIC PARMESAN',
    category: 'FRIES',
    image: 'https://images.unsplash.com/photo-1693940746421-3ff9801d6865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBwYXJtZXNhbiUyMGZyaWVzfGVufDF8fHx8MTc2OTY1NzM1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 6.99,
    description: 'Garlic butter and parmesan',
    spiceLevel: 0
  },
  {
    id: 10,
    name: 'BACON FRIES',
    category: 'FRIES',
    image: 'https://images.unsplash.com/photo-1728691190487-92b12a0efc6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNvbiUyMGZyaWVzJTIwbG9hZGVkfGVufDF8fHx8MTc2OTY1NzM1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 7.99,
    description: 'Topped with crispy bacon bits',
    spiceLevel: 0
  }
];

const rolls: MenuItem[] = [
  {
    id: 11,
    name: 'CHICKEN WRAP',
    category: 'ROLLS',
    image: 'https://images.unsplash.com/photo-1621334954920-9fc5f5490401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd3JhcCUyMHJvbGx8ZW58MXx8fHwxNzY5NjU3MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 8.99,
    description: 'Grilled chicken in a soft tortilla',
    spiceLevel: 1
  },
  {
    id: 12,
    name: 'REFRESHMENTS',
    category: 'BEVERAGES',
    image: 'https://images.unsplash.com/photo-1685270386242-487b9e1c9fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZyZXNoaW5nJTIwYmV2ZXJhZ2VzJTIwZHJpbmtzfGVufDF8fHx8MTc2OTY1NzM1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 2.99,
    description: 'Ice cold beverages',
    spiceLevel: 0
  }
];

const secretMenu: MenuItem[] = [
  {
    id: 99,
    name: 'THE INFERNO',
    category: 'SECRET',
    image: 'https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmllZCUyMGNoaWNrZW4lMjBidXJnZXJ8ZW58MXx8fHwxNzY5NjU3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 15.99,
    description: 'Triple patty with ghost pepper sauce - ARE YOU BRAVE ENOUGH?',
    ingredients: ['Triple Beef', 'Ghost Pepper Sauce', 'Jalapeños', 'Habanero', 'Dare Bun'],
    spiceLevel: 5,
    isSecret: true
  }
];

export function MenuShowcase({ isDark, konamiActivated }: MenuShowcaseProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [activeTab, setActiveTab] = useState<'burgers' | 'fries' | 'more'>('burgers');
  const { addToCart } = useCart();

  const allItems = konamiActivated 
    ? [...burgers, ...fries, ...rolls, ...secretMenu]
    : [...burgers, ...fries, ...rolls];

  const displayItems = activeTab === 'burgers' 
    ? konamiActivated ? [...burgers, ...secretMenu] : burgers
    : activeTab === 'fries' 
    ? fries 
    : rolls;

  return (
    <section className={`py-20 px-6 relative ${isDark ? 'text-white' : 'text-neutral-900'}`}>
      <div className="max-w-7xl mx-auto">
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
              OUR MENU
            </span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/70' : 'text-neutral-700'}`}>
            Crafted with passion, served with crunch
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(['burgers', 'fries', 'more'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white scale-105 shadow-xl'
                  : isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-black/10 text-neutral-900 hover:bg-black/20'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Konami Secret Menu Badge */}
        <AnimatePresence>
          {konamiActivated && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-block bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl">
                🔓 SECRET MENU UNLOCKED!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              onClick={() => setSelectedItem(item)}
              className={`group cursor-pointer relative rounded-3xl overflow-hidden backdrop-blur-xl border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#FFD700]/50'
                  : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-[#FFD700]/50'
              } ${item.isSecret ? 'ring-2 ring-[#FFD700] animate-pulse-slow' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Secret Badge */}
                {item.isSecret && (
                  <div className="absolute top-4 right-4 bg-[#FFD700] text-black px-3 py-1 rounded-full text-xs font-black">
                    SECRET
                  </div>
                )}

                {/* Crunch Meter */}
                {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                  <div className="absolute top-4 left-4 flex gap-1">
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-black mb-2">{item.name}</h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full text-sm font-bold hover:shadow-xl transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                className={`w-full max-w-2xl rounded-3xl overflow-hidden backdrop-blur-xl border pointer-events-auto ${
                  isDark ? 'bg-neutral-900/90 border-white/20' : 'bg-white/90 border-black/20'
                }`}
              >
                <div className="relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-80 object-cover"
                  />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-4xl font-black mb-2">{selectedItem.name}</h3>
                      <p className={isDark ? 'text-white/60' : 'text-neutral-600'}>
                        {selectedItem.description}
                      </p>
                    </div>
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                      ${selectedItem.price.toFixed(2)}
                    </span>
                  </div>

                  {selectedItem.ingredients && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-lg">Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.ingredients.map((ingredient, i) => (
                          <span
                            key={i}
                            className={`px-4 py-2 rounded-full text-sm ${
                              isDark ? 'bg-white/10' : 'bg-black/10'
                            }`}
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.spiceLevel !== undefined && selectedItem.spiceLevel > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-2 text-lg">Crunch Meter:</h4>
                      <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Flame
                            key={i}
                            className={`w-6 h-6 ${
                              i < selectedItem.spiceLevel!
                                ? 'text-[#FFD700] fill-[#FFD700]'
                                : isDark ? 'text-white/20' : 'text-black/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="w-full py-4 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all"
                    onClick={() => addToCart(selectedItem)}
                  >
                    Add to Cart - ${selectedItem.price.toFixed(2)}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}