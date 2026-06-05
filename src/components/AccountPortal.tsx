import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Mail, MapPin, Truck, RefreshCw, Star, ShoppingBag, Eye, Copy, ArrowRight, Settings } from 'lucide-react';
import { useThemeSettings, Order } from '../context/ThemeContext';

export default function AccountPortal() {
  const { 
    orders, 
    isAccountOpen, 
    setIsAccountOpen, 
    advanceOrderStep, 
    selectedOrderForTrack, 
    setSelectedOrderForTrack, 
    settings 
  } = useThemeSettings();

  const [activeTab, setActiveTab] = useState<'history' | 'track' | 'email'>('history');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isAccountOpen) return null;

  // Find currently selected order for tracking/email
  const activeOrder = orders.find(o => o.id === (selectedOrderForTrack || orders[0]?.id));

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shippingStages = [
    { title: 'Ordered', desc: 'Secure order confirmed and received in our system.', detail: 'Simulated email validation sent.' },
    { title: 'Processing', desc: 'Sadhana extraction compounding starting in clean lab.', detail: 'Quality certificates issued.' },
    { title: 'Shipped', desc: 'Handed over to Indian premium air dispatch carrier.', detail: 'Delhivery AWN Tracked.' },
    { title: 'Out for Delivery', desc: 'Arrived at destination hub. Courier on way.', detail: 'OTP verification dispatched.' },
    { title: 'Delivered', desc: 'Successfully handed over to resident.', detail: 'Ritual initialized.' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/85 backdrop-blur-md">
        
        {/* Main Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full h-full md:h-auto md:max-h-[92vh] max-w-4xl bg-[#0c0c0c] text-white flex flex-col md:grid md:grid-cols-12 overflow-hidden border border-white/10 shadow-2xl relative"
          style={{ backgroundColor: settings.bgColor }}
          id="account-portal-container"
        >
          {/* Header Banner */}
          <div className="col-span-12 p-6 pb-4 border-b border-white/15 flex justify-between items-center bg-[#111313]">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#9ca3af]">Indian Customer Hub</span>
              <h2 className="text-xl font-serif text-luxury-gold tracking-wide uppercase mt-0.5" style={{ color: settings.accentColor }}>
                Personal Account & Bio-Rituals
              </h2>
            </div>
            <button 
              onClick={() => setIsAccountOpen(false)}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tab Navigation (Large Touch-Friendly Desktop/Mobile Responsive Menu targets) */}
          <div className="col-span-12 bg-[#141616] border-b border-white/5 flex">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 text-[10px] md:text-xs uppercase font-extrabold tracking-widest transition-all ${activeTab === 'history' ? 'bg-[#0c0c0c] text-luxury-gold border-b-2 border-luxury-gold' : 'text-gray-400 hover:text-white'}`}
              style={activeTab === 'history' ? { color: settings.accentColor, borderColor: settings.accentColor } : {}}
            >
              📜 Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-4 text-[10px] md:text-xs uppercase font-extrabold tracking-widest transition-all ${activeTab === 'track' ? 'bg-[#0c0c0c] text-luxury-gold border-b-2 border-luxury-gold' : 'text-gray-400 hover:text-white'}`}
              style={activeTab === 'track' ? { color: settings.accentColor, borderColor: settings.accentColor } : {}}
            >
              🚚 Real-time Tracking
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-4 text-[10px] md:text-xs uppercase font-extrabold tracking-widest transition-all ${activeTab === 'email' ? 'bg-[#0c0c0c] text-luxury-gold border-b-2 border-luxury-gold' : 'text-gray-400 hover:text-white'}`}
              style={activeTab === 'email' ? { color: settings.accentColor, borderColor: settings.accentColor } : {}}
            >
              📨 Receipt Email simulation
            </button>
          </div>

          {/* Left Column or Main Area - Grid content spans */}
          <div className="col-span-12 p-6 overflow-y-auto max-h-[72vh] md:max-h-[68vh] scrollbar-thin">
            
            <AnimatePresence mode="wait">
              
              {/* Order History View */}
              {activeTab === 'history' && (
                <motion.div
                  key="history-tab"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6"
                >
                  <p className="text-[10px] uppercase tracking-widest font-extrabold text-luxury-gold" style={{ color: settings.accentColor }}>
                    HISTORICAL RESERVED FORMULATIONS
                  </p>

                  {orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 border border-white/5 bg-white/[0.01]">
                      <ShoppingBag className="mx-auto mb-4 opacity-30 text-luxury-gold" size={32} />
                      <p className="font-serif text-lg text-white">No historical orders found.</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Place an Indian delivery order to lock down your authentic longevity formulations today.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div 
                          key={ord.id} 
                          className={`p-5 bg-white/[0.02] border transition-all ${activeOrder?.id === ord.id ? 'border-luxury-gold/50' : 'border-white/5 hover:border-white/10'}`}
                        >
                          {/* Inner Header */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-white/5 pb-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs text-gray-300 font-bold hover:underline cursor-pointer" onClick={() => handleCopyId(ord.id)}>
                                  {ord.id}
                                </span>
                                <button className="p-1 text-gray-500 hover:text-white" onClick={() => handleCopyId(ord.id)} title="Copy Tracking ID">
                                  <Copy size={11} />
                                </button>
                                {copiedId === ord.id && <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Copied!</span>}
                              </div>
                              <p className="text-xs text-gray-400 font-light mt-0.5">Placed on {ord.date}</p>
                            </div>
                            
                            <div className="flex gap-2 items-center">
                              {/* Status Badge */}
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                                ord.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' :
                                ord.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-luxury-gold/10 text-luxury-gold'
                              }`} style={ord.status !== 'Delivered' && ord.status !== 'Confirmed' ? { color: settings.accentColor, backgroundColor: `${settings.accentColor}10` } : {}}>
                                ● {ord.status}
                              </span>

                              <button 
                                onClick={() => {
                                  setSelectedOrderForTrack(ord.id);
                                  setActiveTab('track');
                                }}
                                className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-bold hover:text-white bg-white/5 px-2.5 py-1.5 border border-white/5"
                              >
                                Track Dispatch
                              </button>
                            </div>
                          </div>

                          {/* Items purchased */}
                          <div className="space-y-3">
                            {ord.items.map((it) => (
                              <div key={`${it.id}-${it.variant}`} className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-10 overflow-hidden bg-gray-900 border border-white/5">
                                    <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="font-serif text-white">{it.title}</p>
                                    {it.variant && <span className="text-[8px] text-gray-400 uppercase tracking-widest">{it.variant}</span>}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-gray-400 font-mono">₹{it.price.toLocaleString()} × {it.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Total Info */}
                          <div className="border-t border-white/5 pt-4 mt-4 flex justify-between items-baseline text-xs">
                            <p className="text-gray-400">Payment: <span className="text-gray-200 uppercase font-mono tracking-widest text-[9px]">{ord.paymentMethod}</span></p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[10px] uppercase text-gray-500">Gross:</span>
                              <span className="font-serif text-base text-luxury-gold" style={{ color: settings.accentColor }}>₹{ord.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Dynamic Tracking View */}
              {activeTab === 'track' && (
                <motion.div
                  key="track-tab"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6"
                >
                  {activeOrder ? (
                    <div className="space-y-6">
                      
                      {/* Tracking Header */}
                      <div className="p-4 bg-white/[0.01] border border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest block font-extrabold">Active Direct-to-Consumer air bill</span>
                          <h3 className="font-mono text-base text-white tracking-wider flex items-center gap-2 mt-0.5">
                            {activeOrder.id}
                            <button className="text-gray-400 hover:text-white" onClick={() => handleCopyId(activeOrder.id)}>
                              <Copy size={12} />
                            </button>
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">Bound to {activeOrder.customerInfo.fullName} • {activeOrder.customerInfo.city}, {activeOrder.customerInfo.state}</p>
                        </div>

                        {/* Interactive simulation controls (Satisfies shipping status updates & track page constraints) */}
                        <div className="text-right flex flex-col gap-2">
                          <button
                            onClick={() => advanceOrderStep(activeOrder.id)}
                            disabled={activeOrder.simulatedStep >= 4}
                            className="bg-luxury-gold hover:bg-white text-black px-4 py-2.5 text-[10px] uppercase font-black tracking-widest flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
                            style={activeOrder.simulatedStep < 4 ? { backgroundColor: settings.accentColor } : {}}
                          >
                            <RefreshCw size={11} className="animate-spin-slow" />
                            Simulate Shipping Progress
                          </button>
                          <span className="text-[8px] uppercase tracking-widest text-[#9ca3af] font-light">Advance shipment milestones in real-time</span>
                        </div>
                      </div>

                      {/* Timeline mapping */}
                      <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                        {shippingStages.map((stage, idx) => {
                          const isDone = activeOrder.simulatedStep >= idx;
                          const isCurrent = activeOrder.simulatedStep === idx;

                          return (
                            <div key={idx} className="relative group">
                              
                              {/* Pin Indicator */}
                              <span className={`absolute -left-6 md:-left-8 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                isDone ? 'bg-luxury-gold border-luxury-gold' : 'bg-[#0c0c0c] border-white/20'
                              }`} style={isDone ? { backgroundColor: settings.accentColor, borderColor: settings.accentColor } : {}}>
                                {isDone && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                              </span>

                              <div className={`transition-opacity ${isDone ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}>
                                <time className="block text-[8px] uppercase tracking-widest font-extrabold text-[#9ca3af] mb-0.5">
                                  {idx === 0 ? 'STAGE 01 - SECURED' :
                                   idx === 1 ? 'STAGE 02 - LAB DEPARTURE' :
                                   idx === 2 ? 'STAGE 03 - AIR DISPATCH' :
                                   idx === 3 ? 'STAGE 04 - METROPOLIS HUB' :
                                   'STAGE 05 - DELIVERED SUCCESSFULLY'}
                                </time>
                                <h4 className={`font-serif text-sm tracking-wide ${isCurrent ? 'text-luxury-gold font-bold' : 'text-white'}`} style={isCurrent ? { color: settings.accentColor } : {}}>
                                  {stage.title} {isCurrent && '● CURRENT MILESTONE'}
                                </h4>
                                <p className="text-xs text-gray-400 font-light mt-1 max-w-xl">{stage.desc}</p>
                                <span className="inline-block mt-2 font-mono text-[8.5px] text-gray-500 uppercase tracking-widest bg-white/[0.02] px-2 py-0.5">
                                  {stage.detail}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Delivery address summation */}
                      <div className="p-4 bg-white/[0.02] border border-white/5 space-y-2 mt-6">
                        <span className="text-[8px] uppercase tracking-widest text-[#9ca3af] block font-extrabold">Biological Destination Protocol</span>
                        <div className="text-xs text-gray-300 space-y-1">
                          <p className="font-serif text-white text-sm">{activeOrder.customerInfo.fullName}</p>
                          <p className="font-mono text-gray-400">{activeOrder.customerInfo.mobileNumber} • {activeOrder.customerInfo.emailAddress}</p>
                          <p className="mt-2 font-light">{activeOrder.customerInfo.houseNumber}, {activeOrder.customerInfo.streetAddress}</p>
                          <p className="font-light">{activeOrder.customerInfo.areaLocality}</p>
                          <p className="font-bold text-white text-xs">{activeOrder.customerInfo.city}, {activeOrder.customerInfo.state} - {activeOrder.customerInfo.pinCode}</p>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-500 border border-white/5 bg-white/[0.01]">
                      <Truck className="mx-auto mb-4 opacity-30 text-luxury-gold" size={32} />
                      <p className="font-serif text-lg text-white">No active orders</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Track dispatch timeline here after purchase.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* simulated Confirmation email View */}
              {activeTab === 'email' && (
                <motion.div
                  key="email-tab"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6"
                >
                  {activeOrder ? (
                    <div className="border border-white/10 overflow-hidden bg-zinc-950 font-sans">
                      {/* Email Browser Bar */}
                      <div className="bg-[#1a1c1c] p-3 text-xs text-gray-400 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-luxury-gold" style={{ color: settings.accentColor }} />
                          <span className="font-mono text-[10px]">Secure Email Dispatch Confirmation</span>
                        </div>
                        <span className="text-[10px] font-mono">To: {activeOrder.customerInfo.emailAddress}</span>
                      </div>

                      {/* Email Body */}
                      <div className="p-6 md:p-8 space-y-8 bg-[#090a0a] text-white">
                        
                        {/* Elegance Title */}
                        <div className="text-center space-y-2 pb-6 border-b border-white/5">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9ca3af] block font-extrabold">PRISTINE BOTANICAL LONGEVITY SOLUTIONS</span>
                          <h1 className="text-2xl font-serif tracking-wider uppercase text-luxury-gold" style={{ color: settings.accentColor }}>INDUS AYURVEDA</h1>
                        </div>

                        {/* Welcoming */}
                        <div className="space-y-3 font-light text-gray-300 text-xs md:text-sm">
                          <p className="font-serif text-white font-medium text-base">Your Ritual is Sealed, {activeOrder.customerInfo.fullName.split(' ')[0]}.</p>
                          <p className="leading-relaxed">
                            We acknowledge with supreme gratitude your investment in personal cell regeneration. Your order <strong className="font-mono text-white text-xs">{activeOrder.id}</strong> has entered our priority compounding cleanrooms.
                          </p>
                          <p className="leading-relaxed">
                            Once our lead scientists certify heavy-metal clearance and chemical purity metrics on this specific formulation batch, we will forward the physical lab certification copy containing your air transportation tracking indicators.
                          </p>
                        </div>

                        {/* Summation details inside mail */}
                        <div className="p-4 bg-white/[0.02] border border-white/5 space-y-3">
                          <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-bold">RITUAL ORDER RECAPITULATION</p>
                          {activeOrder.items.map((it) => (
                            <div key={it.id} className="flex justify-between text-xs text-gray-400 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                              <span>{it.title} × {it.quantity}</span>
                              <span className="font-mono text-white">₹{(it.price * it.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-xs text-white pt-2 font-bold font-serif">
                            <span>Sum Total:</span>
                            <span className="text-luxury-gold text-sm" style={{ color: settings.accentColor }}>₹{activeOrder.total.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Indian Delivery summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-gray-300 border-t border-white/5 pt-6">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold mb-2">PROTECTED COURIER SPECIFICATION</p>
                            <p className="font-bold text-white text-xs">{activeOrder.customerInfo.fullName}</p>
                            <p>{activeOrder.customerInfo.houseNumber}, {activeOrder.customerInfo.streetAddress}</p>
                            <p>{activeOrder.customerInfo.areaLocality}</p>
                            <p>{activeOrder.customerInfo.city}, {activeOrder.customerInfo.state} - {activeOrder.customerInfo.pinCode}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-extrabold mb-2">SUPPORT DIRECT CONCIERGE</p>
                            <p className="leading-relaxed">Need custom modifications to your shipment schedule? Speak directly with our boutique concierge.</p>
                            <p className="mt-2 font-mono text-luxury-gold text-[10px]" style={{ color: settings.accentColor }}>support@indusayurveda.in / +91 80 4392 9000</p>
                          </div>
                        </div>

                        {/* Footer message */}
                        <div className="text-center pt-8 border-t border-white/5 text-[9px] uppercase tracking-widest text-gray-500 leading-normal font-bold">
                          © 2026 Indus Ayurveda Corp • Bengaluru • Mumbai • New Delhi
                          <br />
                          This is a system generated secure biological certificate.
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-gray-500 border border-white/5 bg-white/[0.01]">
                      <Mail className="mx-auto mb-4 opacity-30 text-luxury-gold" size={32} />
                      <p className="font-serif text-lg text-white">No active orders</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Confirm an Indian checkout registration to preview secure simulated invoice emails.</p>
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
