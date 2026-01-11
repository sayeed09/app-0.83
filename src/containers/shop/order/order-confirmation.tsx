import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import crashlytics from '@react-native-firebase/crashlytics';
import { clearCart } from 'actions/cart';
import { setIsPaymentProcessing } from 'actions/checkout';
import AddressCard from 'components/address/address-card';
import { Hr } from 'components/base/foundation';
import { BaseView } from 'components/base/view';
import WhiteCard from 'components/elements/card/white-card';
import Loader from 'components/elements/loader/loader';
import OrderConfirmationPriceDetails from 'components/order/order-confirmation-price-details';
import OrderConfirmationPopupWidget from 'components/order/order-confirmation-promo-widget';
import OrderDeliveryDuration from 'components/order/order-delivery-duration';
import { gray7E } from 'components/styles/colors';
import { useCartDispatch } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { useNotificationState } from 'context/notifications';
import useCart from 'hooks/cart';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { getVariantIds, trackMoEngageAppEvent } from 'utils/common';
import { convertToRupees } from 'utils/currency-utils';
import { FBTrackingService } from 'utils/fb-tracking';
import { GATrackingService } from 'utils/ga-tracking';

import useLogin from 'hooks/login';
import { fetchCheckoutByIdService } from 'services/checkout';
import { CustomText } from '../../../../AndroidFontFix';

