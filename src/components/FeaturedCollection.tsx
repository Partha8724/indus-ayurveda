import { motion } from 'motion/react';
import { products, Product } from '../data';
import { useState } from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useThemeSettings } from '../context/ThemeContext';

function ProductCard({ product, showBadges, accentColor }: { product: Product; showBadges: boolean; accentColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useThemeSettings();

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-charcoal mb-4">
        {/* Badges */}
        {showBadges && (
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-white text-black text-[10px] uppercase tracking-widest px-2 py-1 font-bold">New</span>
            )}
            {product.isLimited && (
              <span className="text-black text-[10px] uppercase tracking-widest px-2 py-1 font-bold" style={{ backgroundColor: accentColor }}>Limited</span>
            )}
            {product.onSale && (
              <span className="bg-[#cc0000] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-bold">Sale</span>
            )}
          </div>
        )}

        {/* Wishlist Heart Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-sm transition-colors text-white"
        >
          <Heart 
            size={14} 
            fill={isWishlisted(product.id) ? accentColor : "none"} 
            stroke={isWishlisted(product.id) ? accentColor : "currentColor"} 
          />
        </button>

        {/* Image Flip Animation */}
        <motion.div 
          className="w-full h-full relative"
          initial={false}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img 
            src={product.image} 
            alt={product.title} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
          />
          <img 
            src={product.hoverImage} 
            alt={`${product.title} Alternate`} 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
        </motion.div>

        {/* Hover Actions */}
        <div className={`absolute bottom-0 left-0 w-full p-4 flex gap-2 z-20 transition-transform duration-300 transform ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                variant: 'One-time Purchase'
              }, 1);
            }}
            className="flex-1 bg-white text-black py-3 text-xs uppercase tracking-wider font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} /> Add
          </button>
          <button className="w-12 bg-luxury-black text-white py-3 flex items-center justify-center hover:text-luxury-gold transition-colors">
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="text-center md:text-left">
        <h3 className="font-serif text-lg text-white mb-2">{product.title}</h3>
        <p className="text-luxury-gold text-sm tracking-widest" style={{ color: accentColor }}>₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default function FeaturedCollection() {
  const { settings } = useThemeSettings();

  if (!settings.fcVisible) return null;

  // Render correct columnar layout dynamically
  const colClass = settings.fcCols === 2 
    ? 'lg:grid-cols-2' 
    : settings.fcCols === 3 
    ? 'lg:grid-cols-3' 
    : 'lg:grid-cols-4';

  const fontClass = settings.fontFamilyHead === 'sans' 
    ? 'font-sans font-bold uppercase tracking-wider' 
    : settings.fontFamilyHead === 'mono' 
    ? 'font-mono uppercase tracking-wide' 
    : 'font-serif';

  return (
    <section className="py-32 bg-luxury-black relative" style={{ backgroundColor: settings.bgColor }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className={`text-4xl md:text-6xl text-white mb-6 ${fontClass}`}>{settings.fcHeading}</h2>
            <p className="text-gray-400 font-light max-w-lg text-lg leading-relaxed">
              {settings.fcSub}
            </p>
          </div>
          <a 
            href="#" 
            className="uppercase tracking-[0.2em] text-xs font-bold border-b border-luxury-gold text-luxury-gold pb-2 hover:text-white hover:border-white transition-all flex items-center gap-4 group"
            style={{ color: settings.accentColor, borderColor: settings.accentColor }}
          >
            View Protocol <span className="group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${colClass} gap-x-8 gap-y-16`}>
          {products.slice(0, settings.fcProductCount).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} showBadges={settings.fcShowBadges} accentColor={settings.accentColor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
