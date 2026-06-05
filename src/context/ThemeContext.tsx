import { createContext, useContext, useState, ReactNode } from 'react';

export interface ThemeSettings {
  // Theme styling
  accentColor: string; // e.g. '#d4af37' (Gold)
  bgColor: string; // e.g. '#0c0c0c'
  fontSizeBase: 'sm' | 'md' | 'lg';
  fontFamilyHead: 'serif' | 'sans' | 'mono';
  
  // Hero settings
  heroVisible: boolean;
  heroHeading: string;
  heroSubtitle: string;
  heroBtnText: string;
  heroBtnText2: string;
  heroImgUrl: string;
  heroPaddingTop: number; // in px
  heroPaddingBottom: number; // in px
  
  // Featured Collection settings
  fcVisible: boolean;
  fcHeading: string;
  fcSub: string;
  fcCols: 2 | 3 | 4;
  fcProductCount: number;
  fcShowBadges: boolean;
  
  // Clinical Deep Dive settings
  diveVisible: boolean;
  diveHeading: string;
  diveSubtitle: string;
  diveText: string;
  
  // Product Showcase settings
  showcaseVisible: boolean;
  showcaseBadge: string;
  showcaseHeading: string;
  showcasePrice: number;
  showcaseDescription: string;
  
  // Brand Story settings
  storyVisible: boolean;
  storyTag: string;
  storyHeading: string;
  storyP1: string;
  storyP2: string;
  storyBtnText: string;
}

