import React, { useState } from 'react';
import { setIsPaymentProcessing, setPaymentError } from 'actions/checkout';
import { useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { PaymentMethodType } from 'models/payment';
import {
  CreateSubscriptionBody,
} from 'models/product-details/subscription-plan-response';
import {
  confirmSubscriptionRazorPayOrder,
  createSubscription,
  getSubscriptionPaymentCallback,
} from 'services/checkout';
import { PLATFORM_HEADERS } from 'utils/constants';
import RazorpayCheckout from 'react-native-customui';
import { trackMoEngageAppEvent } from 'utils/common';
import { Platform } from 'react-native';
import useLogin from './login';

const usePayment = () => {
  const checkoutDispatch = useCheckoutDispatch();
  const { handleLogout } = useLogin();
  const {
    isPaymentProcessing,
    setPaymentError: paymentError,
    subscriptionAddress,
    payment_method: paymentMethod,
  } = useCheckoutState();
  const { subscriptionCart } = useCartState();
  const [deviceId, setDeviceId] = useState<string>('');

  const proceedToSubscriptionPayment = async (options, navigation) => {
    trackPayment(`Proceed_CTA_Click_app`);
    checkoutDispatch(setIsPaymentProcessing(true));
    const createSubscriptionResponse = await createSubscription(
      JSON.stringify(createPaymentPayload()),
    );
    if (!createSubscriptionResponse) {
      checkoutDispatch(setIsPaymentProcessing(false));
      checkoutDispatch(setPaymentError('payment error'));
      return;
    }
    if (paymentMethod != PaymentMethodType.COD) {
      const customOptions = { ...options };
      customOptions.subscription_id = createSubscriptionResponse?.data?.id;
      checkoutDispatch(setIsPaymentProcessing(true));
      RazorpayCheckout.open(customOptions)
        .then(async data => {
          try {
            const confirmOrderBody = {
              razorpayPaymentId: data?.razorpay_payment_id,
              razorpaySubscriptionId: data?.razorpay_subscription_id,
              razorpaySignature: data?.razorpay_signature,
            };
            const confirmOrder = await confirmSubscriptionRazorPayOrder(
              confirmOrderBody,
            );
            if (confirmOrder?.data?.order_number) {
              navigation.navigate('SubscriptionOrderConfirmationScreen', {
                orderId: confirmOrder?.data?.order_number,
                nextOrder: createSubscriptionResponse?.data?.next_order,
                subscriptionId: createSubscriptionResponse?.data?.id,
              });
            } else {
              checkoutDispatch(setIsPaymentProcessing(false));
              checkoutDispatch(setPaymentError('payment error'));
            }
          } catch (error) {
            console.log(error, 'error in order confirmation');
            checkoutDispatch(setIsPaymentProcessing(false));
            checkoutDispatch(setPaymentError('payment error'));
          }
        })
        .catch(error => {
          console.log(`Error: ${error.code} | ${error.description}`);
          checkoutDispatch(setIsPaymentProcessing(false));
          checkoutDispatch(setPaymentError('payment error'));
          if(error?.response?.status === 401){
            handleLogout();
            navigation.navigate('CartScreen');
          }
        });
    } else if (createSubscriptionResponse) {
      const codCallback = await getSubscriptionPaymentCallback(
        createSubscriptionResponse?.data,
      );
      if (codCallback) {
        const orderId = codCallback?.data?.order_number;
        if (orderId) {
          navigation.navigate('SubscriptionOrderConfirmationScreen', {
            orderId,
            nextOrder: createSubscriptionResponse?.data?.next_order,
            subscriptionId: createSubscriptionResponse?.data?.id,
          });
        } else {
          checkoutDispatch(setIsPaymentProcessing(false));
          checkoutDispatch(setPaymentError('payment error'));
        }
      } else {
        // ToDo:// handle all the messages w.r.t error
        checkoutDispatch(setIsPaymentProcessing(false));
        checkoutDispatch(setPaymentError('payment error'));
      }
    }
    trackPayment(
      `Sub_${paymentMethod == PaymentMethodType.UPI ? 'UPI' : 'COD'}_Click_app`,
    );
  };
  const createPaymentPayload = () => {
    const paymentData: CreateSubscriptionBody = {
      customer_id: 'NULL',
      first_name: subscriptionAddress?.firstName as string,
      last_name: subscriptionAddress?.lastName as string,
      subscriber_mobile: subscriptionAddress?.phone as string,
      product_info: subscriptionCart?.title as string,
      amount: subscriptionCart?.selectedPlan?.base_price as number,
      accept_marketing: true,
      custom_parameter: {
        billing_address: {
          zip: subscriptionAddress?.zip as string,
          city: subscriptionAddress?.city as string,
          province: subscriptionAddress?.province as string,
          country: subscriptionAddress?.country as string,
          address1: subscriptionAddress?.address1 as string,
          address2: subscriptionAddress?.address2 as string,
          phone: subscriptionAddress?.phone as string,
        },
        shipping_address: {
          zip: subscriptionAddress?.zip as string,
          city: subscriptionAddress?.city as string,
          province: subscriptionAddress?.province as string,
          country: subscriptionAddress?.country as string,
          address1: subscriptionAddress?.address1 as string,
          address2: subscriptionAddress?.address2 as string,
          phone: subscriptionAddress?.phone as string,
        },
        variant_id: subscriptionCart?.id.toString() as string,
      },
      subscription_plans: [
        {
          totalCount: subscriptionCart?.selectedPlan
            ?.subscription_interval as number,
          planId: subscriptionCart?.selectedPlan?.plan_id as string,
        },
      ],
      realPrice: subscriptionCart?.selectedPlan?.compare_at_price as number,
      discountedPrice: subscriptionCart?.selectedPlan?.base_price as number,
      payment_mode: paymentMethod === PaymentMethodType.COD ? 'COD' : 'PREPAID',
      channel: PLATFORM_HEADERS.channel,
    };

    if (deviceId) {
      paymentData.deviceId = deviceId;
    }
    return paymentData;
  };
  const trackPayment = (eventName: string) => {
    trackMoEngageAppEvent({
      event: eventName,
      values: [
        {
          eventAttribute: 'Product name',
          value: subscriptionCart?.title,
        },
        {
          eventAttribute: 'Variant ID',
          value: subscriptionCart?.variant_id,
        },
        {
          eventAttribute: 'Duration',
          value: subscriptionCart?.selectedPlan?.subscription_interval,
        },
        {
          eventAttribute: 'Customer name',
          value: `${subscriptionAddress?.firstName} ${subscriptionAddress?.lastName}`,
        },
        {
          eventAttribute: 'Customer phone number',
          value: subscriptionAddress?.phone,
        },
        {
          eventAttribute: 'Customer Address',
          value: subscriptionAddress?.address1,
        },
        {
          eventAttribute: 'Customer pincode',
          value: subscriptionAddress?.zip,
        },
      ],
      skipGATrack: true,
      trackingTransparency: true,
    });
  };
  return { trackPayment, proceedToSubscriptionPayment };
};
export default usePayment;
