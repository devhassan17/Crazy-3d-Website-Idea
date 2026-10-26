export type ProductCategory =
  | 'beans'
  | 'capsules'
  | 'subscriptions'
  | 'ground'
  | 'bundles'
  | 'accessories';

export type GrindType = 'Whole Beans' | 'Filter Grind' | 'Espresso Grind';
export type WeightOption = '250g' | '1kg' | '25 Capsules';

export interface Product {
  id: string;
  odooId: number;
  slug: string;
  name: string;
  tagline: string;
  badge?: string;
  price: number; // Base price in EUR
  currency: string;
  category: ProductCategory;
  boldness: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Bold
  roastLevel: 'Light' | 'Medium' | 'Dark' | 'Omni';
  roastLocation: string; // e.g. "Addis Ababa, Ethiopia" or "Nairobi, Kenya"
  origins: string[];
  altitude?: string;
  flavorNotes: string[];
  description: string;
  fairChainStory: string;
  weights: { label: WeightOption; priceMultiplier: number; isDefault?: boolean }[];
  grindOptions: GrindType[];
  inStock: boolean;
  colorHex: string; // Product bag primary theme color
  shelfLocation: {
    zone: string;
    shelfId: string;
    position: [number, number, number];
  };
  isSubscriptionEligible: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedWeight: WeightOption;
  selectedGrind?: GrindType;
  quantity: number;
  isSubscription: boolean;
  subscriptionFrequency?: 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Every 2 Months';
  unitPrice: number;
  subtotal: number;
}

export type StoreZoneId =
  | 'exterior'
  | 'entrance'
  | 'beans_shelf'
  | 'capsules_shelf'
  | 'bundles_shelf'
  | 'tasting_bar'
  | 'checkout_counter'
  | 'subscription_lounge'
  | 'helpdesk'
  | 'fairchain_gallery'
  | 'delivery_desk'
  | 'coffee_quiz';

export interface StoreZone {
  id: StoreZoneId;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number]; // Coordinates in 3D world
  cameraTarget: [number, number, number];
  rotationY: number;
  icon: string;
}

export type ModalType =
  | null
  | 'welcome'
  | 'product_detail'
  | 'cart_drawer'
  | 'checkout'
  | 'store_map'
  | 'subscription_lounge'
  | 'customer_support'
  | 'fairchain_gallery'
  | 'coffee_quiz'
  | 'tasting_bar'
  | 'delivery_tracking'
  | 'settings'
  | 'how_to_play'
  | 'photo_mode'
  | 'bean_found';

export interface OdooOrder {
  orderRef: string;
  date: string;
  status: 'In transit' | 'Delivered' | 'Roasting at Origin' | 'Dispatched';
  items: { name: string; qty: number; price: number }[];
  total: number;
  carrier: string;
  trackingNumber: string;
  originFacility: string;
}
