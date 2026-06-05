import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Zap, CreditCard, ChevronRight, CheckCircle, Smartphone, Globe, Landmark, AlertCircle, ShoppingBag, Eye } from 'lucide-react';
import { useThemeSettings, CustomerInfo } from '../context/ThemeContext';

export default function CheckoutPortal() {
  const { 
    cartItems, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    addOrder, 
    settings 
  } = useThemeSettings();

  const [step, setStep] = useState<1 | 2>(1); // 1: Info/Address, 2: Indian Payment Gateways
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiProvider, setUpiProvider] = useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('gpay');
  const [upiId, setUpiId] = useState('');
  
  // Card states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('h_dfc');

  // Input states of address (Initial fallback to beautiful default simulated values)
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    houseNumber: '',
    streetAddress: '',
    areaLocality: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 499;
  const total = subtotal + shipping;

  const IndianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Andaman and Nicobar', 'Chandigarh', 'Delhi', 'Jammu & Kashmir', 
    'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const handleInputChange = (field: keyof CustomerInfo, val: string) => {
    setValidationError('');
    setCustomer(prev => ({ ...prev, [field]: val }));
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!customer.fullName.trim()) return setValidationError('Full Name is required.');
    if (!customer.mobileNumber.trim()) return setValidationError('Mobile Number is required.');
    if (!/^\+?([0-9\s]{10,15})$/.test(customer.mobileNumber.replace(/[\s-]/g, ''))) {
      return setValidationError('Please enter a valid 10-digit Indian Mobile Number.');
    }
    if (!customer.emailAddress.trim() || !/\S+@\S+\.\S+/.test(customer.emailAddress)) {
      return setValidationError('Please enter a valid Email Address.');
    }
    if (!customer.houseNumber.trim()) return setValidationError('House/Flat Number is required.');
    if (!customer.streetAddress.trim()) return setValidationError('Street Address is required.');
    if (!customer.areaLocality.trim()) return setValidationError('Area/Locality is required.');
    if (!customer.city.trim()) return setValidationError('City is required.');
    if (!customer.state) return setValidationError('Please select a State.');
    if (!/^\d{6}$/.test(customer.pinCode.trim())) {
      return setValidationError('Indian PIN Code must be exactly 6 digits.');
    }

    setValidationError('');
    setStep(2);
  };

  const handlePlaceOrder = () => {
    // Payment-specific simulated checks
    if (paymentMethod === 'upi') {
      if (upiProvider === 'other' && !upiId.includes('@')) {
        return setValidationError('Please enter a valid Upi ID (e.g. user@okhdfc).');
      }
    } else if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        return setValidationError('Please enter a valid 16-digit Card Number.');
      }
      if (!cardExpiry.includes('/')) {
        return setValidationError('Please enter expiry details (MM/YY).');
      }
      if (cardCvv.length < 3) {
        return setValidationError('CVV must be at least 3 digits.');
      }
    }

    setValidationError('');
    setIsProcessing(true);

    // Dynamic timeout to simulate payment validation
    setTimeout(() => {
      let finalMethodStr = '';
      if (paymentMethod === 'upi') {
        const provs = { gpay: 'UPI (Google Pay)', phonepe: 'UPI (PhonePe)', paytm: 'UPI (Paytm)', other: 'UPI' };
        finalMethodStr = provs[upiProvider];
      } else if (paymentMethod === 'card') {
        finalMethodStr = 'Credit/Debit Card';
      } else if (paymentMethod === 'netbanking') {
        const banks = { h_dfc: 'HDFC Net Banking', s_bi: 'SBI Net Banking', i_cici: 'ICICI Net Banking', a_xis: 'Axis Net Banking' };
        finalMethodStr = banks[selectedBank as keyof typeof banks] || 'Net Banking';
      } else {
        finalMethodStr = 'Cash on Delivery (COD)';
      }

      addOrder(customer, finalMethodStr, subtotal, shipping, total);
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      setStep(1);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md">
        
        {/* Main Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full md:h-auto md:max-h-[92vh] max-w-4xl bg-[#0a0a0a] text-white flex flex-col md:grid md:grid-cols-12 overflow-hidden border border-white/10 shadow-2xl relative"
          style={{ backgroundColor: settings.bgColor }}
          id="checkout-portal-container"
        >
          {/* Decorative light elements */}
          <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold to-transparent" style={{ backgroundImage: `linear-gradient(to right, transparent, ${settings.accentColor}, transparent)` }} />

          {/* Checkout Header (Mobile-Friendly) */}
          <div className="col-span-12 p-6 pb-4 border-b border-white/5 flex justify-between items-center bg-[#111313]">
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400">Biological Dispatch Gateway</span>
              <h2 className="text-xl font-serif text-luxury-gold tracking-wide uppercase mt-0.5" style={{ color: settings.accentColor }}>
                Premium Indian Checkout
              </h2>
            </div>
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content Panel - takes 7 columns */}
          <div className="col-span-12 md:col-span-7 p-6 overflow-y-auto max-h-[80vh] md:max-h-[75vh] space-y-6 scrollbar-thin">
            
            {/* Step Indicators */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`text-[10px] uppercase tracking-widest px-3 py-1 font-bold ${step === 1 ? 'bg-luxury-gold text-black' : 'bg-white/10 text-gray-400'}`} style={step === 1 ? { backgroundColor: settings.accentColor, color: '#000' } : {}}>
                1. Delivery Location
              </span>
              <ChevronRight size={12} className="text-gray-500" />
              <span className={`text-[10px] uppercase tracking-widest px-3 py-1 font-bold ${step === 2 ? 'bg-luxury-gold text-black' : 'bg-white/5 text-gray-500'}`} style={step === 2 ? { backgroundColor: settings.accentColor, color: '#000' } : {}}>
                2. Payment Gateway
              </span>
            </div>

            {/* Error notifications */}
            {validationError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2"
              >
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <span>{validationError}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 ? (
                // Step 1: Delivery Location Form
                <motion.form 
                  key="step-1-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleNextStep}
                  className="space-y-4"
                >
                  <p className="text-[10px] uppercase tracking-widest font-extrabold text-luxury-gold" style={{ color: settings.accentColor }}>
                    CUSTOMER CONTACT PARTICULARS
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Full Name *</label>
                      <input 
                        type="text"
                        required
                        value={customer.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g. Partha Dutta"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 text-white rounded-none md:min-h-[44px]"
                        style={{ '--tw-ring-color': settings.accentColor } as any}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Mobile Number (Indian verification code) *</label>
                      <input 
                        type="tel"
                        required
                        value={customer.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 text-white rounded-none md:min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Email Address (For receipt confirmations) *</label>
                    <input 
                      type="email"
                      required
                      value={customer.emailAddress}
                      onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                      placeholder="e.g. parthadutta8724@gmail.com"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none focus:ring-1 focus:ring-luxury-gold/50 text-white rounded-none md:min-h-[44px]"
                    />
                  </div>

                  <p className="text-[10px] uppercase tracking-widest font-extrabold text-luxury-gold pt-2" style={{ color: settings.accentColor }}>
                    INDIAN DISPATCH ADDRESS
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Flat/House No *</label>
                      <input 
                        type="text"
                        required
                        value={customer.houseNumber}
                        onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                        placeholder="Apt 4B / H.No 12"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none text-white rounded-none md:min-h-[44px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Street Address / Landmark *</label>
                      <input 
                        type="text"
                        required
                        value={customer.streetAddress}
                        onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                        placeholder="12th Main Road, Behind Temple"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none text-white rounded-none md:min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Area / Locality *</label>
                    <input 
                      type="text"
                      required
                      value={customer.areaLocality}
                      onChange={(e) => handleInputChange('areaLocality', e.target.value)}
                      placeholder="Indiranagar Stage 2"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none text-white rounded-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">City *</label>
                      <input 
                        type="text"
                        required
                        value={customer.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Bengaluru"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none text-white rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">State *</label>
                      <select 
                        required
                        value={customer.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none text-white rounded-none h-[44px]"
                      >
                        <option value="">Select State</option>
                        {IndianStates.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">PIN Code *</label>
                      <input 
                        type="text"
                        required
                        maxLength={6}
                        value={customer.pinCode}
                        onChange={(e) => handleInputChange('pinCode', e.target.value.replace(/\D/g, ''))}
                        placeholder="560038"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-luxury-gold focus:outline-none text-white rounded-none font-mono"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#e0e0e0] transition-colors flex items-center justify-center gap-2 mt-6 h-[48px]"
                  >
                    Select Payment Method <ChevronRight size={14} />
                  </button>
                </motion.form>
              ) : (
                // Step 2: Indian payment integrations
                <motion.div 
                  key="step-2-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {/* Option Tabs - Mobile friendly block selectors */}
                  <p className="text-[10px] uppercase tracking-widest font-extrabold text-luxury-gold" style={{ color: settings.accentColor }}>
                    SECURE INDIAN GATEWAYS (₹ INR ACCEPTED)
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border text-center flex flex-col items-center justify-center gap-2 transition-all min-h-[85px] ${paymentMethod === 'upi' ? 'border-luxury-gold bg-white/10' : 'border-white/10 bg-white/[0.02]'}`}
                    >
                      <Smartphone size={18} className={paymentMethod === 'upi' ? 'text-luxury-gold' : 'text-gray-400'} style={paymentMethod === 'upi' ? { color: settings.accentColor } : {}} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Instant UPI</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border text-center flex flex-col items-center justify-center gap-2 transition-all min-h-[85px] ${paymentMethod === 'card' ? 'border-luxury-gold bg-white/10' : 'border-white/10 bg-white/[0.02]'}`}
                    >
                      <CreditCard size={18} className={paymentMethod === 'card' ? 'text-luxury-gold' : 'text-gray-400'} style={paymentMethod === 'card' ? { color: settings.accentColor } : {}} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Debit/Credit</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 border text-center flex flex-col items-center justify-center gap-2 transition-all min-h-[85px] ${paymentMethod === 'netbanking' ? 'border-luxury-gold bg-white/10' : 'border-white/10 bg-white/[0.02]'}`}
                    >
                      <Landmark size={18} className={paymentMethod === 'netbanking' ? 'text-luxury-gold' : 'text-gray-400'} style={paymentMethod === 'netbanking' ? { color: settings.accentColor } : {}} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Net Banking</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 border text-center flex flex-col items-center justify-center gap-2 transition-all min-h-[85px] ${paymentMethod === 'cod' ? 'border-luxury-gold bg-white/10' : 'border-white/10 bg-white/[0.02]'}`}
                    >
                      <Globe size={18} className={paymentMethod === 'cod' ? 'text-luxury-gold' : 'text-gray-400'} style={paymentMethod === 'cod' ? { color: settings.accentColor } : {}} />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest">COD Available</span>
                        <span className="text-[8px] uppercase tracking-widest text-emerald-400 font-extrabold">Pay on delivery</span>
                      </div>
                    </button>
                  </div>

                  {/* Payment Subform Panel */}
                  <div className="p-5 bg-white/[0.02] border border-white/5">
                    
                    {/* UPI Interactive Section */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-bold">SELECT UPI APP</p>
                        <div className="grid grid-cols-4 gap-2">
                          {['gpay', 'phonepe', 'paytm', 'other'].map((item) => (
                            <button
                              key={item}
                              onClick={() => {
                                setValidationError('');
                                setUpiProvider(item as any);
                              }}
                              className={`py-3 text-center text-[10px] uppercase font-bold tracking-widest border transition-all ${upiProvider === item ? 'border-luxury-gold text-white bg-luxury-gold/10' : 'border-white/5 text-gray-400 bg-black/20'}`}
                            >
                              {item === 'other' ? 'Custom UPI' : item === 'gpay' ? 'Google Pay' : item === 'phonepe' ? 'PhonePe' : 'Paytm'}
                            </button>
                          ))}
                        </div>

                        {upiProvider === 'other' ? (
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Enter UPI Virtual Address (VPA) *</label>
                            <input 
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="e.g. customer@okhdfc"
                              className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold font-mono"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-luxury-gold/5 border border-luxury-gold/10 text-[11px] text-gray-300 leading-relaxed font-light">
                            <CheckCircle size={14} className="text-luxury-gold flex-shrink-0" style={{ color: settings.accentColor }} />
                            <span>
                              After clicking dispatch, a secure UPI intent alert will be fired on configured mobile devices for {upiProvider === 'gpay' ? 'Google Pay' : upiProvider === 'phonepe' ? 'PhonePe' : 'Paytm'}.
                            </span>
                          </div>
                        )}

                        {/* Interactive dynamic UPI QR code generator for luxury convenience */}
                        <div className="p-3 bg-[#111] border border-white/5 flex flex-col md:flex-row items-center gap-4 justify-between">
                          <div className="space-y-1 text-center md:text-left">
                            <span className="inline-block bg-emerald-500/10 text-emerald-400 text-[8px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded">UPI 2.0 Dynamic</span>
                            <p className="text-[11px] text-white font-bold uppercase tracking-wider">Fast Mobile QR Option</p>
                            <p className="text-[10px] text-gray-400 leading-normal">Scan and pay using any UPI App (GPay, BHIM, Cred) instantly.</p>
                          </div>
                          <div className="w-20 h-20 bg-white p-1 rounded-sm flex items-center justify-center flex-shrink-0 border border-white/10 select-none">
                            {/* Visual QR Code placeholder with simple SVG layout */}
                            <svg className="w-16 h-16 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3h4v4H3zM17 3h4v4h-4zM3 17h4v4H3z" />
                              <path d="M12 3v18M3 12h18" strokeDasharray="2 2" />
                              <path d="M10 10h4v4h-4z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Debit / Credit card section */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-[#9ca3af] mb-1 font-bold">16-Digit Indian Debit/Credit Card *</label>
                          <input 
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => {
                              // Card spacer formatting
                              const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                              setCardNumber(val);
                            }}
                            placeholder="4123 5678 9012 3456"
                            className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest text-[#9ca3af] mb-1 font-bold">Expiry Date MM/YY *</label>
                            <input 
                              type="text"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length > 2) {
                                  setCardExpiry(`${val.slice(0, 2)}/${val.slice(2, 4)}`);
                                } else {
                                  setCardExpiry(val);
                                }
                              }}
                              placeholder="12/29"
                              className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest text-[#9ca3af] mb-1 font-bold">Card CVV Code *</label>
                            <input 
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                              placeholder="***"
                              className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-[#9ca3af] mb-1 font-bold">Cardholder Name *</label>
                          <input 
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="e.g. Partha Dutta"
                            className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-gold"
                          />
                        </div>
                      </div>
                    )}

                    {/* Net Banking Section */}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-widest text-[#9ca3af] mb-1 font-bold">Select Reputable Indian Bank</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: 'h_dfc', name: 'HDFC Bank (Highly Preferred)' },
                            { id: 's_bi', name: 'State Bank of India (SBI)' },
                            { id: 'i_cici', name: 'ICICI Bank' },
                            { id: 'a_xis', name: 'Axis Bank' },
                            { id: 'k_otak', name: 'Kotak Mahindra Bank' }
                          ].map((bank) => (
                            <label 
                              key={bank.id} 
                              className={`flex items-center justify-between p-3.5 border cursor-pointer select-none transition-all ${selectedBank === bank.id ? 'border-luxury-gold bg-luxury-gold/5' : 'border-white/5 hover:border-white/10'}`}
                            >
                              <div className="flex items-center gap-3">
                                <input 
                                  type="radio" 
                                  name="bank" 
                                  value={bank.id}
                                  checked={selectedBank === bank.id} 
                                  onChange={() => setSelectedBank(bank.id)}
                                  className="accent-luxury-gold text-luxury-gold" 
                                />
                                <span className="text-xs text-white font-medium">{bank.name}</span>
                              </div>
                              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Instant Gateway</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cash on Delivery Section */}
                    {paymentMethod === 'cod' && (
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 text-emerald-400">
                          <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider">INR Cash on Delivery (COD) Approved</p>
                            <p className="text-xs text-gray-300 leading-normal font-light">
                              Pay in cash or securely through a UPI QR code at our courier partner (Delhiver / Bluedart) at your doorstep. No prepayment necessary.
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 text-[10px] uppercase tracking-widest font-extrabold text-[#9ca3af] text-center mt-4">
                          🔒 COD service charges are completely free on this ritual
                        </div>
                      </div>
                    )}

                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setValidationError('');
                        setStep(1);
                      }}
                      className="w-1/3 border border-white/20 text-gray-300 hover:text-white uppercase tracking-widest text-[10px] font-bold py-4 h-[48px]"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-luxury-gold text-black hover:bg-white uppercase tracking-[0.2em] text-[10px] font-black py-4 transition-all flex items-center justify-center gap-2 h-[48px] disabled:opacity-50"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2 animate-pulse">
                          AUTHENTICATING GATEWAY...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          MAKE RESERVATION <CheckCircle size={14} />
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Pricing Outline Panel - takes 5 columns */}
          <div className="col-span-12 md:col-span-5 p-6 bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-between max-h-[80vh] md:max-h-[75vh] overflow-y-auto scrollbar-thin">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-luxury-gold mb-4" style={{ color: settings.accentColor }}>
                RITUAL SUMMATION
              </p>

              {/* Cart List */}
              <div className="space-y-4 max-h-[35vh] overflow-y-auto scrollbar-none pr-1 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 justify-between items-start border-b border-white/5 pb-3">
                    <div className="flex gap-2.5">
                      <div className="w-10 h-13 overflow-hidden bg-gray-900 border border-white/5 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-gray-200">{item.title}</h4>
                        {item.variant && <span className="block text-[8px] text-gray-500 uppercase mt-0.5 tracking-wider font-semibold">{item.variant}</span>}
                        <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="text-xs text-luxury-gold font-light" style={{ color: settings.accentColor }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Prices */}
              <div className="space-y-2 border-t border-white/5 pt-4 text-xs font-light tracking-wide text-gray-300">
                <div className="flex justify-between">
                  <span>Biological Subtotal</span>
                  <span className="text-white font-mono">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400">
                  <span className="flex items-center gap-1">Express Bio-Protection Courier</span>
                  <span className="font-mono">{shipping === 0 ? 'Complimentary' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-serif text-base text-white border-t border-white/10 pt-3 mt-2">
                  <span>Gross Total</span>
                  <span className="text-luxury-gold text-lg" style={{ color: settings.accentColor }}>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Indian Trust & Badges */}
            <div className="mt-8 border-t border-white/5 pt-6 space-y-4">
              <div className="flex items-center gap-2 text-gray-400 bg-white/[0.01] p-3 border border-white/5">
                <ShieldCheck size={16} className="text-luxury-gold" style={{ color: settings.accentColor }} />
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9ca3af]">
                  <p className="text-white">Secure checkout badge</p>
                  <p className="text-[8px] tracking-normal lowercase font-light text-gray-500">256-bit secure SSL banking transaction</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] uppercase font-extrabold tracking-widest text-center text-gray-400">
                <div className="p-2 border border-emerald-500/10 bg-emerald-500/[0.02] text-emerald-400">
                  ⚡ UPI ACCEPTED BADGE
                </div>
                <div className="p-2 border border-luxury-gold/10 bg-luxury-gold/[0.02] text-luxury-gold" style={{ borderColor: `${settings.accentColor}20`, color: settings.accentColor }}>
                  📦 COD AVAILABLE BADGE
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
