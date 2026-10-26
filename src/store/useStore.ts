import { create } from 'zustand';
import { Product, CartItem, StoreZoneId, ModalType, OdooOrder, WeightOption, GrindType } from '../types';
import { MOYEE_PRODUCTS, STORE_ZONES } from '../data/products';
import { sounds } from '../utils/audio';

interface StoreState {
  // Navigation & World
  playerPosition: [number, number, number];
  targetPosition: [number, number, number] | null;
  cameraTarget: [number, number, number];
  playerRotationY: number;
  currentZone: StoreZoneId;
  isInsideStore: boolean;
  hasSeenWelcome: boolean;
  controlsMode: 'first_person' | 'click_to_move' | 'mobile_touch';
  isPointerLocked: boolean;

  // Actions for Navigation
  setPlayerPosition: (pos: [number, number, number]) => void;
  setTargetPosition: (pos: [number, number, number] | null) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setPlayerRotationY: (rot: number) => void;
  setCurrentZone: (zone: StoreZoneId) => void;
  setIsInsideStore: (inside: boolean) => void;
  setPointerLocked: (locked: boolean) => void;
  setControlsMode: (mode: 'first_person' | 'click_to_move' | 'mobile_touch') => void;
  enterStoreCinematic: () => void;
  teleportToZone: (zoneId: StoreZoneId) => void;

  // Active Modals & Selected Product
  activeModal: ModalType;
  selectedProduct: Product | null;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  openProductDetail: (product: Product) => void;

