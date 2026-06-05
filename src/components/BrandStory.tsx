import { motion } from 'motion/react';
import { useThemeSettings } from '../context/ThemeContext';

export default function BrandStory() {
  const { settings } = useThemeSettings();

  if (!settings.storyVisible) return null;

  const fontClass = settings.fontFamilyHead === 'sans' 
    ? 'font-sans font-bold uppercase tracking-wider' 
    : settings.fontFamilyHead === 'mono' 
    ? 'font-mono uppercase tracking-wide' 
    : 'font-serif';

  return (
    <section className="relative py-32 overflow-hidden bg-luxury-black" style={{ backgroundColor: settings.bgColor }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Images Grid */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] w-4/5 overflow-hidden ml-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1542841791-172776c52aef?auto=format&fit=crop&q=80&w=1000" 
                alt="Natural Ingredients" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-[-10%] left-0 w-3/5 aspect-square border-[8px] border-luxury-black overflow-hidden"
              style={{ borderColor: settings.bgColor }}
            >
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1000" 
                alt="Holistic Wellness" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:pl-12 lg:mt-0 mt-16">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-luxury-gold uppercase tracking-[0.2em] text-sm mb-6 font-medium"
              style={{ color: settings.accentColor }}
            >
              {settings.storyTag}
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl text-white leading-tight mb-8 ${fontClass}`}
            >
              {settings.storyHeading}
            </motion.h2>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="space-y-6 text-gray-400 font-light text-lg"
            >
              <p>
                {settings.storyP1}
              </p>
              <p>
                {settings.storyP2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 select-none"
            >
              {settings.storyBtnText && (
                <button className="border border-white/30 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-black transition-colors">
                  {settings.storyBtnText}
                </button>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
