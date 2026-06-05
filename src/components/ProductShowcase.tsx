import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, MouseEvent } from 'react';
import { Plus, Minus, Check, Star, ShieldCheck, Truck, RefreshCw, Zap, Award } from 'lucide-react';
import { useThemeSettings } from '../context/ThemeContext';
import { products } from '../data';

const tabs = [
  {
    id: 'details',
    title: 'Product Benefits & Legacy',
    content: 'Formulated following ancient Ayurvedic scriptures (Sadhana) fused with state-of-the-art extraction science. Our cellular-active capsule protocol acts naturally to balance your foundational doshas, synthesize cellular energy, and amplify systemic resilience.'
  },
  {
    id: 'materials',
    title: 'Ingredients & Science',
    content: 'Contains pure cold-pressed Ashwagandha root extract, organic Turmeric curcuminoids, high-mountain Himalayan Shilajit, and organic black pepper piperine for maximum biological bioavailability. Gluten-free, non-GMO, and tested for absolute heavy-metal purity.'
  },
  {
    id: 'shipping',
    title: 'Rigorous Efficacy Promise',
    content: 'We adhere to uncompromising quality. If you do not sense a profound elevation of energy and cognitive focus within 30 days, simply contact our concierge team. We will refund your investment immediately, with zero friction.'
  }
];

