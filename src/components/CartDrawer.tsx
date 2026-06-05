import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useThemeSettings } from '../context/ThemeContext';
import { products } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    addToCart, 
    settings,
    setIsCheckoutOpen
  } = useThemeSettings();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Dynamic products available for cross-sell (not currently in cart)
  const upsellProducts = products.filter(
    (prod) => !cartItems.some((item) => item.id === prod.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with elegant blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            id="cart-drawer-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0c0c0c] text-white z-[70] flex flex-col shadow-2xl border-l border-white/10"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#121414]">
              <h2 className="text-lg font-serif flex items-center gap-2.5 uppercase tracking-wider text-luxury-gold" style={{ color: settings.accentColor }}>
                <ShoppingBag size={18} strokeWidth={1.5} /> 
                <span>Your Ritual ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Dynamic Progress */}
            <div className="p-6 bg-[#161a18] border-b border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-luxury-gold animate-pulse" style={{ color: settings.accentColor }} />
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300">
                  {subtotal >= freeShippingThreshold 
                    ? "Complimentary Express Shipping Unlocked" 
                    : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} More for Free Premium Shipping`}
                </p>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFreeShipping}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-luxury-gold rounded-full"
                  style={{ backgroundColor: settings.accentColor }}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
              {cartItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <ShoppingBag size={36} strokeWidth={1} className="text-gray-600 animate-bounce" />
                  <p className="font-serif text-lg text-gray-300">Your cart is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="border-b border-luxury-gold text-luxury-gold uppercase tracking-widest text-[10px] font-bold pb-1 hover:text-white hover:border-white transition-colors"
                    style={{ color: settings.accentColor, borderColor: settings.accentColor }}
                  >
                    Examine Formulations
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.variant || 'default'}`} className="flex gap-4 group border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                      <div className="w-20 h-26 bg-[#1a1d1c]/80 overflow-hidden relative border border-white/5 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif text-base text-white tracking-wide">{item.title}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id, item.variant)}
                              className="text-gray-500 hover:text-white transition-colors p-0.5"
                              title="Remove item"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          {item.variant && (
                            <span className="inline-block mt-1 bg-white/5 text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold text-gray-400">
                              {item.variant}
                            </span>
                          )}
                          <p className="text-luxury-gold font-light text-xs mt-2" style={{ color: settings.accentColor }}>
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center border border-white/10 w-fit mt-3">
                          <button 
                            onClick={() => updateCartQuantity(item.id, -1, item.variant)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 h-7 flex items-center justify-center text-xs font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, 1, item.variant)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cross-Sell Recommendations (Complete the Ritual) */}
              {upsellProducts.length > 0 && (
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-luxury-gold mb-4" style={{ color: settings.accentColor }}>
                    Complete Your Ritual
                  </h4>
                  <div className="space-y-4">
                    {upsellProducts.slice(0, 2).map((prod) => (
                      <div key={prod.id} className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-14 h-18 bg-gray-900 overflow-hidden flex-shrink-0">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-serif text-sm text-gray-200">{prod.title}</h5>
                            <p className="text-gray-400 text-xs mt-0.5">₹{prod.price.toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => addToCart({
                              id: prod.id,
                              title: prod.title,
                              price: prod.price,
                              image: prod.image,
                              variant: 'One-time Purchase'
                            }, 1)}
                            className="text-[10px] uppercase tracking-wider font-bold text-luxury-gold hover:text-white transition-colors text-left font-sans mt-2"
                            style={{ color: settings.accentColor }}
                          >
                            + Add Formulation
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer containing Checkout details */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-[#121414]">
                <div className="flex justify-between items-center mb-4">
                  <span className="uppercase tracking-widest text-xs font-bold text-gray-400">Biological Subtotal</span>
                  <span className="font-serif text-xl text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-6 text-emerald-400/90 text-[10px] uppercase tracking-widest">
                  <AlertCircle size={12} className="flex-shrink-0" />
                  <span>Secure Checkout Guaranteed</span>
                </div>

                <p className="text-[11px] text-gray-400 mb-6 font-light leading-relaxed">
                  Taxes, customs tariffs, and delivery plan discounts are calculated at checkout. Express worldwide dispatch.
                </p>
                
                <button 
                  onClick={() => {
                    onClose();
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#eaeaea] transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
