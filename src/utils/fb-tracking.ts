import { AppEventsLogger } from 'react-native-fbsdk-next';

import { GAItem } from 'models/ga-tracking';
const CURRENCY = 'INR';

const trackAddToCart = ({ item_id, item_name, price, quantity }: GAItem) => {
  let cartItem: any = {
    content_name: item_name,
    content_category: item_name,
    content_ids: [item_id],
    content_type: 'product',
    value: price,
    currency: CURRENCY,
  };
  AppEventsLogger.logEvent(AppEventsLogger.AppEvents.AddedToCart, cartItem);
};

const trackCheckout = (items: GAItem[], coupon: string | undefined) => {
  let checkoutItem: any = {
    content_ids: items.map(item => item.item_id),
    content_type: 'product',
    value: items.reduce((prev, curr) => prev + curr.price, 0),
    currency: CURRENCY,
    num_items: items.length,
    contents: items,
  };
  AppEventsLogger.logEvent(
    AppEventsLogger.AppEvents.InitiatedCheckout,
    checkoutItem,
  );
};

const trackPurchase = (items: GAItem[], orderTotal: number) => {
  let purchaseItem: any = {
    content_ids: items.map(item => item.item_id),
    content_type: 'product',
    value: items.reduce((prev, curr) => prev + curr.price, 0),
    currency: CURRENCY,
    num_items: items.length,
    contents: items,
  };
  AppEventsLogger.logPurchase(orderTotal, CURRENCY, purchaseItem);
};

export const FBTrackingService = {
  trackAddToCart,
  trackCheckout,
  trackPurchase,
};
