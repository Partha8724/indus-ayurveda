import { useState } from 'react';
import { useThemeSettings } from '../context/ThemeContext';
import { Settings, Eye, EyeOff, Sliders, Palette, RefreshCw, ChevronDown, ChevronUp, Check, X, FileImage, Type, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ShopifyCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { settings, updateSetting, resetSettings } = useThemeSettings();

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const imagePresets = [
    { name: 'Pure Botanicals', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000' },
    { name: 'Sacred Ayurvedic', url: 'https://images.unsplash.com/photo-1611079830811-865ff1446455?auto=format&fit=crop&q=80&w=2000' },
    { name: 'Nature Laboratory', url: 'https://images.unsplash.com/photo-1542841791-172776c52aef?auto=format&fit=crop&q=80&w=2000' },
  ];

  return (
    <>
      {/* Floating Badge representing Shopify Theme Customizer */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#2d5c43] text-white px-5 py-3.5 shadow-xl hover:bg-[#204230] transition-colors font-sans text-sm font-semibold uppercase tracking-wider group"
          id="shopify-customizer-trigger"
        >
          <Settings size={18} className="animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
          <span>Shopify Customizer</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-[1000]"
            />

            {/* Configurator Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#1a1d1c] text-white shadow-2xl z-[1001] flex flex-col font-sans border-l border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#121414]">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-widest font-bold mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    Online Store 2.0 Editor
                  </div>
                  <h3 className="text-xl font-bold font-serif text-white tracking-wide">Indus Theme Editor</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={resetSettings}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    title="Reset to Theme Defaults"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Drawer Description */}
              <div className="bg-[#242928] p-4 text-xs text-gray-300 font-light border-b border-white/5 leading-relaxed flex gap-2.5">
                <Sliders size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  Experience live customization modeling of liquid settings schema fields directly. Select sections, adjust text, images, spacing, and accent colors to see immediate high-end responsiveness.
                </p>
              </div>

              {/* Sections Customization Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {/* 1. Global Settings */}
                <div className="border border-white/10 bg-[#121414]/60 overflow-hidden">
                  <button
                    onClick={() => toggleSection('global')}
                    className="w-full flex items-center justify-between p-4 bg-[#121414] hover:bg-white/5 transition-colors text-sm font-semibold uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <Palette size={16} className="text-luxury-gold" />
                      Global Styling & Palette
                    </span>
                    {activeSection === 'global' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  {activeSection === 'global' && (
                    <div className="p-4 space-y-4 border-t border-white/10 text-xs">
                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Theme Accent / Brand Gold Brand Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={settings.accentColor} 
                            onChange={(e) => updateSetting('accentColor', e.target.value)}
                            className="bg-transparent border-0 w-8 h-8 cursor-pointer rounded overflow-hidden"
                          />
                          <span className="font-mono text-sm uppercase text-gray-200">{settings.accentColor}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Store Background Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input 
                            type="color" 
                            value={settings.bgColor} 
                            onChange={(e) => updateSetting('bgColor', e.target.value)}
                            className="bg-transparent border-0 w-8 h-8 cursor-pointer rounded overflow-hidden"
                          />
                          <span className="font-mono text-sm uppercase text-gray-200">{settings.bgColor}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Headings Font Family Pairing
                        </label>
                        <select
                          value={settings.fontFamilyHead}
                          onChange={(e) => updateSetting('fontFamilyHead', e.target.value as any)}
                          className="w-full bg-[#1e2221] border border-white/10 text-xs rounded p-2.5 text-white focus:outline-none focus:border-luxury-gold"
                        >
                          <option value="serif">Playfair Serif Elegant</option>
                          <option value="sans">Space Grotesk Technical</option>
                          <option value="mono">JetBrains Mono Minimalist</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Hero Section */}
                <div className="border border-white/10 bg-[#121414]/60 overflow-hidden">
                  <header 
                    onClick={() => toggleSection('hero')}
                    className="w-full flex items-center justify-between p-4 bg-[#121414] hover:bg-white/5 cursor-pointer transition-colors text-sm font-semibold uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <FileImage size={16} className="text-luxury-gold" />
                      Hero Cover Banner
                    </span>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => updateSetting('heroVisible', !settings.heroVisible)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {settings.heroVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      {activeSection === 'hero' ? <ChevronUp size={16} className="cursor-pointer" onClick={() => toggleSection('hero')} /> : <ChevronDown className="cursor-pointer" size={16} onClick={() => toggleSection('hero')} />}
                    </div>
                  </header>

                  {activeSection === 'hero' && (
                    <div className="p-4 space-y-4 border-t border-white/10 text-xs">
                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Main Header Title Text
                        </label>
                        <input
                          type="text"
                          value={settings.heroHeading}
                          onChange={(e) => updateSetting('heroHeading', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Subtitle Paragraph
                        </label>
                        <textarea
                          rows={3}
                          value={settings.heroSubtitle}
                          onChange={(e) => updateSetting('heroSubtitle', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white focus:outline-none focus:border-luxury-gold font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                            Primary Button CTA
                          </label>
                          <input
                            type="text"
                            value={settings.heroBtnText}
                            onChange={(e) => updateSetting('heroBtnText', e.target.value)}
                            className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white focus:outline-none focus:border-luxury-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                            Secondary Button CTA
                          </label>
                          <input
                            type="text"
                            value={settings.heroBtnText2}
                            onChange={(e) => updateSetting('heroBtnText2', e.target.value)}
                            className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white focus:outline-none focus:border-luxury-gold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Background Banner Image Preset (Simulated File Upload)
                        </label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {imagePresets.map((preset) => (
                            <button
                              key={preset.name}
                              onClick={() => updateSetting('heroImgUrl', preset.url)}
                              className={`p-2 border text-[10px] uppercase font-bold text-center tracking-wider bg-transparent transition-all ${
                                settings.heroImgUrl === preset.url 
                                  ? 'border-luxury-gold text-white bg-white/5' 
                                  : 'border-white/10 text-gray-400 hover:border-white/30'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Featured Collection */}
                <div className="border border-white/10 bg-[#121414]/60 overflow-hidden">
                  <header 
                    onClick={() => toggleSection('fc')}
                    className="w-full flex items-center justify-between p-4 bg-[#121414] hover:bg-white/5 cursor-pointer transition-colors text-sm font-semibold uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <IndianRupee size={16} className="text-luxury-gold" />
                      Featured Collection grid
                    </span>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => updateSetting('fcVisible', !settings.fcVisible)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {settings.fcVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      {activeSection === 'fc' ? <ChevronUp size={16} className="cursor-pointer" onClick={() => toggleSection('fc')} /> : <ChevronDown className="cursor-pointer" size={16} onClick={() => toggleSection('fc')} />}
                    </div>
                  </header>

                  {activeSection === 'fc' && (
                    <div className="p-4 space-y-4 border-t border-white/10 text-xs">
                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Collection Title Text
                        </label>
                        <input
                          type="text"
                          value={settings.fcHeading}
                          onChange={(e) => updateSetting('fcHeading', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Collection Subtitle text
                        </label>
                        <textarea
                          rows={2}
                          value={settings.fcSub}
                          onChange={(e) => updateSetting('fcSub', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                            Columns on Desktop
                          </label>
                          <select
                            value={settings.fcCols}
                            onChange={(e) => updateSetting('fcCols', parseInt(e.target.value) as any)}
                            className="w-full bg-[#1e2221] border border-white/10 text-xs rounded p-2 text-white focus:outline-none"
                          >
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                            Show Status Badges
                          </label>
                          <button
                            onClick={() => updateSetting('fcShowBadges', !settings.fcShowBadges)}
                            className={`w-full p-2 border font-bold text-[10px] tracking-wider transition-colors ${
                              settings.fcShowBadges 
                                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                                : 'border-white/10 text-gray-400'
                            }`}
                          >
                            {settings.fcShowBadges ? 'ENABLED' : 'DISABLED'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Brand Story Section */}
                <div className="border border-white/10 bg-[#121414]/60 overflow-hidden">
                  <header 
                    onClick={() => toggleSection('story')}
                    className="w-full flex items-center justify-between p-4 bg-[#121414] hover:bg-white/5 cursor-pointer transition-colors text-sm font-semibold uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <Type size={16} className="text-luxury-gold" />
                      Brand Story & Heritage
                    </span>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => updateSetting('storyVisible', !settings.storyVisible)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {settings.storyVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      {activeSection === 'story' ? <ChevronUp size={16} className="cursor-pointer" onClick={() => toggleSection('story')} /> : <ChevronDown className="cursor-pointer" size={16} onClick={() => toggleSection('story')} />}
                    </div>
                  </header>

                  {activeSection === 'story' && (
                    <div className="p-4 space-y-4 border-t border-white/10 text-xs">
                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Pre-Heading Tag line
                        </label>
                        <input
                          type="text"
                          value={settings.storyTag}
                          onChange={(e) => updateSetting('storyTag', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Story Main Title
                        </label>
                        <input
                          type="text"
                          value={settings.storyHeading}
                          onChange={(e) => updateSetting('storyHeading', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Story Paragraph 1
                        </label>
                        <textarea
                          rows={3}
                          value={settings.storyP1}
                          onChange={(e) => updateSetting('storyP1', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white font-sans text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          Story Paragraph 2
                        </label>
                        <textarea
                          rows={3}
                          value={settings.storyP2}
                          onChange={(e) => updateSetting('storyP2', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white font-sans text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                          CTA Button Text
                        </label>
                        <input
                          type="text"
                          value={settings.storyBtnText}
                          onChange={(e) => updateSetting('storyBtnText', e.target.value)}
                          className="w-full bg-[#1e2221] border border-white/10 rounded p-2 text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 bg-[#121414] border-t border-white/10 text-center text-xs text-gray-400 font-light flex items-center justify-between">
                <span>Shopify Online Store 2.0 Engine Sim</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-5 rounded text-[10px] uppercase tracking-wider transition-colors"
                >
                  Apply Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
