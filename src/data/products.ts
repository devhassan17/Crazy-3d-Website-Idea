import { Product, StoreZone } from '../types';

export const MOYEE_PRODUCTS: Product[] = [
  {
    id: 'triple-blend',
    odooId: 6,
    slug: 'triple-1-kg-6',
    name: 'African Triple Blend',
    tagline: 'Full-bodied, complex & balanced with notes of dark chocolate and caramel.',
    badge: 'BESTSELLER',
    price: 6.50,
    currency: '€',
    category: 'beans',
    boldness: 2,
    roastLevel: 'Medium',
    roastLocation: 'Nairobi, Kenya Roastery',
    origins: ['Uganda (Mt. Elgon)', 'Rwanda', 'DR Congo'],
    altitude: '1,600m – 2,100m',
    flavorNotes: ['Dark Chocolate', 'Toasted Hazelnut', 'Caramel', 'Ripe Red Fruit'],
    description:
      'Sourced from high-altitude smallholder estates across East Africa. Each farm brings distinct volcanic terroir and shade-grown agroforestry methods, yielding a full-bodied espresso and filter blend with a velvety sweet finish.',
    fairChainStory:
      'Roasted locally in Nairobi, Kenya at our state-of-the-art facility, leaving 300% more value behind in the country of origin. Smallholders earn 20% above the Living Income Reference Price.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.538 }
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#B45309', // Roasted Copper
    shelfLocation: {
      zone: 'beans_shelf',
      shelfId: 'shelf-beans-1',
      position: [-10.8, 1.8, 4]
    },
    isSubscriptionEligible: true,
    rating: 4.9,
    reviewCount: 342
  },
  {
    id: 'double-blend',
    odooId: 5,
    slug: 'double-1-kg-5',
    name: 'Ethiopian Double Blend',
    tagline: 'Bright Limu citrus blossom paired with sweet sun-dried Jimma cocoa.',
    badge: 'HOUSE SIGNATURE',
    price: 7.00,
    currency: '€',
    category: 'beans',
    boldness: 1,
    roastLevel: 'Light',
    roastLocation: 'Addis Ababa, Ethiopia Roastery',
    origins: ['Limu, Ethiopia', 'Jimma, Ethiopia'],
    altitude: '1,800m – 2,200m',
    flavorNotes: ['Sweet Honey', 'Orange Blossom', 'Milk Chocolate', 'Fruity Cocoa'],
    description:
      'This signature Ethiopian blend unites washed Limu beans (84+ specialty cupping score) with sun-dried natural Jimma beans. A nuanced, silky cup bursting with lively bergamot brightness and a warm brown-sugar finish.',
    fairChainStory:
      'Crafted in our ISO-certified Addis Ababa roastery, empowering over 100 farming families across the Mizan highland forest reserve.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.571 }
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#D97706', // Warm Amber Gold
    shelfLocation: {
      zone: 'beans_shelf',
      shelfId: 'shelf-beans-2',
      position: [-10.8, 1.8, 2]
    },
    isSubscriptionEligible: true,
    rating: 4.8,
    reviewCount: 289
  },
  {
    id: 'dark-roast',
    odooId: 7,
    slug: 'dark-1-kg-7',
    name: 'Ethiopian Dark Roast',
    tagline: 'Deep, smoky cocoa and roasted almonds for a commanding morning espresso.',
    badge: 'INTENSE',
    price: 6.00,
    currency: '€',
    category: 'beans',
    boldness: 3,
    roastLevel: 'Dark',
    roastLocation: 'Addis Ababa, Ethiopia Roastery',
    origins: ['Mizan Forest Reserve, Ethiopia'],
    altitude: '1,900m',
    flavorNotes: ['Dark Cocoa', 'Roasted Almond', 'Smoky Oak', 'Low Acidity'],
    description:
      'Formulated to cut effortlessly through steamed milk for flat whites and cappuccinos, or pulled straight as a syrupy, low-acidristretto with deep dark chocolate intensity.',
    fairChainStory:
      'Grown under native forest canopies in Mizan, Ethiopia alongside wild fig and acacia trees, naturally sequestering carbon every harvest.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.5 }
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#27272A', // Obsidian Charcoal
    shelfLocation: {
      zone: 'beans_shelf',
      shelfId: 'shelf-beans-3',
      position: [-10.8, 1.8, 0]
    },
    isSubscriptionEligible: true,
    rating: 4.9,
    reviewCount: 215
  },
  {
    id: 'rotating-microlot',
    odooId: 30,
    slug: 'ml1000w-microlot-1-kg-subscription-30',
    name: 'Rotating Microlot Series',
    tagline: 'Ultra-rare single micro-lots with anaerobic fermentations for connoisseurs.',
    badge: 'LIMITED EDITION',
    price: 10.50,
    currency: '€',
    category: 'beans',
    boldness: 2,
    roastLevel: 'Omni',
    roastLocation: 'Nairobi & Addis Ababa',
    origins: ['High-Altitude Micro-Estates (Ethiopia, Kenya, Colombia)'],
    altitude: '2,000m+',
    flavorNotes: ['Bergamot', 'Papaya', 'Wild Berries', 'Jasmine'],
    description:
      'Our seasonal single-estate Microlot. Explore boundary-pushing natural and carbonic maceration harvests from master growers. Once a batch is gone, a new harvest takes its place.',
    fairChainStory:
      'Provides micro-lot growers with direct profit margins up to 400% higher than traditional commodity auction rates.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.19 }
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#6D28D9', // Royal Plum
    shelfLocation: {
      zone: 'beans_shelf',
      shelfId: 'shelf-beans-4',
      position: [-10.8, 1.8, -2]
    },
    isSubscriptionEligible: true,
    rating: 5.0,
    reviewCount: 167
  },
  {
    id: 'single-origin-kilimanjaro',
    odooId: 32,
    slug: 'single-1-kg-subscription-32',
    name: 'Single Origin: Mt. Kilimanjaro',
    tagline: 'Glacial volcanic coffee grown at 2,000 meters altitude in Tanzania.',
    badge: 'VOLCANIC SOIL',
    price: 8.50,
    currency: '€',
    category: 'beans',
    boldness: 1,
    roastLevel: 'Medium',
    roastLocation: 'Small-Batch Roasted at Origin',
    origins: ['Slopes of Mount Kilimanjaro & Meru, Tanzania'],
    altitude: '2,000m',
    flavorNotes: ['Floral Bouquet', 'Red Currant', 'Blood Orange', 'Mountain Honey'],
    description:
      'High-altitude volcanic treasure. Glacial meltwater, equatorial sunshine, and cool mountain nights allow cherries to mature slowly, concentrating sugars into extraordinary floral sweetness.',
    fairChainStory:
      'Direct partnerships with smallholder farmer cooperatives on the southern slopes of Kilimanjaro.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.176 }
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#0F766E', // Deep Emerald Teal
    shelfLocation: {
      zone: 'beans_shelf',
      shelfId: 'shelf-beans-5',
      position: [-10.8, 1.8, -4]
    },
    isSubscriptionEligible: true,
    rating: 4.9,
    reviewCount: 94
  },
  {
    id: 'lungo-capsules',
    odooId: 9,
    slug: 'caplungo25-lungo-capsules-9',
    name: 'Lungo Capsules (25 Pods)',
    tagline: '100% Nespresso-compatible pods engineered for aromatic longer extractions.',
    badge: 'NESPRESSO® FIT',
    price: 10.00,
    currency: '€',
    category: 'capsules',
    boldness: 2,
    roastLevel: 'Medium',
    roastLocation: 'Sealed in Nitrogen Atmosphere',
    origins: ['Ethiopia (Limu & Jimma)'],
    altitude: '1,850m',
    flavorNotes: ['Dark Chocolate', 'Toasted Almond', 'Velvety Body'],
    description:
      '25 specialty coffee capsules precision-ground and hermetically sealed with a nitrogen barrier to lock in peak roastery aroma for 18+ months.',
    fairChainStory:
      'Compostable biopolymer pods filled with direct-trade East African specialty coffee.',
    weights: [{ label: '25 Capsules', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Espresso Grind'],
    inStock: true,
    colorHex: '#B45309',
    shelfLocation: {
      zone: 'capsules_shelf',
      shelfId: 'shelf-capsules-1',
      position: [10.8, 1.8, 4]
    },
    isSubscriptionEligible: true,
    rating: 4.8,
    reviewCount: 178
  },
  {
    id: 'espresso-capsules',
    odooId: 10,
    slug: 'capespresso25-espresso-capsules-10',
    name: 'Espresso Capsules (25 Pods)',
    tagline: 'Intense, creamy espresso with thick hazelnut crema and dark chocolate.',
    badge: '25% OFF BUNDLE',
    price: 10.00,
    currency: '€',
    category: 'capsules',
    boldness: 3,
    roastLevel: 'Dark',
    roastLocation: 'Sealed in Nitrogen Atmosphere',
    origins: ['Ethiopia & Kenya'],
    altitude: '1,900m',
    flavorNotes: ['Dark Chocolate', 'Nutty Walnut', 'Spicy Crema'],
    description:
      '25 capsules crafted for high-pressure espresso extraction. Delivers a full-strength shot with dense tiger-stripe crema and lingering cocoa richness.',
    fairChainStory:
      'Directly supports origin roasting facilities and living income programs with every morning espresso.',
    weights: [{ label: '25 Capsules', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Espresso Grind'],
    inStock: true,
    colorHex: '#3E2723',
    shelfLocation: {
      zone: 'capsules_shelf',
      shelfId: 'shelf-capsules-2',
      position: [10.8, 1.8, 2]
    },
    isSubscriptionEligible: true,
    rating: 4.9,
    reviewCount: 221
  },
  {
    id: 'decaf-capsules',
    odooId: 11,
    slug: 'capdecaf25-decaf-capsules-11',
    name: 'Mountain Water Decaf (25 Pods)',
    tagline: 'All the deep flavor of highland Ethiopian coffee — zero caffeine.',
    badge: 'SOLVENT-FREE',
    price: 10.00,
    currency: '€',
    category: 'capsules',
    boldness: 2,
    roastLevel: 'Medium',
    roastLocation: 'Sealed in Nitrogen Atmosphere',
    origins: ['Limu, Ethiopia'],
    altitude: '1,800m',
    flavorNotes: ['Sweet Walnut', 'Dark Chocolate', 'Balanced Smoothness'],
    description:
      'Naturally decaffeinated using pure glacial mountain water osmosis. Zero chemical solvents, preserving 100% of the delicate origin lipids and aromatics.',
    fairChainStory:
      'Proving that late-night decaf espresso can deliver uncompromising specialty cupping scores.',
    weights: [{ label: '25 Capsules', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Espresso Grind'],
    inStock: true,
    colorHex: '#0D9488',
    shelfLocation: {
      zone: 'capsules_shelf',
      shelfId: 'shelf-capsules-3',
      position: [10.8, 1.8, 0]
    },
    isSubscriptionEligible: true,
    rating: 4.7,
    reviewCount: 88
  },
  {
    id: 'fairchain-tasting-pack',
    odooId: 50,
    slug: 'packs-bundle-tasting-pack',
    name: 'Artisan Roaster Tasting Bundle',
    tagline: 'Triple Blend 1kg + Double Blend 250g + Heavyweight Ceramic Tasting Mug.',
    badge: 'SAVE €12',
    price: 36.00,
    currency: '€',
    category: 'bundles',
    boldness: 2,
    roastLevel: 'Medium',
    roastLocation: 'Nairobi & Addis Ababa',
    origins: ['East Africa Multi-Origin'],
    flavorNotes: ['Dark Chocolate', 'Orange Blossom', 'Honey', 'Caramel'],
    description:
      'The definitive introduction to direct-origin specialty coffee. Experience both our flagship African Triple Blend and our floral Ethiopian Double Blend, paired with our matte stoneware tasting mug.',
    fairChainStory:
      'Directly funds the planting of 2 native shade trees in our agroforestry reserve with every bundle purchased.',
    weights: [{ label: '1kg', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#9A3412',
    shelfLocation: {
      zone: 'bundles_shelf',
      shelfId: 'shelf-bundle-1',
      position: [10.8, 1.8, -2]
    },
    isSubscriptionEligible: false,
    rating: 5.0,
    reviewCount: 412
  }
];

export const STORE_ZONES: StoreZone[] = [
  {
    id: 'exterior',
    title: 'City Street & Facade',
    subtitle: 'Downtown Boulevard & Flagship Terrace',
    description: 'Outside on the bustling city boulevard with parked cars, sidewalk café seating, and architectural glass facade.',
    position: [0, 1.7, 23],
    cameraTarget: [0, 2.5, 14],
    rotationY: 0,
    icon: 'Store'
  },
  {
    id: 'entrance',
    title: 'Main Foyer',
    subtitle: 'Flagship Roastery Entrance',
    description: 'Inside the architectural glass foyer overlooking the main coffee showroom.',
    position: [0, 1.7, 12],
    cameraTarget: [0, 2.0, 0],
    rotationY: 0,
    icon: 'DoorOpen'
  },
  {
    id: 'beans_shelf',
    title: 'Specialty Coffee Beans',
    subtitle: 'Single Estate & Origin Roasts',
    description: 'Browse Triple Blend, Double Blend, Dark Roast, Microlots, and Kilimanjaro single origins.',
    position: [-8.5, 1.7, 1],
    cameraTarget: [-11, 2.0, 1],
    rotationY: Math.PI / 2,
    icon: 'Coffee'
  },
  {
    id: 'capsules_shelf',
    title: 'Capsules & Pods Display',
    subtitle: 'Nespresso® Compatible Station',
    description: 'Explore Lungo, Espresso, and Mountain Water Decaf nitrogen-sealed capsules.',
    position: [8.5, 1.7, 1],
    cameraTarget: [11, 2.0, 1],
    rotationY: -Math.PI / 2,
    icon: 'PackageCheck'
  },
  {
    id: 'bundles_shelf',
    title: 'Gift Packs & Bundles',
    subtitle: 'Tasting Boxes & Ceramic Gear',
    description: 'Starter kits, curated discovery bundles, and barista accessories.',
    position: [8.5, 1.7, -3],
    cameraTarget: [11, 2.0, -3],
    rotationY: -Math.PI / 2,
    icon: 'Gift'
  },
  {
    id: 'tasting_bar',
    title: 'Espresso & Tasting Bar',
    subtitle: 'Live Barista Brew Station',
    description: 'Watch espresso extraction demonstrations, talk with Head Barista Amara, and sample roasts.',
    position: [-4.5, 1.7, -7],
    cameraTarget: [-4.5, 2.0, -10],
    rotationY: Math.PI,
    icon: 'CupSoda'
  },
  {
    id: 'checkout_counter',
    title: 'Checkout Counter',
    subtitle: 'POS Terminal & Cashier',
    description: 'Review your shopping basket, apply discount codes, and complete your order.',
    position: [4.5, 1.7, -7],
    cameraTarget: [4.5, 2.0, -10],
    rotationY: Math.PI,
    icon: 'CreditCard'
  },
  {
    id: 'subscription_lounge',
    title: 'Roaster Club Lounge',
    subtitle: 'Automatic Home Delivery',
    description: 'Relax in the leather armchairs, customize delivery schedules, and unlock free shipping.',
    position: [-8, 1.7, -11.5],
    cameraTarget: [-8, 2.0, -14],
    rotationY: Math.PI,
    icon: 'Sparkles'
  },
  {
    id: 'fairchain_gallery',
    title: 'Origin Impact Gallery',
    subtitle: 'Interactive 3D Earth & Supply Chain',
    description: 'Inspect the 3D globe to trace beans from Ethiopia and Kenya and view real-time sustainability metrics.',
    position: [0, 1.7, -11.5],
    cameraTarget: [0, 2.0, -14],
    rotationY: Math.PI,
    icon: 'Globe'
  },
  {
    id: 'helpdesk',
    title: 'Concierge & Support Desk',
    subtitle: 'Customer Care & Post Station',
    description: 'Chat with Melanie at the concierge desk, submit inquiries, or browse store FAQs.',
    position: [8, 1.7, -11.5],
    cameraTarget: [8, 2.0, -14],
    rotationY: Math.PI,
    icon: 'HelpCircle'
  },
  {
    id: 'coffee_quiz',
    title: 'Sommelier Finder Kiosk',
    subtitle: 'Match Your Roast in 4 Questions',
    description: 'Take the interactive taste profile quiz to discover your ideal roast, grind, and origin.',
    position: [-5.5, 1.7, 7.5],
    cameraTarget: [-7, 2.0, 7.5],
    rotationY: Math.PI / 2,
    icon: 'CheckCircle2'
  },
  {
    id: 'delivery_desk',
    title: 'Dispatch & Order Tracking',
    subtitle: 'Live Logistics Desk',
    description: 'Check active order numbers, track courier parcels, and view roast-to-doorstep milestones.',
    position: [5.5, 1.7, 7.5],
    cameraTarget: [7, 2.0, 7.5],
    rotationY: -Math.PI / 2,
    icon: 'Truck'
  }
];