const defaultSettings: ThemeSettings = {
  accentColor: '#d4af37',
  bgColor: '#0c0c0c',
  fontSizeBase: 'md',
  fontFamilyHead: 'serif',
  
  heroVisible: true,
  heroHeading: 'Scientific Elegance',
  heroSubtitle: 'Advanced longevity solutions crafted with unapologetic purity and clinical precision. Engineer your biological future.',
  heroBtnText: 'Discover Protocol',
  heroBtnText2: 'View Formulations',
  heroImgUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000',
  heroPaddingTop: 0,
  heroPaddingBottom: 128,
  
  fcVisible: true,
  fcHeading: 'Signature Formulations',
  fcSub: 'Explore our clinical-grade botanical engineering, crafted with uncompromising attention to bioavailability.',
  fcCols: 4,
  fcProductCount: 4,
  fcShowBadges: true,
  
  diveVisible: true,
  diveHeading: 'Clinical Analysis',
  diveSubtitle: 'Deep Dive',
  diveText: 'A comprehensive breakdown of our most advanced formulation. Peer-reviewed ingredients, exponential efficacy.',
  
  showcaseVisible: true,
  showcaseBadge: 'Wellness / Immune Support',
  showcaseHeading: 'The Vitality Core Caps',
  showcasePrice: 9999,
  showcaseDescription: 'Elevate your daily routine. The Vitality Core Caps transcend traditional supplementation, blending ancient herbal intelligence with cutting-edge bioavailability. Your foundation for everyday resilience.',
  
  storyVisible: true,
  storyTag: 'Purity & Potency',
  storyHeading: 'The Science of True Vitality',
  storyP1: 'Founded on the principles of holistic wellness and uncompromising purity, our formulations bridge the gap between ancient natural wisdom and modern medical science.',
  storyP2: 'Every extract, compound, and mineral is obsessively sourced to deliver maximum bioavailability and transformative results. We do not just create supplements; we engineer the foundation of your health.',
  storyBtnText: 'Discover Our Story',
};

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface CustomerInfo {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  houseNumber: string;
  streetAddress: string;
  areaLocality: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerInfo: CustomerInfo;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  simulatedStep: number; // 0: Confirmed, 1: Processing, 2: Shipped, 3: Out for Delivery, 4: Delivered
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSetting: <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => void;
  resetSettings: () => void;
  
  // Cart state
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string, variant?: string) => void;
  updateCartQuantity: (id: string, delta: number, variant?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Wishlist state
  wishlistItems: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;

  // Checkout and Order states
  orders: Order[];
  addOrder: (customerInfo: CustomerInfo, paymentMethod: string, subtotal: number, shipping: number, total: number) => Order;
  advanceOrderStep: (id: string) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  selectedOrderForTrack: string | null;
  setSelectedOrderForTrack: (id: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('indus_shopify_theme_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('indus_shop_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Default initial luxury items for demo aesthetic representation
    return [
      {
        id: 'p-1',
        title: 'Cellular Renewal Complex',
        price: 14999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000',
        variant: 'One-time Purchase'
      },
      {
        id: 'p-4',
        title: 'Indus Detox Cleanse',
        price: 12499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000',
        variant: 'Subscribe & Save 15%'
      }
    ];
  });

  const [wishlistItems, setWishlistItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('indus_shop_wishlist');
    return saved ? JSON.parse(saved) : ['p-2'];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('indus_shop_cart', JSON.stringify(items));
  };

  const saveWishlist = (items: string[]) => {
    setWishlistItems(items);
    localStorage.setItem('indus_shop_wishlist', JSON.stringify(items));
  };

  const updateSetting = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('indus_shopify_theme_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('indus_shopify_theme_settings');
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, qty = 1) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.id === newItem.id && item.variant === newItem.variant
    );
    
    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += qty;
    } else {
      updatedCart = [...cartItems, { ...newItem, quantity: qty }];
    }
    saveCart(updatedCart);
    setIsCartOpen(true); // Open drawer instantly for luxury feedback
  };

  const removeFromCart = (id: string, variant?: string) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.variant === variant)
    );
    saveCart(updatedCart);
  };

  const updateCartQuantity = (id: string, delta: number, variant?: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.variant === variant) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    saveCart(updatedCart);
  };

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('indus_shop_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Elegant default historical order
    return [
      {
        id: 'IND-94820-IN',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        items: [
          {
            id: 'p-2',
            title: 'Vitality Botanical Elixir',
            price: 9999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1608248593853-add12f94b8e0?auto=format&fit=crop&q=80&w=1000',
            variant: 'One-time Purchase'
          }
        ],
        subtotal: 9999,
        shipping: 0,
        total: 9999,
        customerInfo: {
          fullName: 'Partha Dutta',
          mobileNumber: '+91 98765 43210',
          emailAddress: 'parthadutta8724@gmail.com',
          houseNumber: 'Apt 4B, Shanti Enclave',
          streetAddress: '12th Cross, Indiranagar',
          areaLocality: 'Near Metro Station',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560038'
        },
        paymentMethod: 'UPI (GPay)',
        status: 'Delivered',
        simulatedStep: 4
      }
    ];
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedOrderForTrack, setSelectedOrderForTrack] = useState<string | null>(null);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('indus_shop_orders', JSON.stringify(newOrders));
  };

  const addOrder = (customerInfo: CustomerInfo, paymentMethod: string, subtotal: number, shipping: number, total: number) => {
    const orderId = `IND-${Math.floor(10000 + Math.random() * 90000)}-IN`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      items: [...cartItems],
      subtotal,
      shipping,
      total,
      customerInfo,
      paymentMethod,
      status: 'Confirmed',
      simulatedStep: 0
    };

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    clearCart();
    setSelectedOrderForTrack(orderId);
    return newOrder;
  };

  const advanceOrderStep = (id: string) => {
    const steps: Order['status'][] = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const updated = orders.map(ord => {
      if (ord.id === id) {
        const nextStep = Math.min(4, ord.simulatedStep + 1);
        return {
          ...ord,
          simulatedStep: nextStep,
          status: steps[nextStep]
        };
      }
      return ord;
    });
    saveOrders(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleWishlist = (id: string) => {
    const isPresent = wishlistItems.includes(id);
    const updated = isPresent 
      ? wishlistItems.filter((item) => item !== id)
      : [...wishlistItems, id];
    saveWishlist(updated);
  };

  const isWishlisted = (id: string) => wishlistItems.includes(id);

  return (
    <ThemeContext.Provider value={{ 
      settings, 
      updateSetting, 
      resetSettings,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      wishlistItems,
      toggleWishlist,
      isWishlisted,
      orders,
      addOrder,
      advanceOrderStep,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isAccountOpen,
      setIsAccountOpen,
      selectedOrderForTrack,
      setSelectedOrderForTrack
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeSettings() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeSettings must be used within a ThemeProvider');
  }
  return context;
}
