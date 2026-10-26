import React from 'react';
import { useStore } from '../../store/useStore';
import { WelcomeModal } from './WelcomeModal';
import { ProductDetailModal } from './ProductDetailModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { StoreMapModal } from './StoreMapModal';
import { SubscriptionClubModal } from './SubscriptionClubModal';
import { CustomerSupportModal } from './CustomerSupportModal';
import { FairChainGalleryModal } from './FairChainGalleryModal';
import { CoffeeQuizModal } from './CoffeeQuizModal';
import { TastingBarModal } from './TastingBarModal';
import { DeliveryTrackingModal } from './DeliveryTrackingModal';
import { HowToPlayModal } from './HowToPlayModal';
import { BeanFoundModal } from './BeanFoundModal';

export const ModalContainer: React.FC = () => {
  const { activeModal } = useStore();

  switch (activeModal) {
    case 'welcome':
      return <WelcomeModal />;
    case 'product_detail':
      return <ProductDetailModal />;
    case 'cart_drawer':
      return <CartDrawer />;
    case 'checkout':
      return <CheckoutModal />;
    case 'store_map':
      return <StoreMapModal />;
    case 'subscription_lounge':
      return <SubscriptionClubModal />;
    case 'customer_support':
      return <CustomerSupportModal />;
    case 'fairchain_gallery':
      return <FairChainGalleryModal />;
    case 'coffee_quiz':
      return <CoffeeQuizModal />;
    case 'tasting_bar':
      return <TastingBarModal />;
    case 'delivery_tracking':
      return <DeliveryTrackingModal />;
    case 'how_to_play':
      return <HowToPlayModal />;
    case 'bean_found':
      return <BeanFoundModal />;
    default:
      return null;
  }
};