  // Cart Management
  cartItems: CartItem[];
  discountCode: string;
  discountPercentage: number;
  addToCart: (
    product: Product,
    selectedWeight: WeightOption,
    selectedGrind: GrindType,
    quantity: number,
    isSubscription?: boolean,
    frequency?: 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Every 2 Months'
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  clearCart: () => void;
  getCartTotals: () => {
    subtotal: number;
    discountAmount: number;
    shipping: number;
    tax: number;
    total: number;
    itemCount: number;
  };

  // Golden Coffee Bean Hunt (Gamification)
  foundBeanIds: string[];
  collectBean: (beanId: string) => void;

  // Settings & Immersion
  dayNightMode: 'day' | 'night';
  toggleDayNight: () => void;
  graphicsQuality: 'low' | 'medium' | 'high';
  setGraphicsQuality: (quality: 'low' | 'medium' | 'high') => void;
  isAudioMuted: boolean;
  toggleAudio: () => void;

  // Odoo 18 Integration
  isOdooConnected: boolean;
  odooSessionToken: string;
  recentOrders: OdooOrder[];
  trackOrder: (orderRef: string) => OdooOrder | null;
  checkoutUrl: string;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial starting position outside on the Amsterdam street
  playerPosition: [0, 1.7, 24],
  targetPosition: null,
  cameraTarget: [0, 2.2, 14],
  playerRotationY: 0,
  currentZone: 'exterior',
  isInsideStore: false,
  hasSeenWelcome: false,
  controlsMode: 'first_person',
  isPointerLocked: false,

  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setTargetPosition: (pos) => set({ targetPosition: pos }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setPlayerRotationY: (rot) => set({ playerRotationY: rot }),
  setCurrentZone: (zone) => set({ currentZone: zone }),
  setIsInsideStore: (inside) => set({ isInsideStore: inside }),
  setPointerLocked: (locked) => set({ isPointerLocked: locked }),
  setControlsMode: (mode) => set({ controlsMode: mode }),

  enterStoreCinematic: () => {
    sounds.playDoorChime();
    set({
      hasSeenWelcome: true,
      isInsideStore: true,
      currentZone: 'entrance',
      playerPosition: [0, 1.7, 12],
      cameraTarget: [0, 2.0, 0],
      playerRotationY: 0,
      activeModal: null
    });
  },

  teleportToZone: (zoneId) => {
    const zone = STORE_ZONES.find((z) => z.id === zoneId);
    if (zone) {
      sounds.playClick();
      const isInside = zoneId !== 'exterior';
      set({
        currentZone: zoneId,
        playerPosition: [...zone.position],
        cameraTarget: [...zone.cameraTarget],
        playerRotationY: zone.rotationY,
        isInsideStore: isInside,
        targetPosition: null,
        activeModal: null
      });
    }
  },

  activeModal: 'welcome',
  selectedProduct: null,
  openModal: (modal) => {
    sounds.playClick();
    set({ activeModal: modal });
  },
  closeModal: () => set({ activeModal: null, selectedProduct: null }),
  openProductDetail: (product) => {
    sounds.playClick();
    set({ activeModal: 'product_detail', selectedProduct: product });
  },

  // Cart
  cartItems: [
    // Preload with bestseller so checkout counter and cart immediately look lively
    {
      cartItemId: 'triple-blend-default',
      product: MOYEE_PRODUCTS[0],
      selectedWeight: '1kg',
      selectedGrind: 'Whole Beans',
      quantity: 1,
      isSubscription: false,
      unitPrice: 23.00,
      subtotal: 23.00
    }
  ],
  discountCode: '',
  discountPercentage: 0,

  addToCart: (product, selectedWeight, selectedGrind, quantity, isSubscription = false, frequency = 'Monthly') => {
    sounds.playAddToCart();
    const weightOpt = product.weights.find((w) => w.label === selectedWeight) || product.weights[0];
    const unitPrice = Number((product.price * weightOpt.priceMultiplier).toFixed(2));
    const subtotal = Number((unitPrice * quantity).toFixed(2));

    const cartItemId = `${product.id}-${selectedWeight}-${selectedGrind || 'beans'}-${isSubscription ? 'sub' : 'one'}`;

    const existingIndex = get().cartItems.findIndex((item) => item.cartItemId === cartItemId);
    if (existingIndex > -1) {
      const updated = [...get().cartItems];
      updated[existingIndex].quantity += quantity;
      updated[existingIndex].subtotal = Number((updated[existingIndex].quantity * unitPrice).toFixed(2));
      set({ cartItems: updated });
    } else {
      const newItem: CartItem = {
        cartItemId,
        product,
        selectedWeight,
        selectedGrind,
        quantity,
        isSubscription,
        subscriptionFrequency: isSubscription ? frequency : undefined,
        unitPrice,
        subtotal
      };
      set({ cartItems: [...get().cartItems, newItem] });
    }
  },

  removeFromCart: (cartItemId) => {
    sounds.playClick();
    set({ cartItems: get().cartItems.filter((i) => i.cartItemId !== cartItemId) });
  },

  updateQuantity: (cartItemId, qty) => {
    if (qty <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }
    const updated = get().cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        return {
          ...item,
          quantity: qty,
          subtotal: Number((item.unitPrice * qty).toFixed(2))
        };
      }
      return item;
    });
    set({ cartItems: updated });
  },

  applyDiscountCode: (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DRINKCOFFEE') {
      sounds.playClick();
      set({ discountCode: clean, discountPercentage: 10 });
      return { success: true, message: '🎉 Code DRINKCOFFEE applied! 10% discount added.' };
    } else if (clean === 'BEANHUNT15') {
      sounds.playBeanFound();
      set({ discountCode: clean, discountPercentage: 15 });
      return { success: true, message: '🏆 Golden Bean Master Code applied! 15% discount.' };
    }
    return { success: false, message: 'Invalid coupon code. Try DRINKCOFFEE' };
  },

  clearCart: () => set({ cartItems: [] }),

  getCartTotals: () => {
    const items = get().cartItems;
    const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
    const discountAmount = Number(((subtotal * get().discountPercentage) / 100).toFixed(2));
    const discountedSubtotal = subtotal - discountAmount;

    // Shipping rules based on Moyee website:
    // Subscriptions: €0
    // Any order with total > €45 or 2+ kg: €2
    // Otherwise standard delivery: €5
    const hasSubscription = items.some((i) => i.isSubscription);
    const shipping = hasSubscription || discountedSubtotal > 45 ? 0 : 4.95;
    const total = Number((discountedSubtotal + shipping).toFixed(2));
    const tax = Number((total * 0.09).toFixed(2)); // 9% food/coffee VAT in NL
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return { subtotal, discountAmount, shipping, tax, total, itemCount };
  },

  // Golden Bean Hunt
  foundBeanIds: [],
  collectBean: (beanId) => {
    if (!get().foundBeanIds.includes(beanId)) {
      sounds.playBeanFound();
      const nextFound = [...get().foundBeanIds, beanId];
      set({ foundBeanIds: nextFound, activeModal: 'bean_found' });
      if (nextFound.length >= 5) {
        get().applyDiscountCode('BEANHUNT15');
      }
    }
  },

  // Settings
  dayNightMode: 'day',
  toggleDayNight: () => {
    sounds.playClick();
    set({ dayNightMode: get().dayNightMode === 'day' ? 'night' : 'day' });
  },

  graphicsQuality: 'high',
  setGraphicsQuality: (quality) => set({ graphicsQuality: quality }),

  isAudioMuted: false,
  toggleAudio: () => {
    const next = !get().isAudioMuted;
    sounds.setMuted(next);
    set({ isAudioMuted: next });
  },

  // Odoo Integration
  isOdooConnected: true,
  odooSessionToken: 'odoo18_live_b2c_' + Math.random().toString(36).substring(7),
  recentOrders: [
    {
      orderRef: 'C34289',
      date: '2026-10-21',
      status: 'Delivered',
      items: [{ name: 'Triple Blend 1kg', qty: 2, price: 23.00 }],
      total: 46.00,
      carrier: 'PostNL Green Express',
      trackingNumber: '3SMOYEE9876543NL',
      originFacility: 'Nairobi Roastery, Kenya'
    },
    {
      orderRef: 'C34300',
      date: '2026-10-25',
      status: 'In transit',
      items: [
        { name: 'Double Blend 1kg (Subscription)', qty: 1, price: 25.00 },
        { name: 'Espresso Capsules (25 Pods)', qty: 2, price: 10.00 }
      ],
      total: 45.00,
      carrier: 'DHL Climate Protect',
      trackingNumber: '3SMOYEE1122334NL',
      originFacility: 'Addis Ababa ISO Facility, Ethiopia'
    }
  ],

  trackOrder: (orderRef) => {
    const clean = orderRef.trim().toUpperCase();
    const found = get().recentOrders.find((o) => o.orderRef === clean);
    return found || null;
  },

  checkoutUrl: 'https://www.moyeecoffee.com/shop/cart'
}));
