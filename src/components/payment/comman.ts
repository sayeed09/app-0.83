import dayjs from 'dayjs';

import { getVariantIds, trackMoEngageAppEvent } from '@utils/common';
import { convertToRupees } from 'utils/currency-utils';

export const trackContinueShopping = (
  lineItems,
  orderSubTotal,
  orderTotal,
  discountCode,
  paymentMethodInState,
  trackingTransparency,
  skipGATrack?: boolean,
) => {
  const cartValues = getVariantIds(lineItems);

  trackMoEngageAppEvent({
    event: 'make_payment_app',
    values: [
      { eventAttribute: 'category_name', value: '' },
      { eventAttribute: 'category_id', value: '' },
      {
        eventAttribute: 'product_name',
        value: cartValues.names.toString(),
      },
      { eventAttribute: 'product_id', value: cartValues.ids.toString() },
      {
        eventAttribute: 'price',
        value: convertToRupees(+cartValues.price).toString(),
      },
      {
        eventAttribute: 'quantity',
        value: cartValues?.quantity.toString(),
      },
      { eventAttribute: 'cart_amount', value: convertToRupees(orderSubTotal) },
      { eventAttribute: 'purchase_amount', value: convertToRupees(orderTotal) },
      {
        eventAttribute: 'order_address_city',
        value: '',
      },
      {
        eventAttribute: 'order_address_pin',
        value: '',
      },
      {
        eventAttribute: 'coupon_code_applied',
        value: discountCode?.code !== '',
      },
      {
        eventAttribute: 'coupon_code_applied_value',
        value: discountCode?.code,
      },
      {
        eventAttribute: 'coupon_code_applied_amount',
        value: convertToRupees(+cartValues.discount).toString(),
      },
      { eventAttribute: 'purchase_mode', value: paymentMethodInState },
      {
        eventAttribute: 'purchase_date',
        value: dayjs(new Date()).format('YYYY-MM-DD'),
      },
      {
        eventAttribute: 'payment_status',
        value: '',
      },
      {
        eventAttribute: 'payment_mode',
        value: paymentMethodInState,
      },
      { eventAttribute: 'url', value: '' },
    ],
    trackingTransparency,
    skipGATrack,
  });
};
