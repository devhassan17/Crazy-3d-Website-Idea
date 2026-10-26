import { Product, StoreZone } from '../types';

export const MOYEE_PRODUCTS: Product[] = [
  {
    id: 'triple-blend',
    odooId: 6,
    slug: 'triple-1-kg-6',
    name: 'African Triple Blend',
    tagline: 'Full-bodied, complex & balanced with notes of dark chocolate and caramel.',
    badge: 'BESTSELLER',
    price: 6.50, // Base price 250g
    currency: '€',
    category: 'beans',
    boldness: 2,
    roastLevel: 'Medium',
    roastLocation: 'Nairobi, Kenya Roastery',
    origins: ['Uganda (Mt. Elgon)', 'Rwanda', 'DR Congo'],
    altitude: '1,600m – 2,100m',
    flavorNotes: ['Dark Chocolate', 'Toasted Hazelnut', 'Caramel', 'Ripe Red Fruit'],
    description:
      'For some coffee drinkers, three beans are better than two or one. Our African Triple Blend is a case in point. The beans are sourced from smallholder farms across East Africa. Each farm has its own special characteristics, regenerative agroforestry methods, and terroir. The result is a full-bodied blend with a sweet finish and moderate acidity.',
    fairChainStory:
      'Roasted locally in Nairobi, Kenya at our state-of-the-art facility, leaving 300% more value behind in the country of origin. Smallholders earn 20% above the Living Income Reference Price.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.538 } // €23.00
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#E5007D', // Iconic Moyee Pink
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
    tagline: 'The best of both worlds: bright Limu fruitiness paired with sweet Jimma cocoa.',
    badge: 'FAIRCHAIN ORIGINAL',
    price: 7.00, // Base price 250g
    currency: '€',
    category: 'beans',
    boldness: 1,
    roastLevel: 'Light',
    roastLocation: 'Addis Ababa, Ethiopia Roastery',
    origins: ['Limu, Ethiopia', 'Jimma, Ethiopia'],
    altitude: '1,800m – 2,200m',
    flavorNotes: ['Sweet Honey', 'Orange Blossom', 'Milk Chocolate', 'Fruity Cocoa'],
    description:
      'This historic Ethiopian blend brings together washed Limu beans (80+ specialty cupping score) and sweeter sun-dried unwashed Jimma beans. A smooth, nuanced cup bursting with lively citrus brightness and a comforting brown-sugar chocolate finish.',
    fairChainStory:
      'Crafted in our ISO-certified Addis Ababa roastery, which serves as an incubator for female leadership and local roasting entrepreneurs. Every bag directly empowers 107 farming families on Mizan Farm.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.571 } // €25.00
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#FFD900', // Rebel Yellow
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
    tagline: 'Deep, smoky cocoa and roasted almonds for a fearless morning kickstart.',
    badge: 'INTENSE',
    price: 6.00,
    currency: '€',
    category: 'beans',
    boldness: 3,
    roastLevel: 'Dark',
    roastLocation: 'Addis Ababa, Ethiopia Roastery',
    origins: ['Mizan Farm, Ethiopia'],
    altitude: '1,900m',
    flavorNotes: ['Dark Cocoa', 'Roasted Almond', 'Smoky Oak', 'Low Acidity'],
    description:
      'Some mornings demand a commanding kick. Formulated specifically to cut through milk for lattes and cappuccinos or enjoyed black for a velvety, low-acid, intense dark chocolate profile.',
    fairChainStory:
      'Grown on our 247-hectare forest laboratory in Mizan, Ethiopia, where coffee grows under native canopies alongside banana and guava trees, sequestering tons of carbon per year.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.5 } // €21.00
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#272727', // Charcoal
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
    tagline: 'Ultra-rare single micro-lots with experimental fermentations for true coffee geeks.',
    badge: 'LIMITED EDITION',
    price: 10.50,
    currency: '€',
    category: 'beans',
    boldness: 2,
    roastLevel: 'Omni',
    roastLocation: 'Nairobi & Addis Ababa',
    origins: ['Rotating Micro-Farms Worldwide (Ethiopia, Kenya, Colombia)'],
    altitude: '2,000m+',
    flavorNotes: ['Bergamot', 'Papaya', 'Wild Berries', 'Jasmine'],
    description:
      'Our monthly rotating Microlot. Throw on your backpack and explore boundary-pushing natural and anaerobic fermentations from master growers. When this harvest batch sells out, a new lot takes its place.',
    fairChainStory:
      'Provides micro-lot growers with direct-to-consumer profit margins up to 400% higher than traditional auction market rates.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.19 } // €33.50
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#9C27B0', // Purple
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
    roastLocation: 'Precision Roasted in Amsterdam & Origin',
    origins: ['Slopes of Mount Kilimanjaro & Meru, Tanzania'],
    altitude: '2,000m',
    flavorNotes: ['Floral Bouquet', 'Red Currant', 'Blood Orange', 'Mountain Honey'],
    description:
      'High-altitude volcanic treasure. Glacial meltwater, blazing equatorial days, and freezing nights cause the cherries to ripen slowly over months, concentrating sugars into extraordinary floral sweetness.',
    fairChainStory:
      'Direct partnerships with smallholder farmer cooperatives on the high slopes of Kilimanjaro.',
    weights: [
      { label: '250g', priceMultiplier: 1, isDefault: true },
      { label: '1kg', priceMultiplier: 3.176 } // €27.00
    ],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#00BCD4', // Cyan
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
    roastLocation: 'Freshly sealed in nitrogen atmosphere',
    origins: ['Ethiopia (Limu & Jimma)'],
    altitude: '1,850m',
    flavorNotes: ['Dark Chocolate', 'Toasted Almond', 'Velvety Body'],
    description:
      '25 specialty coffee capsules roasted with care. Sealed with nitrogen barrier to ensure total oxygen-free freshness for over 18 months.',
    fairChainStory:
      'Capsules that do not compromise on ethics. Premium African specialty coffee sealed at peak aroma.',
    weights: [{ label: '25 Capsules', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Espresso Grind'],
    inStock: true,
    colorHex: '#E5007D',
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
    tagline: 'Intense, creamy espresso with thick crema and rich dark chocolate.',
    badge: '25% OFF BUNDLE',
    price: 10.00,
    currency: '€',
    category: 'capsules',
    boldness: 3,
    roastLevel: 'Dark',
    roastLocation: 'Freshly sealed in nitrogen atmosphere',
    origins: ['Ethiopia & Kenya'],
    altitude: '1,900m',
    flavorNotes: ['Dark Chocolate', 'Nutty Walnut', 'Spicy Crema'],
    description:
      '25 capsules for espresso enthusiasts. An aromatic, full-strength roast with deep cocoa notes and rich, dense crema.',
    fairChainStory:
      'Buy 3 bags and get 25% off automatically. Backing FairChain farmers with every morning espresso shot.',
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
    name: 'Decaf Capsules (25 Pods)',
    tagline: 'All the deep flavor of dark roast Ethiopian coffee — zero caffeine.',
    badge: 'SOLVENT-FREE',
    price: 10.00,
    currency: '€',
    category: 'capsules',
    boldness: 2,
    roastLevel: 'Medium',
    roastLocation: 'Freshly sealed in nitrogen atmosphere',
    origins: ['Limu, Ethiopia'],
    altitude: '1,800m',
    flavorNotes: ['Sweet Walnut', 'Dark Chocolate', 'Balanced Smoothness'],
    description:
      'Naturally decaffeinated using pure mountain water processing. No harsh chemical solvents, keeping all delicate flavor lipids intact.',
    fairChainStory:
      'FairChain decaf directly proves that conscious coffee does not require settling for poor taste.',
    weights: [{ label: '25 Capsules', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Espresso Grind'],
    inStock: true,
    colorHex: '#00897B', // Teal
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
    slug: 'packs-bundle-fairchain-tasting-pack',
    name: 'FairChain Rebel Starter Bundle',
    tagline: 'Triple Blend 1kg + Double Blend 250g + Limited Edition Moyee Enamel Mug.',
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
      'The ultimate introduction to radically good coffee. Experience both our bestseller African Triple and our fruity Ethiopian Double, complete with our signature hot-pink enamel campfire mug.',
    fairChainStory:
      'Directly funds the planting of 2 new shade trees on Mizan farm with every bundle purchased.',
    weights: [{ label: '1kg', priceMultiplier: 1, isDefault: true }],
    grindOptions: ['Whole Beans', 'Filter Grind', 'Espresso Grind'],
    inStock: true,
    colorHex: '#E5007D',
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
    title: 'Storefront Entrance',
    subtitle: 'Amsterdam Street & Welcoming Facade',
    description: 'Outside the illuminated glass building on the Amsterdam canal street pavement.',
    position: [0, 1.7, 24],
    cameraTarget: [0, 2.5, 14],
    rotationY: 0,
    icon: 'Store'
  },
  {
    id: 'entrance',
    title: 'Welcome Foyer',
    subtitle: 'Main Store Entrance',
    description: 'Inside the threshold with a direct view of the entire shopping showroom.',
    position: [0, 1.7, 12],
    cameraTarget: [0, 2.0, 0],
    rotationY: 0,
    icon: 'DoorOpen'
  },
  {
    id: 'beans_shelf',
    title: 'Specialty Coffee Beans',
    subtitle: 'Wall of FairChain Roasts',
    description: 'Browse Triple Blend, Double Blend, Dark Roast, Microlots and Kilimanjaro single origins.',
    position: [-8.5, 1.7, 1],
    cameraTarget: [-11, 2.0, 1],
    rotationY: Math.PI / 2,
    icon: 'Coffee'
  },
  {
    id: 'capsules_shelf',
    title: 'Capsules & Pods Display',
    subtitle: 'Nespresso® Compatible Station',
    description: 'Explore Lungo, Espresso, and Decaf nitrogen-sealed oxygen-free capsules.',
    position: [8.5, 1.7, 1],
    cameraTarget: [11, 2.0, 1],
    rotationY: -Math.PI / 2,
    icon: 'PackageCheck'
  },
  {
    id: 'bundles_shelf',
    title: 'Gift Packs & Bundles',
    subtitle: 'Tasting Boxes & Gear',
    description: 'Starter kits, curated discovery bundles, and custom Moyee accessories.',
    position: [8.5, 1.7, -3],
    cameraTarget: [11, 2.0, -3],
    rotationY: -Math.PI / 2,
    icon: 'Gift'
  },
  {
    id: 'tasting_bar',
    title: 'Coffee Tasting Bar',
    subtitle: 'Live Barista Experience',
    description: 'Watch coffee brewing demonstrations, talk with our virtual barista, and sample roasts.',
    position: [-4.5, 1.7, -7],
    cameraTarget: [-4.5, 2.0, -10],
    rotationY: Math.PI,
    icon: 'CupSoda'
  },
  {
    id: 'checkout_counter',
    title: 'Checkout Counter',
    subtitle: 'Payment Kiosk & Cashier',
    description: 'Review your shopping basket, apply discount codes, and complete your order with Odoo 18.',
    position: [4.5, 1.7, -7],
    cameraTarget: [4.5, 2.0, -10],
    rotationY: Math.PI,
    icon: 'CreditCard'
  },
  {
    id: 'subscription_lounge',
    title: 'Subscription Club Lounge',
    subtitle: 'Never Run Out of Coffee',
    description: 'Relax in the leather armchairs, customize delivery frequencies, and unlock free shipping.',
    position: [-8, 1.7, -11.5],
    cameraTarget: [-8, 2.0, -14],
    rotationY: Math.PI,
    icon: 'Sparkles'
  },
  {
    id: 'fairchain_gallery',
    title: 'FairChain Impact Gallery',
    subtitle: 'The 3D Origin Experience',
    description: 'Touch the 3D globe to trace beans from Ethiopia and Kenya, and view real-time carbon data.',
    position: [0, 1.7, -11.5],
    cameraTarget: [0, 2.0, -14],
    rotationY: Math.PI,
    icon: 'Globe'
  },
  {
    id: 'helpdesk',
    title: 'Moyee Customer Support',
    subtitle: 'Charming Mini Post Office',
    description: 'Chat with Melanie from Kenya, ask questions, submit feedback, or browse store FAQs.',
    position: [8, 1.7, -11.5],
    cameraTarget: [8, 2.0, -14],
    rotationY: Math.PI,
    icon: 'HelpCircle'
  },
  {
    id: 'coffee_quiz',
    title: 'Coffee Finder Kiosk',
    subtitle: 'Find Your Perfect Match in 4 Questions',
    description: 'Take the smart interactive quiz to discover your ideal roast, grind, and boldness.',
    position: [-5.5, 1.7, 7.5],
    cameraTarget: [-7, 2.0, 7.5],
    rotationY: Math.PI / 2,
    icon: 'CheckCircle2'
  },
  {
    id: 'delivery_desk',
    title: 'Delivery & Order Tracking',
    subtitle: 'Real-Time Dispatch Desk',
    description: 'Check active Odoo order numbers, track parcels, and view delivery estimates.',
    position: [5.5, 1.7, 7.5],
    cameraTarget: [7, 2.0, 7.5],
    rotationY: -Math.PI / 2,
    icon: 'Truck'
  }
];
