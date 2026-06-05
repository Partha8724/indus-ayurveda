import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, User, Menu, X, ChevronRight, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import CartDrawer from './CartDrawer';
import Logo from './Logo';
import { useThemeSettings } from '../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const { cartItems, isCartOpen, setIsCartOpen, wishlistItems, setIsAccountOpen } = useThemeSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || megaMenuOpen ? 'bg-luxury-black/95 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-6'
        }`}
        onMouseLeave={() => setMegaMenuOpen(null)}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none md:text-left flex justify-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-bold text-gray-300 h-full items-center">
            {['Supplements', 'Skincare', 'Nutrition', 'Cleanses'].map((item) => (
              <div 
                key={item}
                className="relative h-full flex items-center py-2 cursor-pointer group"
                onMouseEnter={() => setMegaMenuOpen(item)}
              >
                <span className={`transition-colors duration-300 ${megaMenuOpen === item ? 'text-luxury-gold' : 'hover:text-white'}`}>
                  {item}
                </span>
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-luxury-gold transform origin-left transition-transform duration-300 ${megaMenuOpen === item ? 'scale-x-100' : 'scale-x-0'}`} />
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex gap-4 md:gap-6 text-white items-center">
            <button className="hover:text-luxury-gold transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button 
              className="hidden md:block hover:text-luxury-gold transition-colors"
              onClick={() => setIsAccountOpen(true)}
              title="Customer Account & Order History"
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            {/* Wishlist Icon */}
            <button className="relative hover:text-luxury-gold transition-colors">
              <Heart size={20} strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button 
              className="hover:text-luxury-gold transition-colors relative pointer-events-auto"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-luxury-gold text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-luxury-black/95 backdrop-blur-xl border-b border-white/10 hidden md:block"
            >
              <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <h3 className="text-luxury-gold uppercase tracking-widest text-xs font-bold mb-6">Collections</h3>
                  <ul className="space-y-4 text-sm text-gray-300 font-light">
                    <li><a href="#" className="hover:text-white transition-colors flex items-center group">Best Sellers <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all" /></a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center group">New Arrivals <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all" /></a></li>
                    <li><a href="#" className="hover:text-white transition-colors flex items-center group">Limited Editions <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all" /></a></li>
                  </ul>
                </div>
                <div className="col-span-1">
                  <h3 className="text-luxury-gold uppercase tracking-widest text-xs font-bold mb-6">Categories</h3>
                  <ul className="space-y-4 text-sm text-gray-300 font-light">
                    <li><a href="#" className="hover:text-white transition-colors">Daily Core</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Immunity</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Longevity</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Recovery</a></li>
                  </ul>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="relative aspect-video bg-gray-900 overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1611077544026-6466f2723385?auto=format&fit=crop&q=80&w=800" alt="Promo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-xs uppercase tracking-widest font-bold text-white mb-1">Featured</p>
                      <p className="font-serif text-lg text-white">The Longevity Protocol</p>
                    </div>
                  </div>
                  <div className="relative aspect-video bg-gray-900 overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Promo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-xs uppercase tracking-widest font-bold text-white mb-1">Discover</p>
                      <p className="font-serif text-lg text-white">Cellular Rejuvenation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer Component */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-luxury-black/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <Logo size="sm" />
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-luxury-gold transition-colors">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-2xl font-serif tracking-wider">
              <a href="#" className="hover:text-luxury-gold transition-colors">New Arrivals</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Collections</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Accessories</a>
              <a href="#" className="hover:text-luxury-gold transition-colors">Boutiques</a>
            </div>
            
            <div className="mt-auto flex flex-col gap-6 text-sm uppercase tracking-widest text-gray-400">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="text-left hover:text-white transition-colors text-xs font-bold font-sans tracking-widest"
              >
                Account & Order History
              </button>
              <a href="#">Customer Service</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
