import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface NavigationProps {
  isDark: boolean;
}

export function Navigation({ isDark }: NavigationProps) {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const totalItems = getTotalItems();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/locations', label: 'Locations' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b ${
        isDark ? 'bg-black/30 border-white/10' : 'bg-white/30 border-black/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-black">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]">
                CRUNCH
              </span>
              <span className={isDark ? 'text-white' : 'text-neutral-900'}> BURGERS</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-bold transition-all ${
                  location.pathname === link.path
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]'
                    : isDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/cart"
              className={`relative p-2 rounded-full transition-all ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
              }`}
            >
              <ShoppingCart className={`w-6 h-6 ${isDark ? 'text-white' : 'text-neutral-900'}`} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#8B0000] to-[#FFD700] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full ${isDark ? 'text-white' : 'text-neutral-900'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 font-bold ${
                  location.pathname === link.path
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FFD700]'
                    : isDark
                    ? 'text-white/70'
                    : 'text-neutral-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 py-2 font-bold ${
                isDark ? 'text-white/70' : 'text-neutral-700'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
