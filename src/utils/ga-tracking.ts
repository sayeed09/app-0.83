import analytics from '@react-native-firebase/analytics';
import {
  Checkout,
  GAAddToCart,
  GAItem,
  PaymentInfo,
  Purchase,
} from 'models/ga-tracking';
const CURRENCY = 'INR';

const trackViewProduct = ({ item_id, item_name, price, quantity }: GAItem) => {
  let cartItem: GAAddToCart = {
    currency: CURRENCY,
    items: [{ item_id, item_name, price, quantity }],
    value: price,
  };

  analytics().logViewItem(cartItem);
};

const trackAddToCart = ({ item_id, item_name, price, quantity }: GAItem) => {
  const cartItem: GAAddToCart = {
    currency: CURRENCY,
    items: [{ item_id, item_name, price, quantity }],
    value: price,
  };
  const and = analytics();

  analytics().logAddToCart(cartItem);
};

const trackRemoveFromCart = ({
  item_id,
  item_name,
  price,
  quantity,
}: GAItem) => {
  const cartItem: GAAddToCart = {
    currency: CURRENCY,
    items: [{ item_id, item_name, price, quantity }],
    value: price,
  };
  analytics().logRemoveFromCart(cartItem);
};

const trackViewCart = (items: GAItem[]) => {
  const cartItem: GAAddToCart = {
    currency: CURRENCY,
    items: items,
    value: items.reduce((prev, curr) => prev + curr.price, 0),
  };
  analytics().logViewCart(cartItem);
};

const trackCheckout = (items: GAItem[], coupon: string | undefined) => {
  const checkoutItem: Checkout = {
    currency: CURRENCY,
    items: items,
    value: items.reduce((prev, curr) => prev + curr.price, 0),
    coupon: coupon ?? '',
  };
  analytics().logBeginCheckout(checkoutItem);
};

const trackShippingInfo = (items: GAItem[], coupon: string | undefined) => {
  const checkoutItem: Checkout = {
    currency: CURRENCY,
    items: items,
    value: items.reduce((prev, curr) => prev + curr.price, 0),
    coupon: coupon ?? '',
  };
  analytics().logAddShippingInfo(checkoutItem);
};

const trackPaymentInfo = (
  items: GAItem[],
  coupon: string | undefined,
  orderTotal: number,
  paymentType: string,
) => {
  let purchaseItems: PaymentInfo = {
    currency: CURRENCY,
    items: items,
    value: orderTotal,
    coupon: coupon ?? '',
    payment_type: paymentType,
  };
  analytics().logAddPaymentInfo(purchaseItems);
};

const trackPurchase = (
  items: GAItem[],
  coupon: string | undefined,
  transaction_id: string,
  shipping: number,
  orderTotal: number,
) => {
  let purchaseItems: Purchase = {
    currency: CURRENCY,
    items: items,
    value: orderTotal,
    coupon: coupon ?? '',
    transaction_id: transaction_id,
    shipping: shipping,
  };
  analytics().logPurchase(purchaseItems);
};

const trackCustomEvent = (eventName: string, params: any) => {
  analytics().logEvent(eventName, params);
};
export const GATrackingService = {
  trackViewProduct,
  trackAddToCart,
  trackPaymentInfo,
  trackCheckout,
  trackRemoveFromCart,
  trackPurchase,
  trackShippingInfo,
  trackViewCart,
  trackCustomEvent,
};