const OrderConfirmation = ({ navigation }): React.ReactElement => {
  const cartDispatch = useCartDispatch();
  const { trackingTransparency } = useNotificationState();
  const checkoutDispatch = useCheckoutDispatch();
  const [loading, setLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState();
  const { clearDiscount } = useCart();
  const { handleLogout } = useLogin();
;
  const { checkout_id: checkoutId } = useCheckoutState();

  const appRatingWidget = async () => {
    const available = InAppReview.isAvailable();
    if (available) {
      await InAppReview.RequestInAppReview();
    }
  };

  const trackContinueShopping = (value, features, subscriptionDetails) => {
    crashlytics().log(
      `Track continue to shopping clicked on the order confirmation : ${JSON.stringify(
        value,
      )}}`,
    );
    const cartValues = getVariantIds(value?.line_items);
    if (value.checkoutType === 'subscription') {
      trackMoEngageAppEvent({
        event: 'new_subscription_order_placed_app',
        values: [
          {
            eventAttribute: 'product_name',
            value: cartValues.names.toString() || '',
          },
          {
            eventAttribute: 'product_id',
            value: cartValues.ids.toString() || '',
          },

          {
            eventAttribute: 'price',
            value: convertToRupees(+cartValues.price).toString() || '',
          },
          {
            eventAttribute: 'quantity',
            value: cartValues?.quantity.toString() || '',
          },
          {
            eventAttribute: 'cart_amount',
            value: convertToRupees(+value?.order_subtotal),
          },
          {
            eventAttribute: 'purchase_amount',
            value: convertToRupees(+value?.order_total),
          },
          {
            eventAttribute: 'order_address_city',
            value: value?.shipping_address?.city,
          },
          {
            eventAttribute: 'order_address_pin',
            value: value?.shipping_address?.zip,
          },
          { eventAttribute: 'url', value: features?.chatlineUrl },
          {
            eventAttribute: 'order_id',
            value: value?.store_order_number,
          },
          {
            eventAttribute: 'phone_number',
            value: value?.customer?.phone,
          },
          {
            eventAttribute: 'subscription_duration',
            value: subscriptionDetails?.duration,
          },
        ],
        trackingTransparency,
        skipGATrack: true,
      });
    } else {
      trackMoEngageAppEvent({
        event: 'delivery_details_app',
        values: [
          {
            eventAttribute: 'product_name',
            value: cartValues.names.toString() || '',
          },
          {
            eventAttribute: 'product_id',
            value: cartValues.ids.toString() || '',
          },

          {
            eventAttribute: 'price',
            value: convertToRupees(+cartValues.price).toString() || '',
          },
          {
            eventAttribute: 'quantity',
            value: cartValues?.quantity.toString() || '',
          },
          {
            eventAttribute: 'cart_amount',
            value: convertToRupees(+value?.order_subtotal),
          },
          {
            eventAttribute: 'purchase_amount',
            value: convertToRupees(+value?.order_total),
          },
          {
            eventAttribute: 'order_address_city',
            value: value?.shipping_address?.city,
          },
          {
            eventAttribute: 'order_address_pin',
            value: value?.shipping_address?.zip,
          },
          { eventAttribute: 'url', value: features?.chatlineUrl },
          {
            eventAttribute: 'order_id',
            value: value?.store_order_number,
          },
          {
            eventAttribute: 'phone_number',
            value: value?.customer?.phone,
          },
        ],
        trackingTransparency,
        skipGATrack: true,
      });
    }

    GATrackingService.trackPurchase(
      value?.line_items.map(item => ({
        item_id: String(item.productId),
        item_name: item?.title,
        quantity: item?.quantity,
        price: convertToRupees(Number(item?.linePrice)),
      })),
      value?.discount_code,
      String(value?.store_order_number),
      convertToRupees(value?.shipping_charges),
      convertToRupees(value?.order_total),
    );
    FBTrackingService.trackPurchase(
      value?.line_items.map(item => ({
        item_id: String(item.productId),
        item_name: item?.productTitle,
        quantity: item?.quantity,
        price: convertToRupees(Number(item?.linePrice)),
      })),
      convertToRupees(value?.order_total),
    );
  };

  const fetchCheckout = () => {    
    setLoading(true);
    fetchCheckoutByIdService(checkoutId).then(response => {
      trackContinueShopping(
        response?.data?.checkout,
        response?.data?.features,
        response?.data?.subscriptionDetails,
      );
      setCheckoutData(response);
      setLoading(false);
    }).catch(err => {
      console.log("Error : ", err);
      setLoading(false);
      if(err?.response?.status === 401){
        handleLogout();
        navigation.navigate('CartScreen');
      }
    })
  };

  useEffect(() => {
    clearDiscount();
    cartDispatch(clearCart);
    checkoutDispatch(setIsPaymentProcessing(false));
  }, [cartDispatch, checkoutDispatch]);

  useEffect(() => {
    fetchCheckout();

    const backAction = () => {
      navigation.navigate('index');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    appRatingWidget();
    return () => backHandler.remove();
  }, []);

  if (loading) return <Loader />;

  const checkoutObject = checkoutData?.data?.checkout;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <WhiteCard style={{ padding: 10, borderRadius: 0, marginBottom: 10 }}>
          {!loading ? (
            <>
              <BaseView row style={{ marginBottom: 10 }}>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color="#6BBD58"
                  style={{ marginRight: 4 }}
                  size={30}
                />
                <BaseView>
                  <Text style={{ fontSize: 14 }}>Order received!</Text>

                  {checkoutObject?.store_order_number && (
                    <CustomText
                      style={{
                        fontSize: 14,
                        alignSelf: 'flex-start',
                        fontWeight: 'bold',
                      }}
                    >
                      {`#${checkoutObject?.store_order_number}`}
                    </CustomText>
                  )}
                </BaseView>
              </BaseView>
              <Hr />
              <Text style={{ marginTop: 10, color: '#7E7E7E' }}>
                You&apos;ll recieve a confirmation text with your order number
              </Text>
            </>
          ) : null}
          <OrderDeliveryDuration
            pincode={checkoutObject && checkoutObject.shipping_address.zip}
          />
          {checkoutData && checkoutData?.data?.checkoutType === 'subscription' && (
            <View style={{ marginVertical: 4 }}>
              <Text>
                Next order will be automatically placed on{' '}
                {checkoutData &&
                  checkoutData?.data?.subscriptionDetails &&
                  checkoutData?.data?.subscriptionDetails.nextOrderDate}
              </Text>
              <Text>
                You will receive a payment link for your recurring order where
                you can select any mode of payment.{' '}
              </Text>
            </View>
          )}
        </WhiteCard>

        {!loading ? (
          <OrderConfirmationPopupWidget
            navigation={navigation}
            orderDetails={checkoutObject}
          />
        ) : null}

        {!loading ? (
          <>
            <WhiteCard
              // noBorderRadius
              style={{ borderBottomWidth: 1, borderBottomColor: gray7E, borderRadius: 0 }}
            >
              <Text>Shipping Address</Text>
              {/* <Hr  /> */}

            </WhiteCard>
            <WhiteCard noBorderRadius style={{ marginBottom: 10 }}>
              <AddressCard
                address={checkoutObject && checkoutObject.shipping_address}
                addressOrderSummary
              />
            </WhiteCard>
            <WhiteCard
              noBorderRadius
              style={{ margin: 0, paddingHorizontal: 0, paddingTop: 0 }}
            >
              {
                checkoutObject && 
                <OrderConfirmationPriceDetails
                  shippingCharges={checkoutObject.shipping_charges}
                  orderSubtotal={checkoutObject.order_subtotal}
                  orderTotal={checkoutObject.order_total}
                  orderTotalMRP={checkoutObject.orderTotalMrp}
                  discountCode={checkoutObject.discount_code}
                  discountValue={checkoutObject.discount_value}
                  isSubscription={
                    checkoutObject?.checkoutType ===
                    'subscription'
                  }
                  lineItem={checkoutObject.line_items}
                />
              }
            </WhiteCard>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConfirmation;
