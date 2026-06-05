/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import BrandStory from './components/BrandStory';
import ProductShowcase from './components/ProductShowcase';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ShopifyCustomizer from './components/ShopifyCustomizer';
import CheckoutPortal from './components/CheckoutPortal';
import AccountPortal from './components/AccountPortal';
import { ThemeProvider, useThemeSettings } from './context/ThemeContext';
import { motion } from 'motion/react';

function AppContent() {
  const { settings } = useThemeSettings();

  // Handle dynamic font family based on customizer
  const fontClass = settings.fontFamilyHead === 'sans' 
    ? 'font-sans font-bold uppercase tracking-wider' 
    : settings.fontFamilyHead === 'mono' 
    ? 'font-mono uppercase tracking-wide' 
    : 'font-serif';

  return (
    <div 
      className="min-h-screen bg-luxury-black text-white w-full overflow-x-hidden selection:bg-luxury-gold selection:text-black font-sans"
      style={{ backgroundColor: settings.bgColor }}
    >
      <CustomCursor />
      <ShopifyCustomizer />
      <Navbar />
      <CheckoutPortal />
      <AccountPortal />
      <main>
        {settings.heroVisible && <Hero />}
        {settings.fcVisible && <FeaturedCollection />}
        
        {settings.diveVisible && (
          <div className="bg-white text-black border-t border-white/20">
            {/* Apple/Prada inspired clean product deep dive */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="py-16 md:py-32 text-center max-w-4xl mx-auto px-6"
            >
              <p className="uppercase tracking-[0.3em] text-xs font-bold text-gray-500 mb-6" style={{ color: settings.accentColor }}>
                {settings.diveSubtitle}
              </p>
              <h2 className={`text-4xl md:text-6xl mb-8 ${fontClass}`}>
                {settings.diveHeading}
              </h2>
              <p className="text-gray-600 font-light text-xl leading-relaxed">
                {settings.diveText}
              </p>
            </motion.div>
            <ProductShowcase />
          </div>
        )}
        
        {settings.storyVisible && <BrandStory />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