export default function ProductShowcase() {
  const { settings, addToCart } = useThemeSettings();
  const [activeTab, setActiveTab] = useState<string | null>('details');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  // Gallery state
  const images = [
    'https://images.unsplash.com/photo-1594042898038-04f12f913d8a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1629851602715-ddca935e4eeb?auto=format&fit=crop&q=80&w=1200'
  ];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Variant state
  const [deliveryPlan, setDeliveryPlan] = useState<'once' | 'subscribe'>('once');

  // Zoom state
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
  const galleryRef = useRef<HTMLDivElement>(null);

  if (!settings.showcaseVisible) return null;

  const fontClass = settings.fontFamilyHead === 'sans' 
    ? 'font-sans font-bold uppercase tracking-wider' 
    : settings.fontFamilyHead === 'mono' 
    ? 'font-mono uppercase tracking-wide' 
    : 'font-serif';

  const toggleTab = (id: string) => {
    setActiveTab(activeTab === id ? null : id);
  };

  // Pricing calculations
  const originalPrice = settings.showcasePrice;
  const activePrice = deliveryPlan === 'subscribe' ? originalPrice * 0.85 : originalPrice;

  const handleAddToCart = () => {
    setAdded(true);
    addToCart({
      id: 'showcase-vitality',
      title: settings.showcaseHeading,
      price: activePrice,
      image: images[0],
      variant: deliveryPlan === 'subscribe' ? 'Subscribe & Save (15%)' : 'One-time Purchase'
    }, quantity);
    setTimeout(() => setAdded(false), 2000);
  };

  // Interactive Zoom feature
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    const { left, top, width, height } = galleryRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  // Find supplementary master list products for FBT (Frequently Bought Together)
  const complementaryProducts = products.filter(
    (p) => p.title !== 'The Vitality Core Caps' && p.title !== 'Cellular Renewal Complex'
  );

  return (
    <section className="py-24 bg-white text-luxury-black font-sans relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Gallery Module - takes 7/12 cols on desktop */}
          <div className="lg:col-span-7 space-y-4">
            {/* Spotlight Image with mouse-coords zoom tracking */}
            <div 
              ref={galleryRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="aspect-square bg-[#faf9f6] border border-gray-100 overflow-hidden relative cursor-zoom-in"
              id="product-gallery-view"
            >
              <img 
                src={images[activeImgIndex]} 
                alt="Product Premium Close-up" 
                className="w-full h-full object-cover select-none transition-all duration-300 pointer-events-none"
              />
              
              {/* Zoom lens overlay container */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
                style={{
                  ...zoomStyle,
                  backgroundImage: `url(${images[activeImgIndex]})`,
                  backgroundSize: '220%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>

            {/* Carousel Thumbnails */}
            <div className="grid grid-cols-3 gap-4" id="gallery-carousel-indicators">
               {images.map((img, index) => (
                 <button
                   key={index}
                   onClick={() => setActiveImgIndex(index)}
                   className={`aspect-square bg-[#faf9f6] border overflow-hidden transition-all duration-300 relative ${
                     activeImgIndex === index 
                       ? 'border-black ring-1 ring-black scale-[0.98]' 
                       : 'border-gray-100 opacity-70 hover:opacity-100'
                   }`}
                 >
                   <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* Product Detail Form Module - takes 5/12 cols on desktop */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Reviews social justification */}
            <div className="flex items-center gap-1.5 mb-3 text-luxury-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" stroke="none" />
              ))}
              <span className="text-xs text-gray-500 font-medium tracking-wide ml-1">4.9 (182 Verified Reviews)</span>
            </div>

            <p className="text-luxury-gold uppercase tracking-[0.2em] text-xs font-bold mb-3" style={{ color: settings.accentColor }}>
              {settings.showcaseBadge}
            </p>
            
            <h1 className={`text-3xl md:text-4xl mb-4 text-black leading-tight ${fontClass}`}>
              {settings.showcaseHeading}
            </h1>

            {/* Dynamic Price Selector */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-serif text-black">
                ₹{activePrice.toLocaleString()}
              </span>
              {deliveryPlan === 'subscribe' && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-red-600 uppercase font-bold tracking-wider bg-red-50 px-2 py-0.5">
                    Save 15%
                  </span>
                </>
              )}
              <span className="text-xs text-gray-400 ml-1">/ 60 Soft-Capsules</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-7 leading-relaxed font-light">
              {settings.showcaseDescription}
            </p>

            {/* Variant / Plan selection */}
            <div className="mb-6">
              <span className="block text-xs uppercase tracking-widest text-black font-bold mb-3">
                Choose Delivery Protocol
              </span>
              <div className="space-y-2">
                {/* One time */}
                <button 
                  onClick={() => setDeliveryPlan('once')}
                  className={`w-full p-4 border text-left transition-all flex justify-between items-center ${
                    deliveryPlan === 'once' 
                      ? 'border-black bg-black/5' 
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-black">One-time Formulation</span>
                    <span className="text-xs font-light text-gray-500">Ships today. Instant single dispatch.</span>
                  </div>
                  <span className="text-sm font-semibold text-black">₹{originalPrice.toLocaleString()}</span>
                </button>

                {/* Subscription */}
                <button 
                  onClick={() => setDeliveryPlan('subscribe')}
                  className={`w-full p-4 border text-left transition-all flex justify-between items-center ${
                    deliveryPlan === 'subscribe' 
                      ? 'border-black bg-black/5 font-semibold' 
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                      Subscribe & Save 15% <Zap size={10} className="fill-luxury-gold stroke-none" />
                    </span>
                    <span className="text-xs font-light text-gray-500">Automatic priority delivery, cancel anytime.</span>
                  </div>
                  <span className="text-sm font-semibold text-black">₹{(originalPrice * 0.85).toLocaleString()}</span>
                </button>
              </div>

              {/* Dynamic Delivery Info Badge */}
              <div className="mt-3.5 flex items-center gap-2 bg-[#fbfbf9] p-3 border border-gray-100 text-xs text-gray-600">
                <Truck size={14} className="text-gray-400 flex-shrink-0" />
                <span>
                  {deliveryPlan === 'subscribe' 
                    ? "Dispatch schedule: Enters priority queue. Arrives every 30 days." 
                    : "Dispatch schedule: Standard courier dispatch within 24 hours."}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Action */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center border border-gray-300 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 h-12 flex items-center justify-center text-xs font-mono text-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white hover:bg-luxury-charcoal transition-all uppercase tracking-widest text-[11px] font-bold flex items-center justify-center gap-2"
                id="add-to-cart-showcase"
              >
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check size={16} /> ADDING TO RITUAL
                  </span>
                ) : (
                  <span>ADD TO CART</span>
                )}
              </button>
            </div>

            {/* Trust and security hallmarks */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-gray-100 pt-6 pb-6 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Lab certified purity</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-luxury-gold" style={{ color: settings.accentColor }} />
                <span>Ayurvedic Standard Gold</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-gray-400" />
                <span>30-Day Bliss Promise</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-amber-500" />
                <span>Biological Vitality</span>
              </div>
            </div>

            {/* Frequently Bought Together (FBT) Micro Bundle Module */}
            {complementaryProducts.length > 0 && (
              <div className="bg-[#faf9f6] p-4 border border-gray-100 mb-8 rounded-sm">
                <p className="text-[10px] uppercase tracking-widest font-extrabold text-black mb-3">
                  FREQUENTLY BOUGHT TOGETHER (SAVE SHIPPING)
                </p>
                <div className="space-y-3.5">
                  {complementaryProducts.slice(0, 2).map((prod) => (
                    <div key={prod.id} className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-white flex-shrink-0 border border-gray-100 overflow-hidden">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-xs text-black">{prod.title}</p>
                          <p className="text-[10px] text-gray-500">₹{prod.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart({
                          id: prod.id,
                          title: prod.title,
                          price: prod.price,
                          image: prod.image,
                          variant: 'One-time Purchase'
                        }, 1)}
                        className="text-[9px] font-bold uppercase tracking-wider text-black border border-black hover:bg-black hover:text-white px-2.5 py-1.5 transition-colors font-sans"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Details Accordion */}
            <div className="border-t border-gray-200">
              {tabs.map((tab) => (
                <div key={tab.id} className="border-b border-gray-200">
                  <header 
                    onClick={() => toggleTab(tab.id)}
                    className="w-full py-5 flex justify-between items-center text-left cursor-pointer select-none"
                  >
                    <span className="uppercase tracking-widest text-xs font-bold text-black">{tab.title}</span>
                    <span className="text-gray-400">
                      {activeTab === tab.id ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </header>
                  <AnimatePresence>
                    {activeTab === tab.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-gray-600 font-light leading-relaxed text-xs">
                          {tab.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
