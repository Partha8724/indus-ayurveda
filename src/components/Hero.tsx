import { motion, useScroll, useTransform } from 'motion/react';
import { useThemeSettings } from '../context/ThemeContext';

export default function Hero() {
  const { settings } = useThemeSettings();
  const { scrollY } = useScroll();
  // Map scroll value to subtle Y offset for parallax depth
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);

  // Handle dynamic font family based on customizer
  const fontClass = settings.fontFamilyHead === 'sans' 
    ? 'font-sans font-bold uppercase tracking-[0.05em]' 
    : settings.fontFamilyHead === 'mono' 
    ? 'font-mono uppercase font-medium tracking-[0.1em]' 
    : 'font-serif';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-black" style={{ backgroundColor: settings.bgColor }}>
      {/* Background Image/Video with continuous slow pan and scroll parallax */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          x: [0, -10, 0]
        }}
        transition={{ 
          duration: 30, 
          ease: 'linear',
          repeat: Infinity
        }}
        style={{
          y: yParallax
        }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src={settings.heroImgUrl}
          alt="Luxury Wellness Hero"
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-luxury-black/60" style={{ background: `linear-gradient(to top, ${settings.bgColor} 0%, rgba(12,12,12,0.3) 30%, ${settings.bgColor} 100%)` }}></div>
      </motion.div>

      {/* Grid Pattern Overlay for technical luxury feel */}
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxhcmNoIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMCAwdjQwaDQwVjBIMHoiLz4KPC9zdmc+')] opacity-20 hidden md:block" />

      {/* Content */}
      <div 
        className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 md:px-12"
        style={{ 
          paddingTop: `${settings.heroPaddingTop}px`,
          paddingBottom: `${settings.heroPaddingBottom}px`
        }}
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-[1px] w-12 bg-luxury-gold" style={{ backgroundColor: settings.accentColor }}></span>
            <p className="text-luxury-gold uppercase tracking-[0.3em] text-xs font-bold" style={{ color: settings.accentColor }}>
              The Protocol 01
            </p>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 ${fontClass}`}
          >
            {settings.heroHeading}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl font-light mb-12 max-w-xl leading-relaxed"
          >
            {settings.heroSubtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 font-sans"
          >
            {settings.heroBtnText && (
              <button className="bg-white text-black px-10 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto relative group overflow-hidden">
                <span className="relative z-10">{settings.heroBtnText}</span>
                <div 
                  className="absolute inset-0 bg-luxury-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" 
                  style={{ backgroundColor: settings.accentColor }}
                />
              </button>
            )}
            {settings.heroBtnText2 && (
              <button className="border border-white/50 text-white px-10 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all w-full sm:w-auto">
                {settings.heroBtnText2}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
