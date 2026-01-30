import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Hi! I want to place an order at CRUNCH BURGERS 🍔');
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-[#25D366]/50 transition-all"
      title="Order via WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-50"
      />
    </motion.button>
  );
}
