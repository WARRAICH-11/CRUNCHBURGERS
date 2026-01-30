import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`fixed top-8 right-8 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center backdrop-blur-xl border transition-all ${
        isDark
          ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          : 'bg-black/10 border-black/20 text-neutral-900 hover:bg-black/20'
      }`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </motion.div>
    </motion.button>
  );
}
